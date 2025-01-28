import polars as pl
import requests
from datetime import datetime, timezone
import os
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
LASTFM_API_KEY = os.getenv("LASTFM_API_KEY")
LASTFM_USERNAME = os.getenv("LASTFM_USERNAME")

SPOTIFY_DATA_PATH = "public/data/spotify_data.json"

def get_lastfm_data(start_timestamp):
    url = "http://ws.audioscrobbler.com/2.0/"
    all_scrobbles = []
    page = 1
    total_pages = 1

    logging.info(f"Fetching Last.fm data starting from timestamp: {start_timestamp}")

    while page <= total_pages:
        params = {
            "method": "user.getrecenttracks",
            "user": LASTFM_USERNAME,
            "api_key": LASTFM_API_KEY,
            "format": "json",
            "limit": 200,
            "page": page,
            "from": start_timestamp
        }

        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            tracks = data.get("recenttracks", {}).get("track", [])
            all_scrobbles.extend(tracks)

            total_pages = int(data.get("recenttracks", {}).get("@attr", {}).get("totalPages", 1))

            logging.info(f"Fetched page {page} of {total_pages} from Last.fm")

            if len(tracks) < 200:
                logging.info("No more tracks to fetch.")
                break
        else:
            logging.error(f"Error fetching Last.fm data: {response.status_code}")
            break

        page += 1

    logging.info(f"Total scrobbles fetched: {len(all_scrobbles)}")
    return all_scrobbles

def preprocess_lastfm_data(scrobbles):
    processed_data = []
    for scrobble in scrobbles:
        if "date" in scrobble:
            processed_data.append({
                "timestamp": datetime.utcfromtimestamp(int(scrobble["date"]["uts"])).strftime("%Y-%m-%dT%H:%M:%SZ"),
                "track_name": scrobble["name"],
                "artist_name": scrobble["artist"]["#text"],
                "album_name": scrobble["album"]["#text"]
            })
    logging.info(f"Preprocessed {len(processed_data)} scrobbles")
    return processed_data

def get_spotify_token():
    auth_url = "https://accounts.spotify.com/api/token"
    logging.info("Fetching Spotify token")
    auth_response = requests.post(auth_url, {
        "grant_type": "client_credentials",
        "client_id": SPOTIFY_CLIENT_ID,
        "client_secret": SPOTIFY_CLIENT_SECRET,
    })
    if auth_response.status_code == 200:
        logging.info("Successfully fetched Spotify token")
        return auth_response.json()["access_token"]
    else:
        logging.error(f"Error fetching Spotify token: {auth_response.status_code}")
        return None

def get_track_info(track_name, artist_name, token):
    search_url = "https://api.spotify.com/v1/search"
    headers = {
        "Authorization": f"Bearer {token}"
    }
    params = {
        "q": f"track:{track_name} artist:{artist_name}",
        "type": "track",
        "limit": 1
    }
    response = requests.get(search_url, headers=headers, params=params)
    if response.status_code == 200 and response.json()["tracks"]["items"]:
        track = response.json()["tracks"]["items"][0]
        logging.info(f"Found track on Spotify: {track_name} by {artist_name}")
        return {
            "duration_ms": track["duration_ms"],
            "spotify_track_uri": track["uri"],
            "track_name": track["name"],
            "artist_name": track["artists"][0]["name"],
            "album_name": track["album"]["name"]
        }
    else:
        logging.warning(f"Track not found on Spotify: {track_name} by {artist_name}")
        return None

def main():
    logging.info("Starting script execution")

    # Step 0: Load the static data
    logging.info(f"Loading Spotify data from {SPOTIFY_DATA_PATH}")
    spotify_df = pl.read_json(SPOTIFY_DATA_PATH)

    # Step 1: Get the timestamp of the last listened song
    last_timestamp = datetime.strptime(spotify_df[-1, "timestamp"], "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
    last_timestamp = int(last_timestamp.timestamp()) + 1
    logging.info(f"Last timestamp in existing data: {last_timestamp}")

    # Step 2: Fetch scrobbles from Last.fm API until that timestamp
    scrobbles = get_lastfm_data(last_timestamp)
    scrobbles.reverse()

    # Step 3: Preprocess the Last.fm data
    lastfm_data = preprocess_lastfm_data(scrobbles)

    # Step 4: Enrich Last.fm data using Spotify API
    spotify_token = get_spotify_token()
    if not spotify_token:
        logging.error("Failed to get Spotify token. Exiting.")
        return

    for track in lastfm_data:
        track_info = get_track_info(track["track_name"], track["artist_name"], spotify_token)
        if track_info:
            track["duration"] = track_info["duration_ms"]
            track["spotify_track_uri"] = track_info["spotify_track_uri"]
            track["track_name"] = track_info["track_name"]
            track["artist_name"] = track_info["artist_name"]
            track["album_name"] = track_info["album_name"]
        else:
            track["duration"] = 0
            track["spotify_track_uri"] = ""
        track["skipped"] = False

    lastfm_df = pl.DataFrame(lastfm_data)
    ordered_keys = ["timestamp", "duration", "track_name", "artist_name", "album_name", "spotify_track_uri", "skipped"]
    lastfm_df = lastfm_df.select(ordered_keys)

    # Step 5: Append the enriched data to the main DataFrame
    final_df = pl.concat([spotify_df, lastfm_df])

    # Step 6: Save the updated data back to spotify_data.json
    logging.info(f"Saving updated data to {SPOTIFY_DATA_PATH}")
    final_df.write_json(SPOTIFY_DATA_PATH)

    logging.info("Data updated successfully!")

if __name__ == "__main__":
    main()
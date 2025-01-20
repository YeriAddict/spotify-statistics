import { useState, useEffect } from "react";

import { Track, TrackAggregate } from "@/types/music";

export const useTopTracks = (pageSize = 10) => {
  const [tracks, setTracks] = useState<TrackAggregate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const fetchTracks = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const aggregatedTracksMap: Record<string, TrackAggregate> = data.reduce(
        (acc, track) => {
          if (!acc[track.track_name]) {
            acc[track.track_name] = {
              track_name: track.track_name,
              artist_name: track.artist_name,
              album_name: track.album_name,
              spotify_track_uri: track.spotify_track_uri,
              total_duration: 0,
              rank: 0,
            };
          }
          acc[track.track_name].total_duration += track.duration;

          return acc;
        },
        {} as Record<string, TrackAggregate>,
      );

      const aggregatedTracks = Object.values(aggregatedTracksMap)
        .sort((a, b) => b.total_duration - a.total_duration)
        .map((track, index) => ({
          ...track,
          rank: index + 1,
        }))
        .slice(0, 100);

      setTracks(aggregatedTracks);
      setHasMore(aggregatedTracks.length > pageSize);
      setIsLoading(false);
    };

    fetchTracks();
  }, [pageSize]);

  const loadMore = () => {
    if (!hasMore) return;

    setCursor((prevCursor) => prevCursor + pageSize);
    setHasMore(cursor + pageSize < tracks.length);
  };

  return {
    tracks: tracks.slice(0, cursor + pageSize),
    isLoading,
    hasMore,
    loadMore,
  };
};

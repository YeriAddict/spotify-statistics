import { useState, useEffect } from "react";

import { Track, TrackAggregate } from "@/types/music";

export const useTopTrackOnMonth = (year: number, month: number) => {
  const [topTrack, setTopTrack] = useState<TrackAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopTrackOnMonth = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return (
          trackDate.getUTCFullYear() === year &&
          trackDate.getUTCMonth() + 1 === month
        );
      });

      const aggregatedTracksMap: Record<string, TrackAggregate> =
        filteredTracks.reduce(
          (acc, track) => {
            const key = `${track.track_name}|${track.artist_name}|${track.album_name}`;

            if (!acc[key]) {
              acc[key] = {
                track_name: track.track_name,
                artist_name: track.artist_name,
                album_name: track.album_name,
                spotify_track_uri: track.spotify_track_uri,
                total_duration: 0,
                rank: 0,
              };
            }
            acc[key].total_duration += track.duration;

            return acc;
          },
          {} as Record<string, TrackAggregate>,
        );

      const aggregatedTracks = Object.values(aggregatedTracksMap);
      const mostListenedTrack = aggregatedTracks.sort(
        (a, b) => b.total_duration - a.total_duration,
      )[0];

      if (mostListenedTrack) {
        mostListenedTrack.total_duration = Math.floor(
          mostListenedTrack.total_duration / 1000,
        );
      }

      setTopTrack(mostListenedTrack || null);
      setIsLoading(false);
    };

    fetchTopTrackOnMonth();
  }, [year, month]);

  return {
    topTrack,
    isLoading,
  };
};

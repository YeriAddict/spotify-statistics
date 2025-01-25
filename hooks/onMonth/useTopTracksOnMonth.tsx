import { useState, useEffect } from "react";

import { Track, TrackAggregate } from "@/types/music";

export const useTopTracksOnMonth = (
  year: number,
  month: number,
  pageSize = 10,
) => {
  const [tracks, setTracks] = useState<TrackAggregate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const fetchTopTracksOnMonth = async () => {
      setIsLoading(true);

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

      const aggregatedTracks = Object.values(aggregatedTracksMap)
        .sort((a, b) => b.total_duration - a.total_duration)
        .map((track, index) => ({
          ...track,
          rank: index + 1,
          total_duration: Math.floor(track.total_duration / 1000),
        }))
        .slice(0, 100);

      setTracks(aggregatedTracks);
      setHasMore(aggregatedTracks.length > pageSize);
      setIsLoading(false);
    };

    fetchTopTracksOnMonth();
  }, [year, month, pageSize]);

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

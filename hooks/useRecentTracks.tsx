import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useRecentTracks = (pageSize = 10) => {
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const fetchRecentTracks = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const sortedTracks = data.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );

      const convertedTracks = sortedTracks.map((track) => ({
        ...track,
        timestamp: new Date(track.timestamp).toLocaleString(),
      }));

      setRecentTracks(convertedTracks);
      setHasMore(convertedTracks.length > pageSize);
      setIsLoading(false);
    };

    fetchRecentTracks();
  }, [pageSize]);

  const loadMore = () => {
    if (!hasMore) return;

    setCursor((prevCursor) => prevCursor + pageSize);
    setHasMore(cursor + pageSize < recentTracks.length);
  };

  return {
    recentTracks: recentTracks.slice(0, cursor + pageSize),
    isLoading,
    hasMore,
    loadMore,
  };
};

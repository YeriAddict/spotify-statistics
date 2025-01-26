import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Track } from "@/types/music";
import { fetchTracks } from "@/services/fetchTracks";

export function useRecentTracks(pageSize = 10) {
  const {
    data: allTracks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recentTracks"],
    queryFn: fetchTracks,
  });

  const sortedTracks: Track[] = allTracks.slice().sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const convertedTracks: Track[] = sortedTracks.map((track) => ({
    ...track,
    timestamp: new Date(track.timestamp).toLocaleString(),
  }));

  const [cursor, setCursor] = useState(0);

  const hasMore = cursor + pageSize < convertedTracks.length;

  const loadMore = () => {
    if (!hasMore) return;
    setCursor((prev) => prev + pageSize);
  };

  const visibleTracks = convertedTracks.slice(0, cursor + pageSize);

  return {
    recentTracks: visibleTracks,
    isLoading,
    isError,
    error,
    hasMore,
    loadMore,
  };
}

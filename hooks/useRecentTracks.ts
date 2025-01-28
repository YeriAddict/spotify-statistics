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

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);

    const pad = (num: number) => String(num).padStart(2, "0");

    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+00:00`;
  };

  const sortedTracks: Track[] = allTracks.slice().sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const convertedTracks: Track[] = sortedTracks.map((track) => ({
    ...track,
    timestamp: formatTimestamp(track.timestamp),
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

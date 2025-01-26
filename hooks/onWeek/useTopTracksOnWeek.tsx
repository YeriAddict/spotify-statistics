import { useState, useEffect } from "react";

import { TrackAggregate } from "@/types/music";
import { fetchTrackAggregatesOnWeek } from "@/services/fetchTracks";

export const useTopTracksOnWeek = (date: string, pageSize = 10) => {
  const [tracks, setTracks] = useState<TrackAggregate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const run = async () => {
      const aggregatedTracks = await fetchTrackAggregatesOnWeek(date);

      setTracks(aggregatedTracks);
      setHasMore(aggregatedTracks.length > pageSize);
      setIsLoading(false);
    };

    run();
  }, [date, pageSize]);

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

import { useState, useEffect } from "react";

import { TrackAggregate } from "@/types/music";
import { fetchTrackAggregatesOnMonth } from "@/services/fetchTracks";

export const useTopTrackOnMonth = (year: number, month: number) => {
  const [topTrack, setTopTrack] = useState<TrackAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const aggregatedTracks = await fetchTrackAggregatesOnMonth(year, month);
      const mostListenedTrack = aggregatedTracks[0] || null;

      setTopTrack(mostListenedTrack);
      setIsLoading(false);
    };

    run();
  }, [year, month]);

  return {
    topTrack,
    isLoading,
  };
};

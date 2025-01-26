import { useState, useEffect } from "react";

import { TrackAggregate } from "@/types/music";
import { fetchTrackAggregatesOnYear } from "@/services/fetchTracks";

export const useTopTrackOnYear = (year: number) => {
  const [topTrack, setTopTrack] = useState<TrackAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const aggregatedTracks = await fetchTrackAggregatesOnYear(year);
      const mostListenedTrack = aggregatedTracks[0] || null;

      setTopTrack(mostListenedTrack);
      setIsLoading(false);
    };

    run();
  }, [year]);

  return {
    topTrack,
    isLoading,
  };
};

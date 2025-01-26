import { useState, useEffect } from "react";

import { TrackAggregate } from "@/types/music";
import { fetchTrackAggregatesOnWeek } from "@/services/fetchTracks";

export const useTopTrackOnWeek = (date: string) => {
  const [topTrack, setTopTrack] = useState<TrackAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const aggregatedTracks = await fetchTrackAggregatesOnWeek(date);
      const mostListenedTrack = aggregatedTracks[0] || null;

      setTopTrack(mostListenedTrack);
      setIsLoading(false);
    };

    run();
  }, [date]);

  return {
    topTrack,
    isLoading,
  };
};

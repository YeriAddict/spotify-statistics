import { useState, useEffect } from "react";

import { TrackAggregate } from "@/types/music";
import { fetchTrackAggregatesOnDate } from "@/services/fetchTracks";

export const useTopTrackOnDate = (date: string) => {
  const [topTrack, setTopTrack] = useState<TrackAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const aggregatedTracks = await fetchTrackAggregatesOnDate(date);
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

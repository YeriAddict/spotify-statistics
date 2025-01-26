import { useState, useEffect } from "react";

import { Track } from "@/types/music";
import { fetchTracksOnDate } from "@/services/fetchTracks";

export const useTracksOnDate = (date: string) => {
  const [trackCount, setTrackCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const filteredTracks: Track[] = await fetchTracksOnDate(date);

      setTrackCount(filteredTracks.length);
      setIsLoading(false);
    };

    run();
  }, [date]);

  return {
    trackCount,
    isLoading,
  };
};

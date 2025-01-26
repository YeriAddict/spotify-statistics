import { useState, useEffect } from "react";

import { Track } from "@/types/music";
import { fetchTracksOnMonth } from "@/services/fetchTracks";

export const useTracksOnMonth = (year: number, month: number) => {
  const [trackCount, setTrackCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const filteredTracks: Track[] = await fetchTracksOnMonth(year, month);

      setTrackCount(filteredTracks.length);
      setIsLoading(false);
    };

    run();
  }, [year, month]);

  return {
    trackCount,
    isLoading,
  };
};

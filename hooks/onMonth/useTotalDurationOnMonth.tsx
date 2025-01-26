import { useState, useEffect } from "react";

import { Track } from "@/types/music";
import { fetchTracksOnMonth } from "@/services/fetchTracks";

export const useTotalDurationOnMonth = (year: number, month: number) => {
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const filteredTracks: Track[] = await fetchTracksOnMonth(year, month);

      const totalDurationMs = filteredTracks.reduce(
        (acc, track) => acc + track.duration,
        0,
      );

      const totalSeconds = Math.floor(totalDurationMs / 1000);

      setTotalDuration(totalSeconds);
      setIsLoading(false);
    };

    run();
  }, [year, month]);

  return {
    totalDuration,
    isLoading,
  };
};

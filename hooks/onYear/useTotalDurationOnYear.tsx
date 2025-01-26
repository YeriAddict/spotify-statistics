import { useState, useEffect } from "react";

import { fetchTracksOnYear } from "@/services/fetchTracks";

export const useTotalDurationOnYear = (year: number) => {
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const filteredTracks = await fetchTracksOnYear(year);

      const totalDurationMs = filteredTracks.reduce(
        (acc, track) => acc + track.duration,
        0,
      );

      const totalSeconds = Math.floor(totalDurationMs / 1000);

      setTotalDuration(totalSeconds);
      setIsLoading(false);
    };

    run();
  }, [year]);

  return {
    totalDuration,
    isLoading,
  };
};

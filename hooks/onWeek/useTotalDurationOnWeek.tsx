import { useState, useEffect } from "react";

import { Track } from "@/types/music";
import { fetchTracksOnWeek } from "@/services/fetchTracks";

export const useTotalDurationOnWeek = (date: string) => {
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const filteredTracks: Track[] = await fetchTracksOnWeek(date);

      const totalDurationMs = filteredTracks.reduce(
        (acc, track) => acc + track.duration,
        0,
      );

      const totalSeconds = Math.floor(totalDurationMs / 1000);

      setTotalDuration(totalSeconds);
      setIsLoading(false);
    };

    run();
  }, [date]);

  return {
    totalDuration,
    isLoading,
  };
};

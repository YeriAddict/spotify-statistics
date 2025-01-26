import { useState, useEffect } from "react";

import { Track } from "@/types/music";
import { fetchTracks } from "@/services/fetchTracks";

export const useListeningBreakdownOnYear = (year: number) => {
  const [yearlyListening, setYearlyListening] = useState<number[]>(
    Array(12).fill(0),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const allTracks: Track[] = await fetchTracks();

      const filteredTracks = allTracks.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate.getUTCFullYear() === year;
      });

      const yearlyAccumulator = Array(12).fill(0);

      filteredTracks.forEach((track) => {
        const trackStart = new Date(track.timestamp);
        const month = trackStart.getUTCMonth();
        const durationInMilliseconds = track.duration;

        yearlyAccumulator[month] += durationInMilliseconds;
      });

      const yearlyListeningInSeconds = yearlyAccumulator.map((ms) =>
        Math.floor(ms / 1000),
      );

      setYearlyListening(yearlyListeningInSeconds);
      setIsLoading(false);
    };

    run();
  }, [year]);

  return {
    yearlyListening,
    isLoading,
  };
};

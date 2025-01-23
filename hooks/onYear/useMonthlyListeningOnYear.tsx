import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useMonthlyListeningOnYear = (year: number) => {
  const [yearlyListening, setYearlyListening] = useState<number[]>(
    Array(12).fill(0),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchYearlyListening = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate.getUTCFullYear() === year;
      });

      const yearlyAccumulator = Array(12).fill(0);

      filteredTracks.forEach((track) => {
        const trackStart = new Date(track.timestamp);
        const month = trackStart.getUTCMonth();
        const durationInSeconds = Math.floor(track.duration / 1000);

        yearlyAccumulator[month] += durationInSeconds;
      });

      setYearlyListening(yearlyAccumulator);
      setIsLoading(false);
    };

    fetchYearlyListening();
  }, [year]);

  return {
    yearlyListening,
    isLoading,
  };
};

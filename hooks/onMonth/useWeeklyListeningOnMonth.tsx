import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useWeeklyListeningOnMonth = (year: number, month: number) => {
  const [monthlyListening, setMonthlyListening] = useState<number[]>(
    Array(5).fill(0),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyListening = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return (
          trackDate.getUTCFullYear() === year &&
          trackDate.getUTCMonth() + 1 === month
        );
      });

      const monthlyAccumulator = Array(5).fill(0);

      filteredTracks.forEach((track) => {
        const trackStart = new Date(track.timestamp);
        const weekOfMonth = Math.floor((trackStart.getDate() - 1) / 7);
        const durationInSeconds = Math.floor(track.duration / 1000);

        monthlyAccumulator[weekOfMonth] += durationInSeconds;
      });

      setMonthlyListening(monthlyAccumulator);
      setIsLoading(false);
    };

    fetchMonthlyListening();
  }, [year, month]);

  return {
    monthlyListening,
    isLoading,
  };
};

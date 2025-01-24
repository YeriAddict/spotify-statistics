import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useListeningBreakdownOnMonth = (year: number, month: number) => {
  const [monthlyListening, setMonthlyListening] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyListening = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return (
          trackDate.getUTCFullYear() === year &&
          trackDate.getUTCMonth() === month - 1
        );
      });

      const daysInMonth = new Date(year, month, 0).getDate();

      const dailyAccumulator = Array(daysInMonth).fill(0);

      filteredTracks.forEach((track) => {
        const trackStart = new Date(track.timestamp);
        const day = trackStart.getUTCDate() - 1;
        const durationInMilliseconds = track.duration;

        dailyAccumulator[day] += durationInMilliseconds;
      });

      const dailyListeningInSeconds = dailyAccumulator.map((ms) =>
        Math.floor(ms / 1000),
      );

      setMonthlyListening(dailyListeningInSeconds);
      setIsLoading(false);
    };

    fetchMonthlyListening();
  }, [year, month]);

  return {
    monthlyListening,
    isLoading,
  };
};

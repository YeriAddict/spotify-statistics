import { useState, useEffect } from "react";

import { Track } from "@/types/music";
import { fetchTracks } from "@/services/fetchTracks";

export const useListeningBreakdownOnMonth = (year: number, month: number) => {
  const [monthlyListening, setMonthlyListening] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const allTracks: Track[] = await fetchTracks();

      const filteredTracks = allTracks.filter((track) => {
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

    run();
  }, [year, month]);

  return {
    monthlyListening,
    isLoading,
  };
};

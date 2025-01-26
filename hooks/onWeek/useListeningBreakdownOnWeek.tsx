import { useState, useEffect } from "react";

import { Track } from "@/types/music";
import { fetchTracks } from "@/services/fetchTracks";

export const useListeningBreakdownOnWeek = (date: string) => {
  const [weeklyListening, setWeeklyListening] = useState<number[]>(
    Array(7).fill(0),
  );
  const [isLoading, setIsLoading] = useState(true);

  const getWeekStartAndEndDates = (date: string) => {
    const givenDate = new Date(date);

    const dayOfWeek = givenDate.getUTCDay();

    const monday = new Date(givenDate);

    monday.setUTCDate(
      givenDate.getUTCDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1),
    );
    monday.setUTCHours(0, 0, 0, 0);

    const sunday = new Date(monday);

    sunday.setUTCDate(monday.getUTCDate() + 6);
    sunday.setUTCHours(23, 59, 59, 999);

    return { weekStart: monday, weekEnd: sunday };
  };

  useEffect(() => {
    const run = async () => {
      const allTracks: Track[] = await fetchTracks();

      const { weekStart, weekEnd } = getWeekStartAndEndDates(date);

      const filteredTracks = allTracks.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate >= weekStart && trackDate <= weekEnd;
      });

      const dailyAccumulator = Array(7).fill(0);

      filteredTracks.forEach((track) => {
        const trackStart = new Date(track.timestamp);

        const dayOfWeek =
          trackStart.getUTCDay() === 0 ? 6 : trackStart.getUTCDay() - 1;
        const durationInMilliseconds = track.duration;

        dailyAccumulator[dayOfWeek] += durationInMilliseconds;
      });

      const weeklyListeningInSeconds = dailyAccumulator.map((ms) =>
        Math.floor(ms / 1000),
      );

      setWeeklyListening(weeklyListeningInSeconds);
      setIsLoading(false);
    };

    run();
  }, [date]);

  return {
    weeklyListening,
    isLoading,
  };
};

import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useDailyListeningOnWeek = (year: number, weekNumber: number) => {
  const [weeklyListening, setWeeklyListening] = useState<number[]>(
    Array(7).fill(0),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyListening = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const getStartDateOfWeek = (year: number, week: number) => {
        const firstDayOfYear = new Date(year, 0, 1);
        const dayOffset = firstDayOfYear.getDay();
        const daysToFirstWeek = dayOffset <= 4 ? dayOffset : dayOffset - 7;
        const firstMonday = new Date(year, 0, 1 + (1 - daysToFirstWeek));
        const startDate = new Date(firstMonday);

        startDate.setDate(startDate.getDate() + (week - 1) * 7);

        return startDate;
      };

      const startDate = getStartDateOfWeek(year, weekNumber);
      const endDate = new Date(startDate);

      endDate.setDate(startDate.getDate() + 6);

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate >= startDate && trackDate <= endDate;
      });

      const weeklyAccumulator = Array(7).fill(0);

      filteredTracks.forEach((track) => {
        const trackStart = new Date(track.timestamp);
        const dayOfWeek = trackStart.getDay();
        const durationInSeconds = Math.floor(track.duration / 1000);

        weeklyAccumulator[dayOfWeek] += durationInSeconds;
      });

      setWeeklyListening(weeklyAccumulator);
      setIsLoading(false);
    };

    fetchWeeklyListening();
  }, [year, weekNumber]);

  return {
    weeklyListening,
    isLoading,
  };
};

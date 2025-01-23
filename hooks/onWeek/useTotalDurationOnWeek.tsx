import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useTotalDurationOnWeek = (year: number, week: number) => {
  const [totalDuration, setTotalDuration] = useState<string>("0w0d0h0m0s");
  const [isLoading, setIsLoading] = useState(true);

  const getWeekStartAndEndDates = (year: number, week: number) => {
    const firstDayOfYear = new Date(Date.UTC(year, 0, 1));
    const daysToAdd = (week - 1) * 7 - firstDayOfYear.getUTCDay() + 1;

    const weekStart = new Date(firstDayOfYear);

    weekStart.setUTCDate(firstDayOfYear.getUTCDate() + daysToAdd);

    const weekEnd = new Date(weekStart);

    weekEnd.setUTCDate(weekStart.getUTCDate() + 6);

    return { weekStart, weekEnd };
  };

  useEffect(() => {
    const fetchTotalDurationOnWeek = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const { weekStart, weekEnd } = getWeekStartAndEndDates(year, week);

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate >= weekStart && trackDate <= weekEnd;
      });

      const totalDurationMs = filteredTracks.reduce(
        (acc, track) => acc + track.duration,
        0,
      );

      const totalSeconds = Math.floor(totalDurationMs / 1000);
      const days = Math.floor(totalSeconds / (24 * 3600));
      const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTotalDuration(`${week}w${days}d${hours}h${minutes}m${seconds}s`);
      setIsLoading(false);
    };

    fetchTotalDurationOnWeek();
  }, [year, week]);

  return {
    totalDuration,
    isLoading,
  };
};

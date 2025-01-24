import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useTotalDurationOnWeek = (date: string) => {
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const getWeekStartAndEndDates = (date: string) => {
    const givenDate = new Date(date);

    const dayOfWeek = givenDate.getUTCDay();

    const monday = new Date(givenDate);

    monday.setUTCDate(
      givenDate.getUTCDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1),
    );

    const sunday = new Date(monday);

    sunday.setUTCDate(monday.getUTCDate() + 6);
    sunday.setUTCHours(23, 59, 59, 999);

    return { weekStart: monday, weekEnd: sunday };
  };

  useEffect(() => {
    const fetchTotalDurationOnWeek = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const { weekStart, weekEnd } = getWeekStartAndEndDates(date);

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate >= weekStart && trackDate <= weekEnd;
      });

      const totalDurationMs = filteredTracks.reduce(
        (acc, track) => acc + track.duration,
        0,
      );

      const totalSeconds = Math.floor(totalDurationMs / 1000);

      setTotalDuration(totalSeconds);
      setIsLoading(false);
    };

    fetchTotalDurationOnWeek();
  }, [date]);

  return {
    totalDuration,
    isLoading,
  };
};

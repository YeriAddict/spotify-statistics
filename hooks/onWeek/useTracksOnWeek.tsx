import { useEffect, useState } from "react";

import { Track } from "@/types/music";

export const useTracksOnWeek = (year: number, week: number) => {
  const [trackCount, setTrackCount] = useState<number>(0);
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
    const fetchTracksOnWeek = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const { weekStart, weekEnd } = getWeekStartAndEndDates(year, week);

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate >= weekStart && trackDate <= weekEnd;
      });

      setTrackCount(filteredTracks.length);
      setIsLoading(false);
    };

    fetchTracksOnWeek();
  }, [year, week]);

  return {
    trackCount,
    isLoading,
  };
};

import { useQuery } from "@tanstack/react-query";

import { Track } from "@/types/music";
import {
  fetchTracksOnDate,
  fetchTracksOnMonth,
  fetchTracksOnWeek,
  fetchTracksOnYear,
} from "@/services/fetchTracks";

function useCountTracks(
  queryKey: (string | number)[],
  fetchFn: (...args: any[]) => Promise<Track[]>,
  fetchArgs: any[],
  enabled: boolean,
) {
  const { data = [], isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchFn(...fetchArgs),
    enabled,
  });

  const trackCount = data.length;

  return {
    trackCount,
    isLoading,
  };
}

export function useCountTracksOnDate(date: string, enabled: boolean) {
  return useCountTracks(
    ["countTracksOnDate", date],
    fetchTracksOnDate,
    [date],
    enabled,
  );
}

export function useCountTracksOnWeek(date: string, enabled: boolean) {
  return useCountTracks(
    ["countTracksOnWeek", date],
    fetchTracksOnWeek,
    [date],
    enabled,
  );
}

export function useCountTracksOnMonth(
  year: number,
  month: number,
  enabled: boolean,
) {
  return useCountTracks(
    ["countTracksOnMonth", year, month],
    fetchTracksOnMonth,
    [year, month],
    enabled,
  );
}

export function useCountTracksOnYear(year: number, enabled: boolean) {
  return useCountTracks(
    ["countTracksOnYear", year],
    fetchTracksOnYear,
    [year],
    enabled,
  );
}

export function useCountTracksPerDayOnYear(year: number, enabled: boolean) {
  const { data: dailySongCounts = [], isLoading } = useQuery({
    queryKey: ["songCountPerDay", year],
    enabled,
    queryFn: async () => {
      const allTracks: Track[] = await fetchTracksOnYear(year);

      const dailySongCountMap: Record<string, number> = {};

      allTracks.forEach((track) => {
        const trackDate = new Date(track.timestamp);
        const dateKey = trackDate.toISOString().split("T")[0];

        if (!dailySongCountMap[dateKey]) {
          dailySongCountMap[dateKey] = 0;
        }

        dailySongCountMap[dateKey] += 1;
      });

      const daysInYear = Array.from({ length: 365 }, (_, i) => {
        const date = new Date(year, 0, i + 1);

        if (date.getFullYear() === year) {
          return date.toISOString().split("T")[0];
        }

        return null;
      }).filter(Boolean) as string[];

      const dailySongCounts = daysInYear.map(
        (dateKey) => dailySongCountMap[dateKey] || 0,
      );

      return dailySongCounts;
    },
  });

  return {
    dailySongCounts,
    isLoading,
  };
}

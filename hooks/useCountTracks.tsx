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

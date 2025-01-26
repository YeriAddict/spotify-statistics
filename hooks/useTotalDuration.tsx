import { useQuery } from "@tanstack/react-query";

import { Track } from "@/types/music";
import {
  fetchTracksOnDate,
  fetchTracksOnWeek,
  fetchTracksOnMonth,
  fetchTracksOnYear,
} from "@/services/fetchTracks";

function useTotalDuration(
  queryKey: (string | number)[],
  fetchFn: (...args: any[]) => Promise<Track[]>,
  fetchArgs: any[],
  enabled = true,
) {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => fetchFn(...fetchArgs),
    enabled,
  });

  const totalMilliseconds = data.reduce(
    (acc, track) => acc + track.duration,
    0,
  );
  const totalDuration = Math.floor(totalMilliseconds / 1000);

  return {
    totalDuration,
    isLoading,
    isError,
    error,
  };
}

export function useTotalDurationOnDate(date: string, enabled = true) {
  return useTotalDuration(
    ["totalDurationOnDate", date],
    fetchTracksOnDate,
    [date],
    enabled,
  );
}

export function useTotalDurationOnWeek(date: string, enabled = true) {
  return useTotalDuration(
    ["totalDurationOnWeek", date],
    fetchTracksOnWeek,
    [date],
    enabled,
  );
}

export function useTotalDurationOnMonth(
  year: number,
  month: number,
  enabled = true,
) {
  return useTotalDuration(
    ["totalDurationOnMonth", year, month],
    fetchTracksOnMonth,
    [year, month],
    enabled,
  );
}

export function useTotalDurationOnYear(year: number, enabled = true) {
  return useTotalDuration(
    ["totalDurationOnYear", year],
    fetchTracksOnYear,
    [year],
    enabled,
  );
}

import { useQuery } from "@tanstack/react-query";

import { TrackAggregate } from "@/types/music";
import {
  fetchTrackAggregatesOnDate,
  fetchTrackAggregatesOnWeek,
  fetchTrackAggregatesOnMonth,
  fetchTrackAggregatesOnYear,
} from "@/services/fetchTracks";

function useTopTrack(
  queryKey: (string | number)[],
  fetchFn: (...args: any[]) => Promise<TrackAggregate[]>,
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

  const topTrack = data[0] || null;

  return {
    topTrack,
    isLoading,
    isError,
    error,
  };
}

export function useTopTrackOnDate(date: string, enabled = true) {
  return useTopTrack(
    ["topTrackOnDate", date],
    fetchTrackAggregatesOnDate,
    [date],
    enabled,
  );
}

export function useTopTrackOnWeek(date: string, enabled = true) {
  return useTopTrack(
    ["topTrackOnWeek", date],
    fetchTrackAggregatesOnWeek,
    [date],
    enabled,
  );
}

export function useTopTrackOnMonth(
  year: number,
  month: number,
  enabled = true,
) {
  return useTopTrack(
    ["topTrackOnMonth", year, month],
    fetchTrackAggregatesOnMonth,
    [year, month],
    enabled,
  );
}

export function useTopTrackOnYear(year: number, enabled = true) {
  return useTopTrack(
    ["topTrackOnYear", year],
    fetchTrackAggregatesOnYear,
    [year],
    enabled,
  );
}

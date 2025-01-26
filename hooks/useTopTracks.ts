import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  fetchTrackAggregatesOnDate,
  fetchTrackAggregatesOnWeek,
  fetchTrackAggregatesOnMonth,
  fetchTrackAggregatesOnYear,
  fetchTrackAggregatesOnLifetime,
} from "@/services/fetchTracks";

function useTopTracks(
  queryKey: (string | number)[],
  fetchFn: (...args: any[]) => Promise<any[]>,
  fetchArgs: any[],
  pageSize = 10,
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

  const [cursor, setCursor] = useState(0);

  const hasMore = cursor + pageSize < data.length;

  const loadMore = () => {
    if (hasMore) {
      setCursor((prev) => prev + pageSize);
    }
  };

  const tracks = data.slice(0, cursor + pageSize);

  return {
    tracks,
    isLoading,
    isError,
    error,
    hasMore,
    loadMore,
  };
}

export function useTopTracksOnDate(
  date: string,
  pageSize = 10,
  enabled = true,
) {
  return useTopTracks(
    ["topTracksOnDate", date],
    fetchTrackAggregatesOnDate,
    [date],
    pageSize,
    enabled,
  );
}

export function useTopTracksOnWeek(
  date: string,
  pageSize = 10,
  enabled = true,
) {
  return useTopTracks(
    ["topTracksOnWeek", date],
    fetchTrackAggregatesOnWeek,
    [date],
    pageSize,
    enabled,
  );
}

export function useTopTracksOnMonth(
  year: number,
  month: number,
  pageSize = 10,
  enabled = true,
) {
  return useTopTracks(
    ["topTracksOnMonth", year, month],
    fetchTrackAggregatesOnMonth,
    [year, month],
    pageSize,
    enabled,
  );
}

export function useTopTracksOnYear(
  year: number,
  pageSize = 10,
  enabled = true,
) {
  return useTopTracks(
    ["topTracksOnYear", year],
    fetchTrackAggregatesOnYear,
    [year],
    pageSize,
    enabled,
  );
}

export function useTopTracksOnLifetime(pageSize = 10, enabled = true) {
  return useTopTracks(
    ["topTracksOnLifetime"],
    fetchTrackAggregatesOnLifetime,
    [],
    pageSize,
    enabled,
  );
}

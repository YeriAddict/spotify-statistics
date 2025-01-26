import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ArtistAggregate } from "@/types/music";
import {
  fetchArtistAggregatesOnDate,
  fetchArtistAggregatesOnWeek,
  fetchArtistAggregatesOnMonth,
  fetchArtistAggregatesOnYear,
  fetchArtistAggregatesOnLifetime,
} from "@/services/fetchArtists";

function useTopArtists(
  queryKey: (string | number)[],
  fetchFunction: (...args: any[]) => Promise<ArtistAggregate[]>,
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
    queryFn: () => fetchFunction(...fetchArgs),
    enabled,
  });

  const [cursor, setCursor] = useState(0);

  const hasMore = cursor + pageSize < data.length;

  const loadMore = () => {
    if (!hasMore) return;
    setCursor((prev) => prev + pageSize);
  };

  const artists = data.slice(0, cursor + pageSize);

  return {
    artists,
    isLoading,
    isError,
    error,
    hasMore,
    loadMore,
  };
}

export function useTopArtistsOnDate(
  date: string,
  pageSize = 10,
  enabled = true,
) {
  return useTopArtists(
    ["topArtistsOnDate", date],
    fetchArtistAggregatesOnDate,
    [date],
    pageSize,
    enabled,
  );
}

export function useTopArtistsOnWeek(
  date: string,
  pageSize = 10,
  enabled = true,
) {
  return useTopArtists(
    ["topArtistsOnWeek", date],
    fetchArtistAggregatesOnWeek,
    [date],
    pageSize,
    enabled,
  );
}

export function useTopArtistsOnMonth(
  year: number,
  month: number,
  pageSize = 10,
  enabled = true,
) {
  return useTopArtists(
    ["topArtistsOnMonth", year, month],
    fetchArtistAggregatesOnMonth,
    [year, month],
    pageSize,
    enabled,
  );
}

export function useTopArtistsOnYear(
  year: number,
  pageSize = 10,
  enabled = true,
) {
  return useTopArtists(
    ["topArtistsOnYear", year],
    fetchArtistAggregatesOnYear,
    [year],
    pageSize,
    enabled,
  );
}

export function useTopArtistsOnLifetime(pageSize = 10, enabled = true) {
  return useTopArtists(
    ["topArtistsOnLifetime"],
    fetchArtistAggregatesOnLifetime,
    [],
    pageSize,
    enabled,
  );
}

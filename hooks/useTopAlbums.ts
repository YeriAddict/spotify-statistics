import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { AlbumAggregate } from "@/types/music";
import {
  fetchAlbumAggregatesOnDate,
  fetchAlbumAggregatesOnWeek,
  fetchAlbumAggregatesOnMonth,
  fetchAlbumAggregatesOnYear,
  fetchAlbumAggregatesOnLifetime,
} from "@/services/fetchAlbums";

function useTopAlbums(
  queryKey: (string | number)[],
  fetchFunction: (...args: any[]) => Promise<AlbumAggregate[]>,
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
    if (hasMore) {
      setCursor((prev) => prev + pageSize);
    }
  };

  const albums = data.slice(0, cursor + pageSize);

  return {
    albums,
    isLoading,
    isError,
    error,
    hasMore,
    loadMore,
  };
}

export function useTopAlbumsOnDate(
  date: string,
  pageSize = 10,
  enabled = true,
) {
  return useTopAlbums(
    ["topAlbumsOnDate", date],
    fetchAlbumAggregatesOnDate,
    [date],
    pageSize,
    enabled,
  );
}

export function useTopAlbumsOnWeek(
  date: string,
  pageSize = 10,
  enabled = true,
) {
  return useTopAlbums(
    ["topAlbumsOnWeek", date],
    fetchAlbumAggregatesOnWeek,
    [date],
    pageSize,
    enabled,
  );
}

export function useTopAlbumsOnMonth(
  year: number,
  month: number,
  pageSize = 10,
  enabled = true,
) {
  return useTopAlbums(
    ["topAlbumsOnMonth", year, month],
    fetchAlbumAggregatesOnMonth,
    [year, month],
    pageSize,
    enabled,
  );
}

export function useTopAlbumsOnYear(
  year: number,
  pageSize = 10,
  enabled = true,
) {
  return useTopAlbums(
    ["topAlbumsOnYear", year],
    fetchAlbumAggregatesOnYear,
    [year],
    pageSize,
    enabled,
  );
}

export function useTopAlbumsOnLifetime(pageSize = 10, enabled = true) {
  return useTopAlbums(
    ["topAlbumsOnLifetime"],
    fetchAlbumAggregatesOnLifetime,
    [],
    pageSize,
    enabled,
  );
}

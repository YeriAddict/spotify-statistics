import { useQuery } from "@tanstack/react-query";

import { ArtistAggregate } from "@/types/music";
import {
  fetchArtistAggregatesOnDate,
  fetchArtistAggregatesOnWeek,
  fetchArtistAggregatesOnMonth,
  fetchArtistAggregatesOnYear,
} from "@/services/fetchArtists";

function useTopArtist(
  queryKey: (string | number)[],
  fetchFunction: (...args: any[]) => Promise<ArtistAggregate[]>,
  fetchArgs: any[],
  enabled = true,
) {
  const { data = [], isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchFunction(...fetchArgs),
    enabled,
  });

  const topArtist = data[0] || null;

  return {
    topArtist,
    isLoading,
  };
}

export function useTopArtistOnDate(date: string, enabled = true) {
  return useTopArtist(
    ["topArtistOnDate", date],
    fetchArtistAggregatesOnDate,
    [date],
    enabled,
  );
}

export function useTopArtistOnWeek(date: string, enabled = true) {
  return useTopArtist(
    ["topArtistOnWeek", date],
    fetchArtistAggregatesOnWeek,
    [date],
    enabled,
  );
}

export function useTopArtistOnMonth(
  year: number,
  month: number,
  enabled = true,
) {
  return useTopArtist(
    ["topArtistOnMonth", year, month],
    fetchArtistAggregatesOnMonth,
    [year, month],
    enabled,
  );
}

export function useTopArtistOnYear(year: number, enabled = true) {
  return useTopArtist(
    ["topArtistOnYear", year],
    fetchArtistAggregatesOnYear,
    [year],
    enabled,
  );
}

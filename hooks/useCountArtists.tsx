import { useQuery } from "@tanstack/react-query";

import { Track } from "@/types/music";
import {
  fetchTracksOnDate,
  fetchTracksOnWeek,
  fetchTracksOnMonth,
  fetchTracksOnYear,
} from "@/services/fetchTracks";

function useCountArtists(
  queryKey: (string | number)[],
  fetchFn: (...args: any[]) => Promise<Track[]>,
  fetchArgs: any[],
  enabled: boolean,
) {
  const { data: tracks = [], isLoading } = useQuery({
    queryKey,
    queryFn: () => fetchFn(...fetchArgs),
    enabled,
  });

  const uniqueArtists = new Set(tracks.map((track) => track.artist_name));

  return {
    artistCount: uniqueArtists.size,
    isLoading,
  };
}

export function useCountArtistsOnDate(date: string, enabled: boolean) {
  return useCountArtists(
    ["countArtistsOnDate", date],
    fetchTracksOnDate,
    [date],
    enabled,
  );
}

export function useCountArtistsOnWeek(date: string, enabled: boolean) {
  return useCountArtists(
    ["countArtistsOnWeek", date],
    fetchTracksOnWeek,
    [date],
    enabled,
  );
}

export function useCountArtistsOnMonth(
  year: number,
  month: number,
  enabled: boolean,
) {
  return useCountArtists(
    ["countArtistsOnMonth", year, month],
    fetchTracksOnMonth,
    [year, month],
    enabled,
  );
}

export function useCountArtistsOnYear(year: number, enabled: boolean) {
  return useCountArtists(
    ["countArtistsOnYear", year],
    fetchTracksOnYear,
    [year],
    enabled,
  );
}

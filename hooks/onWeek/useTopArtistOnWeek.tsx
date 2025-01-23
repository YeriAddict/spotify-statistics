import { useState, useEffect } from "react";

import { Track, ArtistAggregate } from "@/types/music";

export const useTopArtistOnWeek = (year: number, week: number) => {
  const [topArtist, setTopArtist] = useState<ArtistAggregate | null>(null);
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
    const fetchTopArtistOnWeek = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const { weekStart, weekEnd } = getWeekStartAndEndDates(year, week);

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate >= weekStart && trackDate <= weekEnd;
      });

      const aggregatedArtistsMap: Record<string, ArtistAggregate> =
        filteredTracks.reduce(
          (acc, track) => {
            if (!acc[track.artist_name]) {
              acc[track.artist_name] = {
                artist_name: track.artist_name,
                total_duration: 0,
                rank: 0,
              };
            }
            acc[track.artist_name].total_duration += track.duration;

            return acc;
          },
          {} as Record<string, ArtistAggregate>,
        );

      const aggregatedArtists = Object.values(aggregatedArtistsMap).map(
        (artist) => ({
          ...artist,
          total_duration: Math.floor(artist.total_duration / 1000),
        }),
      );

      const topArtist =
        aggregatedArtists.sort(
          (a, b) => b.total_duration - a.total_duration,
        )[0] || null;

      setTopArtist(topArtist);
      setIsLoading(false);
    };

    fetchTopArtistOnWeek();
  }, [year, week]);

  return { topArtist, isLoading };
};

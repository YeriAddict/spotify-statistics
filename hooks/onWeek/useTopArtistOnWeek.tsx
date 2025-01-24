import { useState, useEffect } from "react";

import { Track, ArtistAggregate } from "@/types/music";

export const useTopArtistOnWeek = (date: string) => {
  const [topArtist, setTopArtist] = useState<ArtistAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getWeekStartAndEndDates = (date: string) => {
    const givenDate = new Date(date);

    const dayOfWeek = givenDate.getUTCDay();

    const monday = new Date(givenDate);

    monday.setUTCDate(
      givenDate.getUTCDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1),
    );

    const sunday = new Date(monday);

    sunday.setUTCDate(monday.getUTCDate() + 6);
    sunday.setUTCHours(23, 59, 59, 999);

    return { weekStart: monday, weekEnd: sunday };
  };

  useEffect(() => {
    const fetchTopArtistOnWeek = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const { weekStart, weekEnd } = getWeekStartAndEndDates(date);

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
  }, [date]);

  return { topArtist, isLoading };
};

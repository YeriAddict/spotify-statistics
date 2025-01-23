import { useState, useEffect } from "react";

import { Track, ArtistAggregate } from "@/types/music";

export const useTopArtistOnYear = (year: number) => {
  const [topArtist, setTopArtist] = useState<ArtistAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopArtistOnYear = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate.getUTCFullYear() === year;
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

    fetchTopArtistOnYear();
  }, [year]);

  return { topArtist, isLoading };
};

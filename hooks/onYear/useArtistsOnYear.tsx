import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useArtistsOnYear = (year: number) => {
  const [artistCount, setArtistCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtistsOnYear = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate.getUTCFullYear() === year;
      });

      const uniqueArtists = new Set(
        filteredTracks.map((track) => track.artist_name),
      );

      setArtistCount(uniqueArtists.size);
      setIsLoading(false);
    };

    fetchArtistsOnYear();
  }, [year]);

  return {
    artistCount,
    isLoading,
  };
};

import { useState, useEffect } from "react";

import { fetchTracksOnYear } from "@/services/fetchTracks";

export const useArtistsOnYear = (year: number) => {
  const [artistCount, setArtistCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const filteredTracks = await fetchTracksOnYear(year);

      const uniqueArtists = new Set(
        filteredTracks.map((track) => track.artist_name),
      );

      setArtistCount(uniqueArtists.size);
      setIsLoading(false);
    };

    run();
  }, [year]);

  return {
    artistCount,
    isLoading,
  };
};

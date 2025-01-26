import { useState, useEffect } from "react";

import { ArtistAggregate } from "@/types/music";
import { fetchArtistAggregatesOnYear } from "@/services/fetchArtists";

export const useTopArtistOnYear = (year: number) => {
  const [topArtist, setTopArtist] = useState<ArtistAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const aggregatedArtists = await fetchArtistAggregatesOnYear(year);
      const mostListenedArtist = aggregatedArtists[0] || null;

      setTopArtist(mostListenedArtist);
      setIsLoading(false);
    };

    run();
  }, [year]);

  return {
    topArtist,
    isLoading,
  };
};

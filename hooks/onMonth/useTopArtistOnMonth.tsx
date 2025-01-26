import { useState, useEffect } from "react";

import { ArtistAggregate } from "@/types/music";
import { fetchArtistAggregatesOnMonth } from "@/services/fetchArtists";

export const useTopArtistOnMonth = (year: number, month: number) => {
  const [topArtist, setTopArtist] = useState<ArtistAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const aggregatedArtists = await fetchArtistAggregatesOnMonth(year, month);
      const mostListenedArtist = aggregatedArtists[0] || null;

      setTopArtist(mostListenedArtist);
      setIsLoading(false);
    };

    run();
  }, [year, month]);

  return {
    topArtist,
    isLoading,
  };
};

import { useState, useEffect } from "react";

import { ArtistAggregate } from "@/types/music";
import { fetchArtistAggregatesOnWeek } from "@/services/fetchArtists";

export const useTopArtistOnWeek = (date: string) => {
  const [topArtist, setTopArtist] = useState<ArtistAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const aggregatedArtists = await fetchArtistAggregatesOnWeek(date);
      const mostListenedTrack = aggregatedArtists[0] || null;

      setTopArtist(mostListenedTrack);
      setIsLoading(false);
    };

    run();
  }, [date]);

  return {
    topArtist,
    isLoading,
  };
};

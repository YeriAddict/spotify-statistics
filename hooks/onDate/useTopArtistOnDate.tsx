import { useState, useEffect } from "react";

import { ArtistAggregate } from "@/types/music";
import { fetchArtistAggregatesOnDate } from "@/services/fetchArtists";

export const useTopArtistOnDate = (date: string) => {
  const [topArtist, setTopArtist] = useState<ArtistAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const aggregatedArtists = await fetchArtistAggregatesOnDate(date);
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

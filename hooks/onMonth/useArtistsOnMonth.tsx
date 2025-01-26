import { useState, useEffect } from "react";

import { Track } from "@/types/music";
import { fetchTracksOnMonth } from "@/services/fetchTracks";

export const useArtistsOnMonth = (year: number, month: number) => {
  const [artistCount, setArtistCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const filteredTracks: Track[] = await fetchTracksOnMonth(year, month);

      const uniqueArtists = new Set(
        filteredTracks.map((track) => track.artist_name),
      );

      setArtistCount(uniqueArtists.size);
      setIsLoading(false);
    };

    run();
  }, [year, month]);

  return {
    artistCount,
    isLoading,
  };
};

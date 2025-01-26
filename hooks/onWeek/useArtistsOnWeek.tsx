import { useState, useEffect } from "react";

import { Track } from "@/types/music";
import { fetchTracksOnWeek } from "@/services/fetchTracks";

export const useArtistsOnWeek = (date: string) => {
  const [artistCount, setArtistCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const filteredTracks: Track[] = await fetchTracksOnWeek(date);

      const uniqueArtists = new Set(
        filteredTracks.map((track) => track.artist_name),
      );

      setArtistCount(uniqueArtists.size);
      setIsLoading(false);
    };

    run();
  }, [date]);

  return {
    artistCount,
    isLoading,
  };
};

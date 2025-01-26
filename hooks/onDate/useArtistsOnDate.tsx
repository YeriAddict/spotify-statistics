import { useState, useEffect } from "react";

import { Track } from "@/types/music";
import { fetchTracksOnDate } from "@/services/fetchTracks";

export const useArtistsOnDate = (date: string) => {
  const [artistCount, setArtistCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const filteredTracks: Track[] = await fetchTracksOnDate(date);

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

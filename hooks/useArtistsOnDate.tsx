import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useArtistsOnDate = (date: string) => {
  const [artistCount, setArtistCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtistsOnDate = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp).toISOString().split("T")[0];

        return trackDate === date;
      });

      const uniqueArtists = new Set(
        filteredTracks.map((track) => track.artist_name),
      );

      setArtistCount(uniqueArtists.size);
      setIsLoading(false);
    };

    fetchArtistsOnDate();
  }, [date]);

  return {
    artistCount,
    isLoading,
  };
};

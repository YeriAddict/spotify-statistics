import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useTracksOnMonth = (year: number, month: number) => {
  const [trackCount, setTrackCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracksOnMonth = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return (
          trackDate.getUTCFullYear() === year &&
          trackDate.getUTCMonth() + 1 === month
        );
      });

      setTrackCount(filteredTracks.length);
      setIsLoading(false);
    };

    fetchTracksOnMonth();
  }, [year, month]);

  return {
    trackCount,
    isLoading,
  };
};

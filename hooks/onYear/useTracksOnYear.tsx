import { useEffect, useState } from "react";

import { Track } from "@/types/music";

export const useTracksOnYear = (year: number) => {
  const [trackCount, setTrackCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracksOnYear = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate.getUTCFullYear() === year;
      });

      setTrackCount(filteredTracks.length);
      setIsLoading(false);
    };

    fetchTracksOnYear();
  }, [year]);

  return {
    trackCount,
    isLoading,
  };
};

import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useTracksOnDate = (date: string) => {
  const [trackCount, setTrackCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracksOnDate = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp).toISOString().split("T")[0];

        return trackDate === date;
      });

      setTrackCount(filteredTracks.length);
      setIsLoading(false);
    };

    fetchTracksOnDate();
  }, [date]);

  return {
    trackCount,
    isLoading,
  };
};

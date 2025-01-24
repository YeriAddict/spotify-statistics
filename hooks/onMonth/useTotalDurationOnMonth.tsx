import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useTotalDurationOnMonth = (year: number, month: number) => {
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTotalDurationOnMonth = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return (
          trackDate.getUTCFullYear() === year &&
          trackDate.getUTCMonth() + 1 === month
        );
      });

      const totalDurationMs = filteredTracks.reduce(
        (acc, track) => acc + track.duration,
        0,
      );

      const totalSeconds = Math.floor(totalDurationMs / 1000);

      setTotalDuration(totalSeconds);
      setIsLoading(false);
    };

    fetchTotalDurationOnMonth();
  }, [year, month]);

  return {
    totalDuration,
    isLoading,
  };
};

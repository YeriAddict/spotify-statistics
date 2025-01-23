import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useTotalDurationOnMonth = (year: number, month: number) => {
  const [totalDuration, setTotalDuration] = useState<string>("0w0d0h0m0s");
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
      const weeks = Math.floor(totalSeconds / (7 * 24 * 3600));
      const days = Math.floor((totalSeconds % (7 * 24 * 3600)) / (24 * 3600));
      const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTotalDuration(`${weeks}w${days}d${hours}h${minutes}m${seconds}s`);
      setIsLoading(false);
    };

    fetchTotalDurationOnMonth();
  }, [year, month]);

  return {
    totalDuration,
    isLoading,
  };
};

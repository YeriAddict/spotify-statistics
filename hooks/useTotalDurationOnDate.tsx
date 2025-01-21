import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useTotalDurationOnDate = (date: string) => {
  const [totalDuration, setTotalDuration] = useState<string>("0h0m0s");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTotalDurationOnDate = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp).toISOString().split("T")[0];

        return trackDate === date;
      });

      const totalDurationMs = filteredTracks.reduce(
        (acc, track) => acc + track.duration,
        0,
      );

      const seconds = Math.floor(totalDurationMs / 1000);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      setTotalDuration(`${hours}h${minutes}m${remainingSeconds}s`);
      setIsLoading(false);
    };

    fetchTotalDurationOnDate();
  }, [date]);

  return {
    totalDuration,
    isLoading,
  };
};

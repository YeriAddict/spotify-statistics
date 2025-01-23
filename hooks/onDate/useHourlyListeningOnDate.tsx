import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useHourlyListeningOnDate = (date: string) => {
  const [hourlyListening, setHourlyListening] = useState<number[]>(
    Array(24).fill(0),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHourlyListeningOnDate = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const filteredTracks = data.filter((track) => {
        const trackStart = new Date(track.timestamp);
        const localDate = trackStart.toLocaleDateString("en-CA");

        return localDate === date;
      });

      const hourlyListeningAccumulator = Array(24).fill(0);

      filteredTracks.forEach((track) => {
        const trackStart = new Date(track.timestamp);
        const localHour = trackStart.getHours();
        const durationInSeconds = Math.floor(track.duration / 1000);

        hourlyListeningAccumulator[localHour] += durationInSeconds;
      });

      setHourlyListening(hourlyListeningAccumulator);
      setIsLoading(false);
    };

    fetchHourlyListeningOnDate();
  }, [date]);

  return {
    hourlyListening,
    isLoading,
  };
};

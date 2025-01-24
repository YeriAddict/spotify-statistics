import { useState, useEffect } from "react";

import { Track } from "@/types/music";

export const useListeningBreakdownOnDate = (date: string) => {
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

      const hourlyAccumulator = Array(24).fill(0);

      filteredTracks.forEach((track) => {
        const trackStart = new Date(track.timestamp);
        const localHour = trackStart.getHours();
        const durationInMilliseconds = track.duration;

        hourlyAccumulator[localHour] += durationInMilliseconds;
      });

      const hourlyListeningInSeconds = hourlyAccumulator.map((ms) =>
        Math.floor(ms / 1000),
      );

      setHourlyListening(hourlyListeningInSeconds);
      setIsLoading(false);
    };

    fetchHourlyListeningOnDate();
  }, [date]);

  return {
    hourlyListening,
    isLoading,
  };
};

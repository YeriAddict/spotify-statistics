import { useQuery } from "@tanstack/react-query";

import { Track } from "@/types/music";
import { fetchTracks } from "@/services/fetchTracks";

function getWeekStartAndEndDates(date: string) {
  const givenDate = new Date(date);
  const dayOfWeek = givenDate.getUTCDay();

  const monday = new Date(givenDate);

  monday.setUTCDate(
    givenDate.getUTCDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1),
  );
  monday.setUTCHours(0, 0, 0, 0);

  const sunday = new Date(monday);

  sunday.setUTCDate(monday.getUTCDate() + 6);
  sunday.setUTCHours(23, 59, 59, 999);

  return { weekStart: monday, weekEnd: sunday };
}

export function useListeningBreakdownOnDate(date: string, enabled: boolean) {
  const { data: hourlyListening = [], isLoading } = useQuery({
    queryKey: ["listeningBreakdownOnDate", date],
    enabled,
    queryFn: async () => {
      const allTracks: Track[] = await fetchTracks();

      const filteredTracks = allTracks.filter((track) => {
        const trackStart = new Date(track.timestamp);
        const localDate = trackStart.toLocaleDateString("en-CA");

        return localDate === date;
      });

      const hourlyAccumulator = Array(24).fill(0);

      filteredTracks.forEach((track) => {
        const trackStart = new Date(track.timestamp);
        const localHour = trackStart.getHours();

        hourlyAccumulator[localHour] += track.duration;
      });

      return hourlyAccumulator.map((ms) => Math.floor(ms / 1000));
    },
  });

  return {
    hourlyListening,
    isLoading,
  };
}

export function useListeningBreakdownOnWeek(date: string, enabled: boolean) {
  const { data: weeklyListening = [], isLoading } = useQuery({
    queryKey: ["listeningBreakdownOnWeek", date],
    enabled,
    queryFn: async () => {
      const allTracks: Track[] = await fetchTracks();
      const { weekStart, weekEnd } = getWeekStartAndEndDates(date);

      const filteredTracks = allTracks.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate >= weekStart && trackDate <= weekEnd;
      });

      const dailyAccumulator = Array(7).fill(0);

      filteredTracks.forEach((track) => {
        const trackStart = new Date(track.timestamp);
        const dayOfWeek =
          trackStart.getUTCDay() === 0 ? 6 : trackStart.getUTCDay() - 1;

        dailyAccumulator[dayOfWeek] += track.duration;
      });

      return dailyAccumulator.map((ms) => Math.floor(ms / 1000));
    },
  });

  return {
    weeklyListening,
    isLoading,
  };
}

export function useListeningBreakdownOnMonth(
  year: number,
  month: number,
  enabled: boolean,
) {
  const { data: monthlyListening = [], isLoading } = useQuery({
    queryKey: ["listeningBreakdownOnMonth", year, month],
    enabled,
    queryFn: async () => {
      const allTracks: Track[] = await fetchTracks();

      const filteredTracks = allTracks.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return (
          trackDate.getUTCFullYear() === year &&
          trackDate.getUTCMonth() === month - 1
        );
      });

      const daysInMonth = new Date(year, month, 0).getDate();
      const dailyAccumulator = Array(daysInMonth).fill(0);

      filteredTracks.forEach((track) => {
        const trackStart = new Date(track.timestamp);
        const dayIndex = trackStart.getUTCDate() - 1;

        dailyAccumulator[dayIndex] += track.duration;
      });

      return dailyAccumulator.map((ms) => Math.floor(ms / 1000));
    },
  });

  return {
    monthlyListening,
    isLoading,
  };
}

export function useListeningBreakdownOnYear(year: number, enabled: boolean) {
  const { data: yearlyListening = [], isLoading } = useQuery({
    queryKey: ["listeningBreakdownOnYear", year],
    enabled,
    queryFn: async () => {
      const allTracks: Track[] = await fetchTracks();

      const filteredTracks = allTracks.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate.getUTCFullYear() === year;
      });

      const yearlyAccumulator = Array(12).fill(0);

      filteredTracks.forEach((track) => {
        const trackStart = new Date(track.timestamp);

        yearlyAccumulator[trackStart.getUTCMonth()] += track.duration;
      });

      return yearlyAccumulator.map((ms) => Math.floor(ms / 1000));
    },
  });

  return {
    yearlyListening,
    isLoading,
  };
}

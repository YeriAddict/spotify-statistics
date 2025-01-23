import { useState, useEffect } from "react";

import { Track, TrackAggregate } from "@/types/music";

export const useTopTrackOnWeek = (year: number, week: number) => {
  const [topTrack, setTopTrack] = useState<TrackAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getWeekStartAndEndDates = (year: number, week: number) => {
    const firstDayOfYear = new Date(Date.UTC(year, 0, 1));
    const daysToAdd = (week - 1) * 7 - firstDayOfYear.getUTCDay() + 1;

    const weekStart = new Date(firstDayOfYear);

    weekStart.setUTCDate(firstDayOfYear.getUTCDate() + daysToAdd);

    const weekEnd = new Date(weekStart);

    weekEnd.setUTCDate(weekStart.getUTCDate() + 6);

    return { weekStart, weekEnd };
  };

  useEffect(() => {
    const fetchTopTrackOnWeek = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const { weekStart, weekEnd } = getWeekStartAndEndDates(year, week);

      const filteredTracks = data.filter((track) => {
        const trackDate = new Date(track.timestamp);

        return trackDate >= weekStart && trackDate <= weekEnd;
      });

      const aggregatedTracksMap: Record<string, TrackAggregate> =
        filteredTracks.reduce(
          (acc, track) => {
            const key = `${track.track_name}|${track.artist_name}|${track.album_name}`;

            if (!acc[key]) {
              acc[key] = {
                track_name: track.track_name,
                artist_name: track.artist_name,
                album_name: track.album_name,
                spotify_track_uri: track.spotify_track_uri,
                total_duration: 0,
                rank: 0,
              };
            }
            acc[key].total_duration += track.duration;

            return acc;
          },
          {} as Record<string, TrackAggregate>,
        );

      const aggregatedTracks = Object.values(aggregatedTracksMap);
      const mostListenedTrack = aggregatedTracks.sort(
        (a, b) => b.total_duration - a.total_duration,
      )[0];

      if (mostListenedTrack) {
        mostListenedTrack.total_duration = Math.floor(
          mostListenedTrack.total_duration / 1000,
        );
      }

      setTopTrack(mostListenedTrack || null);
      setIsLoading(false);
    };

    fetchTopTrackOnWeek();
  }, [year, week]);

  return {
    topTrack,
    isLoading,
  };
};

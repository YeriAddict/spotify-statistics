import { useState, useEffect } from "react";

import { Track, TrackAggregate } from "@/types/music";

export const useTopTrackOnWeek = (date: string) => {
  const [topTrack, setTopTrack] = useState<TrackAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getWeekStartAndEndDates = (date: string) => {
    const givenDate = new Date(date);

    const dayOfWeek = givenDate.getUTCDay();

    const monday = new Date(givenDate);

    monday.setUTCDate(
      givenDate.getUTCDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1),
    );

    const sunday = new Date(monday);

    sunday.setUTCDate(monday.getUTCDate() + 6);
    sunday.setUTCHours(23, 59, 59, 999);

    return { weekStart: monday, weekEnd: sunday };
  };

  useEffect(() => {
    const fetchTopTrackOnWeek = async () => {
      const response = await fetch("./data/spotify_data.json");
      const data: Track[] = await response.json();

      const { weekStart, weekEnd } = getWeekStartAndEndDates(date);

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
  }, [date]);

  return {
    topTrack,
    isLoading,
  };
};

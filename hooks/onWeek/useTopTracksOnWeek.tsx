import { useState, useEffect } from "react";

import { Track, TrackAggregate } from "@/types/music";

export const useTopTracksOnWeek = (date: string, pageSize = 10) => {
  const [tracks, setTracks] = useState<TrackAggregate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState(0);

  const getWeekStartAndEndDates = (date: string) => {
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
  };

  useEffect(() => {
    const fetchTopTracksOnWeek = async () => {
      setIsLoading(true);

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

      const aggregatedTracks = Object.values(aggregatedTracksMap)
        .sort((a, b) => b.total_duration - a.total_duration)
        .map((track, index) => ({
          ...track,
          rank: index + 1,
          total_duration: Math.floor(track.total_duration / 1000),
        }))
        .slice(0, 100);

      setTracks(aggregatedTracks);
      setHasMore(aggregatedTracks.length > pageSize);
      setIsLoading(false);
    };

    fetchTopTracksOnWeek();
  }, [date, pageSize]);

  const loadMore = () => {
    if (!hasMore) return;

    setCursor((prevCursor) => prevCursor + pageSize);
    setHasMore(cursor + pageSize < tracks.length);
  };

  return {
    tracks: tracks.slice(0, cursor + pageSize),
    isLoading,
    hasMore,
    loadMore,
  };
};

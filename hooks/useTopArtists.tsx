import { useState, useEffect } from "react";

import { Track, ArtistAggregate } from "@/types/music";
import { fetchTracks } from "@/services/fetchTracks";

export const useTopArtists = (pageSize = 10) => {
  const [artists, setArtists] = useState<ArtistAggregate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const run = async () => {
      const allTracks: Track[] = await fetchTracks();

      const aggregatedArtistsMap: Record<string, ArtistAggregate> =
        allTracks.reduce(
          (acc, track) => {
            if (!acc[track.artist_name]) {
              acc[track.artist_name] = {
                artist_name: track.artist_name,
                total_duration: 0,
                rank: 0,
              };
            }
            acc[track.artist_name].total_duration += track.duration;

            return acc;
          },
          {} as Record<string, ArtistAggregate>,
        );

      const aggregatedArtists = Object.values(aggregatedArtistsMap)
        .sort((a, b) => b.total_duration - a.total_duration)
        .map((artist, index) => ({
          ...artist,
          rank: index + 1,
          total_duration: Math.floor(artist.total_duration / 1000),
        }))
        .slice(0, 100);

      setArtists(aggregatedArtists);
      setHasMore(aggregatedArtists.length > pageSize);
      setIsLoading(false);
    };

    run();
  }, [pageSize]);

  const loadMore = () => {
    if (!hasMore) return;

    setCursor((prevCursor) => prevCursor + pageSize);
    setHasMore(cursor + pageSize < artists.length);
  };

  return {
    artists: artists.slice(0, cursor + pageSize),
    isLoading,
    hasMore,
    loadMore,
  };
};

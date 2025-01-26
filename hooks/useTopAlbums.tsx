import { useState, useEffect } from "react";

import { Track, AlbumAggregate } from "@/types/music";
import { fetchTracks } from "@/services/fetchTracks";

export const useTopAlbums = (pageSize = 10) => {
  const [albums, setAlbums] = useState<AlbumAggregate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const run = async () => {
      const allTracks: Track[] = await fetchTracks();

      const aggregatedAlbumsMap: Record<string, AlbumAggregate> =
        allTracks.reduce(
          (acc, track) => {
            const key = `${track.artist_name}-${track.album_name}`;

            if (!acc[key]) {
              acc[key] = {
                album_name: track.album_name,
                artist_name: track.artist_name,
                total_duration: 0,
                rank: 0,
              };
            }
            acc[key].total_duration += track.duration;

            return acc;
          },
          {} as Record<string, AlbumAggregate>,
        );

      const aggregatedAlbums = Object.values(aggregatedAlbumsMap)
        .sort((a, b) => b.total_duration - a.total_duration)
        .map((album, index) => ({
          ...album,
          rank: index + 1,
          total_duration: Math.floor(album.total_duration / 1000),
        }))
        .slice(0, 100);

      setAlbums(aggregatedAlbums);
      setHasMore(aggregatedAlbums.length > pageSize);
      setIsLoading(false);
    };

    run();
  }, [pageSize]);

  const loadMore = () => {
    if (!hasMore) return;

    setCursor((prevCursor) => prevCursor + pageSize);
    setHasMore(cursor + pageSize < albums.length);
  };

  return {
    albums: albums.slice(0, cursor + pageSize),
    isLoading,
    hasMore,
    loadMore,
  };
};

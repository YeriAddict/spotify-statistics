import { useState, useEffect } from "react";

import { AlbumAggregate } from "@/types/music";
import { fetchAlbumAggregatesOnWeek } from "@/services/fetchAlbums";

export const useTopAlbumsOnWeek = (date: string, pageSize = 10) => {
  const [albums, setAlbums] = useState<AlbumAggregate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const run = async () => {
      const aggregatedAlbums = await fetchAlbumAggregatesOnWeek(date);

      setAlbums(aggregatedAlbums);
      setHasMore(aggregatedAlbums.length > pageSize);
      setIsLoading(false);
    };

    run();
  }, [date, pageSize]);

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

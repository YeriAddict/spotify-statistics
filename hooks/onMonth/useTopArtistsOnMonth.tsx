import { useState, useEffect } from "react";

import { ArtistAggregate } from "@/types/music";
import { fetchArtistAggregatesOnMonth } from "@/services/fetchArtists";

export const useTopArtistsOnMonth = (
  year: number,
  month: number,
  pageSize = 10,
) => {
  const [artists, setArtists] = useState<ArtistAggregate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const run = async () => {
      const aggregatedArtists = await fetchArtistAggregatesOnMonth(year, month);

      setArtists(aggregatedArtists);
      setHasMore(aggregatedArtists.length > pageSize);
      setIsLoading(false);
    };

    run();
  }, [year, month, pageSize]);

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

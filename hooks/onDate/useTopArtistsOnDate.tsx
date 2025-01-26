import { useState, useEffect } from "react";

import { ArtistAggregate } from "@/types/music";
import { fetchArtistAggregatesOnDate } from "@/services/fetchArtists";

export const useTopArtistsOnDate = (date: string, pageSize = 10) => {
  const [artists, setArtists] = useState<ArtistAggregate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const run = async () => {
      const aggregatedArtists = await fetchArtistAggregatesOnDate(date);

      setArtists(aggregatedArtists);
      setHasMore(aggregatedArtists.length > pageSize);
      setIsLoading(false);
    };

    run();
  }, [date, pageSize]);

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

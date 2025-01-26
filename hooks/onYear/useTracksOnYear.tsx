import { useEffect, useState } from "react";

import { fetchTracksOnYear } from "@/services/fetchTracks";

export const useTracksOnYear = (year: number) => {
  const [trackCount, setTrackCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const filteredTracks = await fetchTracksOnYear(year);

      setTrackCount(filteredTracks.length);
      setIsLoading(false);
    };

    run();
  }, [year]);

  return {
    trackCount,
    isLoading,
  };
};

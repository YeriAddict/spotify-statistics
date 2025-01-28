import { ArtistAggregate, Track } from "@/types/music";

export async function fetchArtistAggregatesOnDate(
  date: string,
): Promise<ArtistAggregate[]> {
  const response = await fetch(
    `./data/spotify_data.json?timestamp=${Date.now()}`,
  );
  const allTracks: Track[] = await response.json();

  const filteredTracks = allTracks.filter((track) => {
    const trackDate = new Date(track.timestamp).toISOString().split("T")[0];

    return trackDate === date;
  });
  const aggregatedArtistsMap: Record<string, ArtistAggregate> =
    filteredTracks.reduce(
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

  return Object.values(aggregatedArtistsMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((artist, index) => ({
      ...artist,
      rank: index + 1,
      total_duration: Math.floor(artist.total_duration / 1000),
    }));
}

export async function fetchArtistAggregatesOnWeek(
  date: string,
): Promise<ArtistAggregate[]> {
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

  const { weekStart, weekEnd } = getWeekStartAndEndDates(date);

  const response = await fetch(
    `./data/spotify_data.json?timestamp=${Date.now()}`,
  );
  const allTracks: Track[] = await response.json();

  const filteredTracks = allTracks.filter((track) => {
    const trackDate = new Date(track.timestamp);

    return trackDate >= weekStart && trackDate <= weekEnd;
  });

  const aggregatedArtistsMap: Record<string, ArtistAggregate> =
    filteredTracks.reduce(
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

  return Object.values(aggregatedArtistsMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((artist, index) => ({
      ...artist,
      rank: index + 1,
      total_duration: Math.floor(artist.total_duration / 1000),
    }));
}

export async function fetchArtistAggregatesOnMonth(
  year: number,
  month: number,
): Promise<ArtistAggregate[]> {
  const response = await fetch(
    `./data/spotify_data.json?timestamp=${Date.now()}`,
  );
  const allTracks: Track[] = await response.json();

  const filteredTracks = allTracks.filter((track) => {
    const trackDate = new Date(track.timestamp);

    return (
      trackDate.getUTCFullYear() === year &&
      trackDate.getUTCMonth() + 1 === month
    );
  });

  const aggregatedArtistsMap: Record<string, ArtistAggregate> =
    filteredTracks.reduce(
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

  return Object.values(aggregatedArtistsMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((artist, index) => ({
      ...artist,
      rank: index + 1,
      total_duration: Math.floor(artist.total_duration / 1000),
    }));
}

export async function fetchArtistAggregatesOnYear(
  year: number,
): Promise<ArtistAggregate[]> {
  const response = await fetch(
    `./data/spotify_data.json?timestamp=${Date.now()}`,
  );
  const allTracks: Track[] = await response.json();

  const filteredTracks = allTracks.filter((track) => {
    const trackDate = new Date(track.timestamp);

    return trackDate.getUTCFullYear() === year;
  });

  const aggregatedArtistsMap: Record<string, ArtistAggregate> =
    filteredTracks.reduce(
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

  return Object.values(aggregatedArtistsMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((artist, index) => ({
      ...artist,
      rank: index + 1,
      total_duration: Math.floor(artist.total_duration / 1000),
    }));
}

export async function fetchArtistAggregatesOnLifetime(): Promise<
  ArtistAggregate[]
> {
  const response = await fetch(
    `./data/spotify_data.json?timestamp=${Date.now()}`,
  );
  const allTracks: Track[] = await response.json();

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

  return Object.values(aggregatedArtistsMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((artist, index) => ({
      ...artist,
      rank: index + 1,
      total_duration: Math.floor(artist.total_duration / 1000),
    }));
}

import { AlbumAggregate, Track } from "@/types/music";

export async function fetchAlbumAggregatesOnDate(
  date: string,
): Promise<AlbumAggregate[]> {
  const response = await fetch("./data/spotify_data.json");
  const allTracks: Track[] = await response.json();

  const filteredTracks = allTracks.filter((track) => {
    const trackDate = new Date(track.timestamp).toISOString().split("T")[0];

    return trackDate === date;
  });

  const aggregatedAlbumsMap: Record<string, AlbumAggregate> =
    filteredTracks.reduce(
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

  return Object.values(aggregatedAlbumsMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((album, index) => ({
      ...album,
      rank: index + 1,
      total_duration: Math.floor(album.total_duration / 1000),
    }));
}

export async function fetchAlbumAggregatesOnWeek(
  date: string,
): Promise<AlbumAggregate[]> {
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

  const response = await fetch("./data/spotify_data.json");
  const allTracks: Track[] = await response.json();

  const filteredTracks = allTracks.filter((track) => {
    const trackDate = new Date(track.timestamp);

    return trackDate >= weekStart && trackDate <= weekEnd;
  });

  const aggregatedAlbumsMap: Record<string, AlbumAggregate> =
    filteredTracks.reduce(
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

  return Object.values(aggregatedAlbumsMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((album, index) => ({
      ...album,
      rank: index + 1,
      total_duration: Math.floor(album.total_duration / 1000),
    }));
}

export async function fetchAlbumAggregatesOnMonth(
  year: number,
  month: number,
): Promise<AlbumAggregate[]> {
  const response = await fetch("./data/spotify_data.json");
  const allTracks: Track[] = await response.json();

  const filteredTracks = allTracks.filter((track) => {
    const trackDate = new Date(track.timestamp);

    return (
      trackDate.getUTCFullYear() === year &&
      trackDate.getUTCMonth() + 1 === month
    );
  });

  const aggregatedAlbumsMap: Record<string, AlbumAggregate> =
    filteredTracks.reduce(
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

  return Object.values(aggregatedAlbumsMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((album, index) => ({
      ...album,
      rank: index + 1,
      total_duration: Math.floor(album.total_duration / 1000),
    }));
}

export async function fetchAlbumAggregatesOnYear(
  year: number,
): Promise<AlbumAggregate[]> {
  const response = await fetch("./data/spotify_data.json");
  const allTracks: Track[] = await response.json();

  const filteredTracks = allTracks.filter((track) => {
    const trackDate = new Date(track.timestamp);

    return trackDate.getUTCFullYear() === year;
  });

  const aggregatedAlbumsMap: Record<string, AlbumAggregate> =
    filteredTracks.reduce(
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

  return Object.values(aggregatedAlbumsMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((album, index) => ({
      ...album,
      rank: index + 1,
      total_duration: Math.floor(album.total_duration / 1000),
    }));
}

export async function fetchAlbumAggregatesOnLifetime(): Promise<
  AlbumAggregate[]
> {
  const response = await fetch("./data/spotify_data.json");
  const allTracks: Track[] = await response.json();

  const aggregatedAlbumsMap: Record<string, AlbumAggregate> = allTracks.reduce(
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

  return Object.values(aggregatedAlbumsMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((album, index) => ({
      ...album,
      rank: index + 1,
      total_duration: Math.floor(album.total_duration / 1000),
    }));
}

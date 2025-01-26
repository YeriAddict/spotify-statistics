import { Track, TrackAggregate } from "@/types/music";

export async function fetchTracks(): Promise<Track[]> {
  const response = await fetch("./data/spotify_data.json");

  return response.json();
}

export async function fetchTracksOnDate(date: string): Promise<Track[]> {
  const response = await fetch("./data/spotify_data.json");
  const allTracks: Track[] = await response.json();

  return allTracks.filter((track) => {
    const trackDate = new Date(track.timestamp).toISOString().split("T")[0];

    return trackDate === date;
  });
}

export async function fetchTrackAggregatesOnDate(
  date: string,
): Promise<TrackAggregate[]> {
  const tracks = await fetchTracksOnDate(date);

  const aggregatedTracksMap: Record<string, TrackAggregate> = tracks.reduce(
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

  return Object.values(aggregatedTracksMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((track, index) => ({
      ...track,
      rank: index + 1,
      total_duration: Math.floor(track.total_duration / 1000),
    }));
}

export async function fetchTracksOnWeek(date: string): Promise<Track[]> {
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

  const response = await fetch("./data/spotify_data.json");
  const allTracks: Track[] = await response.json();

  const { weekStart, weekEnd } = getWeekStartAndEndDates(date);

  return allTracks.filter((track) => {
    const trackDate = new Date(track.timestamp);

    return trackDate >= weekStart && trackDate <= weekEnd;
  });
}

export async function fetchTrackAggregatesOnWeek(
  date: string,
): Promise<TrackAggregate[]> {
  const tracks = await fetchTracksOnWeek(date);

  const aggregatedTracksMap: Record<string, TrackAggregate> = tracks.reduce(
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

  return Object.values(aggregatedTracksMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((track, index) => ({
      ...track,
      rank: index + 1,
      total_duration: Math.floor(track.total_duration / 1000),
    }));
}

export async function fetchTracksOnMonth(
  year: number,
  month: number,
): Promise<Track[]> {
  const response = await fetch("./data/spotify_data.json");
  const allTracks: Track[] = await response.json();

  return allTracks.filter((track) => {
    const trackDate = new Date(track.timestamp);

    return (
      trackDate.getUTCFullYear() === year &&
      trackDate.getUTCMonth() + 1 === month
    );
  });
}

export async function fetchTrackAggregatesOnMonth(
  year: number,
  month: number,
): Promise<TrackAggregate[]> {
  const tracks = await fetchTracksOnMonth(year, month);

  const aggregatedTracksMap: Record<string, TrackAggregate> = tracks.reduce(
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

  return Object.values(aggregatedTracksMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((track, index) => ({
      ...track,
      rank: index + 1,
      total_duration: Math.floor(track.total_duration / 1000),
    }));
}

export async function fetchTracksOnYear(year: number): Promise<Track[]> {
  const response = await fetch("./data/spotify_data.json");
  const allTracks: Track[] = await response.json();

  return allTracks.filter((track) => {
    const trackDate = new Date(track.timestamp);

    return trackDate.getUTCFullYear() === year;
  });
}

export async function fetchTrackAggregatesOnYear(
  year: number,
): Promise<TrackAggregate[]> {
  const tracks = await fetchTracksOnYear(year);

  const aggregatedTracksMap: Record<string, TrackAggregate> = tracks.reduce(
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

  return Object.values(aggregatedTracksMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((track, index) => ({
      ...track,
      rank: index + 1,
      total_duration: Math.floor(track.total_duration / 1000),
    }));
}

export async function fetchTrackAggregatesOnLifetime(): Promise<
  TrackAggregate[]
> {
  const allTracks: Track[] = await fetchTracks();

  const aggregatedTracksMap: Record<string, TrackAggregate> = allTracks.reduce(
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

  return Object.values(aggregatedTracksMap)
    .sort((a, b) => b.total_duration - a.total_duration)
    .map((track, index) => ({
      ...track,
      rank: index + 1,
      total_duration: Math.floor(track.total_duration / 1000),
    }));
}

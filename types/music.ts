export interface Track {
  timestamp: string;
  duration: number;
  track_name: string;
  artist_name: string;
  album_name: string;
  spotify_track_uri: string;
  skipped: boolean;
}

export interface TrackAggregate {
  track_name: string;
  artist_name: string;
  album_name: string;
  spotify_track_uri: string;
  total_duration: number;
  rank: number;
}

export interface AlbumAggregate {
  album_name: string;
  artist_name: string;
  total_duration: number;
  rank: number;
}

export interface ArtistAggregate {
  artist_name: string;
  total_duration: number;
  rank: number;
}

export interface SpotifyTrack {
  name: string;
  popularity: number;
  preview_url: string | null;
  artists: Array<{ name: string }>;
  album: { images: Array<{ url: string }> };
}

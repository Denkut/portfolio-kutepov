export interface RawAlbum {
  id: string;
  name: string;
  release_date: string;
  images: Array<{ url: string }>;
  total_tracks: number;
}
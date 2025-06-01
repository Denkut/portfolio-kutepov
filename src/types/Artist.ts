export interface Artist {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  followers: { total: number };
}

import axios from "axios";
import { AlbumInfo, Artist, DetailedAlbumResponse, RawAlbum, SpotifyTrack, TrackInfo } from "../types";

const API_BASE = "http://localhost:4000";

// 🔐 Получить access token
export const fetchSpotifyToken = async (): Promise<string | null> => {
  try {
    const { data } = await axios.get(`${API_BASE}/token`);
    return data.access_token;
  } catch {
    return null;
  }
};

// 🔍 Поиск артиста
export const searchArtist = async (
  token: string,
  name: string
): Promise<Artist> => {
  const res = await axios.get<{ artists: { items: Artist[] } }>(
    `https://api.spotify.com/v1/search`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: name, type: "artist", limit: 1 },
    }
  );
  return res.data.artists.items[0];
};

// 🎵 Получить топ-треки
export const getArtistTopTracks = async (
  token: string,
  artistId: string
): Promise<TrackInfo[]> => {
  const res = await axios.get<{ tracks: SpotifyTrack[] }>(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { country: "US" },
    }
  );

  return res.data.tracks.map((track) => ({
    name: track.name,
    popularity: track.popularity,
    preview: track.preview_url,
    image: track.album.images[0]?.url || "",
    artist: track.artists.map((a) => a.name).join(", "),
  }));
};

// 🔥 Получить альбомы по артисту, отсортированные по дате + popularity
export const getArtistAlbums = async (
  token: string,
  artistId: string
): Promise<AlbumInfo[]> => {
  const res = await axios.get<{ items: RawAlbum[] }>(
    `https://api.spotify.com/v1/artists/${artistId}/albums`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        include_groups: "album",
        market: "US",
        limit: 50,
      },
    }
  );

  // Уникальные по имени
  const uniqueAlbums: RawAlbum[] = res.data.items.filter(
    (a, i, self) => self.findIndex((b) => b.name === a.name) === i
  );

  // Получаем popularity каждого альбома
  const detailedResponses = await Promise.all(
    uniqueAlbums.map((alb) =>
      axios.get<DetailedAlbumResponse>(
        `https://api.spotify.com/v1/albums/${alb.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    )
  );

  // Объединяем
  const albumsWithPopularity: AlbumInfo[] = uniqueAlbums.map((alb, idx) => ({
    id: alb.id,
    name: alb.name,
    release_date: alb.release_date,
    image: alb.images[0]?.url || "",
    total_tracks: alb.total_tracks,
    popularity: detailedResponses[idx].data.popularity,
  }));

  // Сортируем по дате (от старых к новым)
  albumsWithPopularity.sort(
    (a, b) =>
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
  );

  return albumsWithPopularity;
};

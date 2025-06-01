import { useEffect, useState } from "react";
import {
  fetchSpotifyToken,
  searchArtist,
  getArtistAlbums,
} from "../api/spotify";
import { useLanguage } from "../context";
import { translations } from "../constants";
import { AlbumInfo, ArtistAlbumsProps } from "../types";

export const ArtistAlbums: React.FC<ArtistAlbumsProps> = ({ artistName }) => {
  const [albums, setAlbums] = useState<AlbumInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [artistImage, setArtistImage] = useState<string>("");
  const { language } = useLanguage();
  const t = translations[language].spotifySection;

  useEffect(() => {
    const loadAlbums = async () => {
      setLoading(true);
      const token = await fetchSpotifyToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const artistData = await searchArtist(token, artistName);
        setArtistImage(artistData.images[0]?.url || "");

        const alb = await getArtistAlbums(token, artistData.id);
        setAlbums(alb);
      } catch (error) {
        console.error("Ошибка при загрузке альбомов артиста:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, [artistName]);

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      {loading ? (
        <p className="text-center">Loading albums...</p>
      ) : (
        <>
          {artistImage && (
            <div className="flex justify-center mb-6">
              <img
                src={artistImage}
                alt={artistName}
                className="w-24 h-24 rounded-full object-cover shadow-lg"
              />
            </div>
          )}

          <h3 className="text-2xl font-bold text-primary text-center mb-6">
            {t.nameAlbum} “{artistName}”
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <div
                key={album.id}
                className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={album.image}
                  alt={album.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h4 className="text-lg font-semibold text-primary">
                    {album.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {t.cardReleased}:{" "}
                    {new Date(album.release_date).getFullYear()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t.cardTracks}: {album.total_tracks}
                  </p>
                  <p className="text-sm text-green-500">
                    {t.cardPopularity}: {album.popularity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

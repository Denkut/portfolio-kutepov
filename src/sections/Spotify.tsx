import { useState } from "react";
import { motion } from "framer-motion";
import { SpotifyPopularityChart, ArtistAlbums } from "../components";
import { useLanguage } from "../context";
import { translations } from "../constants";

export const Spotify = () => {
  const [artistName, setArtistName] = useState<string>("Eminem");
  const { language } = useLanguage();
  const t = translations[language].spotifySection;

  return (
    <section
      id="spotify"
      className="w-full px-4 py-20 bg-gradient-to-br from-white via-purple-50 to-purple-100 dark:from-black dark:via-zinc-900 dark:to-zinc-800"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title}
        </motion.h2>

        <SpotifyPopularityChart
          artistName={artistName}
          setArtistName={setArtistName}
        />

        <ArtistAlbums artistName={artistName} />
      </div>
    </section>
  );
};

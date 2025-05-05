import { useEffect, useRef, useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import clsx from "clsx";
import techno from "../../public/audio/techno.mp3"; // adjust path as needed
import { eventBus } from "../constants";

export const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(techno);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // автозапуск после первого клика
    const tryPlay = () => {
      if (audioRef.current && isPlaying)
        audioRef.current.play().catch(() => {});
    };
    document.addEventListener("click", tryPlay, { once: true });

    // слушаем события от плеера
    const onPlaylist = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (audioRef.current) {
        if (detail) audioRef.current.pause();
        else if (isPlaying) audioRef.current.play().catch(() => {});
      }
    };
    eventBus.addEventListener("playlist-play", onPlaylist as EventListener);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener("click", tryPlay);
      eventBus.removeEventListener(
        "playlist-play",
        onPlaylist as EventListener
      );
    };
  }, [isPlaying]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
    setIsPlaying((prev) => !prev);
  };

  return (
    <button
      onClick={toggleAudio}
      className={clsx(
        "fixed bottom-20 right-5 z-50 p-3 rounded-full shadow-xl text-primary text-2xl transition-all backdrop-blur-md",
        "bg-white/80 dark:bg-zinc-900/80 hover:scale-110",
        isPlaying && "ring-2 ring-primary ring-opacity-50"
      )}
      aria-label="Toggle Background Music"
    >
      <span className="relative z-10">
        {isPlaying ? <HiVolumeUp /> : <HiVolumeOff />}
      </span>
    </button>
  );
};

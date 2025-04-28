import { useEffect, useRef, useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import tehnology from "../../public/audio/tehnology.mp3";
import clsx from "clsx";

export const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(tehnology);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const tryPlay = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    };

    document.addEventListener("click", tryPlay, { once: true });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      document.removeEventListener("click", tryPlay);
    };
  }, [isPlaying]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <button
      onClick={toggleAudio}
      className={clsx(
        "fixed bottom-20 right-5 z-50 p-3 rounded-full shadow-xl text-primary text-2xl transition-all backdrop-blur-md",
        "bg-white/80 dark:bg-zinc-900/80 hover:scale-110",
        isPlaying && "ring- ring-primary ring-opacity-50"
      )}
      aria-label="Toggle Background Music"
    >
      <span className="relative z-10">
        {isPlaying ? <HiVolumeUp /> : <HiVolumeOff />}
      </span>
    </button>
  );
};

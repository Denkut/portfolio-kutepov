import { useRef, useState, useEffect } from "react";
import { tracks } from "../constants";
import { FaPlay, FaPause } from "react-icons/fa";

export const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = tracks[currentTrack];

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioData);
    };
  }, [currentTrack]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow-xl overflow-hidden p-4 space-y-4">
      <img
        src={track.cover}
        alt={track.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div>
        <h3 className="text-xl font-semibold">{track.title}</h3>
        <p className="text-sm text-muted-foreground">{track.artist}</p>
      </div>

      <div
        className="h-2 bg-gray-300 dark:bg-zinc-600 rounded cursor-pointer relative"
        onClick={handleProgressClick}
      >
        <div
          className="h-2 bg-primary rounded"
          style={{ width: `${(progress / duration) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() =>
            setCurrentTrack((prev) => (prev > 0 ? prev - 1 : tracks.length - 1))
          }
          className="text-primary hover:text-opacity-80 transition"
        >
          ⏮ Prev
        </button>
        <button
          onClick={togglePlay}
          className="p-3 bg-primary text-white rounded-full shadow hover:scale-105 transition"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          onClick={() => setCurrentTrack((prev) => (prev + 1) % tracks.length)}
          className="text-primary hover:text-opacity-80 transition"
        >
          Next ⏭
        </button>
      </div>

      <audio ref={audioRef} src={track.src} preload="metadata" />
    </div>
  );
};

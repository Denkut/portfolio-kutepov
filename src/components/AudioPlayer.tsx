import { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { tracks } from "../constants";

export const AudioPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const track = tracks[currentTrackIndex];

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

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audioRef.current.currentTime = newTime;
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
    audio.addEventListener("ended", nextTrack);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("ended", nextTrack);
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrackIndex, isPlaying]);

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6 text-center">
      <img
        src={track.cover}
        alt={track.title}
        className="w-full h-52 object-cover rounded-lg"
      />
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">{track.title}</h3>
        <p className="text-sm text-muted-foreground">{track.artist}</p>
      </div>

      <div
        className="h-2 bg-gray-300 dark:bg-zinc-600 rounded-full cursor-pointer relative"
        onClick={handleProgressClick}
      >
        <div
          className="h-2 bg-primary rounded-full"
          style={{ width: `${(progress / duration) * 100}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex justify-center items-center gap-6 mt-4">
        <button
          onClick={prevTrack}
          className="text-primary hover:text-primary/80 transition "
          aria-label="Previous Track"
        >
          <FaStepBackward size={24} />
        </button>

        <button
          onClick={togglePlay}
          className="bg-primary text-white dark:text-black p-4 rounded-full shadow hover:scale-105 transition"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>

        <button
          onClick={nextTrack}
          className="text-primary hover:text-primary/80 transition"
          aria-label="Next Track"
        >
          <FaStepForward size={24} />
        </button>
      </div>

      <audio ref={audioRef} preload="metadata" src={track.src} />
    </div>
  );
};

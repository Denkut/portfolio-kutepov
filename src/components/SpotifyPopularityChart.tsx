import { useEffect, useState, useCallback, KeyboardEvent } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  fetchSpotifyToken,
  searchArtist,
  getArtistTopTracks,
} from "../api/spotify";
import { useLanguage } from "../context";
import { translations } from "../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  artistName: string;
  setArtistName: (name: string) => void;
}

export const SpotifyPopularityChart: React.FC<Props> = ({
  artistName,
  setArtistName,
}) => {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>(artistName);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language].spotifySection;

  const loadChartData = useCallback(async () => {
    setError(null);
    setLabels([]);
    setData([]);
    setLoading(true);

    try {
      const trimmed = artistName.trim();
      if (!trimmed) {
        setError("Please enter an artist name.");
        return;
      }

      const token = await fetchSpotifyToken();
      if (!token) {
        setError("Unable to get Spotify token. Try again later.");
        return;
      }

      const info = await searchArtist(token, trimmed);
      if (!info || !info.id) {
        setError(`Artist “${trimmed}” not found.`);
        return;
      }

      const tracks = await getArtistTopTracks(token, info.id);
      if (!tracks || tracks.length === 0) {
        setError(`No top tracks found for “${trimmed}”.`);
        return;
      }

      const sorted = tracks.slice().sort((a, b) => b.popularity - a.popularity);

      setLabels(sorted.map((t) => t.name));
      setData(sorted.map((t) => t.popularity));
    } catch (e) {
      console.error("Error loading chart data:", e);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, [artistName]);

  useEffect(() => {
    loadChartData();
  }, [artistName, loadChartData]);

  const handleSearchClick = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Please enter an artist name.");
      return;
    }
    if (trimmed !== artistName) {
      setArtistName(trimmed);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Popularity",
        data,
        backgroundColor: labels.map(() => "rgba(168,85,247,0.7)"),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `${t.cta} — ${artistName}`,
      },
    } as const,
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg mb-10">
      <h3 className="text-xl font-semibold mb-4 text-primary text-center">
        {t.name}
      </h3>
      <div className="mt-4 flex justify-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
          className="px-3 py-2 border rounded-md bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition"
          placeholder="Artist name"
        />
        <button
          onClick={handleSearchClick}
          disabled={input.trim() === artistName.trim()}
          className={`
            px-4 py-2 rounded-md transition
            ${
              input.trim() === artistName.trim()
                ? "bg-primary/50 text-white cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
            }
          `}
        >
          {t.buttonSearch}
        </button>
      </div>

      {error && <p className="mt-3 text-center text-red-500">{error}</p>}

      <div className="mt-6">
        {loading ? (
          <p className="text-center">Loading…</p>
        ) : (
          !error &&
          labels.length > 0 && <Bar data={chartData} options={options} />
        )}
      </div>
    </div>
  );
};

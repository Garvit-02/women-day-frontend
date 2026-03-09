import { useEffect, useState } from "react";
import StoryCard from "../components/StoryCard.jsx";
import { api } from "../services/api.js";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/stories")
      .then((res) => setStories(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-white mb-1">Shared Stories</h1>
        <p className="text-sm text-slate-400">
          Read heartfelt stories celebrating incredible women from around the world.
        </p>
      </header>
      {loading ? (
        <p className="text-sm text-slate-300">Loading stories...</p>
      ) : stories.length === 0 ? (
        <p className="text-sm text-slate-400">No stories have been shared yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {stories.map((s) => (
            <StoryCard key={s._id} story={s} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Stories;


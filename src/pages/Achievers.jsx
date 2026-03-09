import { useEffect, useState } from "react";
import AchieverCard from "../components/AchieverCard.jsx";
import { api } from "../services/api.js";

const Achievers = () => {
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/achievers")
      .then((res) => setAchievers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-white mb-1">Women Achievers</h1>
        <p className="text-sm text-slate-400">
          Explore stories of women leading change in science, arts, activism, and beyond.
        </p>
      </header>
      {loading ? (
        <p className="text-sm text-slate-300">Loading achievers...</p>
      ) : achievers.length === 0 ? (
        <p className="text-sm text-slate-400">No achievers available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievers.map((a) => (
            <AchieverCard key={a._id} achiever={a} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Achievers;


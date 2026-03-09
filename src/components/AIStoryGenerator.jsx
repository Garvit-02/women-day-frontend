import { useState } from "react";
import { api } from "../services/api.js";

const AIStoryGenerator = () => {
  const [profession, setProfession] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");
    setStory("");

    if (!profession.trim()) {
      setError("Please enter a profession to inspire the story.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/ai/generate-story", { profession: profession.trim() });
      setStory(res.data?.story || "");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to generate a story right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-950 py-10 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 grid gap-6 md:grid-cols-[minmax(0,1.1fr),minmax(0,1.3fr)] items-start">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            AI Story Generator
          </p>
          <h2 className="text-xl font-semibold text-white">
            Generate an inspirational story about a woman in any profession.
          </h2>
          <p className="text-sm text-slate-400">
            Choose a profession—scientist, artist, engineer, teacher, activist—and let the AI
            craft a short, empowering story that you can share with your community.
          </p>
          <form onSubmit={handleGenerate} className="space-y-2 max-w-md">
            <label className="text-xs text-slate-300">Profession</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                className="flex-1 rounded-full bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="e.g. scientist, teacher, entrepreneur"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-full bg-primary text-sm font-semibold text-white hover:bg-rose-600 disabled:opacity-60"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            {!error && story && (
              <p className="text-[11px] text-slate-500">
                Stories may be AI-assisted. Feel free to edit and personalise them.
              </p>
            )}
          </form>
        </div>
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 min-h-[180px]">
          {loading ? (
            <p className="text-sm text-slate-300">We&apos;re crafting a story for you...</p>
          ) : story ? (
            <article className="space-y-2">
              <h3 className="text-sm font-semibold text-white">
                Story about a woman {profession ? `who is a ${profession}` : ""}:
              </h3>
              <p className="text-sm text-slate-200 whitespace-pre-line">{story}</p>
            </article>
          ) : (
            <p className="text-sm text-slate-400">
              Your generated story will appear here. Try &quot;scientist&quot;, &quot;community
              leader&quot;, or &quot;engineer&quot; to get started.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIStoryGenerator;


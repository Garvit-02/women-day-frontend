import Hero from "../components/Hero.jsx";
import QuoteSlider from "../components/QuoteSlider.jsx";
import AchieverCard from "../components/AchieverCard.jsx";
import StoryCard from "../components/StoryCard.jsx";
import AIStoryGenerator from "../components/AIStoryGenerator.jsx";
import AIToolsSection from "../components/AIToolsSection.jsx";
import { useEffect, useState } from "react";
import { api } from "../services/api.js";

const Home = () => {
  const [achievers, setAchievers] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    api
      .get("/achievers")
      .then((res) => setAchievers(res.data.slice(0, 3)))
      .catch(() => {});
    api
      .get("/stories")
      .then((res) => setStories(res.data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <>
      <Hero />
      <QuoteSlider />
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <section className="space-y-4">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Women achievers
              </p>
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                Trailblazers shaping our future.
              </h2>
              <p className="text-xs text-slate-400 max-w-xl">
                Explore women leading in science, arts, activism, entrepreneurship, and more.
              </p>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {achievers.map((a) => (
              <AchieverCard key={a._id} achiever={a} />
            ))}
            {achievers.length === 0 && (
              <p className="text-xs text-slate-400">Achievers will appear here soon.</p>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Community stories
              </p>
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                Real stories, powerful voices.
              </h2>
              <p className="text-xs text-slate-400 max-w-xl">
                Heartfelt stories honouring women who inspire change in families, workplaces, and
                communities.
              </p>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {stories.map((s) => (
              <StoryCard key={s._id} story={s} />
            ))}
            {stories.length === 0 && (
              <p className="text-xs text-slate-400">Stories will appear here soon.</p>
            )}
          </div>
        </section>

        <section id="ai-story-section">
          <AIStoryGenerator />
        </section>
      </main>
      <AIToolsSection />
    </>
  );
};

export default Home;


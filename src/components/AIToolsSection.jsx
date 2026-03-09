import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PiSparkleFill } from "react-icons/pi";
import { FaRobot } from "react-icons/fa6";

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const AIToolsSection = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "AI Story Generator",
      description:
        "Generate uplifting, personalised stories about inspiring women in any profession, ready to share with your community.",
      icon: PiSparkleFill,
      action: () => {
        const el = document.getElementById("ai-story-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          navigate("/");
        }
      },
      cta: "Generate a Story"
    },
    {
      title: "AI Women Mentor",
      description:
        "Ask career and confidence questions and receive thoughtful, AI-powered guidance tailored to women’s journeys.",
      icon: FaRobot,
      action: () => navigate("/ai-mentor"),
      cta: "Ask the Mentor"
    }
  ];

  return (
    <section className="bg-slate-950 border-y border-slate-800/80 py-10">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">AI tools</p>
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              AI-powered storytelling and mentoring for women.
            </h2>
            <p className="text-sm text-slate-400 max-w-xl">
              Use AI to craft stories, reflect on your journey, and get gentle, practical guidance
              as you grow in your career and life.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                variants={cardVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 flex flex-col justify-between hover:border-pink-500/60 hover:-translate-y-1 transition-transform"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl" />
                  <div className="absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
                </div>
                <div className="relative flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-400 text-slate-900 shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{card.title}</h3>
                </div>
                <p className="relative text-xs text-slate-300 mb-4">{card.description}</p>
                <div className="relative">
                  <button
                    type="button"
                    onClick={card.action}
                    className="inline-flex items-center justify-center rounded-full bg-slate-950/90 px-3 py-1.5 text-[11px] font-semibold text-slate-100 border border-slate-700 hover:border-pink-500/70 hover:bg-slate-900/90"
                  >
                    {card.cta}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AIToolsSection;


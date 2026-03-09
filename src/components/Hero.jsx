import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-500/30 via-purple-700/40 to-slate-950 py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-pink-500/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-500/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        <motion.div
          className="flex-1 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-slate-900/40 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-pink-100">
            8 March
            <span className="h-1 w-1 rounded-full bg-amber-300" />
            International Women&apos;s Day
          </p>
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Celebrate{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-amber-200 bg-clip-text text-transparent">
              every woman&apos;s journey
            </span>
            , story, and strength.
          </motion.h1>
          <motion.p
            className="text-sm md:text-base text-slate-200/90 max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            The Women&apos;s Day Campaign Platform is a living archive of courage, creativity, and
            community. Share stories, discover achievers, explore safety resources, and amplify
            women&apos;s voices worldwide.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3 pt-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              to="/submit-story"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-pink-500/40 hover:opacity-90"
            >
              Share Your Story
            </Link>
            <Link
              to="/achievers"
              className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-950/60 px-5 py-2.5 text-sm font-medium text-slate-100 hover:bg-slate-900/80"
            >
              Discover Women Achievers
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-[2.5rem] bg-slate-950/70 border border-pink-500/40 shadow-[0_0_80px_rgba(244,114,182,0.7)] backdrop-blur">
              <div className="absolute inset-3 rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 flex flex-col justify-between p-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                    Voices of change
                  </p>
                  <p className="text-xs text-slate-300">
                    “There is no limit to what we, as women, can accomplish.”
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">— Michelle Obama</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-300">
                  <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-2">
                    <p className="text-xs font-semibold text-pink-300">Stories</p>
                    <p>Share lived experiences that inspire others.</p>
                  </div>
                  <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-2">
                    <p className="text-xs font-semibold text-purple-300">Achievers</p>
                    <p>Spotlight women leading change in every field.</p>
                  </div>
                  <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-2">
                    <p className="text-xs font-semibold text-amber-300">Safety</p>
                    <p>Explore resources and safe spaces near you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


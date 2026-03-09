import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/80 via-fuchsia-700/70 to-slate-900 py-16">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#fff,_transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <p className="uppercase tracking-[0.25em] text-xs text-fuchsia-100 mb-3">
            International Women&apos;s Day
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Celebrate, Amplify, and Share the{" "}
            <span className="underline underline-offset-4 decoration-4 decoration-amber-300">
              power of women
            </span>
          </h1>
          <p className="text-fuchsia-100/90 text-sm md:text-base max-w-xl mb-6">
            Join our global campaign platform to highlight extraordinary women, share inspiring
            stories, and spark conversations that move our world forward.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/submit-story"
              className="px-5 py-3 rounded-full bg-amber-300 text-slate-900 font-semibold text-sm shadow-lg shadow-amber-400/30 hover:bg-amber-200 transition"
            >
              Share Your Story
            </Link>
            <Link
              to="/achievers"
              className="px-5 py-3 rounded-full border border-fuchsia-200/70 text-fuchsia-50 text-sm hover:bg-fuchsia-900/40 transition"
            >
              Discover Women Achievers
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-amber-300 via-pink-500 to-violet-700 shadow-[0_0_80px_rgba(248,113,113,0.8)] animate-pulse-slow">
            <div className="absolute inset-6 rounded-full bg-slate-950/80 border border-fuchsia-200/40 flex flex-col items-center justify-center text-center px-6">
              <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-200 mb-2">
                8 March
              </p>
              <p className="text-sm md:text-base font-semibold text-fuchsia-50 mb-2">
                &quot;There is no limit to what we, as women, can accomplish.&quot;
              </p>
              <p className="text-[11px] text-fuchsia-100/80">– Michelle Obama</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


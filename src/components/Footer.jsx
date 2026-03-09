const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-4 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} International Women&apos;s Day Campaign Platform</p>
        <p className="text-[11px]">
          Built with ❤️ to celebrate, honour, and uplift women everywhere.
        </p>
      </div>
    </footer>
  );
};

export default Footer;


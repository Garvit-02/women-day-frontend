const AchieverCard = ({ achiever }) => {
  return (
    <article className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 hover:border-primary/60 hover:-translate-y-1 transition">
      {achiever.image && (
        <div className="h-40 w-full rounded-xl overflow-hidden bg-slate-800">
          <img
            src={achiever.image}
            alt={achiever.name}
            className="h-full w-full object-cover hover:scale-105 transition"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="font-semibold text-base text-white">{achiever.name}</h3>
        <p className="text-xs uppercase tracking-wide text-primary/90">{achiever.field}</p>
        <p className="text-xs text-slate-300 line-clamp-3">{achiever.bio}</p>
      </div>
    </article>
  );
};

export default AchieverCard;


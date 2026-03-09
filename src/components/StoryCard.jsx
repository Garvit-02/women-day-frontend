const StoryCard = ({ story }) => {
  return (
    <article className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 hover:border-primary/60 hover:-translate-y-1 transition">
      {story.image && (
        <div className="h-40 w-full rounded-xl overflow-hidden bg-slate-800">
          <img
            src={story.image}
            alt={story.title}
            className="h-full w-full object-cover hover:scale-105 transition"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col gap-2">
        <header>
          <h3 className="font-semibold text-base text-white">{story.title}</h3>
          <p className="text-xs text-slate-400">
            By <span className="font-medium text-slate-200">{story.author}</span>
          </p>
        </header>
        <p className="text-xs text-slate-300 whitespace-pre-line line-clamp-4">
          {story.description}
        </p>
      </div>
      <footer className="text-[10px] text-slate-500">
        {story.createdAt && `Shared on ${new Date(story.createdAt).toLocaleDateString()}`}
      </footer>
    </article>
  );
};

export default StoryCard;


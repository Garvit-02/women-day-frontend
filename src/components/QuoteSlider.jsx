import { useEffect, useState } from "react";

const QUOTES = [
  {
    text: "There is no limit to what we, as women, can accomplish.",
    author: "Michelle Obama"
  },
  {
    text: "I raise up my voice—not so that I can shout, but so that those without a voice can be heard.",
    author: "Malala Yousafzai"
  },
  {
    text: "The most courageous act is still to think for yourself. Aloud.",
    author: "Coco Chanel"
  },
  {
    text: "I am not free while any woman is unfree, even when her shackles are very different from my own.",
    author: "Audre Lorde"
  }
];

const QuoteSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const quote = QUOTES[index];

  return (
    <section className="bg-slate-950 py-10 border-y border-slate-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-3">
          Voices of inspiration
        </p>
        <figure className="relative">
          <div className="absolute -top-3 -left-1 text-5xl text-primary/30">“</div>
          <blockquote className="text-lg md:text-xl text-slate-50 font-medium mb-3">
            {quote.text}
          </blockquote>
          <figcaption className="text-sm text-slate-300">— {quote.author}</figcaption>
        </figure>
        <div className="flex justify-center gap-2 mt-4">
          {QUOTES.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full ${
                i === index ? "bg-primary" : "bg-slate-700"
              } transition`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuoteSlider;


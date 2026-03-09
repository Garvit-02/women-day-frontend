import { useState } from "react";
import { api } from "../services/api.js";

const AIMentor = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async (e) => {
    e.preventDefault();
    setError("");
    setAnswer("");

    if (!question.trim()) {
      setError("Please enter a question you’d like guidance on.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/ai/mentor", { question: question.trim() });
      setAnswer(res.data?.answer || "");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to get a mentor response right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">AI Women Mentor</p>
        <h1 className="text-2xl font-semibold text-white">
          Ask a supportive AI mentor about your career journey.
        </h1>
        <p className="text-sm text-slate-400">
          Ask about starting in a new field, building confidence, handling bias, or navigating
          leadership. Responses are AI-generated and should be used as guidance, not professional
          advice.
        </p>
      </header>

      <form onSubmit={handleAsk} className="space-y-2">
        <label className="text-xs text-slate-300">Your question</label>
        <textarea
          className="w-full min-h-[100px] rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="For example: How can I transition into tech from a non-technical background?"
        />
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2.5 rounded-full bg-primary text-sm font-semibold text-white hover:bg-rose-600 disabled:opacity-60"
          >
            {loading ? "Thinking..." : "Ask Mentor"}
          </button>
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
        {!error && (
          <p className="text-[11px] text-slate-500">
            Avoid sharing names, contact details, or sensitive personal information. This tool does
            not replace professional, legal, or medical advice.
          </p>
        )}
      </form>

      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 min-h-[160px]">
        {loading ? (
          <p className="text-sm text-slate-300">Your mentor is preparing a response...</p>
        ) : answer ? (
          <article className="space-y-2">
            <h2 className="text-sm font-semibold text-white">Mentor&apos;s guidance</h2>
            <p className="text-sm text-slate-200 whitespace-pre-line">{answer}</p>
          </article>
        ) : (
          <p className="text-sm text-slate-400">
            The mentor&apos;s answer will appear here. You can ask about career growth, confidence,
            or navigating challenges in your field.
          </p>
        )}
      </div>
    </section>
  );
};

export default AIMentor;


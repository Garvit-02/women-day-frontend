import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthorizedApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const SubmitStory = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const api = useAuthorizedApi();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isAuthenticated) {
      setError("You need to be logged in to share a story.");
      return;
    }

    if (!title || !author || !description) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setLoading(true);
      await api.post("/stories", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setSuccess("Thank you! Your story has been submitted.");
      setTitle("");
      setAuthor("");
      setDescription("");
      setImageFile(null);
      setTimeout(() => navigate("/stories"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-white mb-1">Share Your Story</h1>
        <p className="text-sm text-slate-400">
          Tell us about a woman who inspires you. Stories can be short, personal, and heartfelt.
        </p>
      </header>
      {!isAuthenticated && (
        <p className="mb-4 text-xs text-amber-300">
          You are currently not logged in. Please log in or register to submit a story.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
        {error && <p className="text-xs text-red-400">{error}</p>}
        {success && <p className="text-xs text-emerald-400">{success}</p>}
        <div className="space-y-1">
          <label className="text-xs text-slate-300">Story Title *</label>
          <input
            type="text"
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Eg. My Mother, My First Role Model"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-300">Woman&apos;s Name *</label>
          <input
            type="text"
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Name of the woman you’re writing about"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-300">Story *</label>
          <textarea
            className="w-full min-h-[140px] rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share what makes her inspiring, and how she has impacted you or others..."
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-300">Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="text-xs text-slate-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-primary file:text-white hover:file:bg-rose-500"
          />
          <p className="text-[10px] text-slate-500">
            Upload a photo of the woman or a symbolic image (max 5MB recommended).
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 px-4 py-2.5 rounded-full bg-primary text-sm font-semibold text-white hover:bg-rose-600 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Story"}
        </button>
      </form>
    </section>
  );
};

export default SubmitStory;


import { useEffect, useState } from "react";
import { useAuthorizedApi } from "../../services/api.js";

const ManageStories = () => {
  const api = useAuthorizedApi();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStories = async () => {
    try {
      const res = await api.get("/admin/stories");
      setStories(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load stories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.patch(`/admin/story/${id}/approve`);
      setStories((prev) => prev.map((s) => (s._id === id ? { ...s, status: "approved" } : s)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to approve story.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      await api.delete(`/admin/story/${id}`);
      setStories((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete story.");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-white mb-1">Manage Stories</h1>
        <p className="text-sm text-slate-400">
          Approve or remove community stories before they appear publicly.
        </p>
      </header>
      {loading ? (
        <p className="text-sm text-slate-300">Loading stories...</p>
      ) : error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : stories.length === 0 ? (
        <p className="text-sm text-slate-400">No stories submitted yet.</p>
      ) : (
        <div className="space-y-3">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 justify-between"
            >
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  {story.status === "approved" ? "Approved" : "Pending"}
                </p>
                <h2 className="font-semibold text-white text-sm">{story.title}</h2>
                <p className="text-xs text-slate-400">
                  By <span className="text-slate-200">{story.author}</span>
                  {story.createdAt && ` • ${new Date(story.createdAt).toLocaleDateString()}`}
                </p>
                <p className="text-xs text-slate-300 line-clamp-3">{story.description}</p>
              </div>
              <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                {story.status !== "approved" && (
                  <button
                    onClick={() => handleApprove(story._id)}
                    className="px-3 py-1.5 rounded-full bg-emerald-500/90 text-xs font-medium text-white hover:bg-emerald-400"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(story._id)}
                  className="px-3 py-1.5 rounded-full bg-red-600/90 text-xs font-medium text-white hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageStories;


import { useEffect, useState } from "react";
import { useAuthorizedApi } from "../../services/api.js";
import AchieverCard from "../../components/AchieverCard.jsx";

const ManageAchievers = () => {
  const api = useAuthorizedApi();
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadAchievers = async () => {
    try {
      const res = await api.get("/achievers");
      setAchievers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load achievers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAchievers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !field || !bio) {
      setError("Please fill in name, field, and bio.");
      return;
    }
    try {
      setSubmitting(true);
      const res = await api.post("/admin/achiever", { name, field, bio, image });
      setAchievers((prev) => [res.data, ...prev]);
      setName("");
      setField("");
      setBio("");
      setImage("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add achiever.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this achiever?")) return;
    try {
      await api.delete(`/admin/achiever/${id}`);
      setAchievers((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete achiever.");
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white mb-1">Manage Achievers</h1>
        <p className="text-sm text-slate-400">
          Add or remove women achievers featured on the platform.
        </p>
      </header>

      <form
        onSubmit={handleCreate}
        className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 space-y-3"
      >
        {error && <p className="text-xs text-red-400">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-slate-300">Name</label>
            <input
              type="text"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Achiever's name"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-300">Field</label>
            <input
              type="text"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="Field (e.g. Science, Arts)"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-slate-300">Image URL (optional)</label>
            <input
              type="url"
              className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-300">Short Bio</label>
          <textarea
            className="w-full min-h-[80px] rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Brief description of achievements and impact."
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2.5 rounded-full bg-primary text-sm font-semibold text-white hover:bg-rose-600 disabled:opacity-60"
        >
          {submitting ? "Adding..." : "Add Achiever"}
        </button>
      </form>

      {loading ? (
        <p className="text-sm text-slate-300">Loading achievers...</p>
      ) : achievers.length === 0 ? (
        <p className="text-sm text-slate-400">No achievers yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievers.map((a) => (
            <div key={a._id} className="relative group">
              <AchieverCard achiever={a} />
              <button
                type="button"
                onClick={() => handleDelete(a._id)}
                className="absolute top-2 right-2 px-2 py-1 rounded-full bg-red-600/90 text-[10px] font-medium text-white opacity-90 group-hover:opacity-100"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageAchievers;


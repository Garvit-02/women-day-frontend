import { useEffect, useState } from "react";
import { useAuthorizedApi } from "../../services/api.js";

const ManageUsers = () => {
  const api = useAuthorizedApi();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [api]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-white mb-1">Manage Users</h1>
        <p className="text-sm text-slate-400">View all registered users and their roles.</p>
      </header>
      {loading ? (
        <p className="text-sm text-slate-300">Loading users...</p>
      ) : error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-sm text-slate-400">No users found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/70">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900/80 text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-slate-800">
                  <td className="px-4 py-3 text-slate-100">{u.name}</td>
                  <td className="px-4 py-3 text-slate-300">{u.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        u.role === "admin"
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                          : "bg-slate-800 text-slate-200 border border-slate-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ManageUsers;


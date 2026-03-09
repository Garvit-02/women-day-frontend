import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthorizedApi } from "../../services/api.js";

const AdminDashboard = () => {
  const api = useAuthorizedApi();
  const [stats, setStats] = useState({ users: 0, stories: 0, achievers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, storiesRes, achieversRes] = await Promise.all([
          api.get("/admin/users"),
          api.get("/admin/stories"),
          api.get("/achievers")
        ]);
        setStats({
          users: usersRes.data.length,
          stories: storiesRes.data.length,
          achievers: achieversRes.data.length
        });
      } catch {
        // ignore in dashboard summary
      }
    };

    fetchStats();
  }, [api]);

  const cards = [
    {
      title: "Users",
      value: stats.users,
      to: "/admin/users",
      description: "View and manage registered users."
    },
    {
      title: "Stories",
      value: stats.stories,
      to: "/admin/stories",
      description: "Approve or remove community stories."
    },
    {
      title: "Achievers",
      value: stats.achievers,
      to: "/admin/achievers",
      description: "Curate and manage women achievers."
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-1">Admin</p>
        <h1 className="text-2xl font-semibold text-white mb-1">Admin Dashboard</h1>
        <p className="text-sm text-slate-400">
          Moderate stories, manage achievers, and oversee the Women&apos;s Day community.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.to}
            className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 hover:border-primary/60 hover:-translate-y-1 transition flex flex-col gap-2"
          >
            <p className="text-xs text-slate-400">{card.title}</p>
            <p className="text-2xl font-semibold text-white">{card.value}</p>
            <p className="text-xs text-slate-400">{card.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AdminDashboard;


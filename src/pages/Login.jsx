import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      const { token, ...userData } = res.data;
      login(userData, token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-sm mx-auto px-4 py-10">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-white mb-1">Welcome back</h1>
        <p className="text-sm text-slate-400">
          Log in to share stories and join the Women&apos;s Day campaign.
        </p>
      </header>
      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
        {error && <p className="text-xs text-red-400">{error}</p>}
        <div className="space-y-1">
          <label className="text-xs text-slate-300">Email</label>
          <input
            type="email"
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-slate-300">Password</label>
          <input
            type="password"
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 px-4 py-2.5 rounded-full bg-primary text-sm font-semibold text-white hover:bg-rose-600 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-[11px] text-slate-400 text-center">
          New here?{" "}
          <Link to="/register" className="text-amber-300 hover:text-amber-200">
            Create an account
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;


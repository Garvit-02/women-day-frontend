import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  { to: "/", label: "Home", exact: true },
  { to: "/achievers", label: "Achievers" },
  { to: "/stories", label: "Stories" },
  { to: "/submit-story", label: "Share Story" },
  { to: "/safety-map", label: "Safety Map" },
  { to: "/ai-mentor", label: "AI Mentor" }
];

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-full text-sm font-medium transition ${
      isActive
        ? "bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-white shadow-sm"
        : "text-slate-200 hover:bg-slate-800/70"
    }`;

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur-xl">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" onClick={handleNavClick}>
          <div className="relative h-9 w-9 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-400 flex items-center justify-center text-white font-bold shadow-lg shadow-pink-500/40">
            ♀
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white leading-tight">
              Women&apos;s Day
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
              Campaign Platform
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={navLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
          {isAuthenticated && user?.role === "admin" && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
        </div>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-xs text-slate-300">
                Hi, <span className="font-semibold text-amber-300">{user?.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800"
              >
                <FiLogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800"
              >
                <FiUser className="h-3.5 w-3.5" />
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-md hover:opacity-90"
              >
                Join
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 p-2 text-slate-100"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden border-t border-slate-800/70 bg-slate-950/95 backdrop-blur-xl"
          >
            <div className="max-w-6xl mx-auto px-4 py-3 space-y-3">
              <div className="flex flex-wrap gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.exact}
                    className={navLinkClass}
                    onClick={handleNavClick}
                  >
                    {item.label}
                  </NavLink>
                ))}
                {isAuthenticated && user?.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className={navLinkClass}
                    onClick={handleNavClick}
                  >
                    Admin
                  </NavLink>
                )}
              </div>
              <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-800/70 mt-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-300">Logged in as</span>
                      <span className="text-sm font-semibold text-amber-300">
                        {user?.name}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800"
                    >
                      <FiLogOut className="h-3.5 w-3.5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800"
                      onClick={handleNavClick}
                    >
                      <FiUser className="h-3.5 w-3.5" />
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-md hover:opacity-90"
                      onClick={handleNavClick}
                    >
                      Join
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;


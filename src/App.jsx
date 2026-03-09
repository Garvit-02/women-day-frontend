import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Achievers from "./pages/Achievers.jsx";
import Stories from "./pages/Stories.jsx";
import SubmitStory from "./pages/SubmitStory.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AIMentorPage from "./pages/AIMentor.jsx";
import SafetyMap from "./pages/SafetyMap.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ManageStories from "./pages/admin/ManageStories.jsx";
import ManageAchievers from "./pages/admin/ManageAchievers.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/achievers" element={<Achievers />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/submit-story" element={<SubmitStory />} />
          <Route path="/ai-mentor" element={<AIMentorPage />} />
          <Route path="/safety-map" element={<SafetyMap />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/stories"
            element={
              <AdminRoute>
                <ManageStories />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/achievers"
            element={
              <AdminRoute>
                <ManageAchievers />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;


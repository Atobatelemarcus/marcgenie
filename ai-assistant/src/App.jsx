import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/Dashboard/Home";
import AItools from "./pages/Dashboard/AItools";
import PostDetails from "./pages/Dashboard/PostDetails";
import Settings from "./pages/Dashboard/Settings";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ContentPlanner from "./pages/Dashboard/ContentPlanner";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
        </Route>

        {/* Protected Dashboard */}
        <Route
          path="/Dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="AItools" element={<AItools />} />
          <Route path="ContentPlanner" element={<ContentPlanner />} />

          <Route path="post/:id" element={<PostDetails />} /> {/* fixed relative path */}
          <Route path="Settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

import { Navigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = UseAuth();

  if (loading) return <p>Loading...</p>;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}

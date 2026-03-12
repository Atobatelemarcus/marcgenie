import { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

export default function ResetPassword() {
  const { resetPassword } = UseAuth();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    try {
      setLoading(true);

      await resetPassword(email);

      setMessage(
        "Password reset link sent! Check your email (and spam folder)."
      );
    } catch (err) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen flex flex-col items-center justify-center
      bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500
      text-white px-4
    "
    >
      <h1 className="text-4xl font-extrabold mb-6 text-center drop-shadow-lg">
        Reset Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          bg-white text-gray-900 p-8 rounded-xl shadow-xl
          w-full max-w-md flex flex-col gap-4
        "
      >
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 text-green-700 p-2 rounded text-sm">
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            p-3 rounded border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-purple-500
          "
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="
            p-3 bg-purple-700 text-white font-bold
            rounded-lg shadow hover:bg-purple-600
            transition disabled:opacity-60
          "
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <div className="text-sm text-gray-500 text-center">
          Remembered your password?{" "}
          <Link to="/login" className="hover:underline text-purple-700">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

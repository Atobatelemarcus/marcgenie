import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

export default function Login() {
  const { loginUser } = UseAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await loginUser(email, password);

      // go to dashboard after login
      navigate("/dashboard");

    } catch (err) {
      setError("errInvalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      min-h-screen flex flex-col items-center justify-center
      bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500
      text-white px-4
    ">

      <h1 className="text-4xl font-extrabold mb-6 text-center drop-shadow-lg">
        Welcome Back
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

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            p-3 rounded border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-purple-500
          "
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex justify-between text-sm text-gray-500">
          <Link
            to="/register"
            className="hover:underline text-purple-700"
          >
            Register
          </Link>

          <Link
            to="/resetpassword"
            className="hover:underline text-purple-700"
          >
            Forgot Password?
          </Link>
        </div>

      </form>
    </div>
  );
}

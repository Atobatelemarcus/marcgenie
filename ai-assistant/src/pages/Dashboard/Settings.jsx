import { useState, useEffect } from "react";
import { UseAuth } from "../../context/AuthContext";

export default function Settings() {

  const { currentUser, updateUserProfile } = UseAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateUserProfile(name, email, password);

      alert("Profile updated successfully");
      setPassword("");

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white shadow rounded p-6 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Leave blank if not changing"
              className="mt-1 block w-full border rounded px-3 py-2"
            />
          </div>

          <button
            disabled={saving}
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  );
}
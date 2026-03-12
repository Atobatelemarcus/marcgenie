import { useState } from "react";
import { generateContent } from "../services/aiService";
import { UseAuth } from "../context/AuthContext";
import AiResultModal from "./AiResultModal";
import Snackbar from "./Snackbar";
import { createPost } from "../services/postService"; // <-- import your service

export default function CreatePostForm({ onCreate }) {
  const { currentUser } = UseAuth();
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [aiResult, setAiResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState("");

  const notify = (msg) => {
    setSnack(msg);
    setTimeout(() => setSnack(""), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return notify("Login first!");
    setLoading(true);

    try {
      const res = await generateContent({
        prompt: title,
        platform,
        token: await currentUser.getIdToken(),
      });

      setAiResult(res); 
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      notify("AI failed to generate");
    } finally {
      setLoading(false);
    }
  };

  // New function to save AI post to Firebase
  const handleSave = async (content) => {
    if (!currentUser) return notify("Login first!");
    try {
      const post = await createPost({ title: content }, currentUser); // save via your postService
      notify("Post saved!");
      setModalOpen(false);
      setTitle("");
      onCreate?.(post); // update dashboard with new post
    } catch (err) {
      console.error(err);
      notify("Failed to save post");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-6 flex flex-col gap-4 w-full max-w-md mx-auto"
      >
        <h2 className="text-xl font-bold text-purple-600">Create AI Post</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post idea..."
          className="border p-2 rounded"
          required
        />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="border p-2 rounded"
        >
          <option>LinkedIn</option>
          <option>X</option>
          <option>Medium</option>
        </select>

        <button
          disabled={loading}
          className="bg-purple-600 text-white p-2 rounded"
        >
          {loading ? "Thinking..." : "Generate with AI"}
        </button>
      </form>

     <AiResultModal
  open={modalOpen}
  content={aiResult}
  platform={platform}   // 👈 add this
  onClose={() => setModalOpen(false)}
  onSave={handleSave}
/>

      <Snackbar message={snack} />
    </>
  );
}

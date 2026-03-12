import { useState } from "react";
import { createPlannedPost } from "../../services/plannerService";

export default function DraftForm({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: "",
    platform: "LinkedIn",
    content: "",
    plannedDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      alert("Title and draft content are required.");
      return;
    }

    try {
      const saved = await createPlannedPost({
        ...form,
        status: "draft",
      });
      onCreate(saved);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save draft: " + err.message);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 space-y-4">
      <h2 className="text-lg font-semibold">New Draft</h2>

      <input
        placeholder="Title"
        className="border rounded px-3 py-2 w-full"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <select
        className="border rounded px-3 py-2 w-full"
        value={form.platform}
        onChange={(e) => setForm({ ...form, platform: e.target.value })}
      >
        <option>LinkedIn</option>
        <option>X</option>
        <option>Medium</option>
      </select>

      <textarea
        placeholder="Draft content / prompt"
        className="border rounded px-3 py-2 w-full resize-none h-32"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      <input
        type="date"
        className="border rounded px-3 py-2 w-full"
        value={form.plannedDate}
        onChange={(e) => setForm({ ...form, plannedDate: e.target.value })}
      />

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Save Draft
        </button>
      </div>
    </div>
  );
}

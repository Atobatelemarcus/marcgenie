import { useEffect, useState } from "react";
import DraftForm from "./DraftForm";
import { getPlannedPosts, updatePostPlan } from "../../services/plannerService";
import { generateContent } from "../../services/aiService";

export default function PlannerTable() {
  const [drafts, setDrafts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch drafts from Firebase
  const fetchDrafts = async () => {
    const posts = await getPlannedPosts();
    setDrafts(posts);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDrafts();
  }, []);

  // Add new draft to state
  const handleCreate = (newDraft) => {
    setDrafts((prev) => [newDraft, ...prev]);
  };

  // Delete draft
  const handleDelete = async (id) => {
    if (!confirm("Delete this draft?")) return;
    await updatePostPlan(id, { deleted: true });
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  // Send draft to AI
  const handleSendToAI = async (draft) => {
    try {
      await updatePostPlan(draft.id, { status: "processing" });
      setDrafts((prev) =>
        prev.map((d) => (d.id === draft.id ? { ...d, status: "processing" } : d))
      );

      const aiResult = await generateContent({
        prompt: draft.content,
        platform: draft.platform,
      });

      await updatePostPlan(draft.id, {
        aiContent: aiResult.content,
        status: "ai-generated",
      });

      setDrafts((prev) =>
        prev.map((d) =>
          d.id === draft.id ? { ...d, status: "ai-generated", aiContent: aiResult.content } : d
        )
      );

      alert("AI content generated!");
    } catch (err) {
      console.error(err);
      alert("Failed to generate AI content: " + err.message);
      await updatePostPlan(draft.id, { status: "draft" });
      setDrafts((prev) =>
        prev.map((d) => (d.id === draft.id ? { ...d, status: "draft" } : d))
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Draft Content Planner</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 text-white p-2  text-sm rounded shadow hover:bg-purple-700 transition"
        >
          + New Draft
        </button>
      </div>

      {showForm && (
        <DraftForm
          onClose={() => setShowForm(false)}
          onCreate={handleCreate}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition relative"
          >
            <h2 className="font-semibold text-sm truncate">{draft.title}</h2>
            <p className="text-gray-500 text-sm">
              {draft.platform} | {draft.plannedDate}
            </p>
            <p className="mt-2 text-gray-700 line-clamp-3">
              {draft.status === "ai-generated" ? draft.aiContent : draft.content}
            </p>

            <div className="flex justify-end gap-2 mt-4">
              {draft.status === "draft" && (
                <button
                  onClick={() => handleSendToAI(draft)}
                  className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                  Send to AI
                </button>
              )}
              {draft.status === "processing" && (
                <span className="text-sm bg-yellow-400 text-white px-3 py-1 rounded">
                  Processing...
                </span>
              )}
              <button
                onClick={() => handleDelete(draft.id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>

            {draft.status === "ai-generated" && (
              <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                AI Generated
              </span>
            )}
          </div>
        ))}

        {drafts.length === 0 && (
          <p className="text-gray-400 col-span-full text-center mt-10">
            No drafts yet. Click "New Draft" to create one!
          </p>
        )}
      </div>
    </div>
  );
}

export default function PlannerAnalytics({ posts }) {
  const totalDrafts = posts.length;
  const aiGenerated = posts.filter((p) => p.status === "ai-generated").length;
  const readyForAI = posts.filter((p) => p.status === "draft").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
      <div className="bg-purple-600 text-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{totalDrafts}</span>
        <span className="text-sm">Total Drafts</span>
      </div>

      <div className="bg-green-600 text-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{aiGenerated}</span>
        <span className="text-sm">AI Generated</span>
      </div>

      <div className="bg-yellow-500 text-white rounded-xl shadow p-4 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{readyForAI}</span>
        <span className="text-sm">Ready for AI</span>
      </div>
    </div>
  );
}

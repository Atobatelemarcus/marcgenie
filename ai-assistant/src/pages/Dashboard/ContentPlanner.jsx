import { useEffect, useState } from "react";
import { CalendarCheck, PlusCircle, X } from "lucide-react";

import { getPlannedPosts } from "../../services/plannerService";
import PlannerTable from "../../components/planner/PlannerTable";
import PlannerAnalytics from "../../components/planner/PlannerAnalytics";
import PlannerForm from "../../components/planner/PlannerForm";

export default function ContentPlanner() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getPlannedPosts().then(setPosts);
  }, []);

  const handleAddPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarCheck className="text-purple-600" />
          <h1 className="text-sm font-bold text-white">Content Planner</h1>
        </div>

        {/* TOGGLE FORM BUTTON */}
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 bg-purple-600 text-sm text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          {showForm ? <X size={18} /> : <PlusCircle size={18} />}
          {showForm ? "Close" : "Plan Content"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white rounded-xl shadow p-4 text-sm">
          <PlannerForm onCreate={handleAddPost} />
        </div>
      )}

      {/* ANALYTICS */}
      <PlannerAnalytics posts={posts} />

      {/* TABLE */}
      <PlannerTable />
    </div>
  );
}

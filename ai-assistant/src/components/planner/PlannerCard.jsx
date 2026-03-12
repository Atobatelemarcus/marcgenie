import { Calendar, Linkedin, Twitter, BookOpen } from "lucide-react";

const icons = {
  LinkedIn: <Linkedin size={18} />,
  X: <Twitter size={18} />,
  Medium: <BookOpen size={18} />,
};

export default function PlannerCard({ post }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 space-y-2 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold truncate">{post.title}</h3>
        {icons[post.platform]}
      </div>

      <p className="text-sm text-gray-500 flex items-center gap-1">
        <Calendar size={14} /> {post.plannedDate}
      </p>

      <span className="inline-block text-xs px-2 py-1 rounded bg-purple-100 text-purple-700">
        {post.status}
      </span>
    </div>
  );
}

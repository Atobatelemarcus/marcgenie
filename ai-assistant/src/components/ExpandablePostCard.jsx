import { useState } from "react";
import { ChevronDown, ChevronUp, Save, X } from "lucide-react";

export default function ExpandablePostCard({ post = {}, onUpdate = () => {} }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(post?.title || ""); // init from props

  const handleSave = () => {
    onUpdate(post.id, text);
    setEditing(false);
  };

  if (!post) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">

      {/* Header */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-semibold text-gray-800 line-clamp-1">
          {post.title || "Untitled"}
        </h3>

        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      {/* Expandable Content */}
      <div
        className={`transition-all duration-300 ease-in-out
          ${open ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}
          overflow-hidden`}
      >
        <div className="px-4 pb-4 space-y-3 max-h-87.5 overflow-auto">

          {!editing ? (
            <>
              <p className="text-gray-700 whitespace-pre-wrap">
                {post.title || "No content"}
              </p>

              <button
                onClick={() => setEditing(true)}
                className="text-purple-600 text-sm font-medium hover:underline"
              >
                Edit
              </button>
            </>
          ) : (
            <>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-purple-400 resize-none"
              />

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  <Save className="w-4 h-4" /> Save
                </button>

                <button
                  onClick={() => {
                    setEditing(false);
                    setText(post?.title || "");
                  }}
                  className="flex items-center gap-1 border px-4 py-2 rounded-lg"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
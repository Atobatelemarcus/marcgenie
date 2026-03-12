import { useEffect, useState } from "react";
import { X, CheckCircle } from "lucide-react";

export default function AiResultModal({ open, content, platform = "LinkedIn", onClose, onSave }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(content || "");
  }, [content]);

  if (!open) return null;

  const limits = {
    LinkedIn: 10000,
    X: 280,
    Medium: 10000,
  };

  const limit = limits[platform] ?? 3000;
  const count = text.length;
  const isOver = count > limit;
  const isNear = count > limit * 0.9 && !isOver;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 flex flex-col gap-4 animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-purple-600">
            AI Generated Post
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Text Area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className={`w-full border rounded-xl p-4 resize-none focus:outline-none focus:ring-2
            ${isOver ? "border-red-400 focus:ring-red-400" : "focus:ring-purple-400"}
          `}
        />

        {/* Character Counter */}
        <div className="flex justify-between items-center text-sm">
          <span
            className={`font-medium
              ${isOver ? "text-red-600" : isNear ? "text-yellow-600" : "text-gray-500"}
            `}
          >
            {count} / {limit} characters
          </span>

          {isOver && (
            <span className="text-red-600 font-medium">
              Too long for {platform}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            disabled={isOver}
            onClick={() => onSave(text)}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition
              ${isOver
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"}
            `}
          >
            <CheckCircle className="w-4 h-4" />
            Save Post
          </button>
        </div>
      </div>
    </div>
  );
}

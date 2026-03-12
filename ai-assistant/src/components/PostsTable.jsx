import { useState } from "react";
import { Clipboard, Edit, Check, X } from "lucide-react";

export default function PostsTable({ posts = [] }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  const truncate = (text, length = 10) =>
    text?.length > length ? text.slice(0, length) + "..." : text || "";

  const handleEditClick = (post) => {
    setEditingRow(post.id);
    setEditedData({
      title: post.title || "",
      platform: post.platform || "",
      content: post.content || "",
      createdAt: post.createdAt || ""
    });
  };

  const handleSaveClick = () => {
    // API or Firebase update can go here
    setEditingRow(null);
    setEditedData({});
  };

  const handleCancelClick = () => {
    setEditingRow(null);
    setEditedData({});
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "-");
  const formatInputDate = (date) => (date ? new Date(date).toISOString().slice(0, 10) : "");

  if (!posts.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 text-gray-500 text-center">
        No posts yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-purple-50 p-6 rounded-xl shadow-xl">
      <table className="min-w-[800px] w-full table-auto border-collapse">
        <thead>
          <tr className="bg-purple-500 text-white uppercase text-sm tracking-wide">
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Platform</th>
            <th className="px-4 py-3 text-left">Content</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post, idx) => {
            const isEditing = editingRow === post.id;
            const isExpanded = expandedRow === post.id;

            return (
              <tr
                key={post.id || idx}
                className="border-b hover:bg-purple-50 transition-all duration-200"
              >
                <td className="px-4 py-2 font-semibold">{idx + 1}</td>

                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      className="border-b border-purple-300 focus:outline-none focus:border-purple-500 w-full bg-transparent"
                      value={editedData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                    />
                  ) : (
                    <span>{isExpanded ? post.title : truncate(post.title)}</span>
                  )}
                </td>

                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      className="border-b border-purple-300 focus:outline-none focus:border-purple-500 w-full bg-transparent"
                      value={editedData.platform}
                      onChange={(e) => handleChange("platform", e.target.value)}
                    />
                  ) : (
                    <span>{isExpanded ? post.platform : truncate(post.platform)}</span>
                  )}
                </td>

                <td className="px-4 py-2 text-gray-700">
                  {isEditing ? (
                    <textarea
                      className="border border-purple-300 rounded px-2 py-1 w-full focus:outline-none focus:border-purple-500"
                      value={editedData.content}
                      onChange={(e) => handleChange("content", e.target.value)}
                    />
                  ) : (
                    <>
                      <span>{isExpanded ? post.content : truncate(post.content)}</span>
                      {post.content?.length > 10 && (
                        <button
                          onClick={() => setExpandedRow(isExpanded ? null : post.id)}
                          className="ml-2 text-purple-600 hover:underline text-sm"
                        >
                          {isExpanded ? "Collapse" : "Read more"}
                        </button>
                      )}
                    </>
                  )}
                </td>

                <td className="px-4 py-2">
                  {isEditing ? (
                    <input
                      type="date"
                      className="border-b border-purple-300 focus:outline-none focus:border-purple-500"
                      value={formatInputDate(editedData.createdAt)}
                      onChange={(e) => handleChange("createdAt", e.target.value)}
                    />
                  ) : (
                    <span>{formatDate(post.createdAt)}</span>
                  )}
                </td>

                <td className="px-4 py-2 flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveClick}
                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        <Check className="w-4 h-4" /> Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          if (post.content) {
                            navigator.clipboard.writeText(post.content);
                            alert("Content copied to clipboard!");
                          }
                        }}
                        className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                      >
                        <Clipboard className="w-4 h-4" /> Copy
                      </button>
                      <button
                        onClick={() => handleEditClick(post)}
                        className="flex items-center gap-1 px-3 py-1 border border-purple-300 text-purple-600 rounded hover:bg-purple-50 transition"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
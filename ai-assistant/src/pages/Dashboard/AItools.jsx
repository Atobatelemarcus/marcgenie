import { useState, useEffect } from "react";
import { PlusCircle, Clipboard, Trash2, Linkedin, Twitter, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CreatePostForm from "../../components/CreatePostForm";
import PostsAnalytics from "../../components/PostAnalytics";
import Snackbar from "../../components/Snackbar";

import { generateContent } from "../../services/aiService";
import { UseAuth } from "../../context/AuthContext";
import { createPost, getUserPosts, deletePost } from "../../services/postService";

export default function AItools() {
  const { currentUser } = UseAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [snack, setSnack] = useState("");

  const notify = (msg) => {
    setSnack(msg);
    setTimeout(() => setSnack(""), 3000);
  };

  const platformIcons = {
    LinkedIn: <Linkedin className="w-5 h-5" />,
    Medium: <BookOpen className="w-5 h-5" />,
    X: <Twitter className="w-5 h-5" />,
  };

  // Fetch posts
  useEffect(() => {
    if (!currentUser) return;
    const fetchPosts = async () => {
      try {
        const data = await getUserPosts();
        setPosts(data.reverse());
      } catch (err) {
        console.error(err);
        notify("Failed to fetch posts");
      }
    };
    fetchPosts();
  }, [currentUser]);

  // Create post
  const handleCreatePost = async (newPost) => {
    if (!currentUser) return notify("Login first!");
    setGenerating(true);

    try {
      const content =
        newPost.content ||
        (await generateContent({
          prompt: newPost.title,
          platform: newPost.platform,
          token: await currentUser.getIdToken(),
        }));

      const saved = await createPost({
        title: newPost.title,
        platform: newPost.platform,
        content,
      });

      setPosts((prev) => [saved, ...prev]);
      notify("Post created!");
    } catch (err) {
      console.error(err);
      notify("Failed to generate or save post");
    } finally {
      setGenerating(false);
      setShowForm(false);
    }
  };

  // Delete post
  const handleDelete = async (postId) => {
    if (!confirm("Delete this post?")) return;
    try {
      await deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      notify("Post deleted");
    } catch (err) {
      console.error(err);
      notify("Delete failed");
    }
  };

//
const handleCopy = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // fallback (works everywhere)
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    notify("Copied ✅");
  } catch (err) {
    console.error("Copy failed:", err);
    notify("Copy failed ❌");
  }
};






















  // Truncate title to 12 characters
  const truncateTitle = (text) => {
    if (!text) return "";
    return text.length > 12 ? text.slice(0, 12) + "..." : text;
  };

  if (!currentUser) {
    return <div className="p-6 text-center text-red-600 font-medium">Please login to manage AI posts.</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-4">

      {/* CREATE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          <PlusCircle className="w-5 h-5" />
          {showForm ? "Close" : "Create Post"}
        </button>
      </div>

      {showForm && <CreatePostForm onCreate={handleCreatePost} />}
      {generating && <p className="text-purple-600">AI generating…</p>}


      {/* POSTS ANALYTICS */}
<PostsAnalytics posts={posts} />

      {/* POSTS TABLE */}
      <div className="bg-white shadow-xl rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-purple-500 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Platform</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t hover:bg-purple-50">
                <td
                  className="px-4 py-3 font-medium cursor-pointer text-purple-600 hover:underline"
                  onClick={() => navigate(`../post/${post.id}`)} // navigate correctly
                >
                  {truncateTitle(post.title)}
                </td>

                <td className="px-4 py-3 flex items-center gap-2">
                  {platformIcons[post.platform]}
                  {post.platform}
                </td>

                <td className="px-4 py-3 flex justify-end gap-2">
                <button
                 onClick={() => handleCopy(post.title)} className="bg-purple-500 text-white px-3 py-1 rounded">
                  <Clipboard size={16} />
                </button>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="border border-red-300 text-red-600 px-3 py-1 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Snackbar message={snack} />
    </div>
  );
}

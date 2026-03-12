import { useState, useEffect } from "react";
import CreatePostForm from "../../components/CreatePostForm";
import ExpandablePostCard from "../../components/ExpandablePostCard";
import { UseAuth } from "../../context/AuthContext";
import { getUserPosts, createPost } from "../../services/postService";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = UseAuth();

  useEffect(() => {
    if (!currentUser) return;

    const fetchPosts = async () => {
      try {
        const userPosts = await getUserPosts(currentUser);
        setPosts(userPosts.reverse());
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, [currentUser]);

  const handleCreatePost = async (newPost) => {
    if (!currentUser) {
      alert("Login first!");
      return;
    }

    try {
      const savedPost = await createPost(newPost, currentUser);
      setPosts((prev) => [savedPost, ...prev]);
    } catch (err) {
      console.error("Error saving post:", err);
      alert("Failed to save post.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold">Welcome 👋</h2>
        <p>Name: {currentUser?.displayName || "No name set"}</p>
        <p>Email: {currentUser?.email}</p>
      </div>

      <CreatePostForm onCreate={handleCreatePost} user={currentUser} />

      {/* PREMIUM POSTS UI */}
      <div className="space-y-4">
        {posts.length === 0 && (
          <div className="bg-white rounded-xl shadow p-6 text-gray-500">
            No posts yet.
          </div>
        )}

        {posts.map((post) => (
          <ExpandablePostCard
            key={post.id}
            post={post}
            onUpdate={(id, updatedContent) =>
              console.log("Update post:", id, updatedContent)
            }
          />
        ))}
      </div>
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UseAuth } from "../../context/AuthContext";
import { getUserPosts } from "../../services/postService";

export default function PostDetails() {
  const { currentUser } = UseAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const fetchPost = async () => {
      try {
        const posts = await getUserPosts();
        const found = posts.find((p) => p.id === id);
        setPost(found);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [currentUser, id]);

  if (!post) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-purple-500 text-black rounded hover:bg-purple-600"
      >
        Back
      </button>

      <h1 className="text-lg font-semi-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">Platform: {post.platform}</p>
      <div className="bg-white shadow-md rounded p-4 whitespace-pre-wrap">{post.content}</div>
    </div>
  );
}

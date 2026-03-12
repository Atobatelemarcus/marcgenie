import { useMemo } from "react";
import { Linkedin, Twitter, BookOpen } from "lucide-react";

function PostsAnalytics({ posts }) {
  const totalPosts = posts.length;

  const byPlatform = useMemo(() => {
    return posts.reduce(
      (acc, post) => {
        acc[post.platform] = (acc[post.platform] || 0) + 1;
        return acc;
      },
      { LinkedIn: 0, Medium: 0, X: 0 }
    );
  }, [posts]);

  return (
    <div className="bg-purple-50 rounded-xl shadow p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow">
        <p className="text-gray-400 text-sm">Total Posts</p>
        <p className="text-2xl font-bold text-purple-600">{totalPosts}</p>
      </div>

      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow">
        <p className="text-gray-400 text-sm flex items-center gap-1">
          <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn
        </p>
        <p className="text-xl font-semibold">{byPlatform.LinkedIn}</p>
      </div>

      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow">
        <p className="text-gray-400 text-sm flex items-center gap-1">
          <Twitter className="w-4 h-4 text-blue-400" /> X
        </p>
        <p className="text-xl font-semibold">{byPlatform.X}</p>
      </div>

      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow">
        <p className="text-gray-400 text-sm flex items-center gap-1">
          <BookOpen className="w-4 h-4 text-orange-500" /> Medium
        </p>
        <p className="text-xl font-semibold">{byPlatform.Medium}</p>
      </div>
    </div>
  );
}

export default PostsAnalytics;

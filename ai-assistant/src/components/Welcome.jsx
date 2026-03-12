import { Zap, Rocket, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Welcome() {
  const purple = "text-purple-600 dark:text-purple-400";

  return (
    <section className="
      min-h-screen flex flex-col items-center justify-center
      bg-purple-50 dark:bg-gray-900
      text-gray-900 dark:text-gray-100
      px-6 mt-15 transition
    ">
      
      {/* Main Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-6 drop-shadow-lg">
        Welcome to <span className="text-purple-600 dark:text-purple-400">MarcGenie</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-center max-w-2xl mb-12 text-gray-700 dark:text-gray-300">
        Generate high-quality content for LinkedIn, X, Medium, and more with AI precision.  
        Streamline your workflow and publish like a pro.
      </p>

      {/* Features / Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">

        {/* Card 1 */}
        <div className="
          bg-white dark:bg-gray-800
          shadow rounded-lg p-6
          flex flex-col items-center gap-3
          hover:shadow-xl transition
          border border-transparent dark:border-gray-700
        ">
          <Zap className={`${purple} w-10 h-10`} />
          <h3 className="font-semibold text-lg">Fast & Efficient</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Create content in seconds with AI-powered automation.
          </p>
        </div>

        {/* Card 2 */}
        <div className="
          bg-white dark:bg-gray-800
          shadow rounded-lg p-6
          flex flex-col items-center gap-3
          hover:shadow-xl transition
          border border-transparent dark:border-gray-700
        ">
          <Rocket className={`${purple} w-10 h-10`} />
          <h3 className="font-semibold text-lg">Boost Engagement</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Publish posts that attract attention and drive results.
          </p>
        </div>

        {/* Card 3 */}
        <div className="
          bg-white dark:bg-gray-800
          shadow rounded-lg p-6
          flex flex-col items-center gap-3
          hover:shadow-xl transition
          border border-transparent dark:border-gray-700
        ">
          <CheckCircle className={`${purple} w-10 h-10`} />
          <h3 className="font-semibold text-lg">Reliable & Secure</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Your content is safe, and your workflow stays organized.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="flex gap-4">
        <Link
          to="/Register"
          className="
            px-6 py-3 bg-purple-600 text-white font-bold
            rounded-lg shadow-lg hover:bg-purple-700 transition
          "
        >
          Get Started
        </Link>

        <Link
          to="/Login"
          className="
            px-6 py-3 border border-purple-600
            text-purple-600 dark:text-purple-400
            font-bold rounded-lg shadow
            hover:bg-purple-50 dark:hover:bg-gray-800
            transition
          "
        >
          Login
        </Link>
      </div>
    </section>
  );
}

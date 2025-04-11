import { useState } from "react";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import axios from "axios";

const BlogCard = ({
  title,
  description,
  publish_date,
  img,
  category,
  id,
  author,
  likes,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes || 0);
  const { user } = useAuth();

  const categoryColors = {
    Technology: "bg-purple-900/50 text-purple-400/80",
    Science: "bg-blue-900/50 text-blue-400/80",
    Health: "bg-emerald-900/50 text-emerald-400/80",
    Business: "bg-amber-900/50 text-amber-400/80",
    Entertainment: "bg-pink-900/50 text-pink-400/80",
    Sports: "bg-red-900/50 text-red-400/80",
    Education: "bg-indigo-900/50 text-indigo-400/80",
    Lifestyle: "bg-green-900/50 text-green-400/80",
    Travel: "bg-cyan-900/50 text-cyan-400/80",
    Food: "bg-orange-900/50 text-orange-400/80",
  };

  const handleLike = async () => {
    if (!user) {
      alert("Please log in to like posts");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_ServerUrl}/blogs/${id}/like`,
        { userId: user.uid },
        { withCredentials: true }
      );
      setIsLiked(response.data.liked);
      setLikeCount(prev => prev + (response.data.liked ? 1 : -1));
    } catch (error) {
      console.error("Error liking blog:", error);
      alert("Failed to update like");
    }
  };

  return (
    <div className="group relative h-full overflow-hidden rounded-xl border border-gray-800 bg-gray-800/50 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
      <div className="h-48 overflow-hidden">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <div className="flex justify-between items-start mb-3">
          <span
            className={`inline-block w-fit px-3 py-1 text-xs font-medium rounded-full ${
              categoryColors[category] || "bg-gray-700 text-gray-300"
            }`}
          >
            {category}
          </span>

          {/* Author info */}
          <div className="flex items-center">
            <img
              src={author?.avatar || "/default-avatar.png"}
              alt={author?.name || "User"}
              className="w-6 h-6 rounded-full mr-2"
            />
            <span className="text-xs text-gray-400">
              {author?.name || "Anonymous"}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">{description}</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm text-gray-500">
            {new Date(publish_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>

          <div className="flex items-center space-x-4">
            {/* Like button */}
            <button
              onClick={handleLike}
              className={`flex items-center text-sm ${
                isLiked ? "text-red-400" : "text-gray-400"
              } hover:text-red-400 transition-colors`}
            >
              <FiHeart className={`mr-1 ${isLiked ? "fill-current" : ""}`} />
              <span>{likeCount}</span>
            </button>

            <Link
              to={`/blogs/${id}`}
              className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center transition-colors"
              aria-label={`Read more about ${title}`}
            >
              Read More
              <FiArrowRight className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
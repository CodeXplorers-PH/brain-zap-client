import { useState, useEffect } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import BlogCard from "../../components/Blog/BlogCard";
import CreatePostModal from "../../components/Blog/CreatePostModal";

// Set base URL for API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("all"); // "all", "my"
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const isAuthenticated = !!user;
  const limit = 6; // Blogs per page

  const fetchBlogs = async (reset = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        search: searchQuery,
        category: activeCategory === "All" ? undefined : activeCategory,
        limit,
        skip: reset ? 0 : page * limit,
      };

      console.log("Fetching blogs with params:", params);
      
      const response = await axios.get(`${API_BASE_URL}/blogs`, {
        params,
        withCredentials: true,
      });

      console.log("API Response:", response.data);

      if (response.data.success) {
        const fetchedBlogs = response.data.blogs.map((blog) => ({
          ...blog,
          description: blog.blog, // Map 'blog' field to 'description' for frontend
          author: {
            id: blog.author_id,
            name: blog.author_name,
            avatar: blog.author_avatar,
          },
        }));

        setBlogs((prev) => (reset ? fetchedBlogs : [...prev, ...fetchedBlogs]));
        setTotalBlogs(response.data.total);
        if (!reset) setPage((prev) => prev + 1);
      } else {
        setError(response.data.message || "Failed to fetch blogs");
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to fetch blogs. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    fetchBlogs(true); // Reset blogs when filters change
  }, [searchQuery, activeCategory, viewMode]);

  const handleCreatePost = (newBlog) => {
    setBlogs((prev) => [newBlog, ...prev]);
    setTotalBlogs((prev) => prev + 1);
  };

  const loadMore = () => {
    fetchBlogs();
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (viewMode === "my" && blog.author?.id !== user?.uid) {
      return false;
    }
    return true;
  });

  const uniqueCategories = [
    "All",
    ...new Set(blogs.map((blog) => blog.category).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            Brain Zap Community
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Share your knowledge and connect with like-minded individuals
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-3xl mx-auto mb-8 bg-red-900/40 border border-red-700 p-4 rounded-xl text-white">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* User Profile Area */}
        {isAuthenticated && (
          <div className="flex items-center justify-between max-w-3xl mx-auto mb-8 bg-gray-800 p-4 rounded-xl">
            <div className="flex items-center">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-white">
                  {user.displayName || "Anonymous User"}
                </p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg flex items-center shadow-lg shadow-purple-600/20 transition-all"
            >
              <FiPlus className="mr-2" />
              Create Post
            </button>
          </div>
        )}

        {/* Search, Filter and View Toggle */}
        <div className="max-w-3xl mx-auto mb-16">
          {/* View Toggle */}
          {isAuthenticated && (
            <div className="mb-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => setViewMode("all")}
                className={`py-2 rounded-lg text-center transition-all ${
                  viewMode === "all"
                    ? "bg-gray-700 text-white font-medium"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setViewMode("my")}
                className={`py-2 rounded-lg text-center transition-all ${
                  viewMode === "my"
                    ? "bg-gray-700 text-white font-medium"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                My Posts
              </button>
            </div>
          )}

          {/* Search */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search posts..."
              className="block w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent focus:outline-none rounded-xl text-gray-300 placeholder-gray-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search posts"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                }`}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && page === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading blogs...</p>
          </div>
        )}

        {/* Blog Posts */}
        {!isLoading && filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                title={blog.title}
                description={blog.description}
                publish_date={blog.publish_date}
                img={blog.img}
                category={blog.category}
                author={blog.author}
                likes={blog.likes}
              />
            ))}
          </div>
        ) : !isLoading && (
          <div className="text-center py-20 border border-gray-800 rounded-xl bg-gray-800/30">
            <h3 className="text-xl font-medium text-gray-400 mb-2">
              No posts found
            </h3>
            <p className="text-gray-500">
              {viewMode === "my"
                ? "You haven't created any posts yet. Create your first post!"
                : "Try adjusting your search or filter criteria"}
            </p>
            {viewMode === "my" && isAuthenticated && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                Create Post
              </button>
            )}
          </div>
        )}

        {/* Load More Button */}
        {filteredBlogs.length > 0 && filteredBlogs.length < totalBlogs && (
          <div className="mt-16 text-center">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors hover:shadow-lg hover:shadow-purple-500/10"
              aria-label="Load more posts"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More Posts"}
            </button>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
};

export default Blog;
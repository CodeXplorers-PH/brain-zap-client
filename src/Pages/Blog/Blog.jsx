import { useEffect, useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import useAuth from "@/hooks/useAuth";
import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client";

import CreatePostModal from "@/components/Blog/CreatePostModal";
import BlogCard from "@/components/Blog/BlogCard";

// Initialize Apollo Client
const apolloClient = new ApolloClient({
  uri: `${import.meta.env.VITE_ServerUrl}/graphql`, // Make sure to set this in your environment variables
  cache: new InMemoryCache(),
});

const GET_BLOG = gql`
  query getBlogs($search: String, $category: String, $limit: Int, $skip: Int) {
    blogs(search: $search, category: $category, limit: $limit, skip: $skip) {
      success
      total
      blogs {
        _id
        title
        blog
        publish_date
        img
        category
        likes
        author_id
        author_name
        author_avatar
      }
    }
  }
`;

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("all");
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const isAuthenticated = !!user;
  const limit = 6;

  const { data, refetch } = useQuery(GET_BLOG, {
    variables: {
      search: searchQuery,
      category: activeCategory === "All" ? undefined : activeCategory,
      limit,
      skip: page * limit,
    },
    client: apolloClient,
    fetchPolicy: "network-only",
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data?.blogs?.success) {
      const fetchedBlogs = data.blogs.blogs.map((blog) => ({
        ...blog,
        description: blog.blog,
        author: {
          id: blog.author_id,
          name: blog.author_name,
          avatar: blog.author_avatar,
        },
      }));

      setBlogs((prev) =>
        page === 0 ? fetchedBlogs : [...prev, ...fetchedBlogs]
      );
      setTotalBlogs(data.blogs.total);
      setIsLoading(false);
    }
  }, [data, page]);

  const fetchBlogs = async (reset = false) => {
    setIsLoading(true);
    setError(null);

    try {
      if (reset) {
        setPage(0);
      }
      await refetch({
        search: searchQuery,
        category: activeCategory === "All" ? undefined : activeCategory,
        limit,
        skip: reset ? 0 : page * limit,
      });
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.message || "Failed to fetch blogs. Please try again later.");
    }
  };

  useEffect(() => {
    fetchBlogs(true);
  }, [searchQuery, activeCategory, viewMode]);

  const handleCreatePost = (newBlog) => {
    setBlogs((prev) => [newBlog, ...prev]);
    setTotalBlogs((prev) => prev + 1);
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
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
    <div className="min-h-screen bg-gray-900 pt-40 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
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
                referrerPolicy="no-referrer"
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

        {/* Loading */}
        {isLoading && page === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading blogs...</p>
          </div>
        )}

        {/* Blog Cards */}
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
        ) : !isLoading ? (
          <div className="text-center py-20 border border-gray-800 rounded-xl bg-gray-800/30">
            <h3 className="text-xl font-medium text-gray-400 mb-2">
              No posts found
            </h3>
            <p className="text-gray-500">
              {viewMode === "my"
                ? "You haven't created any posts yet. Create your first post!"
                : "Try adjusting your search or filter criteria"}
            </p>
          </div>
        ) : null}

        {/* Load More */}
        {!isLoading &&
          filteredBlogs.length > 0 &&
          filteredBlogs.length < totalBlogs && (
            <div className="mt-12 text-center">
              <button
                onClick={loadMore}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
};

export default Blog;

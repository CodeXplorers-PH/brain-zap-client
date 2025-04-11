import { useEffect, useState } from "react";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { blogs } from "@/data/Blogs";

const BlogCard = ({ title, description, publish_date, img, category, id }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <span
          className={`inline-block w-fit px-3 py-1 text-xs font-medium rounded-full ${
            categoryColors[category] || "bg-gray-700 text-gray-300"
          } mb-3`}
        >
          {category}
        </span>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-3 flex-grow">
          {description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm text-gray-500">
            {new Date(publish_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <button
            className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center transition-colors"
            aria-label={`Read more about ${title}`}
          >
            Read More
            <FiArrowRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleBlogs, setVisibleBlogs] = useState(6);

  const filteredBlogs = blogs
    .filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || blog.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .slice(0, visibleBlogs);

  const loadMore = () => {
    setVisibleBlogs((prev) => prev + 6);
  };

  const uniqueCategories = [
    "All",
    ...new Set(blogs.map((blog) => blog.category)),
  ];

  return (
    <div className="min-h-screen bg-gray-900 pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            Brain Zap Insights
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Expert articles to expand your knowledge and sharpen your skills
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-3xl mx-auto mb-16">
          {/* Search */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              className="block w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 focus:ring-0 focus:outline-1 rounded-xl text-gray-300 placeholder-gray-500 transition-all"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleBlogs(6);
              }}
              aria-label="Search articles"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleBlogs(6);
                }}
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

        {/* Blog Posts */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                description={blog.description}
                publish_date={blog.publish_date}
                img={blog.img}
                category={blog.category}
              />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-20 border border-gray-800 rounded-xl bg-gray-800/30"
          >
            <h3 className="text-xl font-medium text-gray-400 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Load More Button */}
        {filteredBlogs.length > 0 && visibleBlogs < blogs.length && (
          <div
            className="mt-16 text-center"
          >
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors hover:shadow-lg hover:shadow-purple-500/10"
              aria-label="Load more articles"
            >
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

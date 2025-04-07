import { useEffect, useState } from "react";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const BlogCard = ({ title, description, publish_date, img, category }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categoryColors = {
    Technology: "bg-purple-900/50 text-purple-400",
    Science: "bg-blue-900/50 text-blue-400",
    Health: "bg-emerald-900/50 text-emerald-400",
    Business: "bg-amber-900/50 text-amber-400",
    Entertainment: "bg-pink-900/50 text-pink-400",
    Sports: "bg-red-900/50 text-red-400",
    Education: "bg-indigo-900/50 text-indigo-400",
    Lifestyle: "bg-green-900/50 text-green-400",
    Travel: "bg-cyan-900/50 text-cyan-400",
    Food: "bg-orange-900/50 text-orange-400",
  };

  return (
    <div className="group relative h-full overflow-hidden rounded-xl border border-gray-800 bg-gray-800/50 hover:border-gray-700 transition-all duration-300 hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${categoryColors[category]} mb-3`}
        >
          {category}
        </span>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-2 flex-grow">
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
          <button className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center transition-colors">
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
    <div className="min-h-screen bg-gray-900 pt-40 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4"
          >
            Brain Zap Insights
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Expert articles to expand your knowledge and sharpen your skills
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-3xl mx-auto mb-16">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mb-8"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              className="block w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-300 placeholder-gray-500 transition-all"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleBlogs(6);
              }}
            />
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleBlogs(6);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Blog Posts */}
        {filteredBlogs.length > 0 ? (
          <motion.div initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                description={blog.description}
                publish_date={blog.publish_date}
                img={blog.img}
                category={blog.category}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 border border-gray-800 rounded-xl bg-gray-800/30">
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
          <div className="mt-16 text-center">
            <button
              onClick={loadMore}
              className="px-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors"
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

export const blogs = [
  {
    id: 1,
    category: "Technology",
    img: "https://static.vecteezy.com/system/resources/thumbnails/007/343/533/small/yellow-quiz-time-banner-with-comic-style-background-suitable-for-use-for-promotional-designs-vector.jpg",
    title: "The Rise of AI in Modern Technology",
    description:
      "Explore the impact of artificial intelligence in shaping the future of various industries.",
    publish_date: "2025-03-01",
  },
  {
    id: 2,
    category: "Science",
    img: "https://static.vecteezy.com/system/resources/thumbnails/007/343/533/small/yellow-quiz-time-banner-with-comic-style-background-suitable-for-use-for-promotional-designs-vector.jpg",
    title: "Discovering New Elements in the Periodic Table",
    description:
      "A look into the recent discoveries in chemistry that have added new elements to the periodic table.",
    publish_date: "2025-02-25",
  },
  {
    id: 3,
    category: "Health",
    img: "https://static.vecteezy.com/system/resources/thumbnails/007/343/533/small/yellow-quiz-time-banner-with-comic-style-background-suitable-for-use-for-promotional-designs-vector.jpg",
    title: "The Benefits of a Plant-Based Diet",
    description:
      "Learn about the health benefits of switching to a plant-based diet and its impact on overall wellness.",
    publish_date: "2025-03-05",
  },
  {
    id: 4,
    category: "Business",
    img: "https://static.vecteezy.com/system/resources/thumbnails/007/343/533/small/yellow-quiz-time-banner-with-comic-style-background-suitable-for-use-for-promotional-designs-vector.jpg",
    title: "How to Build a Successful Startup",
    description:
      "A guide on the steps and strategies for building a thriving startup in today's competitive market.",
    publish_date: "2025-02-28",
  },
  {
    id: 5,
    category: "Entertainment",
    img: "https://static.vecteezy.com/system/resources/thumbnails/007/343/533/small/yellow-quiz-time-banner-with-comic-style-background-suitable-for-use-for-promotional-designs-vector.jpg",
    title: "Top Movies to Watch in 2025",
    description:
      "A curated list of the most anticipated movies of 2025 that every film lover should watch.",
    publish_date: "2025-03-10",
  },
  {
    id: 6,
    category: "Sports",
    img: "https://static.vecteezy.com/system/resources/thumbnails/007/343/533/small/yellow-quiz-time-banner-with-comic-style-background-suitable-for-use-for-promotional-designs-vector.jpg",
    title: "The Most Memorable Moments in World Football",
    description:
      "A recap of some of the most unforgettable moments in the history of world football.",
    publish_date: "2025-03-12",
  },
  {
    id: 7,
    category: "Education",
    img: "https://static.vecteezy.com/system/resources/thumbnails/007/343/533/small/yellow-quiz-time-banner-with-comic-style-background-suitable-for-use-for-promotional-designs-vector.jpg",
    title: "The Future of Online Learning",
    description:
      "Exploring the rise of online learning platforms and how they are changing the landscape of education.",
    publish_date: "2025-03-03",
  },
  {
    id: 8,
    category: "Lifestyle",
    img: "https://static.vecteezy.com/system/resources/thumbnails/007/343/533/small/yellow-quiz-time-banner-with-comic-style-background-suitable-for-use-for-promotional-designs-vector.jpg",
    title: "How to Create a Minimalist Lifestyle",
    description:
      "Tips on decluttering your life and embracing a minimalist approach to daily living.",
    publish_date: "2025-03-15",
  },
  {
    id: 9,
    category: "Travel",
    img: "https://static.vecteezy.com/system/resources/thumbnails/007/343/533/small/yellow-quiz-time-banner-with-comic-style-background-suitable-for-use-for-promotional-designs-vector.jpg",
    title: "Top 10 Travel Destinations for 2025",
    description:
      "A list of the best travel destinations to visit in 2025 for every type of traveler.",
    publish_date: "2025-03-08",
  },
  {
    id: 10,
    category: "Food",
    img: "https://static.vecteezy.com/system/resources/thumbnails/007/343/533/small/yellow-quiz-time-banner-with-comic-style-background-suitable-for-use-for-promotional-designs-vector.jpg",
    title: "The Best Vegan Recipes for a Healthy Lifestyle",
    description:
      "Delicious and nutritious vegan recipes that can help improve your health and wellness.",
    publish_date: "2025-03-06",
  },
];

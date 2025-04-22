import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const BlogCard = ({
  title,
  description,
  publish_date,
  img,
  category,
  id,
  author,
}) => {
  // Format date nicely
  const formattedDate = new Date(publish_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Strip HTML tags and add spaces after headings
  const stripHtml = (html) => {
    if (!html) return "";
    
    // Replace closing heading tags with the tag + space
    let formattedHtml = html
      .replace(/<\/h1>/g, '</h1> ')
      .replace(/<\/h2>/g, '</h2> ')
      .replace(/<\/h3>/g, '</h3> ')
      .replace(/<\/b>/g, '</b> ')
      .replace(/<\/h5>/g, '</h5> ')
      .replace(/<\/h6>/g, '</h6> ');
    
    // Create a temporary element to strip HTML
    const tmp = document.createElement("DIV");
    tmp.innerHTML = formattedHtml;
    return tmp.textContent || tmp.innerText || "";
  };

  // Get clean text and truncate
  const cleanDescription = stripHtml(description);
  const truncatedDescription = cleanDescription && cleanDescription.length > 100 
    ? `${cleanDescription.substring(0, 100)}...` 
    : cleanDescription;

  const categoryColors = {
    Technology: "bg-purple-900/50 text-purple-400 border-purple-700/50",
    Programming: "bg-blue-900/50 text-blue-400 border-blue-700/50",
    AI: "bg-emerald-900/50 text-emerald-400 border-emerald-700/50",
    "Data Science": "bg-amber-900/50 text-amber-400 border-amber-700/50",
    "Web Development": "bg-pink-900/50 text-pink-400 border-pink-700/50",
    "Mobile Development": "bg-red-900/50 text-red-400 border-red-700/50",
    "Computer Science": "bg-indigo-900/50 text-indigo-400 border-indigo-700/50",
    Other: "bg-cyan-900/50 text-cyan-400 border-cyan-700/50",
  };

  return (
    <Link
      to={`/blogs/${id}`}
      className="block h-full"
    >
      <div className="relative h-full overflow-hidden rounded-xl bg-gray-900 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 border border-gray-800 hover:border-purple-700/40">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={img}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${
                categoryColors[category] || "bg-gray-800/80 text-gray-300 border-gray-700"
              }`}
            >
              {category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col h-[calc(100%-13rem)]">
          {/* Author info - Now always visible */}
          <div className="flex items-center mb-4">
            <img
              src={author?.avatar || "/default-avatar.png"}
              alt={author?.name || "User"}
              className="w-8 h-8 rounded-full ring-2 ring-purple-500 mr-3"
            />
            <div>
              <p className="text-white font-medium text-sm">{author?.name || "Anonymous"}</p>
              <p className="text-gray-400 text-xs">{formattedDate}</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-gray-400 mb-6 line-clamp-3 flex-grow">{truncatedDescription}</p>

          <div className="flex justify-end mt-auto">
            <div className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center transition-all duration-300 hover:translate-x-1">
              Read More
              <FiArrowRight className="ml-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
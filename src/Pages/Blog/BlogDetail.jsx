import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "@/hooks/useAuth";

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_ServerUrl}/blogs/${id}`, {
          withCredentials: true,
        });
        setBlog(response.data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
        alert("Failed to fetch blog");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center">
        <div className="text-center">
          {/* Pulse animation container */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            {/* Outer pulsing circle */}
            <div className="absolute inset-0 rounded-full bg-purple-600/20 animate-ping"></div>
            
            {/* Middle pulse circle */}
            <div className="absolute inset-2 rounded-full bg-purple-500/40 animate-pulse"></div>
            
            {/* Inner solid circle */}
            <div className="absolute inset-4 rounded-full bg-purple-600 flex items-center justify-center">
              {/* Loading "dots" animation */}
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
          
          {/* Text with gradient */}
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-medium">
            Loading awesome content...
          </p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
          <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Blog Not Found</h2>
          <p className="text-gray-400">We couldn't find the blog post you're looking for. It may have been removed or doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-40 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <img
          src={blog.img}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-xl mb-8"
        />
        <h1 className="text-4xl font-bold text-white mb-4">{blog.title}</h1>
        <div className="flex items-center mb-6">
          <img
            src={blog.author_avatar || "/default-avatar.png"}
            alt={blog.author_name || "Author"}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="text-gray-300">{blog.author_name || "Anonymous"}</p>
            <p className="text-sm text-gray-500">
              {new Date(blog.publish_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl">
          <p className="text-gray-300 leading-relaxed">{blog.blog}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
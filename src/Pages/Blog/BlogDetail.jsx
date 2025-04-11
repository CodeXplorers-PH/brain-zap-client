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
        const response = await axios.get(`http://localhost:5000/blogs/${id}`, {
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
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-white text-center py-20">Blog not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-20 px-4 sm:px-6">
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
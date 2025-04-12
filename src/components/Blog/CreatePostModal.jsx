import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { FiX, FiImage, FiUpload, FiAlertCircle } from "react-icons/fi";

// API URL from environment or default
const API_BASE_URL = import.meta.env.VITE_ServerUrl;

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Technology");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setCategory("Technology");
    setImage(null);
    setImagePreview(null);
    setError("");
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const validateForm = () => {
    if (!title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!content.trim()) {
      setError("Content is required");
      return false;
    }
    if (!category) {
      setError("Category is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      // Prepare author info if user is authenticated
      const author = user
        ? {
            id: user.uid,
            name: user.displayName || "Anonymous User",
            avatar: user.photoURL || "/default-avatar.png",
          }
        : null;

      // Ensure we're sending the full image data string including the data URI prefix
      const response = await axios.post(
        `${API_BASE_URL}/blogs`,
        {
          title,
          blog: content, // Server expects 'blog' field
          category,
          imageBase64: image, // Send the complete data URI
          author,
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        // Format the new blog post with proper author information before sending it back
        const formattedBlog = {
          ...response.data.blog,
          description: response.data.blog.blog || content, // Make sure description is set
          author: {
            id: user?.uid,
            name: user?.displayName || "Anonymous User",
            avatar: user?.photoURL || "/default-avatar.png",
          }
        };
        
        onSubmit(formattedBlog);
        resetForm();
        onClose();
      } else {
        setError(response.data.message || "Failed to create post");
      }
    } catch (err) {
      console.error("Error creating blog:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to create post. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const categories = [
    "Technology",
    "Programming",
    "AI",
    "Data Science",
    "Web Development",
    "Mobile Development",
    "Computer Science",
    "Other",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-purple-500/10 border border-gray-800">
        {/* Header with close button */}
        <div className="flex items-center justify-between border-b border-gray-800 p-6">
          <h2 className="text-2xl font-bold text-white">Share Your Thoughts</h2>
          <button 
            onClick={handleCancel}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-900/20 border border-red-700/50 rounded-xl flex items-center gap-3 text-red-300">
            <FiAlertCircle size={20} className="flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-6">
          {/* Image Upload - Moved to top for better visibility */}
          <div className="relative">
            <div className={`rounded-xl overflow-hidden transition-all duration-300 ${
              imagePreview 
                ? "h-64 bg-gray-800" 
                : "h-32 border-2 border-dashed border-gray-700 bg-gray-800/30 hover:border-purple-500/50 hover:bg-gray-800/50"
            }`}>
              {imagePreview ? (
                <div className="relative h-full w-full group">
                  <img
                    src={imagePreview}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="p-2 bg-red-600 rounded-full text-white"
                    >
                      <FiX size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer h-full w-full flex flex-col items-center justify-center text-gray-400 hover:text-gray-300 transition-colors">
                  <FiImage size={28} className="mb-2" />
                  <span className="text-sm">Add Cover Image (optional)</span>
                  <span className="text-xs text-gray-500 mt-1">Max size: 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-b border-gray-700 px-2 py-3 text-xl text-white focus:outline-none focus:border-purple-500 placeholder-gray-500"
              placeholder="Title"
              required
            />
          </div>

          {/* Category Select - Redesigned as pills */}
          <div>
            <label className="block text-gray-400 text-sm mb-3">
              Select Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    category === cat
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Content Input */}
          <div>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-gray-800/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 min-h-[200px] resize-none placeholder-gray-500"
              placeholder="Share your knowledge with the community..."
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-colors flex items-center justify-center gap-2 min-w-[140px] ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Publishing..."
              ) : (
                <>
                  <FiUpload size={18} />
                  Publish Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
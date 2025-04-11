import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

// API URL from environment or default
const API_BASE_URL = import.meta.env.VITE_ServerUrl

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

      console.log("Submitting blog post:", { title, content, category, hasImage: !!image });

      const response = await axios.post(
        `${API_BASE_URL}/blogs`,
        {
          title,
          blog: content, // Server expects 'blog' field
          category,
          imageBase64: image,
          author,
        },
        { withCredentials: true }
      );

      console.log("Blog post response:", response.data);

      if (response.data.success) {
        onSubmit(response.data.blog);
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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Create New Post</h2>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-white">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter a title for your post"
              required
            />
          </div>

          {/* Content Input */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-300 mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[200px]"
              placeholder="Write your post content here..."
              required
            />
          </div>

          {/* Category Select */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-300 mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Cover Image</label>
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-2 text-white transition-colors">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <span className="text-gray-400 text-sm">
                Optional. Max size: 5MB
              </span>
            </div>

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-40 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="mt-2 text-red-400 hover:text-red-300 text-sm"
                >
                  Remove image
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors flex items-center justify-center min-w-[100px] ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
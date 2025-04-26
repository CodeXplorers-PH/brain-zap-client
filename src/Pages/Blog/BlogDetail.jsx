import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import EditPostModal from "../../components/Blog/EditPostModal";
import { useQuery } from "@apollo/client";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { CustomToast } from "@/components/ui/CustomToast";

// Initialize Apollo Client
const apolloClient = new ApolloClient({
  uri: `${import.meta.env.VITE_ServerUrl}/graphql`,
  cache: new InMemoryCache(),
});

const GET_SINGLE_BLOG = gql`
  query GetBlog($id: ID!) {
    blog(_id: $id) {
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
`;

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { loading, data, refetch } = useQuery(GET_SINGLE_BLOG, {
    variables: { id },
    client: apolloClient,
    fetchPolicy: "network-only",
    onError: (error) => {
      setError(error.message);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (data?.blog) {
      setBlog(data.blog);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    // Scroll to top when blog page loads
    window.scrollTo(0, 0);
  }, [id]);

  const handleDeleteBlog = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(`${import.meta.env.VITE_ServerUrl}/blogs/${id}`, {
        withCredentials: true,
        data: { userId: user.uid },
      });
      setShowDeleteModal(false);
      // Redirect to blogs list page after successful deletion
      CustomToast({
        photoURL: user?.photoURL,
        displayName: user?.displayName,
        title: "Blog Deleted Successfully!",
        description: "Your blog post has been successfully deleted.",
      });

      navigate("/blogs");
    } catch (error) {
      console.error("Error deleting blog:", error);
      setError("Failed to delete blog");
      setDeleteLoading(false);
      setShowDeleteModal(false);
      CustomToast({
        photoURL: user?.photoURL,
        displayName: user?.displayName,
        title: error.response.data.error || "Error",
        description:
          error.response.data.message ||
          "Failed to deleted post. Please try again.",
        type: "error",
      });
    }
  };

  const handleBlogUpdate = (updatedBlog) => {
    setBlog({
      ...blog,
      ...updatedBlog,
    });
    refetch(); // Refetch the blog data after update
  };

  // Check if current user is the author of the blog
  const isAuthor = blog?.author_id === user?.uid;

  if (isLoading || loading) {
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
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
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

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
          <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Blog Not Found</h2>
          <p className="text-gray-400">
            {error ||
              "We couldn't find the blog post you're looking for. It may have been removed or doesn't exist."}
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Helper function to check if the content is HTML
  const isHTML = (str) => {
    if (!str) return false;
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Cover Image */}
        {blog.img && (
          <div className="rounded-xl overflow-hidden mb-8 shadow-xl shadow-purple-600/10">
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-96 object-cover"
              loading="eager"
            />
          </div>
        )}

        {/* Title & Category */}
        <div className="mb-6">
          {blog.category && (
            <span className="inline-block px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm font-medium mb-3">
              {blog.category}
            </span>
          )}
          <h1 className="text-4xl font-bold text-white mb-2">{blog.title}</h1>
        </div>

        {/* Author Info & Date */}
        <div className="flex items-center justify-between mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
          <div className="flex items-center">
            <img
              src={blog.author_avatar || "/default-avatar.png"}
              alt={blog.author_name || "Author"}
              className="w-12 h-12 rounded-full mr-4 object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-gray-200 font-medium">
                {blog.author_name || "Anonymous"}
              </p>
              <p className="text-sm text-gray-400">
                {formatDate(blog.publish_date)}
              </p>
            </div>
          </div>

          {/* Edit/Delete buttons if user is author */}
          {isAuthor && (
            <div className="flex space-x-2">
              <button
                onClick={() => setShowEditModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700/50">
          {isHTML(blog.blog) ? (
            <div
              className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed rich-text-editor"
              dangerouslySetInnerHTML={{ __html: blog.blog }}
            />
          ) : (
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {blog.blog || "No content available."}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditPostModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={handleBlogUpdate}
        blogId={id}
        initialData={blog}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4">Delete Blog</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this blog post? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBlog}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center"
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;

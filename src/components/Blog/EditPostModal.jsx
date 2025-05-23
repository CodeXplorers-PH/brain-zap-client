import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { FiX, FiImage, FiSave, FiAlertCircle } from 'react-icons/fi';
import RichTextEditor from './RichTextEditor';
import { useQuery, gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { CustomToast } from '../ui/CustomToast';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const apolloClient = new ApolloClient({
  uri: `${import.meta.env.VITE_ServerUrl}/graphql`,
  cache: new InMemoryCache(),
});

// GraphQL query to fetch a single blog post
const GET_BLOG = gql`
  query GetBlogPost($id: ID!) {
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

const EditPostModal = ({ isOpen, onClose, onUpdate, blogId }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [originalBlog, setOriginalBlog] = useState(null);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // GraphQL query for fetching blog data
  const { loading, data } = useQuery(GET_BLOG, {
    variables: { id: blogId },
    client: apolloClient,
    skip: !isOpen || !blogId,
    onCompleted: data => {
      if (data?.blog) {
        const blogData = data.blog;
        setOriginalBlog(blogData);
        setTitle(blogData.title || '');
        setContent(blogData.blog || '');
        setCategory(blogData.category || 'Technology');
        if (blogData.img) {
          setImagePreview(blogData.img);
        }

        // Verify ownership
        if (blogData.author_id !== user?.uid) {
          setError("You don't have permission to edit this blog");
        }
      }
    },
    onError: error => {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog data. Please try again.');
    },
  });

  // Handle escape key
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape' && isOpen) {
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleDragOver = e => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = file => {
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setImagePreview(reader.result);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    if (originalBlog) {
      setTitle(originalBlog.title || '');
      setContent(originalBlog.blog || '');
      setCategory(originalBlog.category || 'Technology');
      setImagePreview(originalBlog.img || null);
    } else {
      setTitle('');
      setContent('');
      setCategory('Technology');
      setImage(null);
      setImagePreview(null);
    }
    setError('');
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const validateForm = () => {
    if (!title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!content.trim()) {
      setError('Content is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      // Prepare update data
      const updateData = {
        title,
        blog: content,
        category,
        userId: user.uid,
      };

      // Only include image if it was changed
      if (image) {
        updateData.imageBase64 = image;
      }

      // Still using REST for mutations (updates)
      const response = await axiosSecure.put(`/blogs/${blogId}`, updateData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        const updatedBlog = {
          ...originalBlog,
          title,
          blog: content,
          category,
          img: response.data.imageUrl || originalBlog.img,
        };

        onUpdate(updatedBlog);
        onClose();
        CustomToast({
          photoURL: user?.photoURL,
          displayName: user?.displayName,
          title: 'Blog Updated Successfully!',
          description: 'Your blog post has been successfully updated.',
        });
      } else {
        setError(response.data.message || 'Failed to update post');
        CustomToast({
          photoURL: user?.photoURL,
          displayName: user?.displayName,
          title: response.data.error || 'Error',
          description:
            response.data.message ||
            'Failed to updated post. Please try again.',
          type: 'error',
        });
      }
    } catch (err) {
      console.error('Error updating blog:', err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to update post. Please try again.'
      );
      CustomToast({
        photoURL: user?.photoURL,
        displayName: user?.displayName,
        title: err.response.data.error || 'Error',
        description:
          err.response.data.message ||
          'Failed to updated post. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const categories = [
    'Technology',
    'Programming',
    'AI',
    'Data Science',
    'Web Development',
    'Mobile Development',
    'Computer Science',
    'Other',
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div
        className="bg-gray-900 rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col shadow-xl border border-gray-800"
        onClick={e => e.stopPropagation()}
      >
        {/* Header - Fixed at top */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-medium text-white">Edit Post</h2>
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-400 hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-900/20 border border-red-700/50 rounded-lg flex items-center gap-2 text-red-300">
            <FiAlertCircle size={18} />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-t-purple-600 border-purple-200 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-400">Loading blog data...</p>
            </div>
          </div>
        ) : (
          /* Scrollable content area */
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-1 gap-4">
                {/* Image Upload - Simplified */}
                <div
                  className={`rounded-lg overflow-hidden border border-gray-700 transition-all ${
                    isDragging ? 'border-purple-500' : ''
                  } ${imagePreview ? 'h-60' : 'h-32'}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <div className="relative h-full w-full group">
                      <img
                        src={imagePreview}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          type="button"
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                          className="p-2 bg-red-600 rounded-full text-white"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer h-full w-full flex flex-col items-center justify-center text-gray-400">
                      <FiImage size={24} className="mb-2" />
                      <span className="text-sm">
                        Drop image or click to upload
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Title Input */}
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-purple-500"
                  placeholder="Title"
                  autoFocus
                />

                {/* Category Select - Horizontal Pills */}
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        category === cat
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Rich Text Editor - Flexible height */}
                <div className="min-h-64 bg-gray-800 rounded-lg overflow-hidden">
                  <RichTextEditor
                    content={content}
                    onUpdate={newContent => setContent(newContent)}
                    placeholder="Write your post..."
                    formId="editPostForm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons - Fixed at bottom */}
        <div className="p-4 border-t border-gray-800">
          <form
            id="editPostForm"
            onSubmit={handleSubmit}
            className="flex justify-end space-x-3"
          >
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2"
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? (
                <span>Updating...</span>
              ) : (
                <>
                  <FiSave size={16} />
                  <span>Update</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;

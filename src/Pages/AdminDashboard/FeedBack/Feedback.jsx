import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Mail,
  CheckCircle,
  Trash2,
  MailCheck,
  Search,
  Filter,
} from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchFeedbackData = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.post(`/adminDashboard`, {
          query: `
            query {
              feedback {
                _id
                name
                email
                message
                feedbackType
                date
                read
              }
            }
          `,
        });
        const data = res?.data?.data?.feedback;
        setFeedbacks(data);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, [axiosSecure]);

  const handleMarkAsRead = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to mark this feedback as read?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Yes, mark as read',
      background: '#1f2937',
      color: '#fff',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/feedbackRead/${id}`)
          .then(res => {
            if (res?.data?.success) {
              Swal.fire({
                title: 'Success!',
                text: 'Feedback has been marked as read.',
                icon: 'success',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#8b5cf6',
              });
              setFeedbacks(prevFeedbacks =>
                prevFeedbacks.map(fb =>
                  fb._id === id ? { ...fb, read: 'Done' } : fb
                )
              );
            }
          })
          .catch(error => {
            console.error('Failed to mark as read:', error);
          });
      }
    });
  };

  const handleDeleteFeedback = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#374151',
      confirmButtonText: 'Yes, delete it',
      background: '#1f2937',
      color: '#fff',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/feedbackDelete/${id}`)
          .then(res => {
            if (res?.data?.success) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Feedback has been removed.',
                icon: 'success',
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: '#8b5cf6',
              });
              setFeedbacks(prevFeedbacks =>
                prevFeedbacks.filter(fb => fb._id !== id)
              );
            }
          })
          .catch(error => {
            console.error('Failed to delete feedback:', error);
            Swal.fire({
              title: 'Error',
              text: 'An error occurred while deleting the feedback.',
              icon: 'error',
              background: '#1f2937',
              color: '#fff',
              confirmButtonColor: '#8b5cf6',
            });
          });
      }
    });
  };

  const feedbackTypeColors = {
    Feedback: 'bg-emerald-500',
    'Feature Request': 'bg-blue-500',
    'Bug Report': 'bg-red-300',
    Question: 'bg-amber-500',
  };

  const filterOptions = [
    'All',
    'Feedback',
    'Feature Request',
    'Bug Report',
    'Question',
    'Unread',
    'Read',
  ];

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch =
      feedback.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterType === 'All') return matchesSearch;
    if (filterType === 'Unread')
      return (
        matchesSearch && !(feedback.read === true || feedback.read === 'Done')
      );
    if (filterType === 'Read')
      return (
        matchesSearch && (feedback.read === true || feedback.read === 'Done')
      );
    return matchesSearch && feedback.feedbackType === filterType;
  });

  const renderSkeletonFeedback = () => (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50 p-6">
      <div className="flex justify-between mb-4">
        <div className="h-6 w-32 bg-gray-700 rounded-md animate-pulse"></div>
        <div className="h-6 w-20 bg-gray-700 rounded-md animate-pulse"></div>
      </div>
      <div className="h-4 w-full bg-gray-700 rounded-md animate-pulse mb-2"></div>
      <div className="h-4 w-3/4 bg-gray-700 rounded-md animate-pulse mb-4"></div>
      <div className="h-4 w-1/2 bg-gray-700 rounded-md animate-pulse"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MailCheck size={24} className="text-purple-400" />
            Feedback Management
          </h1>
          <p className="text-gray-400">
            View and manage user feedback and feature requests
          </p>
        </div>
        {/* <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700">
            Export <ArrowRight size={16} />
          </button>
        </div> */}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Search by name, email or content..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-gray-400" />
          </div>
          <select
            className="block w-full md:w-48 pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            {filterOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50 p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 rounded-md bg-purple-500/20 text-purple-400">
              <Mail size={18} className="text-white" />
            </div>
            <h3 className="text-sm font-medium text-gray-300">Total</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            {feedbacks.length || 0}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50 p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 rounded-md bg-green-500/20 text-green-400">
              <Mail size={18} className="text-white" />
            </div>
            <h3 className="text-sm font-medium text-gray-300">Feedback</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            {feedbacks.filter(f => f.feedbackType === 'Feedback').length || 0}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50 p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 rounded-md bg-blue-500/20 text-blue-400">
              <Mail size={18} className="text-white" />
            </div>
            <h3 className="text-sm font-medium text-gray-300">
              Feature Requests
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">
            {feedbacks.filter(f => f.feedbackType === 'Feature Request')
              .length || 0}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50 p-4">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 rounded-md bg-red-500/20 text-red-400">
              <Mail size={18} className="text-white" />
            </div>
            <h3 className="text-sm font-medium text-gray-300">Bug Reports</h3>
          </div>
          <p className="text-2xl font-bold text-white">
            {feedbacks.filter(f => f.feedbackType === 'Bug Report').length || 0}
          </p>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Feedback Messages ({filteredFeedbacks.length})
            </h2>
          </div>

          <div className="space-y-4">
            {loading ? (
              <>
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index}>{renderSkeletonFeedback()}</div>
                  ))}
              </>
            ) : filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map((feedback, idx) => (
                <div
                  key={idx}
                  className="bg-gray-700/30 rounded-lg overflow-hidden border border-gray-700/50 p-5"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                        {feedback.name ? (
                          <span className="text-xs font-medium text-white">
                            {feedback.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')
                              .toUpperCase()}
                          </span>
                        ) : (
                          <Mail size={16} className="text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white">
                          {feedback.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {feedback.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          feedbackTypeColors[feedback.feedbackType] ||
                          'bg-gray-500'
                        }`}
                      >
                        {feedback.feedbackType}
                      </span>
                      {(feedback.read === true || feedback.read === 'Done') && (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-900/30 text-green-400">
                          Read
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {feedback.message}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                    <div className="flex items-center text-xs gap-1 text-gray-400">
                      <Calendar size={14} />
                      {feedback.date}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className={`p-2 rounded-md text-white transition-colors duration-200 ${
                          feedback?.read === true || feedback?.read === 'Done'
                            ? 'bg-green-500/20 text-green-400 cursor-default'
                            : 'bg-gray-700 hover:bg-green-500/20 hover:text-green-400'
                        }`}
                        title="Mark as Read"
                        onClick={() => handleMarkAsRead(feedback?._id)}
                        disabled={
                          feedback?.read === true || feedback?.read === 'Done'
                        }
                      >
                        <CheckCircle size={16} />
                      </button>
                      <button
                        className="bg-gray-700 p-2 rounded-md text-white hover:bg-red-500/20 hover:text-red-400 transition-colors duration-200"
                        onClick={() => handleDeleteFeedback(feedback?._id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <MailCheck size={40} className="mx-auto text-gray-500 mb-3" />
                <p className="text-gray-400">No feedback messages found</p>
                <p className="text-gray-500 text-sm mt-1">
                  {searchQuery
                    ? 'Try a different search query or filter'
                    : 'All clear! No messages to display'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;

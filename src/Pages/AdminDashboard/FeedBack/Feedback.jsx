import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, MailCheck, CheckCircle, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchDashboardData = async () => {
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
        console.error('Error fetching data:', error);
      }
    };

    fetchDashboardData();
  }, [axiosSecure]);

  const gradients = [
    'from-indigo-500 via-purple-500 to-pink-500',
    'from-cyan-500 via-blue-500 to-indigo-500',
    'from-green-400 via-emerald-500 to-teal-500',
  ];

  const handleMarkAsRead = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Make As Read!',
      background: 'rgba(30, 30, 60, 0.85)',
      color: '#fff',
      backdrop: `rgba(0, 0, 0, 0.4)`,
      customClass: {
        popup: 'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
        title: 'text-blue-400 text-lg font-semibold',
        confirmButton:
          'bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4',
        htmlContainer: 'text-sm text-gray-300',
      },
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
                background: 'rgba(30, 30, 60, 0.85)',
                color: '#fff',
                backdrop: `rgba(0, 0, 0, 0.4)`,
                customClass: {
                  popup:
                    'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
                  title: 'text-blue-400 text-lg font-semibold',
                  confirmButton:
                    'bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4',
                  htmlContainer: 'text-sm text-gray-300',
                },
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

  const handleDelteFeedback = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete This Message!',
      background: 'rgba(30, 30, 60, 0.85)',
      color: '#fff',
      backdrop: `rgba(0, 0, 0, 0.4)`,
      customClass: {
        popup: 'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
        title: 'text-blue-400 text-lg font-semibold',
        confirmButton:
          'bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4',
        htmlContainer: 'text-sm text-gray-300',
      },
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/feedbackDelete/${id}`)
          .then(res => {
            if (res?.data?.success) {
              Swal.fire({
                title: 'Success!',
                text: 'Feedback has been deleted.',
                icon: 'success',
                background: 'rgba(30, 30, 60, 0.85)',
                color: '#fff',
                backdrop: `rgba(0, 0, 0, 0.4)`,
                customClass: {
                  popup:
                    'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
                  title: 'text-blue-400 text-lg font-semibold',
                  confirmButton:
                    'bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4',
                  htmlContainer: 'text-sm text-gray-300',
                },
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
              background: 'rgba(30, 30, 60, 0.85)',
              color: '#fff',
              backdrop: `rgba(0, 0, 0, 0.4)`,
              customClass: {
                popup:
                  'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
                title: 'text-red-400 text-lg font-semibold',
                confirmButton:
                  'bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded mt-4',
                htmlContainer: 'text-sm text-gray-300',
              },
            });
          });
      }
    });
  };

  return (
    <div className="flex flex-col mb-6 py-20 px-6">
      <div className="mb-10 text-center">
        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center gap-2">
          <MailCheck size={26} className="border w-14 rounded-full" />
          All Feedback
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {feedbacks?.map((feedback, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="group relative overflow-hidden rounded-2xl border border-gray-800 p-6 backdrop-blur-md transition-all duration-300"
            style={{
              background: 'rgba(17, 24, 39, 0.7)',
            }}
          >
            {/* Gradient Background Effect */}
            <div
              className={`absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br ${
                gradients[idx % gradients.length]
              } opacity-20 rounded-full blur-3xl group-hover:scale-125 group-hover:opacity-40 transition-all duration-500`}
            />

            {/* Feedback Type (Rounded Badge) */}
            <div
              className={`absolute top-4 right-4 px-3 py-1 text-xs text-white font-semibold rounded-full ${
                feedback.feedbackType === 'Feedback'
                  ? 'bg-green-600'
                  : feedback.feedbackType === 'Feature Request'
                  ? 'bg-blue-500'
                  : feedback.feedbackType === 'Bug Report'
                  ? 'bg-red-500'
                  : 'bg-yellow-500'
              }`}
            >
              {feedback?.feedbackType}
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              <h4 className="text-lg font-semibold text-white mb-2">
                {feedback.name}
              </h4>{' '}
              <p className="text-xs text-white/60 flex items-center gap-1 mb-2">
                {' '}
                <Mail className="size-4" /> {feedback.email}
              </p>
              <p className="text-sm text-white/80 mb-4 text-justify">
                {feedback.message}
              </p>
              {/* Icons for Type and Date */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-xs gap-1 text-white/60 ">
                  <Calendar size={14} />
                  {feedback.date}
                </div>
                {/* Buttons for Tick and Delete */}
                <div className="flex gap-3">
                  <button
                    className={`p-2 rounded-full text-white hover:bg-green-600 transition duration-200 ${
                      feedback?.read === true || feedback?.read === 'Done'
                        ? 'bg-green-500'
                        : 'border border-green-500'
                    }`}
                    title="Mark as Resolved"
                    onClick={() => handleMarkAsRead(feedback?._id)}
                  >
                    <CheckCircle size={16} />
                  </button>
                  <button
                    className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition duration-200"
                    onClick={() => handleDelteFeedback(feedback?._id)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;

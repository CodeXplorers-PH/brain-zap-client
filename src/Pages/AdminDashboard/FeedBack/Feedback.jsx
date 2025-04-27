import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Mail, MailCheck, User } from "lucide-react";

const Feedback = () => {
  const feedbacks = [
    {
      name: "John Doe",
      email: "john.doe@email.com",
      message: "Loving the platform!",
      feedbackType: "Feedback",
      date: "2025-04-27",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      message:
        "Smooth and intuitiveajsdhbasjbdaashb d sd asdbabsdbahdbhadas dasd ashdasd ad .",
      feedbackType: "Bug Report",
      date: "2025-04-26",
    },
    {
      name: "Alice Johnson",
      email: "alice.j@email.com",
      message: "Support was quick.",
      feedbackType: "General Question",
      date: "2025-04-25",
    },
    {
      name: "Alice Johnson",
      email: "alice.j@email.com",
      message: "Support was quick.",
      feedbackType: "Feature Request",
      date: "2025-04-25",
    },
  ];
  const gradients = [
    "from-indigo-500 via-purple-500 to-pink-500",
    "from-cyan-500 via-blue-500 to-indigo-500",
    "from-green-400 via-emerald-500 to-teal-500",
  ];

  return (
    <div className="flex flex-col mb-6 py-20 px-6">
      <div className="mb-10 text-center">
        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center gap-2">
          <MailCheck size={26} className="border w-12 rounded-full" />
          All Feedback
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((feedback, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="group relative overflow-hidden rounded-2xl border border-gray-800 p-6 backdrop-blur-md transition-all duration-300"
            style={{
              background: "rgba(17, 24, 39, 0.7)",
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
                feedback.feedbackType === "Feedback"
                  ? "bg-green-600"
                  : feedback.feedbackType === "Feature Request"
                  ? "bg-blue-500"
                  : feedback.feedbackType === "Bug Report"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {feedback.feedbackType}
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              <h4 className="text-lg font-semibold text-white mb-2">
                {feedback.name}
              </h4>{" "}
              <p className="text-xs text-white/60 flex items-center gap-1 mb-2">
                {" "}
                <Mail className="size-4" /> {feedback.email}
              </p>
              <p className="text-sm text-white/80">
                {feedback.message.length > 40
                  ? feedback.message.substring(0, 40) + "..."
                  : feedback.message}
              </p>
              {/* Icons for Type and Date */}
              <div className="flex items-center gap-1 text-xs text-white/60 mt-2">
                <Calendar size={14} />
                {feedback.date}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;

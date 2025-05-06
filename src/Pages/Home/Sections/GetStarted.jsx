import React from "react";
import { UserPlus, Brain, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const Started = () => {
  const startSteps = [
    {
      icon: <UserPlus className="w-6 h-6 text-white" />,
      title: "Join BrainZap",
      description:
        "Sign up in seconds to start exploring quizzes and tracking your progress.",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
    },
    {
      icon: <Brain className="w-6 h-6 text-white" />,
      title: "Pick Your Quiz",
      description:
        "Choose from 7 categories like Programming or Science, or create your own.",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    },
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: "Learn & Compete",
      description:
        "Take quizzes, earn points, and climb the leaderboard to showcase your skills.",
      gradient: "from-green-400 via-emerald-500 to-teal-500",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-28 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">
              Start Your Journey
            </span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Kickstart Your Learning
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Get started with BrainZap in three easy steps. Test your knowledge,
            compete, and grow today!
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {startSteps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={item}
              className="group relative overflow-hidden rounded-xl border border-gray-800 p-8 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 bg-gray-800/30"
            >
              <div className="absolute top-6 right-6 flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 border border-gray-700 text-gray-500 font-medium text-sm">
                {index + 1}
              </div>
              <div
                className={`absolute -right-24 -top-24 w-48 h-48 bg-gradient-to-br ${step.gradient} opacity-20 rounded-full blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-30`}
              ></div>
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-900/20 group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Started;
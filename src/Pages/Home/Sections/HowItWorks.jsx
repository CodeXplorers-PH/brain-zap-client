import React from "react";
import { User, Brain, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const processSteps = [
    {
      icon: <User className="w-6 h-6 text-white" />,
      title: "Join & Personalize",
      description:
        "Sign up for free and set your learning goals to start exploring quizzes tailored to your interests.",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
    },
    {
      icon: <Brain className="w-6 h-6 text-white" />,
      title: "Take AI-Driven Quizzes",
      description:
        "Dive into 7+ categories like Programming or Science, with quizzes that adapt to your skill level.",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    },
    {
      icon: <Trophy className="w-6 h-6 text-white" />,
      title: "Compete & Grow",
      description:
        "Earn points, climb leaderboards, and unlock achievements with personalized AI feedback (Pro/Elite).",
      gradient: "from-green-400 via-emerald-500 to-teal-500",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative py-28 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">
              How It Works
            </span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Master Skills with BrainZap
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover how BrainZap’s AI-powered platform helps you learn, compete, and excel in just three simple steps.
          </p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="hidden md:block absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-teal-500/30 transform -translate-x-1/2 -translate-y-1/2 w-3/4"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={item}
                className="relative group rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 p-8 transition-all duration-300 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-700/50 border border-gray-600 text-gray-400 font-medium text-sm">
                  {index + 1}
                </div>
                <div
                  className={`absolute -left-16 -bottom-16 w-40 h-40 bg-gradient-to-br ${step.gradient} opacity-10 rounded-full blur-xl transition-all duration-500 group-hover:opacity-20 group-hover:scale-125`}
                ></div>
                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-purple-900/20 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
                <div className="absolute bottom-4 right-4 w-3 h-3">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full bg-gradient-to-r ${step.gradient} opacity-75 animate-ping`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r ${step.gradient}`}
                  ></span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
import React from "react";
import { User, Brain, Target } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const processSteps = [
    {
      icon: <User className="w-6 h-6 text-white" />,
      title: "Personalized Onboarding",
      description:
        "Create a smart profile that adapts to your unique learning style and goals.",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
    },
    {
      icon: <Brain className="w-6 h-6 text-white" />,
      title: "AI-Powered Assessments",
      description:
        "Take quizzes that dynamically adjust to your skill level in real-time.",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: "Comprehensive Feedback",
      description:
        "Receive AI insights into your strengths, weaknesses, and personalized growth strategies.",
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
    <section className="relative bg-gray-900 py-28 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 right-1/3 w-96 h-96 bg-purple-900/20 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "15s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "12s" }}
        ></div>
      </div>

      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">
              How It Works
            </span>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Unlock Your Potential with BrainZap
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experience personalized, AI-driven learning that adapts to your
            unique journey and transforms the way you acquire and retain
            knowledge.
          </p>
        </div>

        {/* Process flow with connecting lines */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-1/2 h-0.5 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-teal-500/30 transform -translate-x-1/2 -translate-y-1/2 w-3/4"></div>

          {/* Process steps */}
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                className="relative group rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700 p-8 transition-all duration-300 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10"
              >
                {/* Step number indicator */}
                <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-700/50 border border-gray-600 text-gray-400 font-medium text-sm">
                  {index + 1}
                </div>

                {/* Background gradient */}
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

                {/* Interactive pulse effect */}
                <div className="absolute bottom-4 right-4 w-3 h-3">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full bg-gradient-to-r ${step.gradient} opacity-75 animate-ping`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r ${step.gradient}`}
                  ></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

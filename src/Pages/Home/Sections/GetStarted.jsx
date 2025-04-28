import React from "react";
import { motion } from "framer-motion";
import { UserPlus, Brain, Rocket } from "lucide-react";

const Started = () => {
  const startSteps = [
    {
      icon: <UserPlus className="w-6 h-6 text-white" />,
      title: "Create Your Account",
      description:
        "Sign up in seconds with our streamlined, secure registration process.",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
    },
    {
      icon: <Brain className="w-6 h-6 text-white" />,
      title: "Personalize Your Profile",
      description:
        "Tell us about your learning goals, interests, and skill levels.",
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    },
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: "Start Your Learning Journey",
      description:
        "Dive into AI-powered quizzes tailored just for you, anytime, anywhere.",
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
    <section className="relative bg-gray-900 py-28 px-4 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute -bottom-20 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">
              Simple Onboarding
            </span>
          </div>

          <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Get Started in 3 Simple Steps
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Embark on your personalized learning adventure with BrainZap. Our
            intuitive platform makes starting your educational journey
            effortless and exciting.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {startSteps.map((step, index) => (
            <div
              key={step.title}
              variants={item}
              whileHover={{
                translateY: -8,
                transition: { duration: 0.1, ease: "easeInOut" },
              }}
              className="group relative overflow-hidden rounded-xl border border-gray-800 p-8 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              style={{
                background: "rgba(17, 24, 39, 0.7)",
              }}
            >
              {/* Step indicator */}
              <div className="absolute top-6 right-6 flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 border border-gray-700 text-gray-500 font-medium text-sm">
                {index + 1}
              </div>

              {/* Background gradient */}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Started;

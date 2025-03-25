import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Layers, 
  Target, 
  Settings, 
  Lightbulb, 
  Award,
  Sparkles,
  BrainCircuit,
  BarChart2,
  BookOpen
} from 'lucide-react';

const Features = () => {
  const featuresData = [
    {
      id: 1,
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Quizzes",
      description: "Dynamic quizzes that adapt to your learning style in real-time",
      highlight: "Intelligent adaptation"
    },
    {
      id: 2,
      icon: <BrainCircuit className="w-6 h-6" />,
      title: "Personalized Learning",
      description: "Custom paths tailored to your knowledge gaps",
      highlight: "Targeted improvement"
    },
    {
      id: 3,
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Detailed insights into your progress",
      highlight: "Data-driven learning"
    },
    {
      id: 4,
      icon: <BookOpen className="w-6 h-6" />,
      title: "Knowledge Reinforcement",
      description: "Smart repetition of challenging concepts",
      highlight: "Long-term retention"
    }
  ];

  const featureHighlights = [
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: "Instant Feedback",
      description: "Get real-time explanations and corrections as you answer questions"
    },
    {
      icon: <Layers className="w-8 h-8 text-blue-400" />,
      title: "Multi-Layered Difficulty",
      description: "Progress from beginner to expert with adaptive challenge levels"
    },
    {
      icon: <Target className="w-8 h-8 text-green-400" />,
      title: "Precision Training",
      description: "Focus on specific topics or skills with targeted quiz modes"
    }
  ];

  return (
    <section className="relative bg-gray-900 py-24 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full filter blur-3xl opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 border border-gray-700 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
            <span className="text-sm font-medium text-gray-300">AI-Powered Learning</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Smarter Quizzes,
            </span>
            <br />
            Faster Learning
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            BrainZap's adaptive technology personalizes your learning experience for maximum knowledge retention.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {featuresData.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700 p-6 backdrop-blur-sm hover:border-purple-500 transition-all duration-300"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/10 rounded-full transition-all duration-500 group-hover:scale-150"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 mb-3">{feature.description}</p>
                <span className="text-xs font-medium text-purple-400">{feature.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -left-10 -top-10 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            <div className="relative rounded-2xl overflow-hidden border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900/50 p-1 shadow-2xl">
              <div className="h-full w-full bg-gray-800/30 rounded-xl flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-700 mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                    <span className="text-sm font-medium text-gray-300">Active Quiz Session</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-4">AI-Powered Quiz</div>
                  <div className="text-gray-400 mb-6">Adapting to your learning patterns...</div>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-colors">
                    Try Demo
                  </button>
                </div>
              </div>
              <div className="absolute inset-0 border border-gray-700/50 rounded-xl pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Right column - Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Advanced Learning
                </span>
                <br />
                Powered by AI
              </h3>
              <p className="text-gray-400 text-lg">
                Our platform uses machine learning to identify your strengths and weaknesses, creating optimal learning paths tailored just for you.
              </p>
            </div>

            <div className="space-y-6">
              {featureHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    {highlight.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white mb-2">{highlight.title}</h4>
                    <p className="text-gray-400">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
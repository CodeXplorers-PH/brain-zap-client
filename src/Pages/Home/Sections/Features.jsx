import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Layers,
  Target,
  Sparkles,
  BrainCircuit,
  BarChart2,
  BookOpen,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(1);
  
  // Auto-rotate featured items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => prev === featuresData.length ? 1 : prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuresData = [
    {
      id: 1,
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI-Powered Quizzes',
      description:
        'Dynamic quizzes that adapt to your learning style in real-time',
      highlight: 'Intelligent adaptation',
      color: 'from-indigo-500 via-purple-500 to-pink-500'
    },
    {
      id: 2,
      icon: <BrainCircuit className="w-6 h-6" />,
      title: 'Personalized Learning',
      description: 'Custom paths tailored to your knowledge gaps',
      highlight: 'Targeted improvement',
      color: 'from-cyan-500 via-blue-500 to-indigo-500'
    },
    {
      id: 3,
      icon: <BarChart2 className="w-6 h-6" />,
      title: 'Performance Analytics',
      description: 'Detailed insights into your progress',
      highlight: 'Data-driven learning',
      color: 'from-green-400 via-emerald-500 to-teal-500'
    },
    {
      id: 4,
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Knowledge Reinforcement',
      description: 'Smart repetition of challenging concepts',
      highlight: 'Long-term retention',
      color: 'from-amber-500 via-orange-500 to-red-500'
    },
  ];

  const featureHighlights = [
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: 'Instant Feedback',
      description:
        'Get real-time explanations and corrections as you answer questions',
      color: 'purple'
    },
    {
      icon: <Layers className="w-8 h-8 text-blue-400" />,
      title: 'Multi-Layered Difficulty',
      description:
        'Progress from beginner to expert with adaptive challenge levels',
      color: 'blue'
    },
    {
      icon: <Target className="w-8 h-8 text-green-400" />,
      title: 'Precision Training',
      description:
        'Focus on specific topics or skills with targeted quiz modes',
      color: 'green'
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="relative bg-gray-900 py-32 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-pink-900/20 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMGgzMHYzMEgweiIgZmlsbD0iIzIwMjAzMCIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">Revolutionizing Education</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Smarter Quizzes,
            </span>
            <br />
            Faster Learning
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            BrainZap's adaptive technology personalizes your learning experience
            for maximum knowledge retention and accelerated growth.
          </p>
        </motion.div>

        {/* Features showcase with 3D hover effect */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
        >
          {featuresData.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={item}
              className="group relative overflow-hidden rounded-xl border border-gray-800 p-8 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
              style={{
                background: 'rgba(17, 24, 39, 0.7)',
                transform: 'perspective(1000px)'
              }}
              whileHover={{
                translateY: -8,
                rotateX: 5,
                rotateY: 5,
                transition: { duration: 0.4 }
              }}
            >
              {/* Background gradient */}
              <div className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-20 rounded-full blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-30`}></div>
              
              <div className="relative z-10">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-900/20 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
                <div className="flex items-center">
                  <span className="text-xs font-medium text-purple-400 mr-2">
                    {feature.highlight}
                  </span>
                  <ArrowRight className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature showcase with interactive component */}
        <div className="grid lg:grid-cols-5 gap-12 items-center mb-24">
          {/* Left column - 3 columns wide */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative"
          >
            <div className="absolute -left-32 -top-32 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md p-1 shadow-2xl">
              {/* Glass Morphism Header */}
              <div className="bg-gray-800/60 backdrop-blur-sm border-b border-gray-700/50 rounded-t-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-700/70">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                  <span className="text-xs font-medium text-gray-300">Live Demo Session</span>
                </div>
                <div className="w-6"></div> {/* Empty space for balance */}
              </div>
              
              {/* Content */}
              <div className="p-8">
                {/* Active Quiz Visualization */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">Advanced Learning Quiz</h3>
                      <p className="text-gray-400 text-sm">Adapting to your learning style...</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
                      Intelligence Level: Adapting
                    </span>
                  </div>
                  
                  {/* Progress indicators */}
                  <div className="grid grid-cols-4 gap-3 mb-8">
                    {[1, 2, 3, 4].map((step) => (
                      <div 
                        key={step} 
                        className={`h-2 rounded-full ${step <= activeFeature ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-700'}`}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Current question mock */}
                  <motion.div 
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800/70 border border-gray-700/50 rounded-xl p-6 mb-6"
                  >
                    <p className="text-gray-300 mb-4">
                      {activeFeature === 1 && "What's the primary advantage of using AI-powered quizzes?"}
                      {activeFeature === 2 && "How does personalized learning improve knowledge retention?"}
                      {activeFeature === 3 && "Which analytics feature provides the most value for learners?"}
                      {activeFeature === 4 && "What technique does BrainZap use to reinforce knowledge?"}
                    </p>
                    
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((option) => (
                        <div 
                          key={option}
                          className={`p-3 rounded-lg border transition-all cursor-pointer
                            ${option === 2 ? 'border-green-500/50 bg-green-500/10' : 'border-gray-700 bg-gray-800/50 hover:border-purple-500/50 hover:bg-gray-800'}`}
                        >
                          <div className="flex items-center">
                            {option === 2 && <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />}
                            <span className="text-gray-300">Option {option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <div className="flex justify-center">
                    <Link
                      to="/start-quiz"
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transform hover:translate-y-1"
                    >
                      Try Interactive Demo
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Footer with metrics */}
              <div className="border-t border-gray-700/50 p-4 bg-gray-800/40 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Learning Speed</p>
                  <p className="text-sm font-medium text-gray-300">+28% Faster</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Retention Rate</p>
                  <p className="text-sm font-medium text-gray-300">93% Success</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">AI Adaptation</p>
                  <p className="text-sm font-medium text-gray-300">Real-time</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - 2 columns wide */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-10"
          >
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium mb-6">
                REVOLUTIONARY APPROACH
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  Next Generation
                </span>
                <br />
                Learning Platform
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Our platform uses advanced machine learning to identify your unique strengths
                and weaknesses, creating optimal learning paths that adapt in real-time
                to maximize your potential.
              </p>
            </div>

            <div className="space-y-8">
              {featureHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-5 group"
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-${highlight.color}-500/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                    {highlight.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {highlight.title}
                    </h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Testimonial/Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-1 overflow-hidden"
        >
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl"></div>
            
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Trusted by thousands of learners worldwide
              </h3>
              <p className="text-gray-400">
                Join the learning revolution and experience the power of AI-enhanced education
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">98%</div>
                <p className="text-sm text-gray-400">Satisfaction rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">2.5x</div>
                <p className="text-sm text-gray-400">Faster learning</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">5M+</div>
                <p className="text-sm text-gray-400">Questions answered</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2">24/7</div>
                <p className="text-sm text-gray-400">Learning access</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
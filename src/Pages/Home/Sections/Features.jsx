import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  BrainCircuit,
  Trophy,
  PenSquare,
  ArrowRight,
  Zap,
  Share2,
  Target,
  CheckCircle2,
} from "lucide-react";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev === featuresData.length ? 1 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuresData = [
    {
      id: 1,
      icon: <Sparkles className="w-6 h-6" />,
      title: "Ready-Made Quiz Categories",
      description:
        "Access quizzes in Programming, Science, Languages, Math, Tech, Business & more — instantly.",
      highlight: "Free for all users",
      color: "from-indigo-500 via-purple-500 to-pink-500",
    },
    {
      id: 2,
      icon: <BrainCircuit className="w-6 h-6" />,
      title: "AI-Powered Custom Quizzes",
      description:
        "Generate quizzes by topic, difficulty, and question count powered by AI.",
      highlight: "Tailored learning experience",
      color: "from-cyan-500 via-blue-500 to-indigo-500",
    },
    {
      id: 3,
      icon: <Trophy className="w-6 h-6" />,
      title: "Gamified Adaptive Learning",
      description:
        "Earn points, maintain streaks, unlock achievements, and climb the leaderboard with every quiz.",
      highlight: "Motivation meets mastery",
      color: "from-green-400 via-emerald-500 to-teal-500",
    },
    {
      id: 4,
      icon: <PenSquare className="w-6 h-6" />,
      title: "Community-Driven Blog",
      description:
        "Write insightful blogs using our Rich Text Editor. Everyone can read and engage.",
      highlight: "Learn & share knowledge",
      color: "from-amber-500 via-orange-500 to-red-500",
    },
  ];
  

  const featureHighlights = [
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: "AI-Powered Feedback",
      description:
        "Get detailed insights on your quiz performance to improve faster.",
      color: "purple",
    },
    {
      icon: <Share2 className="w-8 h-8 text-blue-400" />,
      title: "Share Your Success",
      description:
        "Post your quiz results on social media to showcase your expertise.",
      color: "blue",
    },
    {
      icon: <Target className="w-8 h-8 text-green-400" />,
      title: "Track Your Progress",
      description:
        "Monitor quizzes, points, streaks, and achievements in your profile dashboard.",
      color: "green",
    },
  ];

  return (
    <section className="relative py-32 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/70 border border-gray-700 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">
              Discover BrainZap
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Learn, Compete, Excel
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            BrainZap lets you test your knowledge, create custom quizzes, and compete on leaderboards. Share your expertise and grow with our community!
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="group relative overflow-hidden rounded-xl border border-gray-800 p-8 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 bg-gray-800/30"
            >
              <div
                className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-20 rounded-full blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-30`}
              ></div>
              <div className="relative z-10">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-900/20 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
                <div className="flex items-center">
                  <span className="text-xs font-medium text-purple-400 mr-2">
                    {feature.highlight}
                  </span>
                  <ArrowRight className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-5 gap-12 items-center mb-24">
          <div className="lg:col-span-3 relative">
            <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 p-1 shadow-2xl bg-gray-800/30 backdrop-blur-sm">
              <div className="border-b border-gray-700/50 rounded-t-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-700/70">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                  <span className="text-xs font-medium text-gray-300">
                    Try a Quiz Now
                  </span>
                </div>
                <div className="w-6"></div>
              </div>
              <div className="p-8">
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        Sample Quiz
                      </h3>
                      <p className="text-gray-400 text-sm">
                      Adapting to your learning style...
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
                    Intelligence Level: Adapting
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-8">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-2 rounded-full ${
                          step <= activeFeature
                            ? "bg-gradient-to-r from-purple-500 to-pink-500"
                            : "bg-gray-700"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <div
                    key={activeFeature}
                    className="bg-gray-800/70 border border-gray-700/50 rounded-xl p-6 mb-6"
                  >
                    <p className="text-gray-300 mb-4">
                      {activeFeature === 1 &&
                        "What can you do with BrainZap’s Free plan?"}
                      {activeFeature === 2 &&
                        "What feature is exclusive to Elite users?"}
                      {activeFeature === 3 &&
                        "How do you earn points on BrainZap?"}
                      {activeFeature === 4 &&
                        "Who can share blogs on BrainZap?"}
                    </p>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((option) => (
                        <div
                          key={option}
                          className={`p-3 rounded-lg border transition-all cursor-pointer ${
                            option === 2
                              ? "border-green-500/50 bg-green-500/10"
                              : "border-gray-700 bg-gray-800/50 hover:border-purple-500/50 hover:bg-gray-800"
                          }`}
                        >
                          <div className="flex items-center">
                            {option === 2 && (
                              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                            )}
                            <span className="text-gray-300">
                              Option {option}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Link
                      to="/start-quiz"
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transform hover:translate-y-1"
                    >
                      Start Quiz Now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700/50 p-4 bg-gray-800/40 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Quizzes Completed</p>
                  <p className="text-sm font-medium text-gray-300">12M+</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Active Learners</p>
                  <p className="text-sm font-medium text-gray-300">600K+</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">AI Adaptation</p>
                  <p className="text-sm font-medium text-gray-300">Real-time</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium mb-6">
                YOUR KNOWLEDGE HUB
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  Excel with BrainZap
                </span>
                <br />
                Anytime, Anywhere
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Whether you’re mastering a new skill or competing globally,
                BrainZap’s AI-driven tools help you learn smarter and shine
                brighter.
              </p>
            </div>
            <div className="space-y-8">
              {featureHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-5 group">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl bg-${highlight.color}-500/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300`}
                  >
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
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-800 p-1 overflow-hidden bg-gray-800/30 backdrop-blur-sm">
          <div className="rounded-xl p-8 relative overflow-hidden">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Join Our Global Learning Community
              </h3>
              <p className="text-gray-400">
                Connect with learners worldwide, compete, and share your knowledge
                with BrainZap.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  600K+
                </div>
                <p className="text-sm text-gray-400">Active Users</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                  12M+
                </div>
                <p className="text-sm text-gray-400">Quizzes Taken</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                  96%
                </div>
                <p className="text-sm text-gray-400">Satisfaction Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2">
                  24/7
                </div>
                <p className="text-sm text-gray-400">Access Anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
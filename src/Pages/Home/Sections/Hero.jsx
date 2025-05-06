import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SparklesText } from "@/components/magicui/sparkles-text";

const Hero = () => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 bg-transparent">
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-800/70 backdrop-blur-sm border border-purple-500/30 mb-8">
          <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
          <span className="text-sm font-medium text-gray-200">
            AI-Powered Quiz Platform
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Master Your Skills
          </span>
          <br />
          with{" "}
          <SparklesText
            text="BrainZap Quizzes"
            className="text-white text-5xl md:text-7xl inline-block"
          />
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
        Unlock your full potential with adaptive quizzes, real-time insights, and a personalized path to mastery.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-5 mb-16">
          <Link
            to="/start-quiz"
            className="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Take a Free Quiz
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 blur-xl scale-110 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
          </Link>
          <Link
            to="/pricing"
            className="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-lg bg-gray-800/70 backdrop-blur-sm border border-gray-700 text-white font-medium transition-all duration-300"
          >
            <span className="relative z-10">Discover Elite Plans</span>
            <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
      <div className="relative mt-16 rounded-2xl overflow-hidden border border-purple-500/20 p-1 shadow-2xl">
        <div className="relative h-full w-full flex items-center justify-center rounded-xl overflow-hidden">
          <img
            src="/banner.png"
            alt="BrainZap quiz interface with leaderboard and achievements"
            className="rounded-xl w-full object-cover shadow-lg transition-all duration-700 hover:scale-[1.01]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
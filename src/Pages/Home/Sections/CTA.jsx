import React from "react";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="px-4 py-12 md:px-8 lg:px-56 bg-gray-900">
      <div className="bg-gray-900 rounded-3xl border border-gray-700 p-8 md:p-12 shadow-xl">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Zap className="text-white" size={32} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
              Supercharge
            </span>{" "}
            Your Learning?
          </h2>

          <p className="text-gray-300 mx-auto max-w-2xl">
            Unlock personalized AI-powered quizzes that adapt to your learning
            style. Start your intelligent learning journey today!
          </p>

          <div className="pt-4">
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white
            px-10 py-3 rounded-3xl text-lg font-medium
            transition-transform duration-300 hover:translate-y-[-2px]
            focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-950"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

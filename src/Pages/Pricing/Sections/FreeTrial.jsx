import React from "react";
import { Link } from "react-router-dom";

const FreeTrial = () => {
  return (
    <div className="bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-pink-800/80 rounded-3xl shadow-xl border border-purple-700/30 backdrop-blur-sm">
          {/* Content */}
          <div className="relative z-10 text-center px-6 py-16 md:py-20 md:px-20">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
              Limited Time Offer –{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-400">
                Get 10% OFF
              </span>{" "}
              Today!
            </h2>

            <p className="text-lg md:text-xl lg:text-2xl text-purple-200 mb-6 max-w-3xl mx-auto">
              Discover the power of AI-generated quizzes. Personalized learning,
              endless fun! Use code{" "}
              <span className="font-mono bg-purple-800/50 px-2 py-1 rounded text-amber-300">
                BRAINZAP10
              </span>{" "}
              and get 10% off instant.
            </p>

            <Link to={"/checkout"}>
              <button className="mt-8 bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:from-indigo-600 hover:to-pink-600 transition-all duration-300 text-xl font-medium py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Claim Your Discount{" "}
              </button>
            </Link>
          </div>

          {/* Decorative Shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-500/10 rounded-full filter blur-xl"></div>
            <div className="absolute top-20 right-10 w-32 h-32 bg-indigo-500/10 rounded-full filter blur-xl"></div>
            <div className="absolute bottom-10 left-1/2 w-24 h-24 bg-purple-500/10 rounded-full filter blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTrial;

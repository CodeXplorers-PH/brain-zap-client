import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900 min-h-screen">
      {/* Background elements remain unchanged */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-gray-900 to-blue-900/40 z-0"></div>
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background:
                i % 3 === 0
                  ? "rgba(168, 85, 247, 0.4)"
                  : i % 3 === 1
                  ? "rgba(59, 130, 246, 0.4)"
                  : "rgba(236, 72, 153, 0.3)",
              animation: `float ${Math.random() * 15 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: "0 0 10px 2px rgba(139, 92, 246, 0.15)",
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gray-800/70 backdrop-blur-sm border border-purple-500/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-200">
              Learning Reimagined by AI
            </span>
          </div>

          {/* Enhanced Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Supercharge Your Learning
            </span>
            <br />
            with{" "}
            <SparklesText
              text="Smart Quizzes"
              className="text-white text-5xl md:text-7xl inline-block"
            />
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Unlock your full potential with adaptive quizzes, real-time
            insights, and a personalized path to mastery.
          </p>

          {/* CTA Buttons remain unchanged */}
          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-16">
            <div>
              <Link
                to="/start-quiz"
                className="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Free
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 blur-xl scale-110 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
              </Link>
            </div>

            <div>
              <Link
                to="/pricing"
                className="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-lg bg-gray-800/70 backdrop-blur-sm border border-gray-700 text-white font-medium transition-all duration-300"
              >
                <span className="relative z-10">View Pricing</span>
                <div className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative mt-16 rounded-2xl overflow-hidden border border-purple-500/20 bg-gradient-to-br from-gray-800/50 via-gray-900/70 to-gray-800/50 p-1 shadow-2xl">
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_50%)]"></div>
          </div>
          <div className="relative h-full w-full flex items-center justify-center rounded-xl overflow-hidden">
            <img
              src="/quiz-result.png"
              alt="AI-powered quiz interface with personalized feedback"
              className="rounded-xl w-full object-cover shadow-lg transition-all duration-700 hover:scale-[1.01]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

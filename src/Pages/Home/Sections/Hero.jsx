import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Button from "@/components/ui/Button";
import HeroMarquee from "@/components/ui/HeroMarquee";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-900 to-blue-900/30 z-0"></div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-purple-500/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 border border-gray-700 mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
            <span className="text-sm font-medium text-gray-300">AI-Powered Quiz Platform</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Supercharge Your Learning
            </span>
            <br />
            with Smart Quizzes
          </h1>
          
          {/* Subheading */}
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Brain Zap adapts to your learning style, delivering personalized challenges and 
            smart insights to boost your knowledge and confidence.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link 
              to="/start-quiz" 
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Get Started Free</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/pricing" 
              className="px-8 py-4 bg-gray-800 border border-gray-700 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>View Pricing</span>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400">Quiz Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-400">Satisfaction Rate</div>
            </div>
          </div>
        </div>
        
        {/* Hero Image/Illustration Placeholder */}
        <div className="relative mt-16 rounded-2xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-1">
          <div className="h-full w-full bg-gray-800/30 rounded-xl flex items-center justify-center">
            <img src="/quiz-result.png" alt="" />
          </div>
          <div className="absolute inset-0 border border-gray-700/50 rounded-xl pointer-events-none"></div>
        </div>
      </div>
      
      {/* Marquee Section */}
      <div className="relative z-10 bg-gray-800/30 border-t border-b border-gray-700/50 py-8">
        <HeroMarquee />
      </div>
    </div>
  );
};

export default Hero;
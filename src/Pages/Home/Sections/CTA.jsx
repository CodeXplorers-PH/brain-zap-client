import React from "react";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-neutral text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
          <Zap className="text-white" size={32} />
        </div>
        
        <h2 className="text-4xl font-bold mb-4">
          Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">Supercharge</span> Your Learning?
        </h2>
        
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Unlock personalized AI-powered quizzes that adapt to your learning style. Start your intelligent learning journey today!
        </p>
        
        <Link to="/start-quiz">
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white 
            px-8 py-3 rounded-full text-lg font-semibold 
            hover:opacity-90 transition-all duration-300 
            shadow-xl shadow-purple-500/30 
            hover:scale-105 active:scale-100">
            Get Started Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
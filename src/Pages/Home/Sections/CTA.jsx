import React from "react";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="bg-neutral text-white pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Zap className="text-white" size={32} />
          </div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-4xl font-bold mb-4">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
              Supercharge
            </span>{" "}
            Your Learning?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-gray-300 max-w-2xl mx-auto mb-8">
            Unlock personalized AI-powered quizzes that adapt to your learning
            style. Start your intelligent learning journey today!
          </span>
          <Link to="/start-quiz">
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white 
            px-8 py-3 rounded-full text-lg font-semibold 
            hover:opacity-90 transition-all duration-300 
            shadow-xl shadow-purple-500/30 
            hover:scale-105 active:scale-100"
            >
              Get Started Now
            </button>
          </Link>
        </motion.p>
      </div>
    </section>
  );
};

export default CTA;

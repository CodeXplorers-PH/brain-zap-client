import { HyperText } from "@/components/magicui/hyper-text";
import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="pt-40 pb-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <HyperText className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Programming Quizzes
        </HyperText>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 9 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="text-gray-400 mt-4 text-xl">
          Test your coding knowledge with interactive quizzes.
        </span>
      </motion.p>
    </div>
  );
};

export default Banner;

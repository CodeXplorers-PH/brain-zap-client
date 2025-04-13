import { HyperText } from "@/components/magicui/hyper-text";
import React from "react";

const Banner = () => {
  return (
    <div className="pt-40 pb-20 text-center">
      <h1 className="mb-4">
        <HyperText className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Programming Quizzes
        </HyperText>
      </h1>
      <p
      >
        <span className="text-gray-400 text-xl">
          Test your coding knowledge with interactive quizzes.
        </span>
      </p>
    </div>
  );
};

export default Banner;

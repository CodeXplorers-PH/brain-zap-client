import Button from "@/components/ui/Button";
import React from "react";

const Banner = () => {
  return (
    <div className="pt-40 pb-20 text-center">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Programming Quizzes
      </h1>
      <p className="text-gray-400 mt-4 text-xl">
        Test your coding knowledge with interactive quizzes.
      </p>
    </div>
  );
};

export default Banner;

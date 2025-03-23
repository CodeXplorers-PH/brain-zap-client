import Button from "@/components/ui/Button";
import React from "react";

const Banner = () => {
  return (
    <div className="pt-40 pb-20 text-center">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-800">
        Programming Quizzes
      </h1>
      <p className="text-gray-300 mt-2 z-10">
        Test your coding knowledge with interactive quizzes.
      </p>
      <div className="flex justify-center mt-6">
        <Button>Start Quiz</Button>
      </div>
    </div>
  );
};

export default Banner;

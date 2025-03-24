import React from "react";

const SectionHeading = ({ heading = "", subHeading = "", color }) => {
  return (
    <>
      <h1
        className={`text-center font-secondary text-5xl sm:text-7xl font-bold bg-gradient-to-r from-pink-400 to-green-400 bg-clip-text text-transparent ${
          color || ""
        }`}
      >
        {heading}
      </h1>
      <p
        className={`text-center font-medium mx-auto mt-2 text-gray-300 z-10 lg:w-3/4 w-[90%] ${
          color || ""
        }`}
      >
        {subHeading}
      </p>
    </>
  );
};

export default SectionHeading;

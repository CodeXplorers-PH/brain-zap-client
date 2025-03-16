import React from 'react';

const SectionHeading = ({ heading = '', subHeading = '', color }) => {
  return (
    <>
      <h1
        className={`text-center font-secondary text-5xl sm:text-7xl text-text font-medium ${
          color || ''
        }`}
      >
        {heading}
      </h1>
      <p
        className={`text-center font-medium sm:max-w-[80%] mx-auto mt-2 ${
          color || ''
        }`}
      >
        {subHeading}
      </p>
    </>
  );
};

export default SectionHeading;

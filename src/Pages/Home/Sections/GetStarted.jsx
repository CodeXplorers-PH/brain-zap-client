import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';

const GetStarted = () => {
  return (
    <section className="flex-section bg-wheat pt-10 pb-20">
      <div className="wrapper flex-col">
        {/* Heading */}
        <SectionHeading
          heading="How to Get Started"
          subHeading="Follow These Simple Steps to Start Creating Your AI-Powered Quizzes Today!"
        />
      </div>
    </section>
  );
};

export default GetStarted;

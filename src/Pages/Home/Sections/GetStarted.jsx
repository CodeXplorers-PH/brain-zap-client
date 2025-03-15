import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

const GetStarted = () => {
  return (
    <section className="flex-section bg-wheat pt-10 pb-20">
      <div className="wrapper flex-col">
        {/* Heading */}
        <SectionHeading
          heading="How to Get Started"
          subHeading="Follow These Simple Steps to Start Creating Your AI-Powered Quizzes Today!"
        />

        {/* Get Started button */}
        <div className="my-5 flex justify-center">
          <Link to="/pricing">
            <Button>Get Started Now</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;

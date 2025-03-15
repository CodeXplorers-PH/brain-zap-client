import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { getStartData } from '@/data/GetStarted';

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
        <div className="my-8 flex justify-center">
          <Link to="/pricing">
            <Button className="shadow-[0px_2px_4px_2px_#646464]">
              Get Started Now
            </Button>
          </Link>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-5">
          {getStartData.map((data, index) => (
            <div
              className={`w-full md:w-[calc(50%-10px)] lg:w-[calc(33.33%-13.33px)] p-8 md:p-9 rounded-3xl relative ${
                index === 0
                  ? 'bg-[#D2F2D2]'
                  : index === 1
                  ? 'bg-[#FFDF78]'
                  : 'bg-[#AFDDFF]'
              }`}
              key={data.id}
            >
              <div
                className={`bg-white/30 w-1/2 h-28 rounded-bl-[100%] absolute top-0 right-0`}
              ></div>

              <img className="w-24 aspect-square" src={data.image} alt="" />
              <h5 className="text-xl font-bold my-5">{data.title}</h5>
              <p>{data.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetStarted;

import React from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { featuresData } from '@/data/Features';
import shareIcon from '@/assets/icons/share.png';

import featuresImg from '@/assets/img/features.webp';

const Features = () => {
  return (
    <section className="flex-section bg-gradient-to-t from-[#b599fc] via-[#eeddfa] to-wheat pt-20 pb-60 relative">
      <div className="wrapper flex-col">
        {/* Heading */}
        <SectionHeading
          heading="Make your quiz"
          subHeading="Create and Customize Your Own AI-Powered Quiz for a Personalized Learning Experience."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Cards */}
          <div className="order-2 md:order-1 grid grid-cols-1 sm:grid-cols-2 gap-12">
            {featuresData.map(quiz => (
              <div key={quiz.id}>
                <div className="bg-white/30 backdrop-blur-md size-10 p-1.5 rounded-md">
                  <img
                    className="max-w-full max-h-full aspect-square"
                    src={shareIcon}
                    alt="img"
                  />
                </div>
                <h5 className="font-semibold text-text my-4">{quiz.tittle}</h5>
                <p className="text-sm">{quiz.description}</p>
              </div>
            ))}
          </div>

          {/* Animation */}
          <div className="order-1 md:order-2 hidden lg:block">
            <img src={featuresImg} alt="" />
          </div>
        </div>
      </div>

      {/* Half Circle */}
      <svg
        className="w-full h-[120px] absolute bottom-0 left-0"
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fill="#f6f5f1"
          d="M0,120 C480,20 960,20 1440,120 L1440,320 L0,240 Z"
        ></path>
      </svg>
    </section>
  );
};

export default Features;

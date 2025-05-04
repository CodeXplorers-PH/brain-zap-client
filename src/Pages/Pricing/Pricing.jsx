import React, { useEffect } from 'react';
import PricingPlan from './Sections/PricingPlan';
import FreeTrial from './Sections/FreeTrial';

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Pricing | BrainZap';
  }, []);
  return (
    <>
      <div className="bg-gray-900 min-h-screen">
        <PricingPlan />
        <FreeTrial />
      </div>
    </>
  );
};

export default Pricing;

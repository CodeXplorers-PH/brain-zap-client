import React, { useEffect } from "react";
import PricingPlan from "./Sections/PricingPlan";
import FreeTrial from "./Sections/FreeTrial";
import { Helmet } from "react-helmet";

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Brain Zap AI | Pricing</title>
      </Helmet>
      <div className="bg-gray-900 min-h-screen">
        <PricingPlan />
        <FreeTrial />
      </div>
    </>
  );
};

export default Pricing;

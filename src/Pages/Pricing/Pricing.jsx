import React from 'react';
import PricingPlan from './Sections/PricingPlan';
import FreeTrial from './Sections/FreeTrial';

const Pricing = () => {
    return (
        <div className='bg-gray-900 min-h-screen'>
            <PricingPlan />
            <FreeTrial />
        </div>
    );
};

export default Pricing;
import React from 'react';
import PricingPlan from './Sections/PricingPlan';
import FreeTrial from './Sections/FreeTrial';

const Pricing = () => {
    return (
        <div className='bg-gradient-to-br from-huf-purple/40 to-sky-200/20'>
            <PricingPlan />
            <FreeTrial />
        </div>
    );
};

export default Pricing;
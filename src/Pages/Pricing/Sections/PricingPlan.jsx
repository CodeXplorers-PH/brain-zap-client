import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const pricingPlans = [
  {
    title: 'Free Zap',
    description: 'Kickstart your brain journey for free',
    price: '$0.00',
    features: [
      'Access to all AI-powered quizzes',
      'Level-based questions',
      '24/7 AI tutor support',
    ],
    cta: 'Get Started',
    popular: false,
    bgColor: 'bg-gradient-to-b from-gray-800 to-gray-900 border-gray-500/20',
    buttonColor:
      'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
    iconColor: 'text-gray-400',
    priceColor: 'text-gray-400',
    textColor: 'text-gray-200',
    descColor: 'text-gray-400',
    highlightColor: 'border-gray-500/30',
    badgeColor: 'bg-gray-600',
    glowColor: 'shadow-gray-500/10',
  },
  {
    title: 'Zap Pro',
    description: 'Step up your game with smart insights',
    price: '$9.99',
    features: [
      'Access to all AI-powered quizzes',
      'Level-based questions',
      'Personalized Questions',
      'Progress tracking & analytics',
      '24/7 AI tutor support',
    ],
    cta: 'Choose This Plan',
    popular: true,
    bgColor: 'bg-gradient-to-b from-gray-800 to-gray-900 border-blue-500/20',
    buttonColor:
      'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    iconColor: 'text-blue-400',
    priceColor: 'text-blue-400',
    textColor: 'text-gray-200',
    descColor: 'text-gray-400',
    highlightColor: 'border-blue-500/30',
    badgeColor: 'bg-blue-600',
    glowColor: 'shadow-blue-500/20',
  },
  {
    title: 'Zap Elite',
    description: 'Next-level learning. Learn like never before.',
    price: '$14.99',
    features: [
      'Access to all AI-powered quizzes',
      'Level-based questions',
      'Personalized Questions',
      'Progress tracking & analytics',
      'Personalized learning path',
      '24/7 AI tutor support',
    ],
    cta: 'Choose This Plan',
    popular: false,
    bgColor: 'bg-gradient-to-b from-gray-800 to-gray-900 border-amber-500/20',
    buttonColor:
      'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
    iconColor: 'text-amber-400',
    priceColor: 'text-amber-400',
    textColor: 'text-gray-200',
    descColor: 'text-gray-400',
    highlightColor: 'border-amber-500/30',
    badgeColor: 'bg-amber-600',
    glowColor: 'shadow-amber-500/10',
  },
];

const PricingPlan = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch user information to get subscription status
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosSecure.get(`/userInfo`);
        setUserInfo(res.data);
      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    };

    user && fetchUserInfo();
  }, [user]);

  // Determine button text and behavior based on current subscription
  const getButtonContent = planTitle => {
    const planName = planTitle.replace('Zap ', '');
    // Default to "Free" for new users with no subscription
    const currentSubscription = userInfo?.userInfo?.subscription || 'Free';

    // If the plan matches the user's current subscription
    if (
      (planName === 'Free' && currentSubscription === 'Free') ||
      planName === currentSubscription
    ) {
      return {
        text: `You're a ${planName} user!`,
        disabled: true,
        className: 'bg-gray-600 text-gray-300 cursor-not-allowed',
      };
    }

    // For Free users, show "Choose This Plan" for Pro/Elite
    if (currentSubscription === 'Free' && planName !== 'Free') {
      return {
        text: 'Choose This Plan',
        disabled: false,
        className: pricingPlans.find(p => p.title === planTitle).buttonColor,
      };
    }

    // For Pro/Elite users, show "Switch to [Plan]" for other plans
    return {
      text: `Switch to ${planName}`,
      disabled: false,
      className: pricingPlans.find(p => p.title === planTitle).buttonColor,
    };
  };

  return (
    <div className="pt-40 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16">
          <h2 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-center mb-4">
            Pricing Plans
          </h2>

          <p className="text-xl text-gray-400 text-center">
            Choose the plan that fits your learning journey
          </p>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => {
              const { text, disabled, className } = getButtonContent(
                plan.title
              );
              return (
                <div
                  key={index}
                  className={`${plan.bgColor} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border ${plan.highlightColor} relative transform hover:-translate-y-1 flex flex-col ${plan.glowColor} hover:shadow-lg`}
                >
                  {plan.popular && (
                    <div
                      className={`absolute top-0 right-0 ${plan.badgeColor} text-white text-sm font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl`}
                    >
                      Most Popular
                    </div>
                  )}
                  <div className="px-8 py-12 flex flex-col flex-grow">
                    <h3
                      className={`font-secondary text-4xl font-bold ${plan.textColor}`}
                    >
                      {plan.title}
                    </h3>
                    <p className={`mt-2 ${plan.descColor}`}>
                      {plan.description}
                    </p>
                    <div className="mt-6">
                      <span
                        className={`text-5xl font-semibold ${plan.priceColor}`}
                      >
                        {plan.price}
                      </span>
                      <span className="text-base font-medium text-gray-400">
                        /month
                      </span>
                    </div>
                    <ul className="mt-8 space-y-4 flex-grow">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className={`${plan.iconColor} text-xl`}>✦</span>
                          <span className={`ml-3 ${plan.textColor}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {disabled ? (
                      <div
                        className={`mt-8 w-full ${className} text-white py-4 px-6 rounded-xl font-semibold text-lg text-center`}
                      >
                        {text}
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          navigate('/checkout', {
                            state: { plan: plan.title.replace('Zap ', '') },
                          })
                        }
                        className={`mt-8 w-full ${className} text-white py-4 px-6 rounded-xl transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg`}
                      >
                        {text}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;

import React from 'react';

const pricingPlans = [
  {
    title: "Monthly Plan",
    description: "Flexible monthly access",
    price: "$19.99",
    features: [
      "Access to all AI-powered quizzes",
      "Level-based questions",
      "24/7 AI tutor support",
    ],
    cta: "Choose This Plan",
    popular: false,
    bgColor: "bg-gradient-to-b from-amber-100 to-amber-50",
    buttonColor: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
    iconColor: "text-amber-500",
    priceColor: "text-amber-600",
  },
  {
    title: "Quarterly Plan",
    description: "Save 20% with quarterly billing",
    price: "$15.99",
    features: [
      "Access to all AI-powered quizzes",
      "Level-based questions",
      "24/7 AI tutor support",
      "Progress tracking & analytics",
    ],
    cta: "Choose This Plan",
    popular: true,
    bgColor: "bg-gradient-to-b from-emerald-100 to-emerald-50",
    buttonColor: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
    iconColor: "text-emerald-500",
    priceColor: "text-emerald-600",
    highlightColor: "border-emerald-500",
    badgeColor: "bg-emerald-500",
  },
  {
    title: "Annual Plan",
    description: "Best value with 4 months free",
    price: "$12.99",
    features: [
      "Access to all AI-powered quizzes",
      "Level-based questions",
      "24/7 AI tutor support",
      "Progress tracking & analytics",
      "Personalized learning path",
    ],
    cta: "Choose This Plan",
    popular: false,
    bgColor: "bg-gradient-to-b from-blue-100 to-blue-50",
    buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    iconColor: "text-blue-500",
    priceColor: "text-blue-600",
  },
];

const PricingPlan = () => {
  return (
    <div className="pt-40 bg-gradient-to-br from-huf-purple/40 to-sky-200/20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-purple-800 text-center mb-4">Pricing Plans</h2>
          <p className="text-xl text-purple-600 text-center">Choose the plan that fits your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`${plan.bgColor} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
                plan.popular ? `${plan.highlightColor || "border-emerald-500"}` : "border-transparent"
              } relative transform hover:-translate-y-1 flex flex-col`}
            >
              {plan.popular && (
                <div className={`absolute top-0 right-0 ${plan.badgeColor || "bg-emerald-500"} text-white text-sm font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl`}>
                  Most Popular
                </div>
              )}
              <div className="px-8 py-12 flex flex-col flex-grow">
                <h3 className="font-secondary text-4xl font-bold text-gray-800">{plan.title}</h3>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                <div className="mt-6">
                  <span className={`text-5xl font-semibold ${plan.priceColor}`}>{plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </div>
                <ul className="mt-8 space-y-4 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className={`${plan.iconColor} text-xl`}>✦</span>
                      <span className="ml-3 text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`mt-8 w-full ${plan.buttonColor} text-white py-4 px-6 rounded-xl transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg`}>
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
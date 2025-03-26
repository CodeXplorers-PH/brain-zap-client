import React from 'react';
import { 
  User, 
  Brain, 
  Target, 
  TrendingUp, 
  Zap, 
  Shield 
} from 'lucide-react';

const HowItWorks = () => {
  const processSteps = [
    {
      icon: <User className="w-12 h-12 text-primary-content" />,
      title: "Personalized Onboarding",
      description: "Create a smart profile that adapts to your unique learning style and goals.",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: <Brain className="w-12 h-12 text-primary-content" />,
      title: "AI-Powered Assessments",
      description: "Take quizzes that dynamically adjust to your skill level in real-time.",
      gradient: "from-teal-500 to-blue-600"
    },
    {
      icon: <Target className="w-12 h-12 text-primary-content" />,
      title: "Comprehensive Feedback",
      description: "AI insights into your strengths, weaknesses, and growth strategies.",
      gradient: "from-pink-500 to-rose-600"
    }
  ];


  return (
    <section className="bg-neutral text-neutral-content py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Unlock Your Potential with BRAINZAP
          </h2>
          <p className=" text-neutral-content/80 max-w-2xl mx-auto">
            Experience personalized, AI-driven learning that adapts to your unique journey and transforms your skills.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {processSteps.map((step, index) => (
            <div 
              key={step.title} 
              className={`relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br ${step.gradient} transform transition-all hover:scale-105`}
            >
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <div className="relative p-8 text-white">
                <div className="mb-6 flex justify-center">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">
                  Step {index + 1}: {step.title}
                </h3>
                <p className="text-center opacity-80">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
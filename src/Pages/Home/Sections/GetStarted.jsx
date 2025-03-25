import React from 'react';
import { 
  UserPlus, 
  Brain, 
  Rocket, 
  Target, 
  TrendingUp, 
  Shield 
} from 'lucide-react';

const Started = () => {
  const startSteps = [
    {
      icon: <UserPlus className="w-12 h-12 text-primary-content" />,
      title: "Create Your Account",
      description: "Sign up in seconds with our streamlined, secure registration process.",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: <Brain className="w-12 h-12 text-primary-content" />,
      title: "Personalize Your Profile",
      description: "Tell us about your learning goals, interests, and skill levels.",
      gradient: "from-teal-500 to-blue-600"
    },
    {
      icon: <Rocket className="w-12 h-12 text-primary-content" />,
      title: "Start Your Learning Journey",
      description: "Dive into AI-powered quizzes tailored just for you, anytime, anywhere.",
      gradient: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <section className="bg-neutral text-neutral-content py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-neutral-content/80 max-w-2xl mx-auto">
            Embark on your personalized learning adventure with BrainZap. Our intuitive platform makes starting your educational journey effortless and exciting.
          </p>
        </div>

        {/* Start Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {startSteps.map((step, index) => (
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

        {/* Call to Action */}
        
      </div>
    </section>
  );
};

export default Started;
import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Layers, 
  Target, 
  Settings, 
  Lightbulb, 
  Award 
} from 'lucide-react';

const Features = () => {
  const featuresData = [
    {
      id: 1,
      icon: <Zap className="w-8 h-8 text-primary-content" />,
      title: "AI-Powered Quiz Generation",
      description: "Create dynamic, intelligent quizzes that adapt to your learning style in real-time.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      icon: <Layers className="w-8 h-8 text-primary-content" />,
      title: "Custom Quiz Builder",
      description: "Craft personalized quizzes tailored to your specific learning goals and interests.",
      gradient: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      icon: <Target className="w-8 h-8 text-primary-content" />,
      title: "Adaptive Learning Paths",
      description: "Intelligent recommendations that evolve based on your performance and progress.",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      id: 4,
      icon: <Settings className="w-8 h-8 text-primary-content" />,
      title: "Advanced Customization",
      description: "Fine-tune quiz difficulty, topics, and learning objectives with precision.",
      gradient: "from-orange-500 to-yellow-600"
    }
  ];

  return (
    <section className="bg-neutral text-neutral-content py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Make Your Quiz, Your Way
          </h2>
          <p className="text-neutral-content/80 max-w-2xl mx-auto">
            Unleash the power of AI-driven quiz creation with BrainZap. Design, customize, and transform your learning experience with intuitive tools that adapt to your unique needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {featuresData.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br ${feature.gradient} transform transition-all hover:scale-105`}
            >
              <div className="absolute inset-0 bg-black opacity-20"></div>
              <div className="relative p-8 text-white h-full flex flex-col">
                <div className="mb-6 flex items-center space-x-4">
                  {feature.icon}
                  <h3 className="text-2xl font-bold">
                    {feature.title}
                  </h3>
                </div>
                <p className="opacity-80 flex-grow">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="grid md:grid-cols-2 items-center gap-12">
          {/* Image Container */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 opacity-30 blur-2xl rounded-2xl" />
            <div className="relative z-10 p-4 bg-neutral-focus rounded-2xl shadow-2xl">
              <img
                src="/feature.png"
                alt="BrainZap Quiz Creation"
                className="rounded-xl shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>

          {/* Feature Highlights */}
          <div>
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Revolutionize Your Learning
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: <Lightbulb className="text-yellow-500 w-10 h-10" />,
                  title: "Intelligent Design",
                  description: "Our AI understands your learning style and creates perfectly tailored quizzes."
                },
                {
                  icon: <Award className="text-green-500 w-10 h-10" />,
                  title: "Expert-Level Customization",
                  description: "Drill down to the exact skills and knowledge you want to improve."
                }
              ].map((highlight) => (
                <div key={highlight.title} className="flex items-center space-x-4">
                  {highlight.icon}
                  <div>
                    <h4 className="font-bold text-xl">{highlight.title}</h4>
                    <p className="text-neutral-content/80">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
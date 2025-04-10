import Button from '@/components/ui/Button';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HyperText } from '@/components/magicui/hyper-text';
import PersonalizedQuiz from './PersonalizedQuiz';

const categories = [
  {
    title: 'JavaScript',
    description: 'Test your knowledge of JavaScript fundamentals and concepts.',
    buttonText: 'Start Quiz',
    icon: '🟨',
    type: 'Web Development',
  },
  {
    title: 'React',
    description:
      'Learn and test your React skills with quizzes on components, hooks, and more.',
    buttonText: 'Start Quiz',
    icon: '⚛️',
    type: 'Web Development',
  },
  {
    title: 'HTML',
    description: 'Test your knowledge of HTML basics and advanced concepts.',
    buttonText: 'Start Quiz',
    icon: '🌐',
    type: 'Web Development',
  },
  {
    title: 'CSS',
    description: 'Challenge yourself with CSS styling and layout concepts.',
    buttonText: 'Start Quiz',
    icon: '🎨',
    type: 'Web Development',
  },
  {
    title: 'Python',
    description:
      'Dive into Python programming with fun and interactive quizzes.',
    buttonText: 'Start Quiz',
    icon: '🐍',
    type: 'Backend Development',
  },
  {
    title: 'Node.js',
    description:
      'Test your Node.js skills with backend server programming concepts.',
    buttonText: 'Start Quiz',
    icon: '🟩',
    type: 'Backend Development',
  },
  {
    title: 'Java',
    description:
      'Assess your Java skills with object-oriented programming questions.',
    buttonText: 'Start Quiz',
    icon: '☕',
    type: 'Backend Development',
  },
  {
    title: 'C#',
    description:
      'Test your C# skills, from .NET development to game programming.',
    buttonText: 'Start Quiz',
    icon: '🎮',
    type: 'Backend Development',
  },
  {
    title: 'Swift',
    description:
      'Challenge yourself with Swift programming for iOS development.',
    buttonText: 'Start Quiz',
    icon: '🍏',
    type: 'Mobile Development',
  },
  {
    title: 'Kotlin',
    description:
      'Evaluate your Kotlin expertise for Android and backend development.',
    buttonText: 'Start Quiz',
    icon: '📱',
    type: 'Mobile Development',
  },
  {
    title: 'C++',
    description:
      'Challenge yourself with C++ questions covering algorithms & logic.',
    buttonText: 'Start Quiz',
    icon: '💻',
    type: 'General Programming',
  },
  {
    title: 'Go',
    description:
      'Improve your Go (Golang) expertise with performance-based questions.',
    buttonText: 'Start Quiz',
    icon: '🐹',
    type: 'General Programming',
  },
  {
    title: 'Rust',
    description: 'Test your memory-safe programming knowledge in Rust.',
    buttonText: 'Start Quiz',
    icon: '🦀',
    type: 'General Programming',
  },
  {
    title: 'PHP',
    description: 'Test your PHP skills for server-side web development.',
    buttonText: 'Start Quiz',
    icon: '🐘',
    type: 'Web Development',
  },
  {
    title: 'Ruby',
    description: 'Improve your Ruby knowledge, including Rails development.',
    buttonText: 'Start Quiz',
    icon: '💎',
    type: 'Web Development',
  },
  {
    title: 'SQL',
    description: 'Enhance your database management skills with SQL quizzes.',
    buttonText: 'Start Quiz',
    icon: '🗄️',
    type: 'Database Management',
  },
  {
    title: 'Shell Scripting',
    description: 'Test your Bash and Shell scripting automation skills.',
    buttonText: 'Start Quiz',
    icon: '📜',
    type: 'General Programming',
  },
];

const QuizCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredCard, setHoveredCard] = useState(null);

  const categoryColors = {
    'Web Development': 'from-indigo-600 to-purple-600',
    'Backend Development': 'from-blue-600 to-cyan-500',
    'Mobile Development': 'from-emerald-500 to-teal-600',
    'Database Management': 'from-amber-500 to-orange-500',
    'General Programming': 'from-violet-600 to-indigo-500',
  };

  const filteredCategories =
    selectedCategory === 'All'
      ? categories
      : categories.filter(category => category.type === selectedCategory);

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <HyperText className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-3">
            Choose Your Quiz
          </HyperText>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-gray-400 max-w-2xl mx-auto">
            Select a category to test your programming knowledge with our
            interactive quizzes
          </span>
        </motion.p>
      </div>

      {/* Personalized Quiz */}
      <PersonalizedQuiz />

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <select
              className="appearance-none pl-4 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {Object.keys(categoryColors).map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <Link
              to={`/quiz/${category.title.toLowerCase()}`}
              key={index}
              className={`relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-lg group`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Accent */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
                  categoryColors[category.type]
                }`}
              ></div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-gradient-to-br ${
                      categoryColors[category.type]
                    } text-white`}
                  >
                    <span className="text-xl font-bold">
                      {category.title.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {category.title}
                    </h2>
                    <p className="text-gray-400 mt-1 text-sm">
                      {category.type}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 mt-4 text-sm">
                  {category.description}
                </p>

                <div className="mt-6 flex justify-between items-center">
                  <div></div>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-white transition-colors">
                    Start Quiz
                  </button>
                </div>
              </div>

              {/* Hover Effect */}
              {hoveredCard === index && (
                <div
                  className={`absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-r ${
                    categoryColors[category.type]
                  }`}
                ></div>
              )}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizCategories;

import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const categories = [
  {
    title: "JavaScript",
    description: "Test your knowledge of JavaScript fundamentals and concepts.",
    buttonText: "Start Quiz",
    icon: "🟨",
    type: "Web Development",
  },
  {
    title: "React",
    description:
      "Learn and test your React skills with quizzes on components, hooks, and more.",
    buttonText: "Start Quiz",
    icon: "⚛️",
    type: "Web Development",
  },
  {
    title: "HTML",
    description: "Test your knowledge of HTML basics and advanced concepts.",
    buttonText: "Start Quiz",
    icon: "🌐",
    type: "Web Development",
  },
  {
    title: "CSS",
    description: "Challenge yourself with CSS styling and layout concepts.",
    buttonText: "Start Quiz",
    icon: "🎨",
    type: "Web Development",
  },
  {
    title: "Python",
    description:
      "Dive into Python programming with fun and interactive quizzes.",
    buttonText: "Start Quiz",
    icon: "🐍",
    type: "Backend Development",
  },
  {
    title: "Node.js",
    description:
      "Test your Node.js skills with backend server programming concepts.",
    buttonText: "Start Quiz",
    icon: "🟩",
    type: "Backend Development",
  },
  {
    title: "Java",
    description:
      "Assess your Java skills with object-oriented programming questions.",
    buttonText: "Start Quiz",
    icon: "☕",
    type: "Backend Development",
  },
  {
    title: "C#",
    description:
      "Test your C# skills, from .NET development to game programming.",
    buttonText: "Start Quiz",
    icon: "🎮",
    type: "Backend Development",
  },
  {
    title: "Swift",
    description:
      "Challenge yourself with Swift programming for iOS development.",
    buttonText: "Start Quiz",
    icon: "🍏",
    type: "Mobile Development",
  },
  {
    title: "Kotlin",
    description:
      "Evaluate your Kotlin expertise for Android and backend development.",
    buttonText: "Start Quiz",
    icon: "📱",
    type: "Mobile Development",
  },
  {
    title: "C++",
    description:
      "Challenge yourself with C++ questions covering algorithms & logic.",
    buttonText: "Start Quiz",
    icon: "💻",
    type: "General Programming",
  },
  {
    title: "Go",
    description:
      "Improve your Go (Golang) expertise with performance-based questions.",
    buttonText: "Start Quiz",
    icon: "🐹",
    type: "General Programming",
  },
  {
    title: "Rust",
    description: "Test your memory-safe programming knowledge in Rust.",
    buttonText: "Start Quiz",
    icon: "🦀",
    type: "General Programming",
  },
  {
    title: "PHP",
    description: "Test your PHP skills for server-side web development.",
    buttonText: "Start Quiz",
    icon: "🐘",
    type: "Web Development",
  },
  {
    title: "Ruby",
    description: "Improve your Ruby knowledge, including Rails development.",
    buttonText: "Start Quiz",
    icon: "💎",
    type: "Web Development",
  },
  {
    title: "SQL",
    description: "Enhance your database management skills with SQL quizzes.",
    buttonText: "Start Quiz",
    icon: "🗄️",
    type: "Database Management",
  },
  {
    title: "Shell Scripting",
    description: "Test your Bash and Shell scripting automation skills.",
    buttonText: "Start Quiz",
    icon: "📜",
    type: "General Programming",
  },
];

const QuizCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredCategories =
    selectedCategory === "All"
      ? categories
      : categories.filter((category) => category.type === selectedCategory);

  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-950 mb-10">
        Select Your Preferred Programming Language
      </h1>

      {/* Category Filter */}
      <div className="mb-6 flex justify-end">
        <select
          className="p-3 bg-purple-900/10 border border-gray-300 rounded-lg"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">All Categories</option>
          <option value="Web Development">Web Development</option>
          <option value="Backend Development">Backend Development</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="Database Management">Database Management</option>
          <option value="General Programming">General Programming</option>
        </select>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <div
            key={index}
            className="relative p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-lg border border-white/20 
              transition-all duration-300 hover:scale-105 hover:border-white/50"
          >
            <h2 className="text-xl font-bold text-gray-600 flex items-center gap-2">
              {category?.icon} {category?.title}
            </h2>
            <p className="text-gray-200 mt-2">{category.description}</p>
            <Link to={`/quiz/${category?.title.toLowerCase()}`}>
              <Button className={"mt-4"}>{category.buttonText}</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCategories;

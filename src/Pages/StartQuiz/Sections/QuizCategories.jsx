import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/useAuthContext";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categories = [
  {
    title: "JavaScript",
    link: "javascript",
    description: "Test your knowledge of JavaScript fundamentals and concepts.",
    buttonText: "Start Quiz",
    icon: "🟨",
    type: "Web Development",
  },
  {
    title: "React",
    link: "react",
    description:
      "Learn and test your React skills with quizzes on components, hooks, and more.",
    buttonText: "Start Quiz",
    icon: "⚛️",
    type: "Web Development",
  },
  {
    title: "HTML",
    link: "html",
    description: "Test your knowledge of HTML basics and advanced concepts.",
    buttonText: "Start Quiz",
    icon: "🌐",
    type: "Web Development",
  },
  {
    title: "CSS",
    link: "css",
    description: "Challenge yourself with CSS styling and layout concepts.",
    buttonText: "Start Quiz",
    icon: "🎨",
    type: "Web Development",
  },
  {
    title: "Python",
    link: "python",
    description:
      "Dive into Python programming with fun and interactive quizzes.",
    buttonText: "Start Quiz",
    icon: "🐍",
    type: "Backend Development",
  },
  {
    title: "Node.js",
    link: "node-js",
    description:
      "Test your Node.js skills with backend server programming concepts.",
    buttonText: "Start Quiz",
    icon: "🟩",
    type: "Backend Development",
  },
  {
    title: "Java",
    link: "java",
    description:
      "Assess your Java skills with object-oriented programming questions.",
    buttonText: "Start Quiz",
    icon: "☕",
    type: "Backend Development",
  },
  {
    title: "C#",
    link: "c-sharp",
    description:
      "Test your C# skills, from .NET development to game programming.",
    buttonText: "Start Quiz",
    icon: "🎮",
    type: "Backend Development",
  },
  {
    title: "Swift",
    link: "swift",
    description:
      "Challenge yourself with Swift programming for iOS development.",
    buttonText: "Start Quiz",
    icon: "🍏",
    type: "Mobile Development",
  },
  {
    title: "Kotlin",
    link: "kotlin",
    description:
      "Evaluate your Kotlin expertise for Android and backend development.",
    buttonText: "Start Quiz",
    icon: "📱",
    type: "Mobile Development",
  },
  {
    title: "C++",
    link: "c-plus-plus",
    description:
      "Challenge yourself with C++ questions covering algorithms & logic.",
    buttonText: "Start Quiz",
    icon: "💻",
    type: "General Programming",
  },
  {
    title: "Go",
    link: "go-lang",
    description:
      "Improve your Go (Golang) expertise with performance-based questions.",
    buttonText: "Start Quiz",
    icon: "🐹",
    type: "General Programming",
  },
  {
    title: "Rust",
    link: "rust",
    description: "Test your memory-safe programming knowledge in Rust.",
    buttonText: "Start Quiz",
    icon: "🦀",
    type: "General Programming",
  },
  {
    title: "PHP",
    link: "php",
    description: "Test your PHP skills for server-side web development.",
    buttonText: "Start Quiz",
    icon: "🐘",
    type: "Web Development",
  },
  {
    title: "Ruby",
    link: "ruby",
    description: "Improve your Ruby knowledge, including Rails development.",
    buttonText: "Start Quiz",
    icon: "💎",
    type: "Web Development",
  },
  {
    title: "SQL",
    link: "sql",
    description: "Enhance your database management skills with SQL quizzes.",
    buttonText: "Start Quiz",
    icon: "🗄️",
    type: "Database Management",
  },
  {
    title: "Shell Scripting",
    link: "shell-scripting",
    description: "Test your Bash and Shell scripting automation skills.",
    buttonText: "Start Quiz",
    icon: "📜",
    type: "General Programming",
  },
];

const generateDifficulty = (level) => {
  const difficulty =
    level > 8
      ? "so_hard"
      : level <= 8 && level > 6
      ? "hard"
      : level <= 6 && level > 4
      ? "medium"
      : level <= 4 && level > 2
      ? "easy"
      : "so_easy";

  return difficulty;
};

const QuizCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("medium");
  const [quizzesNumber, setQuizzesNumber] = useState(10);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [userLevel, setUserLevel] = useState(0);
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const categoryColors = {
    "Web Development": "from-indigo-600 to-purple-600",
    "Backend Development": "from-blue-600 to-cyan-500",
    "Mobile Development": "from-emerald-500 to-teal-600",
    "Database Management": "from-amber-500 to-orange-500",
    "General Programming": "from-violet-600 to-indigo-500",
  };

  const filteredCategories =
    selectedCategory === "All"
      ? categories
      : categories.filter((category) => category.type === selectedCategory);

  useEffect(() => {
    axiosPublic
      .get(`/userInfo/${user.email}`)
      .then((res) => setUserLevel(res?.data?.level?.level));
  }, [axiosPublic, user.email]);

  const handleSelectType = (category, quizzesType) => {
    navigate(
      `/quiz/${category.link}?difficulty=${generateDifficulty(
        userLevel
      )}&quizzesNumber=10&type=${quizzesType}`
    );
  };

  const handleQuizCardClick = (category) => {
    setSelectedQuiz(category);
    setOpen(true);
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-3">
          Choose Your Quiz
        </h1>
        <p>
          <span className="text-gray-400 max-w-2xl mx-auto">
            Select a category to test your programming knowledge with our
            interactive quizzes
          </span>
        </p>
      </div>

      <div className="mb-10 flex justify-center items-center gap-4">
        {/* Category Filter */}
        <div className="relative">
          <select
            className="w-full appearance-none pl-4 pr-2 md:pr-6 lg:pr-8 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {Object.keys(categoryColors).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute top-4 right-0 flex items-center px-2 text-gray-400">
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

        {/* Create Personalize quiz button */}
        <button
          onClick={() => navigate("/create_quiz")}
          className="px-3 sm:px-6 md:px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-colors"
          type="submit"
        >
          Create Quiz
        </button>
      </div>

      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-[#1f1f3a] text-white rounded-xl border border-purple-500 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-purple-400">
                Select Quiz Type
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Please choose the type of quiz you want to create.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 mt-6">
              <button
                onClick={() => {
                  handleSelectType(selectedQuiz, "tf");
                  setOpen(false);
                }}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg font-bold hover:from-indigo-600 hover:to-purple-600 transition"
              >
                True / False
              </button>
              <button
                onClick={() => {
                  handleSelectType(selectedQuiz, "mc");
                  setOpen(false);
                }}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg font-bold hover:from-pink-600 hover:to-red-600 transition"
              >
                Multiple Choice
              </button>
            </div>
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category, index) => (
            <div
              onClick={() => handleQuizCardClick(category)}
              key={index}
              className={`relative cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-lg group`}
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
                  <button
                    onClick={() => localStorage.removeItem(`history_posted`)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium text-white transition-colors"
                  >
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizCategories;

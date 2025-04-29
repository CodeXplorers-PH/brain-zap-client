import { useState } from "react";
import { BsStars } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PersonalizedQuizSection = ({ hasSubscription }) => {
  const [quizzesNumber, setQuizzesNumber] = useState(10);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTopic.trim()) {
      return; // Prevent submission if topic is empty
    }
    navigate(
      `/quiz/${selectedTopic.toLowerCase().replace(/\s+/g, "-")}?difficulty=${difficulty}&quizzesNumber=${quizzesNumber}`
    );
  };

  const difficultyOptions = [
    { value: "so_easy", label: "Beginner" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Intermediate" },
    { value: "hard", label: "Advanced" },
    { value: "so_hard", label: "Expert" }
  ];

  return (
    <div className="max-w-3xl mx-auto mb-12 px-4 relative">
      <div
        className={`rounded-xl overflow-hidden relative ${
          !hasSubscription ? "filter blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-slate-900/80 opacity-80"></div>
        
        {/* Minimal Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600 rounded-full mix-blend-lighten opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600 rounded-full mix-blend-lighten opacity-10"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-3" 
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}>
        </div>

        <div className="relative p-6 md:p-8 border border-gray-800/30 rounded-xl bg-gray-900/30 backdrop-blur-sm shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 mb-1">
                Create Your Personalized Quiz
              </h2>
              <p className="text-gray-400 text-sm">
                Customize your own quiz with topics you want to master
              </p>
            </div>
            <div className="mt-3 md:mt-0">
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-1 rounded-full text-xs font-medium text-white inline-flex items-center">
                <BsStars className="mr-1" />
                Premium Feature
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Topic Input - Minimalistic */}
              <div className="space-y-1.5">
                <label
                  className="text-gray-300 font-medium text-xs flex items-center"
                  htmlFor="topic"
                >
                  <svg className="w-3 h-3 mr-1.5 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.25 7C9.25 8.24264 8.24264 9.25 7 9.25C5.75736 9.25 4.75 8.24264 4.75 7C4.75 5.75736 5.75736 4.75 7 4.75C8.24264 4.75 9.25 5.75736 9.25 7Z" fill="currentColor"/>
                    <path d="M9.25 17C9.25 18.2426 8.24264 19.25 7 19.25C5.75736 19.25 4.75 18.2426 4.75 17C4.75 15.7574 5.75736 14.75 7 14.75C8.24264 14.75 9.25 15.7574 9.25 17Z" fill="currentColor"/>
                    <path d="M14.75 7C14.75 8.24264 15.7574 9.25 17 9.25C18.2426 9.25 19.25 8.24264 19.25 7C19.25 5.75736 18.2426 4.75 17 4.75C15.7574 4.75 14.75 5.75736 14.75 7Z" fill="currentColor"/>
                    <path d="M14.75 17C14.75 18.2426 15.7574 19.25 17 19.25C18.2426 19.25 19.25 18.2426 19.25 17C19.25 15.7574 18.2426 14.75 17 14.75C15.7574 14.75 14.75 15.7574 14.75 17Z" fill="currentColor"/>
                  </svg>
                  Topic
                </label>
                <div className="relative">
                  <input
                    className="w-full appearance-none pl-3 pr-8 py-2.5 bg-gray-800/50 border border-gray-700/30 rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-transparent transition-all placeholder-gray-500 text-sm"
                    name="topic"
                    id="topic"
                    type="text"
                    placeholder="Enter quiz topic"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Difficulty Select - Minimalistic */}
              <div className="space-y-1.5">
                <label
                  className="text-gray-300 font-medium text-xs flex items-center"
                  htmlFor="difficulty"
                >
                  <svg className="w-3 h-3 mr-1.5 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18M7.75 9.75V14.25M16.25 9.75V14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Difficulty
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none pl-3 pr-8 py-2.5 bg-gray-800 border border-gray-700/30 rounded-lg text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-transparent transition-all cursor-pointer text-sm"
                    name="difficulty"
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    {difficultyOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg
                      className="w-4 h-4"
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
            </div>

            {/* Questions Slider - Minimalist */}
            <div className="py-1">
              <div className="flex justify-between items-center mb-2">
                <label
                  className="text-gray-300 font-medium text-xs flex items-center"
                  htmlFor="questions"
                >
                  <svg className="w-3 h-3 mr-1.5 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.25 15L12 18.75L15.75 15M8.25 9L12 5.25L15.75 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Number of Questions
                </label>
                <div className="bg-indigo-900/30 rounded-md py-0.5 px-2 text-sm font-medium text-indigo-300 border border-indigo-700/20">
                  {quizzesNumber}
                </div>
              </div>
              
              <div className="relative mt-1 px-1">
                <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                  <div className="h-1 w-full bg-gray-700/70 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${(quizzesNumber - 5) * (100 / 15)}%` }}
                    ></div>
                  </div>
                </div>
                
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={quizzesNumber}
                  onChange={(e) => setQuizzesNumber(Number(e.target.value))}
                  className="w-full h-1 appearance-none cursor-pointer opacity-0 z-10 relative"
                  id="questions"
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-1 px-1">
                <span>5</span>
                <span className="text-xs text-gray-500">Questions</span>
                <span>20</span>
              </div>
            </div>

            {/* Generate Button - Keeping the design you liked */}
            <button
              className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 rounded-lg text-white font-medium transition-all duration-300 shadow-md shadow-indigo-900/20 flex items-center justify-center gap-2 group mt-3"
              type="submit"
            >
              <FiPlus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              Generate Custom Quiz
            </button>
          </form>
        </div>
      </div>

      {/* Subscription CTA Overlay - Minimalist */}
      {!hasSubscription && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-900/90 backdrop-blur-md p-6 rounded-xl border border-indigo-600/40 shadow-xl shadow-purple-900/10 max-w-xs text-center">
            <div className="mb-4 text-indigo-400 relative">
              <div className="absolute inset-0 bg-indigo-600/10 blur-md rounded-full"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 mx-auto relative"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Unlock Personalized Quizzes
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Upgrade to Pro or Elite to create custom quizzes tailored to your learning needs
            </p>
            <button
              onClick={() => navigate("/pricing")}
              className="w-full py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 rounded-lg text-white font-medium transition-all duration-300 shadow-md shadow-indigo-900/20 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4L19 7L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 7H10C7.23858 7 5 9.23858 5 12C5 14.7614 7.23858 17 10 17H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalizedQuizSection;
import useFormData from '@/hooks/useFormData';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalizedQuiz = ({
  categoryColors,
  selectedCategory,
  setSelectedCategory,
  setDifficulty,
  setQuizzesNumber,
}) => {
  const formData = useFormData();
  const navigate = useNavigate();

  const handleSubmitPersonalizedQuiz = e => {
    e.preventDefault();

    const { topic, difficulty, quizzesNumber } = formData(e.target);

    navigate(
      `/quiz/${topic}?difficulty=${difficulty}&quizzesNumber=${quizzesNumber}`
    );
  };

  return (
    <div className="mb-10">
      <form onSubmit={handleSubmitPersonalizedQuiz}>
        <div className="grid grid-cols-2 sm:grid-cols-4 items-center gap-4">
          {/* Category Filter */}
          <div className="relative">
            <label
              className="text-gray-300 font-medium ps-1"
              htmlFor="category"
            >
              Category :
            </label>
            <select
              className="w-full appearance-none pl-4 pr-8 py-3 mt-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
              name="category"
              id="category"
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

            <div className="pointer-events-none absolute bottom-3 right-0 flex items-center px-2 text-gray-400">
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

          {/* Quiz Topic */}
          <div>
            <label className="text-gray-300 font-medium ps-1" htmlFor="topic">
              Topic :
            </label>
            <input
              className="w-full appearance-none pl-4 pr-10 py-3 mt-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              name="topic"
              id="topic"
              type="text"
              defaultValue="Programming"
              placeholder="Quiz topic"
              required
            />
          </div>

          {/* Quiz difficulty */}
          <div className="relative">
            <label
              className="text-gray-300 font-medium ps-1"
              htmlFor="difficulty"
            >
              Difficulty :
            </label>
            <select
              onChange={e => setDifficulty(e.target.value)}
              className="w-full appearance-none pl-4 pe-8 py-3 mt-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
              name="difficulty"
              id="difficulty"
              defaultValue="medium"
              required
            >
              <option value="so_easy">So Easy</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="so_hard">So Hard</option>
            </select>

            <div className="pointer-events-none absolute bottom-3 right-0 flex items-center px-2 text-gray-400">
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

          {/* Quiz number */}
          <div>
            <label
              className="text-gray-300 font-medium ps-1"
              htmlFor="quizzesNumber"
            >
              Quizzes Number :
            </label>
            <input
              onChange={e => setQuizzesNumber(e.target.value)}
              className="w-full appearance-none px-4 py-3 mt-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              type="number"
              name="quizzesNumber"
              id="quizzesNumber"
              defaultValue={10}
              required
            />
          </div>
        </div>

        {/* Start quiz */}
        <div className="mt-6 flex justify-center">
          <button
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white transition-colors"
            type="submit"
          >
            Start Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalizedQuiz;

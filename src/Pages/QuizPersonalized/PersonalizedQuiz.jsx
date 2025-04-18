import React, { useEffect, useState } from 'react';
import { Slider } from 'radix-ui';
import { useNavigate } from 'react-router-dom';

const PersonalizedQuiz = () => {
  const [quizzesNumber, setQuizzesNumber] = useState(10);

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { topic, difficulty } = Object.fromEntries(formData.entries());

    navigate(
      `/quiz/${topic}?difficulty=${difficulty}&quizzesNumber=${quizzesNumber}`
    );
  };

  useEffect(() => {
    localStorage.removeItem('quiz_questions');
  });

  return (
    <div className="bg-gray-900 pt-36 pb-20 min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-3">
            Create a Quiz
          </h1>
          <p>
            <span className="text-gray-400 max-w-2xl mx-auto">
              Select the difficulty level and subject to generate your custom
              quiz.
            </span>
          </p>
        </div>

        {/* Personalized quiz Form */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-8 md:px-8 md:py-10 border border-gray-700 rounded-2xl shadow-xl flex flex-col gap-6"
        >
          {/* Quiz Topic */}
          <div>
            <label className="text-gray-300 font-medium ps-1" htmlFor="topic">
              Topic
            </label>
            <input
              className="w-full appearance-none pl-4 pr-10 py-2.5 mt-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              name="topic"
              id="topic"
              type="text"
              placeholder="Quiz topic"
              required
            />
            <p className="text-gray-400 mt-2">
              Select a topic area for your quiz questions.
            </p>
          </div>

          {/* Quiz difficulty */}
          <div className="relative">
            <label
              className="text-gray-300 font-medium ps-1"
              htmlFor="difficulty"
            >
              Difficulty
            </label>
            <select
              className="w-full appearance-none pl-4 pe-8 py-2.5 mt-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
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

            <div className="pointer-events-none absolute top-12 right-0 flex items-center px-2 text-gray-400">
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

            <p className="text-gray-400 mt-2">
              Choose how challenging you want your quiz to be.
            </p>
          </div>

          {/* Quiz number */}
          <div>
            <p className="text-gray-300 font-medium ps-1 mb-2">
              Quizzes Number: {quizzesNumber}
            </p>

            <Slider.Root
              className="relative flex h-5 w-full touch-none select-none items-center"
              defaultValue={[10]}
              min={5}
              max={20}
              step={1}
              onChange={e => setQuizzesNumber(Number(e.target.value))}
            >
              <Slider.Track className="relative h-[6px] grow rounded-full bg-gray-600">
                <Slider.Range className="absolute h-full rounded-full bg-purple-600" />
              </Slider.Track>
              <Slider.Thumb
                className="block size-4 rounded-full bg-gray-800 border-2 border-[#c27aff] shadow-[0_0_3px_3px_#9010fa] hover:shadow-[0_0_4px_4px_#9010fa] cursor-pointer outline-none transition-all duration-300"
                aria-label="Volume"
              />
            </Slider.Root>

            <p className="text-gray-400 mt-2">
              Choose between 5 and 20 questions.
            </p>
          </div>

          {/* Start quiz */}

          <button
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-colors"
            type="submit"
          >
            Generate Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalizedQuiz;

import useFormData from '@/hooks/useFormData';
import React from 'react';

const PersonalizedQuiz = () => {
  const formData = useFormData();

  const handleSubmitPersonalizedQuiz = e => {
    e.preventDefault();

    const { topic, difficulty, questions } = formData(e.target);

    console.log({ topic, difficulty, questions });
  };

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmitPersonalizedQuiz}
        className="flex items-center gap-4"
      >
        <input
          className="appearance-none pl-4 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          name="topic"
          id="topic"
          type="text"
          placeholder="Quiz topic"
          required
        />

        <select
          className="appearance-none pl-4 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
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

        <input
          className="appearance-none pl-4 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          type="number"
          name="questions"
          id="questions"
          defaultValue={10}
          required
        />

        <button
          className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white transition-colors"
          type="submit"
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default PersonalizedQuiz;

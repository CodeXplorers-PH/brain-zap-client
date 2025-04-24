import React from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const QuizHistoryTable = ({ userQuizHistory }) => {
  const navigate = useNavigate();

  // Handle View Quiz History
  const handleViewHistory = quiz => {
    const { category, answers, questions } = quiz;

    if (answers && questions) {
      localStorage.setItem('quiz_questions', JSON.stringify(questions));
      localStorage.setItem('userAnswers', JSON.stringify(answers));
      localStorage.setItem('history_posted', true);

      navigate(`/quiz/${category}/answer`);
    }
  };

  return (
    <table className="w-full">
      {/* Table Head */}
      <thead>
        <tr className="border-b border-gray-700">
          {['Quiz', 'Date', 'Score', 'Action'].map((tHead, index) => (
            <th
              key={index}
              className={`py-3 text-gray-400 font-medium ${
                index > 1 ? 'text-right' : 'text-left'
              }`}
            >
              {tHead}
            </th>
          ))}
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {userQuizHistory.map((quiz, index) => (
          <tr key={index} className="border-b border-gray-700/50">
            {/* Topic */}
            <td className="py-3 text-white text-left">
              {quiz?.category?.charAt(0).toUpperCase() +
                quiz?.category?.slice(1)}
            </td>
            {/* Date */}
            <td className="py-3 text-gray-400 text-left">
              {format(new Date(quiz?.date), 'EEEE, MMMM dd, yyyy')}
            </td>
            {/* Score */}
            <td className="py-3 text-right">
              <span
                className={`${
                  quiz.score >= 80
                    ? 'bg-green-500/20 text-green-400'
                    : quiz.score >= 50
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                } py-1 px-2 rounded-md`}
              >
                {quiz.score}%
              </span>
            </td>
            {/* View Button */}
            <td className="py-3 text-right">
              <button
                onClick={() => handleViewHistory(quiz)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-purple-400 transition-colors"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuizHistoryTable;

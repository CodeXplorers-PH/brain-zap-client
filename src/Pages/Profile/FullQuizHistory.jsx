import React from 'react';

const FullQuizHistory = ({
  user,
  userQuizHistory,
  handleViewHistory,
  format,
}) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6 text-center py-12">
      <h2 className="text-xl font-semibold text-white text-left mb-4">
        Quiz History
      </h2>
      {user && userQuizHistory?.length > 0 ? (
        <div className="overflow-x-auto">
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
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Quiz History
          </h2>
          <p className="text-gray-400">
            Complete quiz history would be displayed here.
          </p>
        </div>
      )}
    </div>
  );
};

export default FullQuizHistory;

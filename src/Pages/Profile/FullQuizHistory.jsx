import React from 'react';
import QuizHistoryTable from './QuizHistoryTable';

const FullQuizHistory = ({ user, userQuizHistory }) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6 text-center py-12">
      <h2 className="text-xl font-semibold text-white text-left mb-4">
        Quiz History
      </h2>
      {user && userQuizHistory?.length > 0 ? (
        <div className="overflow-x-auto">
          <QuizHistoryTable userQuizHistory={userQuizHistory} />
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

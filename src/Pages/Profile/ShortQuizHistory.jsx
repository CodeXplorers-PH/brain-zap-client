import React from 'react';
import QuizHistoryTable from './QuizHistoryTable';

const ShortQuizHistory = ({ userQuizHistory, setActiveTab }) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6 md:col-span-2">
      <h2 className="text-xl font-semibold text-white mb-4">
        Recent Performance
      </h2>

      <div className="overflow-x-auto">
        <QuizHistoryTable userQuizHistory={userQuizHistory?.slice(0, 5)} />
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => setActiveTab('history')}
          className="text-purple-400 hover:text-purple-300 text-sm font-medium"
        >
          View All History →
        </button>
      </div>
    </div>
  );
};

export default ShortQuizHistory;

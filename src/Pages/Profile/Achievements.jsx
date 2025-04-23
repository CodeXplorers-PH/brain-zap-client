import React from 'react';
import { Award, FileText } from 'lucide-react';

const Achievements = () => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Achievements</h2>
      <div className="space-y-4">
        <div className="flex items-center bg-gray-700/40 rounded-lg p-3">
          <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
            <Award size={24} className="text-purple-400" />
          </div>
          <div>
            <p className="text-white font-medium">Quiz Master</p>
            <p className="text-gray-400 text-sm">Completed 25+ quizzes</p>
          </div>
        </div>
        <div className="flex items-center bg-gray-700/40 rounded-lg p-3">
          <div className="bg-gray-600/20 p-2 rounded-lg mr-3">
            <FileText size={24} className="text-gray-400" />
          </div>
          <div>
            <p className="text-white font-medium">Perfect Score</p>
            <p className="text-gray-400 text-sm">Get 100% on any quiz (0/1)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;

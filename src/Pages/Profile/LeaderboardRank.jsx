import React from 'react';
import { Trophy } from 'lucide-react';

const LeaderboardRank = ({ userQuizHistory }) => {
    // Calculate total score
    const totalScore = userQuizHistory.reduce((sum, quiz) => sum + quiz.score, 0);
    const hasQuizzes = userQuizHistory.length > 0;

    // Static rank for now
    const rank = 1;
    const rankSuffix = rank => {
        if (rank === 1) return 'st';
        if (rank === 2) return 'nd';
        if (rank === 3) return 'rd';
        return 'th';
    };

    return (
        <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-white mb-4">Leaderboard Rank</h2>
            {hasQuizzes && totalScore > 0 ? (
                <div className="flex items-center gap-2">
                    <Trophy size={48} className="text-amber-400 mb-2" />
                    <p className="text-3xl font-bold text-white">
                        {rank}
                        <sup>{rankSuffix(rank)}</sup>
                    </p>
                </div>
            ) : (
                <div className="flex items-center text-center">
                    <Trophy size={48} className="text-gray-400 mb-2" />
                    <p className="text-gray-400 text-sm">
                        Give a quiz to be on the leaderboard!
                    </p>
                </div>
            )}
        </div>
    );
};

export default LeaderboardRank;
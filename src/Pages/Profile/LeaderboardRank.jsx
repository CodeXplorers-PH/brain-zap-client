import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import useUsers from '@/hooks/useUsers';

const LeaderboardRank = () => {
  const { user } = useAuth();
  const users = useUsers();
  const [rank, setRank] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (users?.success) {
      // Sort users by totalPoints in descending order
      const sortedUsers = users?.users
        .map(user => ({
          email: user.email,
          totalPoints: user.totalPoints || 0,
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints);

      // Find the current user's rank and totalPoints
      const userIndex = sortedUsers.findIndex(u => u.email === user.email);
      if (userIndex !== -1) {
        setRank(userIndex + 1); // Rank is 1-based (index + 1)
        setTotalPoints(sortedUsers[userIndex].totalPoints);
      } else {
        setRank(null);
        setTotalPoints(0);
      }
    }
    setLoading(false);
  }, [user, users]);

  const rankSuffix = rank => {
    if (rank === 1) return 'st';
    if (rank === 2) return 'nd';
    if (rank === 3) return 'rd';
    return 'th';
  };

  if (loading) {
    return (
      <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-white mb-4">
          Leaderboard Rank
        </h2>
        <div className="flex items-center justify-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6 flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold text-white mb-4">
        Leaderboard Rank
      </h2>
      {totalPoints > 0 ? (
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

import React, { useState, useEffect } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import ProfileTabs from './ProfileTabs';
import About from './About';
import Achievements from './Achievements';
import ShortQuizHistory from './ShortQuizHistory';
import FullQuizHistory from './FullQuizHistory';
import Settings from './Settings';
import TransactionHistory from './TransactionHistory';
import ProfileHeader from './ProfileHeader';
import AchievementTab from './AchievementTab';
import StreakCalendar from './StreakCalendar';
import LeaderboardRank from './LeaderboardRank';

const Profile = () => {
  const { user, userType } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const [userQuizHistory, setUserQuizHistory] = useState([]);

  const xpPoints = userQuizHistory.reduce((prev, curr) => prev + curr.score, 0);
  const totalScore = userQuizHistory.reduce((sum, quiz) => sum + quiz.score, 0);
  const avgScore = totalScore / userQuizHistory.length;

  const axiosSecure = useAxiosSecure();

  // Get History
  useEffect(() => {
    if (!user) return;

    axiosSecure.get(`/quiz_history`).then(res => {
      const history = res?.data || [];
      setUserQuizHistory(history);
    });
  }, [user]);

  // Sample stats - replace with actual data from your application
  const stats = {
    quizzesTaken: userQuizHistory?.length,
    totalPoints: xpPoints,
    avgScore: avgScore > 0 ? avgScore.toFixed(2) : 0,
    memberSince: user?.metadata?.creationTime
      ? new Date(user.metadata.creationTime).toLocaleDateString()
      : new Date().toLocaleDateString(),
    lastActive: 'Now',
  };

  return (
    <div className="pt-32 pb-16 px-4 min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader stats={stats} userType={userType} />

        {/* Tabs Navigation - Made Responsive */}
        <div className="overflow-x-auto no-scrollbar mb-2">
          <div className="flex space-x-2 min-w-max">
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        {/* Profile Content */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* About Section */}
            <About userType={userType} stats={stats} />

            {/* Achievement Section */}
            <Achievements
              xpPoints={xpPoints}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Streak Calendar */}
            <StreakCalendar userQuizHistory={userQuizHistory} />

            {/* Leaderboard Rank */}
            <LeaderboardRank userQuizHistory={userQuizHistory} />

            {/* Recent Performance */}
            <ShortQuizHistory
              userQuizHistory={userQuizHistory}
              setActiveTab={setActiveTab}
            />
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab === 'history' && (
          <FullQuizHistory user={user} userQuizHistory={userQuizHistory} />
        )}

        {activeTab === 'settings' && <Settings />}

        {/* Transaction history */}
        {activeTab === 'transactionHistory' && (
          <TransactionHistory user={user} />
        )}
        {/* Achievement Tab */}
        {activeTab === 'achievements' && <AchievementTab xpPoints={xpPoints} />}
      </div>
    </div>
  );
};

export default Profile;

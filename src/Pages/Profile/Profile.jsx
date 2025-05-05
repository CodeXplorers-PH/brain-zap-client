import React, { useEffect, useState } from 'react';
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
import useHistory from '@/hooks/useHistory';
import useStreak from '@/hooks/useStreak';
import useUsers from '@/hooks/useUsers';

const Profile = () => {
  const { user, userType } = useAuth();
  const userQuizHistory = useHistory();
  const { streak } = useStreak();
  const users = useUsers();
  const [activeTab, setActiveTab] = useState('profile');

  // Calculate XP points
  const xpPoints = userQuizHistory.reduce((prev, curr) => prev + curr.score, 0);
  const totalScore = userQuizHistory.reduce((sum, quiz) => sum + quiz.score, 0);
  const avgScore = totalScore / userQuizHistory.length || 0;

  // Calculate leaderboard rank
  let leaderboardRank = Infinity;
  if (users?.success) {
    const sortedUsers = users?.users
      .map(u => ({
        email: u.email,
        totalPoints: u.totalPoints || 0,
      }))
      .sort((a, b) => b.totalPoints - a.totalPoints);

    const userIndex = sortedUsers.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
      leaderboardRank = userIndex + 1; // Rank is 1-based
    }
  }

  // Calculate quizStats
  const quizStats = {
    quizzesTaken: userQuizHistory.length,
    perfectScores: userQuizHistory.filter(
      (quiz) => quiz.score === 100
    ).length,
    categoriesExplored: new Set(userQuizHistory.map((quiz) => quiz.category)).size,
    fastestTime: Math.min(
      ...userQuizHistory.map((quiz) => quiz.timeTaken || Infinity),
      Infinity
    ),
    streak: streak || 0,
    correctAnswers: userQuizHistory.reduce(
      (sum, quiz) => sum + (quiz.correctAnswers || 0),
      0
    ),
    leaderboardRank: leaderboardRank,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Profile | BrainZap';
  }, []);

  // Sample stats for ProfileHeader
  const stats = {
    quizzesTaken: quizStats.quizzesTaken,
    totalPoints: xpPoints,
    avgScore: avgScore.toFixed(2),
    memberSince: user?.metadata?.creationTime
      ? new Date(user.metadata.creationTime).toLocaleDateString()
      : new Date().toLocaleDateString(),
    lastActive: 'Now',
  };

  return (
    <>
      <div className="pt-32 pb-16 px-4 min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto">
          <ProfileHeader stats={stats} userType={userType} />
          <div className="overflow-x-auto no-scrollbar mb-2">
            <div className="flex space-x-2 min-w-max">
              <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <About userType={userType} stats={stats} />
              <Achievements
                xpPoints={xpPoints}
                quizStats={quizStats}
                setActiveTab={setActiveTab}
              />
              <StreakCalendar userQuizHistory={userQuizHistory} />
              <LeaderboardRank userQuizHistory={userQuizHistory} />
              <ShortQuizHistory
                userQuizHistory={userQuizHistory}
                setActiveTab={setActiveTab}
              />
            </div>
          )}
          {activeTab === 'history' && (
            <FullQuizHistory user={user} userQuizHistory={userQuizHistory} />
          )}
          {activeTab === 'settings' && <Settings />}
          {activeTab === 'transactionHistory' && (
            <TransactionHistory user={user} />
          )}
          {activeTab === 'achievements' && (
            <AchievementTab xpPoints={xpPoints} quizStats={quizStats} />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
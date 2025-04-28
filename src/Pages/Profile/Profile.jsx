import React, { useState, useEffect } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAuth from "@/hooks/useAuth";
import ProfileTabs from "./ProfileTabs";
import About from "./About";
import Achievements from "./Achievements";
import ShortQuizHistory from "./ShortQuizHistory";
import FullQuizHistory from "./FullQuizHistory";
import Settings from "./Settings";
import TransactionHistory from "./TransactionHistory";
import ProfileHeader from "./ProfileHeader";
import AchievementTab from "./AchievementTab";
import StreakCalendar from "./StreakCalendar";
import LeaderboardRank from "./LeaderboardRank";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const [userInfo, setUserInfo] = useState(null);
  const [userQuizHistory, setUserQuizHistory] = useState([]);
  const [streak, setStreak] = useState(0);

  const xpPoints = userQuizHistory.reduce((prev, curr) => prev + curr.score, 0);
  const totalScore = userQuizHistory.reduce((sum, quiz) => sum + quiz.score, 0);
  const avgScore = totalScore / userQuizHistory.length;

  const axiosPublic = useAxiosPublic();

  // Get Quiz History
  useEffect(() => {
    axiosPublic
      .get(`/quiz_history/${user?.email}`)
      .then((res) => {
        setUserQuizHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  // Get User Information
  useEffect(() => {
    if (!user?.email) return; // Prevent running if email is not loaded yet

    const fetchUserInfo = async () => {
      try {
        const res = await axiosPublic.get(`/userInfo/${user.email}`);
        setUserInfo(res?.data);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUserInfo();
  }, [user]);

  console.log(userInfo);

  // Streaks Code Starts Here
  useEffect(() => {
    if (!user) return;

    axiosPublic
      .get(`/quiz_history/${user?.email}`)
      .then((res) => {
        const history = res?.data || [];
        setUserQuizHistory(history);
        // Utility to get date in local YYYY-MM-DD format
        const formatDateLocal = (dateStr) => {
          const date = new Date(dateStr);
          return date.toLocaleDateString("en-CA"); // gives 'YYYY-MM-DD' format
        };

        // Extract unique quiz dates (formatted locally)
        const quizDaysSet = new Set(
          history.map((q) => formatDateLocal(q.date))
        );

        const today = new Date();
        const todayStr = today.toLocaleDateString("en-CA");

        // 🛑 If user didn't give quiz today, streak = 0
        if (!quizDaysSet.has(todayStr)) {
          setStreak(0);
          return;
        }

        // ✅ Start with today counted
        let streakCount = 1;

        // 🔁 Check previous consecutive days
        for (let i = 1; ; i++) {
          const prevDate = new Date();
          prevDate.setDate(today.getDate() - i);
          const prevStr = prevDate.toLocaleDateString("en-CA");

          if (quizDaysSet.has(prevStr)) {
            streakCount++;
          } else {
            break;
          }
        }

        setStreak(streakCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);
  // Streaks Code Ends Here

  // Sample stats - replace with actual data from your application
  const stats = {
    quizzesTaken: userQuizHistory?.length,
    totalPoints: xpPoints,
    avgScore: avgScore > 0 ? avgScore.toFixed(2) : 0,
    memberSince: user?.metadata?.creationTime
      ? new Date(user.metadata.creationTime).toLocaleDateString()
      : new Date().toLocaleDateString(),
    lastActive: "Now",
  };

  return (
    <div className="pt-32 pb-16 px-4 min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader stats={stats} userInfo={userInfo} />

        {/* Tabs Navigation */}
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Profile Content */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* About Section */}
            <About userInfo={userInfo} stats={stats} streak={streak} />

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
        {activeTab === "history" && (
          <FullQuizHistory user={user} userQuizHistory={userQuizHistory} />
        )}

        {activeTab === "settings" && <Settings />}

        {/* Transaction history */}
        {activeTab === "transactionHistory" && (
          <TransactionHistory user={user} userInfo={userInfo} />
        )}
        {/* Achievement Tab */}
        {activeTab === "achievements" && <AchievementTab xpPoints={xpPoints} />}
      </div>
    </div>
  );
};

export default Profile;

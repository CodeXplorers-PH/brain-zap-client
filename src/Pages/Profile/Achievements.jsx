import React, { useEffect, useState } from "react";
import { Award } from "lucide-react";

// Placeholder badge images
import badge1 from "@/assets/img/badge1.png";
import badge2 from "@/assets/img/badge2.png";
import badge3 from "@/assets/img/badge3.png";
import badge4 from "@/assets/img/badge4.png";
import badge5 from "@/assets/img/badge5.png";
import badge6 from "@/assets/img/badge6.png";
import badge7 from "@/assets/img/badge7.png";
import badge8 from "@/assets/img/badge8.png";

const Achievements = ({ xpPoints, quizStats, setActiveTab }) => {
  const achievements = [
    {
      id: 1,
      name: "First Step Scholar",
      description: "Completed your first quiz — the journey begins!",
      image: badge1,
      condition: () => (quizStats?.quizzesTaken || 0) >= 1,
      progress: () => ({
        current: quizStats?.quizzesTaken || 0,
        required: 1,
        label: "Quizzes Taken",
      }),
    },
    {
      id: 2,
      name: "Perfect Prodigy",
      description: "Scored 100% on a quiz — flawless victory!",
      image: badge2,
      condition: () => (quizStats?.perfectScores || 0) >= 1,
      progress: () => ({
        current: quizStats?.perfectScores || 0,
        required: 1,
        label: "Perfect Scores",
      }),
    },
    {
      id: 3,
      name: "Category Conqueror",
      description: "Explored 5 different quiz categories — a true knowledge seeker!",
      image: badge3,
      condition: () => (quizStats?.categoriesExplored || 0) >= 5,
      progress: () => ({
        current: quizStats?.categoriesExplored || 0,
        required: 5,
        label: "Categories Explored",
      }),
    },
    {
      id: 4,
      name: "Leaderboard Legend",
      description: "Reached the top 3 on the leaderboard — you're a quiz star!",
      image: badge4,
      condition: () => (quizStats?.leaderboardRank || Infinity) <= 3,
      progress: () => ({
        current: quizStats?.leaderboardRank || "N/A",
        required: 3,
        label: "Leaderboard Rank",
      }),
    },
    {
      id: 5,
      name: "Streak Star",
      description: "Took quizzes 7 days in a row — consistency is key!",
      image: badge5,
      condition: () => (quizStats?.streak || 0) >= 7,
      progress: () => ({
        current: quizStats?.streak || 0,
        required: 7,
        label: "Day Streak",
      }),
    },
    {
      id: 6,
      name: "Point Powerhouse",
      description: "Reached 1000 XP points — you're unstoppable!",
      image: badge6,
      condition: () => (xpPoints || 0) >= 1000,
      progress: () => ({
        current: xpPoints || 0,
        required: 1000,
        label: "XP Points",
      }),
    },
    {
      id: 7,
      name: "Master Mind",
      description: "Completed 50 quizzes — a true quiz master!",
      image: badge7,
      condition: () => (quizStats?.quizzesTaken || 0) >= 50,
      progress: () => ({
        current: quizStats?.quizzesTaken || 0,
        required: 50,
        label: "Quizzes Taken",
      }),
    },
    {
      id: 8,
      name: "Epic Explorer",
      description: "Unlocked 5 other achievements — you're on a roll!",
      image: badge8,
      condition: () =>
        achievements.filter((a) => a.id !== 8 && a.condition()).length >= 5,
      progress: () => ({
        current: achievements.filter((a) => a.id !== 8 && a.condition()).length,
        required: 5,
        label: "Achievements Unlocked",
      }),
    },
  ];

  // Filter unlocked achievements, sort by ID (recent first), take top 2
  const displayedAchievements = achievements
    .filter((a) => a.condition())
    .sort((a, b) => b.id - a.id)
    .slice(0, 2);

  return (
    <div className="bg-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700 shadow-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Award className="mr-2 text-purple-400" /> Recent Achievements
        </h2>
        <button
          onClick={() => setActiveTab("achievements")}
          className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium text-white transition-colors"
        >
          Show All
        </button>
      </div>

      <div className="space-y-3">
        {displayedAchievements.length > 0 ? (
          displayedAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center bg-gray-800/50 rounded-lg p-3 transition-all duration-200 hover:bg-gray-800/70"
            >
              <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                <img
                  src={achievement.image}
                  alt={achievement.name}
                  className="w-8 h-8"
                />
              </div>
              <div>
                <p className="text-white font-medium">{achievement.name}</p>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
                <p className="text-gray-500 text-xs mt-1">Unlocked!</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center bg-gray-800/50 rounded-lg p-3">
            <div className="bg-gray-600/20 p-2 rounded-lg mr-3">
              <Award size={24} className="text-gray-400" />
            </div>
            <div>
              <p className="text-white font-medium">No Achievements Yet</p>
              <p className="text-gray-400 text-sm">
                Complete quizzes to unlock your first badge!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
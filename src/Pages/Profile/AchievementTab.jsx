import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
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

const AchievementTab = ({ xpPoints, quizStats }) => {
  const achievements = [
    {
      id: 1,
      name: "First Step Scholar",
      description: "Completed your very first quiz — the journey begins!",
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

  // State for achievements with unlocked status
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  // State for confetti animation
  const [showConfetti, setShowConfetti] = useState(false);
  // State for newly unlocked achievement
  const [newlyUnlockedId, setNewlyUnlockedId] = useState(null);

  useEffect(() => {
    // Update achievements with unlocked status
    const updatedAchievements = achievements.map((achievement) => ({
      ...achievement,
      unlocked: achievement.condition(),
    }));

    // Get IDs of previously unlocked achievements
    const prevUnlockedIds = unlockedAchievements
      .filter((a) => a.unlocked)
      .map((a) => a.id);

    // Find newly unlocked achievements
    const newlyUnlocked = updatedAchievements
      .filter((a) => a.unlocked && !prevUnlockedIds.includes(a.id))
      .sort((a, b) => b.id - a.id); // Sort by ID descending to get the latest

    if (newlyUnlocked.length > 0) {
      // Pick the latest unlocked achievement
      const latestUnlocked = newlyUnlocked[0];
      setShowConfetti(true);
      setNewlyUnlockedId(latestUnlocked.id);

      // Hide confetti and animation after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
        setNewlyUnlockedId(null);
      }, 5000);
    }

    setUnlockedAchievements(updatedAchievements);
  }, [xpPoints, quizStats]);

  // Calculate achievement count
  const totalAchievements = achievements.length;
  const unlockedCount = unlockedAchievements.filter((a) => a.unlocked).length;
  const achievementCount = `${unlockedCount}/${totalAchievements}`;

  return (
    <div className="relative p-4 md:p-6 bg-gray-900/90 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-2xl">
      {/* Confetti animation */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Award className="mr-2 text-purple-400" /> Your Achievements
        </h2>
        <span className="text-sm font-medium text-gray-400">
          {achievementCount}
        </span>
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {unlockedAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`relative flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
              achievement.unlocked
                ? "bg-gray-800/80 border border-purple-500/50 text-white shadow-lg hover:scale-105"
                : "bg-gray-700/50 border border-dashed border-gray-600 opacity-70 cursor-not-allowed"
            } ${achievement.unlocked && achievement.id === newlyUnlockedId ? "animate-pulse" : ""}`}
            title={achievement.unlocked ? achievement.name : "Locked Achievement"}
          >
            {/* Badge Image */}
            <img
              src={achievement.image}
              alt={achievement.name}
              className={`w-20 h-20 mb-3 transition-all duration-500 ${
                achievement.unlocked ? "grayscale-0" : "grayscale opacity-50"
              }`}
            />

            {/* Achievement Name */}
            <h3
              className={`text-sm font-semibold text-center ${
                achievement.unlocked ? "text-white" : "text-gray-400"
              }`}
            >
              {achievement.name}
            </h3>

            {/* Achievement Description */}
            <p
              className={`text-xs text-center mt-1 ${
                achievement.unlocked ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {achievement.unlocked
                ? achievement.description
                : `Unlock by ${achievement.progress().label.toLowerCase()}`}
            </p>

            {/* Progress Indicator */}
            <p
              className={`text-xs text-center mt-1 ${
                achievement.unlocked ? "text-purple-400" : "text-gray-500"
              }`}
            >
              {achievement.unlocked
                ? "Unlocked!"
                : `${
                    achievement.progress().label
                  }: ${
                    achievement.progress().current === "N/A"
                      ? "N/A"
                      : achievement.progress().current
                  }/${
                    achievement.progress().required
                  }`}
            </p>
          </div>
        ))}
        {unlockedAchievements.filter((a) => a.unlocked).length === 0 && (
          <div className="col-span-full flex items-center justify-center p-4 bg-gray-800/50 rounded-lg">
            <div className="text-center">
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

export default AchievementTab;
// import { Award, FileText } from "lucide-react";
// import static images from local computer
import badge1 from "@/assets/img/badge1.png";
import badge2 from "@/assets/img/badge2.png";
import badge3 from "@/assets/img/badge3.png";
import badge4 from "@/assets/img/badge4.png";
import badge5 from "@/assets/img/badge5.png";
import badge6 from "@/assets/img/badge6.png";
import badge7 from "@/assets/img/badge7.png";
import badge8 from "@/assets/img/badge8.png";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
const AchievementTab = ({ xpPoints }) => {
  // badges array
  const badges = [
    {
      id: 1,
      name: "Quiz Whiz",
      pointsRequired: 1000,
      image: badge1,
    },
    {
      id: 2,
      name: "Flawless Genius",
      pointsRequired: 2000,
      image: badge2,
    },
    {
      id: 3,
      name: "Knowledge Voyager",
      pointsRequired: 3000,
      image: badge3,
    },
    {
      id: 4,
      name: "Blitz Brain",
      pointsRequired: 4000,
      image: badge4,
    },
    {
      id: 5,
      name: "Master of Levels",
      pointsRequired: 5000,
      image: badge5,
    },
    {
      id: 6,
      name: "Habit Hero",
      pointsRequired: 6000,
      image: badge6,
    },
    {
      id: 7,
      name: "Quiz Cracker",
      pointsRequired: 7000,
      image: badge7,
    },
    {
      id: 8,
      name: "Elite Legend",
      pointsRequired: 8000,
      image: badge8,
    },
  ];
  // state for unlocked badges
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  // state for confetti
  const [showConfetti, setShowConfetti] = useState(false);
  // state for newly unlocked badges
  const [newlyUnlockedBadgeId, setNewlyUnlockedBadgeId] = useState(null);
  useEffect(() => {
    const newlyUnlocked = badges.map((badge) => ({
      ...badge,
      unlocked: xpPoints >= badge.pointsRequired,
    }));

    // Get ids of previously unlocked badges
    const prevUnlockedIds = unlockedBadges
      .filter((b) => b.unlocked)
      .map((b) => b.id);

    // Find all badges that are now unlocked but were previously locked
    const newlyUnlockedBadges = newlyUnlocked.filter(
      (b) => b.unlocked && !prevUnlockedIds.includes(b.id)
    );

    if (newlyUnlockedBadges.length > 0) {
      // Pick the badge with the highest pointsRequired among newly unlocked
      const latestUnlocked = newlyUnlockedBadges.reduce((a, b) =>
        a.pointsRequired > b.pointsRequired ? a : b
      );

      setShowConfetti(true);
      setNewlyUnlockedBadgeId(latestUnlocked.id);

      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }

    setUnlockedBadges(newlyUnlocked);
  }, [xpPoints]);
  return (
    <>
      <div className="relative p-3">
        {/* Confetti for achievements */}
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 border bg-gray-800/80 backdrop-blur-md border-gray-700 rounded-2xl shadow-xl p-6 md:p-8">
          {unlockedBadges.map((badge) => (
            <div
              key={badge.id}
              className={`flex flex-col justify-between w-[150px] h-[160px] m-auto items-center p-6 rounded-xl transition-all duration-300 mx-auto relative ${
                badge.unlocked
                  ? "bg-[#1D2838] border border-indigo-400/30 text-white shadow-lg hover:scale-105"
                  : " bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-dashed border-gray-600 opacity-80  text-white cursor-not-allowed"
              } ${badge.id == newlyUnlockedBadgeId ? "glow-animation" : ""}`}
              title={
                badge.unlocked
                  ? badge.name
                  : `Unlock at ${badge.pointsRequired} points`
              }
            >
              <img
                src={badge.image}
                alt={badge.name}
                className={`w-[90px] h-[90px] mb-2 transition-all duration-500 ${
                  badge.unlocked ? "grayscale-0" : "grayscale opacity-50"
                }`}
              />
              {/* <p className="text-center font-semibold">{badge.name}</p> */}
              {!badge.unlocked && (
                <p className="text-sm text-gray-500 mt-1">🔒 Locked</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AchievementTab;

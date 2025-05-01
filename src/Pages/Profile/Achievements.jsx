import React from "react";
import { Award, FileText } from "lucide-react";
import badge1 from "@/assets/img/badge1.png";
import badge2 from "@/assets/img/badge2.png";
import badge3 from "@/assets/img/badge3.png";
import badge4 from "@/assets/img/badge4.png";
import badge5 from "@/assets/img/badge5.png";
import badge6 from "@/assets/img/badge6.png";
import badge7 from "@/assets/img/badge7.png";
import badge8 from "@/assets/img/badge8.png";
const Achievements = ({ xpPoints, setActiveTab }) => {
  // console.log(xpPoints);
  return (
    <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-white">Achievements</h2>
        <div>
          <button
            onClick={() => setActiveTab("achievements")}
            className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-purple-400 transition-colors mb-1"
          >
            See all
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center bg-gray-700/40 rounded-lg p-3">
          {(xpPoints >= 8000 && (
            <>
              <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                <img className="w-6" src={badge8} alt="" />
              </div>
              <div>
                <p className="text-white font-medium">Elite Legend</p>
                <p className="text-gray-400 text-sm">
                  Code runs like magic (8000 XP)
                </p>
              </div>
            </>
          )) ||
            (xpPoints >= 7000 && (
              <>
                <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                  <img className="w-6" src={badge7} alt="" />
                </div>
                <div>
                  <p className="text-white font-medium">Quiz Cracker</p>
                  <p className="text-gray-400 text-sm">
                    Took a quiz 3 days in a row — learning is your superpower!
                  </p>
                </div>
              </>
            )) ||
            (xpPoints >= 6000 && (
              <>
                <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                  <img className="w-6" src={badge6} alt="" />
                </div>
                <div>
                  <p className="text-white font-medium">Habit Hero</p>
                  <p className="text-gray-400 text-sm">
                    Took a quiz 3 days in a row — learning is your superpower!
                  </p>
                </div>
              </>
            )) ||
            (xpPoints >= 5000 && (
              <>
                <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                  <img className="w-6" src={badge5} alt="" />
                </div>
                <div>
                  <p className="text-white font-medium">Master of Levels</p>
                  <p className="text-gray-400 text-sm">
                    Conquered all difficulty levels — from easy to expert like a
                    boss!
                  </p>
                </div>
              </>
            )) ||
            (xpPoints >= 4000 && (
              <>
                <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                  <img className="w-6" src={badge4} alt="" />
                </div>
                <div>
                  <p className="text-white font-medium">Blitz Brain</p>
                  <p className="text-gray-400 text-sm">
                    Completed a quiz in lightning-fast time — sharp and swift!
                  </p>
                </div>
              </>
            )) ||
            (xpPoints >= 3000 && (
              <>
                <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                  <img className="w-6" src={badge3} alt="" />
                </div>
                <div>
                  <p className="text-white font-medium">Knowledge Voyager</p>
                  <p className="text-gray-400 text-sm">
                    Explored 3 different quiz categories — your curiosity knows
                    no bounds!
                  </p>
                </div>
              </>
            )) ||
            (xpPoints >= 2000 && (
              <>
                <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                  <img className="w-6" src={badge2} alt="" />
                </div>
                <div>
                  <p className="text-white font-medium">Flawless Genius</p>
                  <p className="text-gray-400 text-sm">
                    Scored 100% on a quiz — not a single mistake in sight!
                  </p>
                </div>
              </>
            )) ||
            (xpPoints >= 1000 && (
              <>
                <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                  <img className="w-6" src={badge1} alt="" />
                </div>
                <div>
                  <p className="text-white font-medium">Quiz Whiz</p>
                  <p className="text-gray-400 text-sm">
                    Completed your first quiz — the journey to mastery begins!
                  </p>
                </div>
              </>
            )) ||
            (xpPoints < 999 && (
              <>
                <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                  <Award size={24} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    No Achievements Unlocked
                  </p>
                  <p className="text-gray-400 text-sm">Keep it up!</p>
                </div>
              </>
            ))}
        </div>

        <div className="flex items-center bg-gray-700/40 rounded-lg p-3">
          <div className="bg-gray-600/20 p-2 rounded-lg mr-3">
            <FileText size={24} className="text-gray-400" />
          </div>
          <div>
            {(xpPoints >= 8000 && (
              <>
                <p className="text-white font-medium">Ultimate Achiever</p>
                <p className="text-gray-400 text-sm">
                  Reached 4500+ XP - keep growing
                </p>
              </>
            )) ||
              (xpPoints >= 7000 && (
                <>
                  <p className="text-white font-medium">Ritual Mode</p>
                  <p className="text-gray-400 text-sm">
                    Reached 3500 XP - keep growing
                  </p>
                </>
              )) ||
              (xpPoints >= 6000 && (
                <>
                  <p className="text-white font-medium">Pathfinder</p>
                  <p className="text-gray-400 text-sm">
                    Reached 3000 XP - keep growing
                  </p>
                </>
              )) ||
              (xpPoints >= 5000 && (
                <>
                  <p className="text-white font-medium">Flash Finish</p>
                  <p className="text-gray-400 text-sm">
                    Reached 2500 XP - keep growing
                  </p>
                </>
              )) ||
              (xpPoints >= 4000 && (
                <>
                  <p className="text-white font-medium">Mind Wanderer</p>
                  <p className="text-gray-400 text-sm">
                    Reached 2000 XP - keep growing
                  </p>
                </>
              )) ||
              (xpPoints >= 3000 && (
                <>
                  <p className="text-white font-medium">Fire Flow</p>
                  <p className="text-gray-400 text-sm">
                    Stayed active for 30 days straight!
                  </p>
                </>
              )) ||
              (xpPoints >= 2000 && (
                <>
                  <p className="text-white font-medium">Zero Miss Legend</p>
                  <p className="text-gray-400 text-sm">
                    Completed 5 coding challenges!
                  </p>
                </>
              )) ||
              (xpPoints >= 1000 && (
                <>
                  <p className="text-white font-medium">Brain Spark</p>
                  <p className="text-gray-400 text-sm">
                    Completed first lesson in a record time
                  </p>
                </>
              )) ||
              (xpPoints < 999 && (
                <>
                  <p className="text-white font-medium">Keep Learning</p>
                  <p className="text-gray-400 text-sm">
                    Play Daily Quizzes to achieve badges!
                  </p>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;

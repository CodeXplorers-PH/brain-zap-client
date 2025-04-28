import React from "react";
import { Award, FileText } from "lucide-react";
import badge1 from "@/assets/img/badge1.png";
import badge2 from "@/assets/img/badge2.png";
import badge3 from "@/assets/img/badge3.png";
import badge4 from "@/assets/img/badge4.png";
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
          {(xpPoints >= 500 && (
            <>
              <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                <img className="w-6" src={badge4} alt="" />
              </div>
              <div>
                <p className="text-white font-medium">Elite Legend</p>
                <p className="text-gray-400 text-sm">
                  Code runs like magic (500/500 XP)
                </p>
              </div>
            </>
          )) ||
            (xpPoints >= 400 && (
              <>
                <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                  <img className="w-6" src={badge3} alt="" />
                </div>
                <div>
                  <p className="text-white font-medium">Advanced Master</p>
                  <p className="text-gray-400 text-sm">
                    Built complex algorithms (400/400 XP)
                  </p>
                </div>
              </>
            )) ||
            (xpPoints >= 300 && (
              <>
                <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                  <img className="w-6" src={badge3} alt="" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    Mastered core syntax (300/300 XP)
                  </p>
                  <p className="text-gray-400 text-sm"></p>
                </div>
              </>
            )) ||
            (xpPoints >= 200 && (
              <>
                <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                  <img className="w-6" src={badge2} alt="" />
                </div>
                <div>
                  <p className="text-white font-medium">Knowledge Seeker</p>
                  <p className="text-gray-400 text-sm">
                    Debugging skills unlocked (200/200 XP)
                  </p>
                </div>
              </>
            )) ||
            (xpPoints >= 100 && (
              <>
                <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                  <img className="w-6" src={badge1} alt="" />
                </div>
                <div>
                  <p className="text-white font-medium">Beginner Milestones</p>
                  <p className="text-gray-400 text-sm">
                    First lines of code written (100/100 XP)
                  </p>
                </div>
              </>
            )) ||
            (xpPoints < 99 && (
              <>
                <div className="bg-purple-600/20 p-2 rounded-lg mr-3">
                  <Award size={24} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Elite Legend</p>
                  <p className="text-gray-400 text-sm">
                    Achieved the Legendary badge
                  </p>
                </div>
              </>
            ))}
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

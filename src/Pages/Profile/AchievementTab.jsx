// import useAuth from "@/hooks/useAuth";
// import useAxiosPublic from "@/hooks/useAxiosPublic";
// import { useEffect, useState } from "react";

const AchievementTab = ({ xpPoints }) => {
  console.log(xpPoints);

  return (
    <div className="bg-gray-800/60 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg p-6 text-center">
      <h2 className="text-xl font-semibold text-white text-center mb-4">
        Achievements
      </h2>
      <p className="text-gray-400">
        User all achievements would be displayed here.
      </p>
    </div>
  );
};

export default AchievementTab;

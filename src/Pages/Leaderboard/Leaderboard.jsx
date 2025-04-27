import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleCheck, Crown } from "lucide-react";

// Static dummy data for 12 users
const dummyUsers = [
  {
    email: "user1@example.com",
    displayName: "AJM Fajlay Rabby",
    photoURL: "https://avatars.githubusercontent.com/u/55575386?v=4",
    stats: { totalPoints: 2500 },
    subscription: "Elite",
  },
  {
    email: "user2@example.com",
    displayName: "Atef Abrar Bhuyian",
    photoURL: "https://avatars.githubusercontent.com/u/122459257?v=4",
    stats: { totalPoints: 2200 },
    subscription: "Pro",
  },
  {
    email: "user3@example.com",
    displayName: "Shahid Hasan Rumon",
    photoURL: "https://avatars.githubusercontent.com/u/142591239?v=4",
    stats: { totalPoints: 1900 },
    subscription: "Pro",
  },
  {
    email: "user4@example.com",
    displayName: "TriviaTitan",
    photoURL: "https://i.ibb.co.com/Xx12345/user4.jpg",
    stats: { totalPoints: 1600 },
    subscription: "Free",
  },
  {
    email: "user5@example.com",
    displayName: "SmartSpark",
    photoURL: "",
    stats: { totalPoints: 1400 },
    subscription: "Elite",
  },
  {
    email: "user6@example.com",
    displayName: "QuizWizard",
    photoURL: "https://i.ibb.co.com/Xx12345/user6.jpg",
    stats: { totalPoints: 1200 },
    subscription: "Pro",
  },
  {
    email: "user7@example.com",
    displayName: "BrainZapper",
    photoURL: "",
    stats: { totalPoints: 1000 },
    subscription: "Free",
  },
  {
    email: "user8@example.com",
    displayName: "PointPro",
    photoURL: "https://i.ibb.co.com/Xx12345/user8.jpg",
    stats: { totalPoints: 900 },
    subscription: "Pro",
  },
  {
    email: "user9@example.com",
    displayName: "LearnLightning",
    photoURL: "",
    stats: { totalPoints: 800 },
    subscription: "Free",
  },
  {
    email: "user10@example.com",
    displayName: "QuizCrusader",
    photoURL: "https://i.ibb.co.com/Xx12345/user10.jpg",
    stats: { totalPoints: 700 },
    subscription: "Elite",
  },
  {
    email: "user11@example.com",
    displayName: "MindMaverick",
    photoURL: "",
    stats: { totalPoints: 600 },
    subscription: "Free",
  },
  {
    email: "user12@example.com",
    displayName: "ScoreSentry",
    photoURL: "https://i.ibb.co.com/Xx12345/user12.jpg",
    stats: { totalPoints: 500 },
    subscription: "Pro",
  },
];

const Leaderboard = () => {
  const { user } = useAuth();
  const [topUsers] = useState(
    dummyUsers.sort((a, b) => b.stats.totalPoints - a.stats.totalPoints).slice(0, 3)
  );
  const [otherUsers] = useState(
    dummyUsers.sort((a, b) => b.stats.totalPoints - a.stats.totalPoints).slice(3)
  );

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (name && name.trim()) {
      return name.trim().charAt(0).toUpperCase();
    }
    return "U";
  };

  // Define podium styles
  const podiumStyles = [
    {
      rank: 2,
      color: "from-blue-900 to-gray-800",
      height: "h-32",
      zIndex: "z-10",
      avatarSize: "w-16 h-16 md:w-20 md:h-20",
      pointsBg: "bg-cyan-500",
    },
    {
      rank: 1,
      color: "from-blue-900 to-gray-800",
      height: "h-40",
      zIndex: "z-20",
      avatarSize: "w-20 h-20 md:w-24 md:h-24",
      pointsBg: "bg-yellow-400",
    },
    {
      rank: 3,
      color: "from-blue-900 to-gray-800",
      height: "h-32",
      zIndex: "z-10",
      avatarSize: "w-16 h-16 md:w-20 md:h-20",
      pointsBg: "bg-pink-500",
    },
  ];

  // Subscription icon renderer
  const renderSubscriptionIcon = (subscription) => {
    if (subscription === "Pro") {
      return <CircleCheck className="text-blue-500 w-5 h-5" />;
    }
    if (subscription === "Elite") {
      return <Crown className="text-amber-500 w-5 h-5" />;
    }
    return <span className="text-green-400 text-sm">Free</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 pt-40 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-12">
          BrainZap Leaderboard
        </h1>

        {/* Podium for Top 3 */}
        <div className="flex justify-center items-end gap-4 md:gap-6 mb-16">
          {podiumStyles.map((style, index) => {
            const userData = topUsers[index];
            return (
              <div
                key={style.rank}
                className={`relative flex flex-col items-center transition-all duration-300 transform hover:scale-105 ${style.zIndex} animate-fade-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Avatar Above Podium */}
                {userData ? (
                  <div className="flex flex-col items-center">
                    <Avatar className={`${style.avatarSize} mb-2 border-4 border-purple-600 shadow-md shadow-purple-500/30`}>
                      <AvatarImage
                        src={userData.photoURL}
                        alt={userData.displayName || "User"}
                      />
                      <AvatarFallback>
                        {getInitials(userData.displayName)}
                      </AvatarFallback>
                    </Avatar>
                    {/* Podium Block */}
                    <div
                      className={`w-24 md:w-28 ${style.height} bg-gradient-to-b ${style.color} rounded-t-lg shadow-xl flex items-center justify-center relative overflow-hidden`}
                    >
                      <span className="text-5xl md:text-6xl font-bold text-gray-300/50">
                        {style.rank}
                      </span>
                      {/* Glowing Effect */}
                      <div className="absolute inset-0 border-t-4 border-purple-600 opacity-20 animate-pulse"></div>
                    </div>
                    {/* Name and Points Below Podium */}
                    <p className="text-white font-semibold text-sm md:text-base text-center mt-2 truncate w-full">
                      {userData.displayName || "Anonymous"}
                    </p>
                    <div className={`mt-1 ${style.pointsBg} text-black font-semibold text-xs md:text-sm px-3 py-1 rounded-full`}>
                      {userData.stats.totalPoints} Points
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className={`${style.avatarSize} mb-2 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 text-2xl`}>
                      ?
                    </div>
                    <div
                      className={`w-24 md:w-28 ${style.height} bg-gradient-to-b ${style.color} rounded-t-lg shadow-xl flex items-center justify-center relative`}
                    >
                      <span className="text-5xl md:text-6xl font-bold text-gray-300/50">
                        {style.rank}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">No User</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Table for Other Users */}
        {otherUsers.length > 0 && (
          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center md:text-left">
              Other Rankings
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-sm md:text-base">
                    <th className="p-3">Rank</th>
                    <th className="p-3">User</th>
                    <th className="p-3">Points</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {otherUsers.map((userData, index) => (
                    <tr
                      key={userData.email}
                      className={`border-t border-gray-700 transition-all duration-200 hover:bg-gray-700/50 ${
                        userData.email === user?.email ? "bg-purple-900/30" : ""
                      }`}
                    >
                      <td className="p-3 text-white text-sm md:text-base">
                        {index + 4}
                      </td>
                      <td className="p-3 flex items-center gap-2">
                        <Avatar className="w-8 h-8 md:w-10 md:h-10">
                          <AvatarImage src={userData.photoURL} />
                          <AvatarFallback>
                            {getInitials(userData.displayName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-white text-sm md:text-base truncate max-w-[150px] md:max-w-[200px]">
                          {userData.displayName || "Anonymous"}
                        </span>
                      </td>
                      <td className="p-3 text-white text-sm md:text-base">
                        {userData.stats.totalPoints}
                      </td>
                      <td className="p-3 flex items-center gap-1">
                        {renderSubscriptionIcon(userData.subscription)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
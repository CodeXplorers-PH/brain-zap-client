import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleCheck, Crown } from "lucide-react";

const Leaderboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [topUsers, setTopUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/users")
      .then(res => {
        if (res.data.success) {
          const fetchedUsers = res.data.users
            .map(user => ({
              email: user.email,
              displayName: user.name || user.email.split("@")[0],
              photoURL: user.photoURL || "",
              stats: { totalPoints: user.totalPoints || 0 },
              subscription: user.subscription || "Free",
            }))
            .sort((a, b) => b.stats.totalPoints - a.stats.totalPoints);

          setTopUsers(fetchedUsers.slice(0, 3));
          setOtherUsers(fetchedUsers.slice(3));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, [axiosPublic]);

  const getInitials = (name) => {
    if (name && name.trim()) {
      return name.trim().charAt(0).toUpperCase();
    }
    return "U";
  };

  const podiumStyles = [
    {
      rank: 2, // Left (Rank 2)
      color: "from-silver-700 to-gray-900",
      height: "h-32",
      zIndex: "z-10",
      avatarSize: "w-16 h-16 md:w-20 md:h-20",
      pointsBg: "bg-gradient-to-r from-cyan-400 to-cyan-600",
      glow: "shadow-[0_0_15px_rgba(34,211,238,0.5)]",
    },
    {
      rank: 1, // Middle (Rank 1)
      color: "from-amber-500 to-yellow-700",
      height: "h-48",
      zIndex: "z-20",
      avatarSize: "w-24 h-24 md:w-28 md:h-28",
      pointsBg: "bg-gradient-to-r from-yellow-400 to-amber-500",
      glow: "shadow-[0_0_25px_rgba(255,193,7,0.7)]",
    },
    {
      rank: 3, // Right (Rank 3)
      color: "from-bronze-600 to-gray-900",
      height: "h-24",
      zIndex: "z-10",
      avatarSize: "w-16 h-16 md:w-20 md:h-20",
      pointsBg: "bg-gradient-to-r from-pink-400 to-pink-600",
      glow: "shadow-[0_0_15px_rgba(244,114,182,0.5)]",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 pt-40 pb-16 px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-400">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 pt-40 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-12">
          BrainZap Leaderboard
        </h1>

        {/* Podium for Top 3 (Rank 2 - Rank 1 - Rank 3) */}
        <div className="flex justify-center items-end gap-4 md:gap-8 mb-16 relative">
          {podiumStyles.map((style, index) => {
            const userData = topUsers[style.rank - 1]; // Map rank to index: Rank 1 -> topUsers[0], Rank 2 -> topUsers[1], Rank 3 -> topUsers[2]
            return (
              <div
                key={style.rank}
                className={`relative flex flex-col items-center transition-all duration-500 transform hover:scale-105 ${style.zIndex} animate-rise`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {userData ? (
                  <div className="flex flex-col items-center">
                    {/* Avatar Above Podium */}
                    <div className="relative">
                      <Avatar
                        className={`${style.avatarSize} mb-3 border-4 border-gray-800 ${style.glow} rounded-full transition-transform duration-300 hover:scale-110`}
                      >
                        <AvatarImage
                          src={userData.photoURL}
                          alt={userData.displayName || "User"}
                        />
                        <AvatarFallback className="bg-gray-700 text-white font-semibold">
                          {getInitials(userData.displayName)}
                        </AvatarFallback>
                      </Avatar>
                      {/* Rank 1 Crown */}
                      {style.rank === 1 && (
                        <Crown
                          className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-amber-400"
                          size={24}
                        />
                      )}
                    </div>
                    {/* Podium Block */}
                    <div
                      className={`w-28 md:w-36 ${style.height} bg-gradient-to-b ${style.color} rounded-t-2xl rounded-b-md ${style.glow} flex items-end justify-center relative overflow-hidden`}
                    >
                      {/* Futuristic Lines */}
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_100%] opacity-50"></div>
                      {/* Rank Number */}
                      <span className="text-4xl md:text-5xl font-extrabold text-white/30 mb-4">
                        {style.rank}
                      </span>
                      {/* Neon Border Effect */}
                      <div className="absolute inset-0 border-t-4 border-gray-300/20 animate-pulse"></div>
                    </div>
                    {/* Name and Points Below Podium */}
                    <p className="text-white font-semibold text-sm md:text-base text-center mt-3 truncate w-full px-2">
                      {userData.displayName || "Anonymous"}
                    </p>
                    <div
                      className={`${style.pointsBg} text-black font-semibold text-xs md:text-sm px-4 py-1 rounded-full mt-2 shadow-md`}
                    >
                      {userData.stats.totalPoints} Points
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div
                      className={`${style.avatarSize} mb-3 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-2xl ${style.glow}`}
                    >
                      ?
                    </div>
                    <div
                      className={`w-28 md:w-36 ${style.height} bg-gradient-to-b ${style.color} rounded-t-2xl rounded-b-md ${style.glow} flex items-end justify-center relative`}
                    >
                      <span className="text-4xl md:text-5xl font-extrabold text-white/30 mb-4">
                        {style.rank}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-3">No User</p>
                  </div>
                )}
              </div>
            );
          })}
          {/* Background Glow Effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl opacity-50 pointer-events-none"></div>
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
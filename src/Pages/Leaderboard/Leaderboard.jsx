import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleCheck, Crown, Download, FileDown } from "lucide-react";
import jsPDF from "jspdf";

const Leaderboard = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [topUsers, setTopUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportFormat, setExportFormat] = useState("pdf");

  useEffect(() => {
    axiosPublic
      .get("/users")
      .then(res => {
        if (res.data.success) {
          let fetchedUsers = res.data.users.map(user => ({
            email: user.email,
            displayName: user.name || user.email.split("@")[0],
            photoURL: user.photoURL || "",
            stats: { totalPoints: user.totalPoints || 0 },
            subscription: user.subscription || "Free",
          }));

          const loggedInUser = fetchedUsers.find(u => u.email === user?.email);
          let otherUsersList = fetchedUsers.filter(u => u.email !== user?.email);
          otherUsersList = otherUsersList.filter(u => u.stats.totalPoints > 0);
          otherUsersList.sort((a, b) => b.stats.totalPoints - a.stats.totalPoints);

          if (loggedInUser) {
            if (loggedInUser.stats.totalPoints === 0) {
              otherUsersList.push(loggedInUser);
            } else {
              otherUsersList.push(loggedInUser);
              otherUsersList.sort((a, b) => b.stats.totalPoints - a.stats.totalPoints);
            }
          }

          setTopUsers(otherUsersList.slice(0, 3));
          setOtherUsers(otherUsersList.slice(3));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, [axiosPublic, user]);

  const getInitials = (name) => {
    if (name && name.trim()) {
      return name.trim().charAt(0).toUpperCase();
    }
    return "U";
  };

  const podiumStyles = [
    {
      rank: 2,
      color: "from-silver-700 to-gray-900",
      height: "h-32",
      zIndex: "z-10",
      avatarSize: "w-16 h-16 md:w-20 md:h-20",
      pointsBg: "bg-gradient-to-r from-cyan-400 to-cyan-600",
      glow: "shadow-[0_0_15px_rgba(34,211,238,0.5)]",
    },
    {
      rank: 1,
      color: "from-amber-500 to-yellow-700",
      height: "h-48",
      zIndex: "z-20",
      avatarSize: "w-24 h-24 md:w-28 md:h-28",
      pointsBg: "bg-gradient-to-r from-yellow-400 to-amber-500",
      glow: "shadow-[0_0_25px_rgba(255,193,7,0.7)]",
    },
    {
      rank: 3,
      color: "from-bronze-600 to-gray-900",
      height: "h-24",
      zIndex: "z-10",
      avatarSize: "w-16 h-16 md:w-20 md:h-20",
      pointsBg: "bg-gradient-to-r from-pink-400 to-pink-600",
      glow: "shadow-[0_0_15px_rgba(244,114,182,0.5)]",
    },
  ];

  const exportToPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const maxWidth = pageWidth - 2 * margin;
  
    // Header
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(17, 24, 39);
    doc.text("BrainZap Leaderboard", pageWidth / 2, 20, { align: "center" });
  
    // Top 3 Section
    let yPosition = 40;
    const podiumWidth = maxWidth / 3;
    const podiumStylesPDF = [
      { rank: 2, color: [200, 200, 200], x: margin, avatarSize: 25 },
      { rank: 1, color: [255, 204, 0], x: margin + podiumWidth, avatarSize: 35 },
      { rank: 3, color: [205, 127, 50], x: margin + 2 * podiumWidth, avatarSize: 25 },
    ];
  
    for (let i = 0; i < podiumStylesPDF.length; i++) {
      const style = podiumStylesPDF[i];
      const userData = topUsers[style.rank - 1];
      if (userData) {
        // Circle for Initials
        doc.setFillColor(240, 240, 240);
        doc.circle(style.x + podiumWidth / 2, yPosition, style.avatarSize / 2, "F");
        doc.setFontSize(14);
        doc.setTextColor(17, 24, 39);
        doc.text(
          getInitials(userData.displayName),
          style.x + podiumWidth / 2,
          yPosition,
          { align: "center", baseline: "middle" }
        );
  
        // Name
        doc.setFontSize(12);
        doc.setFont("Helvetica", "normal");
        doc.text(
          userData.displayName || "Anonymous",
          style.x + podiumWidth / 2,
          yPosition + style.avatarSize / 2 + 10,
          { align: "center", maxWidth: podiumWidth - 10 }
        );
  
        // Points Badge
        doc.setFillColor(...style.color);
        doc.roundedRect(
          style.x + podiumWidth / 2 - 25,
          yPosition + style.avatarSize / 2 + 20,
          50,
          10,
          2, // rx (horizontal radius)
          2, // ry (vertical radius)
          "F"
        );
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text(
          `${userData.stats.totalPoints} Points`,
          style.x + podiumWidth / 2,
          yPosition + style.avatarSize / 2 + 27,
          { align: "center" }
        );
      }
    }
  
    // Other Users Section
    yPosition += 80;
    if (otherUsers.length > 0) {
      doc.setFontSize(16);
      doc.setTextColor(17, 24, 39);
      doc.text("Other Rankings", margin, yPosition);
      yPosition += 10;
  
      const headers = ["Rank", "User", "Points", "Subscription"];
      const colWidths = [20, 80, 30, 40];
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition, margin + maxWidth, yPosition);
      yPosition += 5;
  
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      headers.forEach((header, i) => {
        doc.text(
          header,
          margin + 5 + colWidths.slice(0, i).reduce((a, b) => a + b, 0),
          yPosition + 5
        );
      });
      yPosition += 10;
  
      otherUsers.forEach((userData, index) => {
        doc.setTextColor(17, 24, 39);
        const rowData = [
          `${index + 4}`,
          userData.displayName || "Anonymous",
          `${userData.stats.totalPoints}`,
          userData.subscription,
        ];
        rowData.forEach((data, i) => {
          doc.text(
            data,
            margin + 5 + colWidths.slice(0, i).reduce((a, b) => a + b, 0),
            yPosition + 5,
            { maxWidth: colWidths[i] - 10 }
          );
        });
        yPosition += 12;
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition - 2, margin + maxWidth, yPosition - 2);
      });
    }
  
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  
    doc.save("brainzap-leaderboard.pdf");
  };

  const exportLeaderboard = () => {
    const allUsers = [...topUsers, ...otherUsers];

    if (exportFormat === "pdf") {
      exportToPDF();
    } else if (exportFormat === "csv") {
      let csvContent = "Rank,User,Points,Subscription\n";
      allUsers.forEach((user, index) => {
        const rank = index + 1;
        const name = user.displayName || "Anonymous";
        const points = user.stats.totalPoints;
        const subscription = user.subscription || "Free";
        const escapedName = name.includes(",") ? `"${name}"` : name;
        csvContent += `${rank},${escapedName},${points},${subscription}\n`;
      });
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "brainzap-leaderboard.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (exportFormat === "json") {
      const jsonData = allUsers.map((user, index) => ({
        rank: index + 1,
        user: user.displayName || "Anonymous",
        email: user.email,
        points: user.stats.totalPoints,
        subscription: user.subscription || "Free",
      }));
      const jsonContent = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "brainzap-leaderboard.json");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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
        <div className="flex flex-col justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            BrainZap Leaderboard
          </h1>
          <div className="flex justify-end items-center gap-2 w-full">
            <select
              className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
            >
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              
            </select>
            <button
              onClick={exportLeaderboard}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity text-sm"
            >
              <FileDown size={16} />
              Export
            </button>
          </div>
        </div>

        <div className="flex justify-center items-end gap-4 md:gap-8 mb-16 relative">
          {podiumStyles.map((style, index) => {
            const userData = topUsers[style.rank - 1];
            return (
              <div
                key={style.rank}
                className={`relative flex flex-col items-center transition-all duration-500 transform hover:scale-105 ${style.zIndex} animate-rise`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {userData ? (
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Avatar
                        className={`${style.avatarSize} mb-3 border-4 border-gray-800 ${style.glow} rounded-full transition-transform duration-300 hover:scale-110`}
                      >
                        <AvatarImage src={userData.photoURL} alt={userData.displayName || "User"} />
                        <AvatarFallback className="bg-gray-700 text-white font-semibold">
                          {getInitials(userData.displayName)}
                        </AvatarFallback>
                      </Avatar>
                      {style.rank === 1 && (
                        <Crown
                          className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-amber-400"
                          size={24}
                        />
                      )}
                    </div>
                    <div
                      className={`w-28 md:w-36 ${style.height} bg-gradient-to-b ${style.color} rounded-t-2xl rounded-b-md ${style.glow} flex items-end justify-center relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_100%] opacity-50"></div>
                      <span className="text-4xl md:text-5xl font-extrabold text-white/30 mb-4">
                        {style.rank}
                      </span>
                      <div className="absolute inset-0 border-t-4 border-gray-300/20 animate-pulse"></div>
                    </div>
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
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl opacity-50 pointer-events-none"></div>
        </div>

        {otherUsers.length > 0 && (
          <div className="bg-gray-800/80 rounded-xl border border-gray-700 p-4 md:p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Other Rankings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-sm md:text-base">
                    <th className="p-3">Rank</th>
                    <th className="p-3">User</th>
                    <th className="p-3">Points</th>
                    <th className="p-3">Subscription</th>
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
                      <td className="p-3 text-white text-sm md:text-base">{index + 4}</td>
                      <td className="p-3 flex items-center gap-2">
                        <Avatar className="w-8 h-8 md:w-10 md:h-10">
                          <AvatarImage src={userData.photoURL} />
                          <AvatarFallback>{getInitials(userData.displayName)}</AvatarFallback>
                        </Avatar>
                        <span className="text-white text-sm md:text-base truncate max-w-[150px] md:max-w-[200px]">
                          {userData.displayName || "Anonymous"}
                        </span>
                      </td>
                      <td className="p-3 text-white text-sm md:text-base">{userData.stats.totalPoints}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            userData.subscription === "Premium"
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                              : "bg-gray-700 text-gray-300"
                          }`}
                        >
                          {userData.subscription}
                        </span>
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
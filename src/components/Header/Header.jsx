import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";
import { AuthContext } from "@/provider/AuthProvider";
import LockedErr from "../ui/LockedErr";
import { motion } from "framer-motion";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import streakImg from "../../assets/img/streak.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userQuizHistory, setUserQuizHistory] = useState([]);
  const [streak, setStreak] = useState(null);
  const axiosPublic = useAxiosPublic();
  const location = useLocation(); // Get the current route

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
  }, [axiosPublic, user, location?.pathname]);

  // Streaks Code Ends Here

  // Nav items
  const Navs = [
    { path: "/", pathName: "Home" },
    // { path: "/features", pathName: "Features" },
    { path: "/start-quiz", pathName: "Start Quiz" },
    { path: "/pricing", pathName: "Pricing" },
    { path: "/blogs", pathName: "Blog" },
    { path: "/contact", pathName: "Contact" },
  ];

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <LockedErr />
      <div className="navbar bg-gray-900/80 backdrop-blur-md rounded-full shadow-2xl max-w-6xl w-full px-6 border border-gray-800/50">
        {/* Logo Section */}
        <div className="navbar-start">
          <div className="dropdown dropdown-content scale-110 lg:hidden mr-2">
            <motion.button
              tabIndex={0}
              whileHover={{ scale: 1.2, color: "#ffffff" }}
              className="p-2 text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </motion.button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-800 border border-gray-700 rounded-xl w-52"
            >
              {Navs.map((navlink, index) => (
                <li key={`navlink-dropdown-${index}`}>
                  <Link
                    to={navlink.path}
                    className={`${
                      location.pathname === navlink.path
                        ? "text-purple-400 font-semibold"
                        : "text-gray-300"
                    } hover:bg-gray-700/50`}
                  >
                    {navlink.pathName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            to="/"
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          >
            BrainZap
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            {Navs.map((navlink, index) => (
              <li key={`navlink-${index}`}>
                <Link
                  to={navlink.path}
                  className={`font-medium mx-1 relative overflow-hidden group ${
                    location.pathname === navlink.path
                      ? "text-purple-400 font-semibold"
                      : "text-gray-300"
                  }`}
                >
                  {navlink.pathName}
                  {/* Underline animation */}
                  <span
                    className={`absolute left-0 bottom-0 w-full h-0.5 bg-purple-600 transform ${
                      location.pathname === navlink.path
                        ? "scale-x-100"
                        : "scale-x-0"
                    } group-hover:scale-x-100 transition-transform duration-300`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Auth Section and Mobile Menu - End */}
        <div className="navbar-end">
          {/* Mobile menu hamburger - navigation only */}

          {/* User Profile or Get Started button */}
          {user && (
            <div className="relative w-9 h-9 flex items-center justify-center mr-3">
              <img
                className="w-full h-full opacity-80"
                src={streakImg}
                alt="Streak"
              />
              <span className="absolute top-1 left-0 w-full h-full flex items-center justify-center text-lg font-bold text-white">
                {streak}
              </span>
            </div>
          )}
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                aria-label="User profile"
                className="relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
              >
                {user?.photoURL && (
                  <Avatar>
                    <AvatarImage
                      src={user?.photoURL}
                      alt={`Photo of ${user?.displayName}`}
                    />
                    <AvatarFallback>
                      {user?.displayName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-gray-800 border border-gray-700 rounded-xl w-52"
              >
                <li className="font-medium text-sm text-gray-400 px-4 py-2 border-b border-gray-700">
                  {user.displayName || user.email}
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="py-2 text-gray-300 hover:bg-gray-700/50 hover:text-white mt-1"
                  >
                    <User size={16} />
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="py-2 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 border-none shadow-lg hover:shadow-purple-600/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

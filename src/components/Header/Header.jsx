import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut, ShieldUser, User } from "lucide-react";
import LockedErr from "../ui/LockedErr";
import { motion } from "framer-motion"; // framer motion for animation
import streakImg from "../../assets/img/streak.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"; // static images for avatar
import { useWindowSize } from "react-use";
import { Toaster } from "react-hot-toast"; // react toast
import useAuth from "@/hooks/useAuth";
import useStreak from "@/hooks/useStreak";

const Header = () => {
  const { user, isAdmin, loading, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { streak } = useStreak();
  const location = useLocation();
  const { width } = useWindowSize();

  // Close the sidebar when the route changes in mobile view
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location]);

  // Handle scroll and window size
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (width >= 1024) {
      setIsOpen(false);
    }
  }, [width]);

  // All nav links for navbar
  const Navs = [
    { path: "/start-quiz", pathName: "Start Quiz" },
    { path: "/pricing", pathName: "Pricing" },
    { path: "/leaderboard", pathName: "Leaderboard" },
    { path: "/blogs", pathName: "Blog" },
    { path: "/contact", pathName: "Contact" },
  ];

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <Toaster />
      <LockedErr />
      <motion.div
        animate={{ paddingBottom: isOpen ? "200px" : "8px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative flex items-center justify-between py-2 px-4 w-full max-w-6xl bg-gray-900/80 backdrop-blur-md rounded-2xl lg:rounded-full shadow-2xl border border-gray-800/50"
      >
        {/* Logo Section */}
        <div className="navbar-start">
          <div className="dropdown dropdown-content scale-110 lg:hidden mr-2">
            {isOpen ? (
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ color: "#ffffff" }}
                className="p-2 text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            ) : (
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ color: "#ffffff" }}
                className="p-2 text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              </motion.button>
            )}
          </div>
          <Link
            to="/"
            className="text-xl lg:pl-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          >
            BrainZap
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            {Navs.map((navlink, index) => (
              <NavLinkItem key={index} navlink={navlink} location={location} />
            ))}
          </ul>
        </div>

        {/* Auth Section and Mobile Menu - End */}
        <div className="navbar-end">
          {user && <UserStreakDisplay streak={streak} />}
          {user ? (
            <UserProfileMenu
              user={user}
              logOut={logOut}
              isAdmin={isAdmin}
              loading={loading}
            />
          ) : (
            <Link to="/login">
              <button className="btn bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 border-none shadow-lg hover:shadow-purple-600/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0">
                Get Started
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ y: 200 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{
            ease: "easeInOut",
            delay: isOpen ? 0.05 : 0,
          }}
          className="lg:hidden flex flex-col font-semibold absolute -top-[50px] left-[112px] -translate-1/2 text-left space-y-4"
        >
          {Navs.map((navlink, index) => (
            <NavLinkItem key={index} navlink={navlink} location={location} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const UserStreakDisplay = ({ streak }) => (
  <div className="relative w-9 h-9 flex items-center justify-center mr-3">
    <img className="w-full h-full opacity-80" src={streakImg} alt="Streak" />
    <span className="absolute top-1 left-0 w-full h-full flex items-center justify-center text-lg font-bold text-white">
      {streak}
    </span>
  </div>
);

const NavLinkItem = ({ navlink, location }) => (
  <li className="list-none">
    <Link
      to={navlink.path}
      className={`font-medium mx-1 relative text-lg lg:text-base overflow-hidden group ${
        location.pathname === navlink.path
          ? "text-purple-400 font-semibold"
          : "text-gray-300"
      }`}
    >
      {navlink.pathName}
      <span
        className={`absolute left-0 lg:bottom-0 -bottom-1 w-full h-0.5 bg-purple-600 transform ${
          location.pathname === navlink.path ? "scale-x-100" : "scale-x-0"
        } group-hover:scale-x-100 transition-transform duration-300`}
      ></span>
    </Link>
  </li>
);

const UserProfileMenu = ({ user, logOut, isAdmin, loading }) => (
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

      {!loading && isAdmin && (
        <li>
          <Link
            to="/dashboard/adminHome"
            className="py-2 text-gray-300 hover:bg-gray-700/50 hover:text-white mt-1"
          >
            <ShieldUser size={16} /> Admin Dashboard
          </Link>
        </li>
      )}

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
);

export default Header;

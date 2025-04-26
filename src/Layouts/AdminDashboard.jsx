import useAuth from "@/hooks/useAuth";
import { House, LogOut, MailCheck, TicketCheck, Users } from "lucide-react";
import React, { useState } from "react";
import { FaHome, FaUser, FaBars } from "react-icons/fa";
import { MdMessage, MdOutlineQuiz, MdQuiz } from "react-icons/md";
import { RiCoupon3Fill, RiLogoutBoxFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user, logOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative h-screen bg-gray-900 flex overflow-hidden">
      {/* Topbar (Mobile Only) */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-900 to-violet-950 z-50 flex items-center px-4 py-3 gap-3">
        <button
          className="text-white focus:outline-none"
          onClick={handleToggleSidebar}
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
        </button>
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          BrainZap
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`md:static fixed top-10 left-0 z-40 w-72 h-full overflow-y-auto flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Background Glass Layer */}
        <div
          className="absolute inset-0 backdrop-blur-md h-screen"
          style={{ background: "rgba(17, 24, 39, 0.7)" }}
        />

        {/* Gradient Glow Layer */}
        <div className="absolute -top-24 right-0 w-60 h-80 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 opacity-20 rounded-full blur-3xl transition-all duration-500" />

        {/* Sidebar Content */}
        <div className="relative z-10 p-6 text-white flex flex-col justify-between h-full">
          <div className="hidden md:flex md:flex-col gap-4 mb-6 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 items-center justify-center">
            <img
              className="w-32 rounded-full"
              src="https://i.ibb.co.com/XkMbmbq6/Chat-GPT-Image-Apr-21-2025-04-15-04-PM.png"
              alt="BrainZap Logo"
            />
            BrainZap
          </div>

          <ul className="space-y-2 text-sm font-medium">
            <li>
              <NavLink
                to="/dashboard/adminHome"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-purple-700 text-white"
                      : "hover:bg-purple-800/50"
                  }`
                }
              >
                <House size={20}/> Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/messages"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-purple-700 text-white"
                      : "hover:bg-purple-800/50"
                  }`
                }
              >
                
                <MailCheck size={20}/> Messages
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/coupons"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-purple-700 text-white"
                      : "hover:bg-purple-800/50"
                  }`
                }
              >
                
                <TicketCheck size={20}/> Manage Coupons
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/allUsers"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-purple-700 text-white"
                      : "hover:bg-purple-800/50"
                  }`
                }
              >
                <Users size={20} /> All Users
              </NavLink>
            </li>
          </ul>

          <div className="my-6 border-t border-purple-700"></div>

          <ul className="space-y-2 text-sm font-medium">
            <li>
              <NavLink
                to="/profile"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-800/50 transition-all"
              >
                <img src={user?.photoURL} className="w-12 rounded-full" />
                {user?.displayName}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-800/50 transition-all"
              >
                <House size={20} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/start-quiz"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-800/50 transition-all"
              >
                <MdOutlineQuiz className="text-lg" />
                Start Quiz
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={logOut}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-purple-800/50 transition-all"
              >
                <LogOut size={18} /> Logout
              </NavLink>
            </li>
            <div className="text-center text-purple-300 p-4 text-sm">
            © {new Date().getFullYear()} BrainZap. All rights reserved.
          </div>
          </ul>

          
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 h-screen overflow-y-auto pt-16 md:pt-0 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;

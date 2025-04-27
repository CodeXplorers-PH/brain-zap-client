import useAuth from "@/hooks/useAuth";
import { House, LogOut, MailCheck, TicketCheck, Users } from "lucide-react";
import React, { useState } from "react";
import { MdOutlineQuiz } from "react-icons/md";
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
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-900 to-violet-950 z-50 flex items-center px-4 py-3 gap-2">
        <button
          className="text-white focus:outline-none"
          onClick={handleToggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          BrainZap
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-12 md:top-0 left-0 w-72 h-full flex flex-col bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Background Layer */}
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{ background: "rgba(17, 24, 39, 0.7)" }}
        />

        {/* Glow Layer */}
        <div className="absolute -top-24 right-0 w-60 h-80 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 opacity-20 rounded-full blur-3xl" />

        {/* Sidebar Content */}
        <div className="relative z-10 p-4 md:p-6 flex flex-col h-full">
          {/* Logo (Desktop only) */}
          <div className="hidden md:flex flex-col gap-2 items-center mb-6">
            <img
              className="w-20 md:w-24 rounded-full"
              src="https://i.ibb.co.com/XkMbmbq6/Chat-GPT-Image-Apr-21-2025-04-15-04-PM.png"
              alt="BrainZap Logo"
            />
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              BrainZap
            </div>
          </div>

          {/* Main Links */}
          <ul className="space-y-1 text-sm font-medium text-white">
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
                <House size={20} /> Admin Home
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
                <MailCheck size={20} /> Messages
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
                <TicketCheck size={20} /> Manage Coupons
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

          {/* Divider */}
          <div className="border-t border-purple-700 my-4"></div>

          {/* Secondary Links */}
          <ul className="space-y-1 text-sm font-medium text-white">
            <li>
              <NavLink
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-800/50 transition-all"
              >
                <img
                  src={user?.photoURL}
                  alt="User"
                  className="w-8 h-8 object-cover rounded-full"
                />
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
              <button
                onClick={logOut}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-800/50 transition-all text-left"
              >
                <LogOut size={18} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 pt-20 md:pt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from "react";
import { FaHome, FaUser, FaBars } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative h-screen bg-gray-900 flex overflow-hidden">
      {/* Topbar (Mobile Only) */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-900 to-violet-950 z-50 flex items-center justify-between px-4 py-3">
        <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          BrainZap
        </div>
        <button
          className="text-white focus:outline-none"
          onClick={handleToggleSidebar}
        >
          <FaBars size={22} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-40 w-72 h-full bg-gradient-to-b from-purple-950 to-violet-950 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } pt-16 md:pt-0 overflow-y-auto flex flex-col justify-between`}
      >
        <div className="p-6 text-white">
          {/* Desktop logo */}
          <div className="hidden md:flex md:flex-col gap-4 mb-6 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 items-center justify-center">
            <img
              className="w-32 rounded-full"
              src="https://i.ibb.co.com/XkMbmbq6/Chat-GPT-Image-Apr-21-2025-04-15-04-PM.png"
              alt=""
            />
            BrainZap
          </div>
          <ul className="space-y-2 text-sm font-medium">
            <li>
              <NavLink
                to={"/dashboard/adminHome"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-purple-700 text-white"
                      : "hover:bg-purple-800/50"
                  }`
                }
              >
                <FaHome /> Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/messages"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-purple-700 text-white"
                      : "hover:bg-purple-800/50"
                  }`
                }
              >
                <MdMessage />
                Messages
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/coupons"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-purple-700 text-white"
                      : "hover:bg-purple-800/50"
                  }`
                }
              >
                <RiCoupon3Fill />
                Manage Coupons
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/allUsers"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-purple-700 text-white"
                      : "hover:bg-purple-800/50"
                  }`
                }
              >
                <FaUser /> All Users
              </NavLink>
            </li>
          </ul>

          <div className="my-6 border-t border-purple-700"></div>

          <ul className="space-y-2 text-sm font-medium">
            <li>
              <NavLink
                to={"/"}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-800/50 transition-all"
              >
                <FaHome /> Home
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Footer pushed to bottom */}
        <div className="text-center text-purple-300 p-4 text-sm">
          © {new Date().getFullYear()} BrainZap. All rights reserved.
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Content Scrolls Only */}
      <div className="ml-0 flex-1 h-screen overflow-y-auto pt-16 md:pt-0 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;

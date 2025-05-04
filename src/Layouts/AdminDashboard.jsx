import useAuth from '@/hooks/useAuth';
import {
  CalendarCheck2,
  House,
  LogOut,
  MailCheck,
  TicketCheck,
  Users,
  Menu,
  X,
  ChevronRight,
  Settings,
  User,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { MdOutlineQuiz } from 'react-icons/md';
import { Helmet } from 'react-helmet';

const AdminDashboard = () => {
  const { user, logOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  const navItems = [
    {
      to: '/dashboard/adminHome',
      icon: <House size={20} />,
      label: 'Admin Home',
    },
    {
      to: '/dashboard/feedback',
      icon: <MailCheck size={20} />,
      label: 'Feedback',
    },
    {
      to: '/dashboard/allUsers',
      icon: <Users size={20} />,
      label: 'All Users',
    },
  ];

  const secondaryNavItems = [
    { to: '/', icon: <House size={20} />, label: 'Home' },
    {
      to: '/start-quiz',
      icon: <MdOutlineQuiz className="text-lg" />,
      label: 'Start Quiz',
    },
    { to: '/profile', icon: <User size={20} />, label: 'Profile' },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | BrainZap AI </title>
      </Helmet>
      <div className="min-h-screen bg-gray-900 flex">
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700/50 z-50 flex items-center justify-between px-4 py-3">
          <button
            className="text-gray-300 hover:text-white focus:outline-none rounded-full p-1"
            onClick={handleToggleSidebar}
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">BrainZap</span>
          </div>

          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-purple-500">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Sidebar - Fixed position with proper height */}
        <div
          className={`fixed md:fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-out flex flex-col
          ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full md:translate-x-0'
          }
          ${isCollapsed ? 'w-20' : 'w-72'}
        `}
        >
          <div className="h-full flex flex-col bg-gray-800 border-r border-gray-700/50 relative">
            {/* Toggle collapse button (desktop only) */}
            <button
              onClick={handleToggleCollapse}
              className="hidden md:flex absolute -right-3 top-24 bg-gray-800 border border-gray-700 rounded-full p-1 text-gray-400 hover:text-white"
            >
              <ChevronRight
                size={16}
                className={`transform transition-transform duration-300 ${
                  isCollapsed ? '' : 'rotate-180'
                }`}
              />
            </button>

            {/* Mobile close button */}
            <div className="md:hidden flex justify-end p-4">
              <button
                onClick={handleToggleSidebar}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Logo */}
            <div
              className={`flex items-center justify-center py-6 ${
                isCollapsed ? 'px-2' : 'px-6'
              }`}
            >
              {!isCollapsed && (
                <span className="text-2xl lg:pl-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  BrainZap
                </span>
              )}
            </div>

            {/* User info */}
            <div
              className={`px-4 py-4 ${isCollapsed ? 'items-center' : ''} flex ${
                isCollapsed ? 'justify-center' : 'items-center'
              } border-b border-gray-700/50`}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500 flex-shrink-0">
                <img
                  src={user?.photoURL}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              {!isCollapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-white truncate max-w-[180px]">
                    {user?.displayName}
                  </p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              )}
            </div>

            {/* Navigation Section - Add overflow control */}
            <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <div className={`mb-2 px-4 ${isCollapsed ? 'text-center' : ''}`}>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                  {isCollapsed ? 'Menu' : 'Main Menu'}
                </p>
              </div>
              <ul className="space-y-1">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center ${
                          isCollapsed ? 'justify-center' : ''
                        } px-4 py-3 rounded-lg transition-colors duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-900/80 to-indigo-900/80 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }`
                      }
                      title={isCollapsed ? item.label : ''}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!isCollapsed && (
                        <span className="ml-3">{item.label}</span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div
                className={`mt-8 mb-2 px-4 ${isCollapsed ? 'text-center' : ''}`}
              >
                <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                  {isCollapsed ? 'Links' : 'Quick Links'}
                </p>
              </div>
              <ul className="space-y-1">
                {secondaryNavItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.to}
                      className={`flex items-center ${
                        isCollapsed ? 'justify-center' : ''
                      } px-4 py-3 rounded-lg transition-colors duration-200 text-gray-400 hover:text-white hover:bg-gray-700/50`}
                      title={isCollapsed ? item.label : ''}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      {!isCollapsed && (
                        <span className="ml-3">{item.label}</span>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Logout button - Always at bottom */}
            <div className="p-4 border-t border-gray-700/50 mt-auto">
              <button
                onClick={logOut}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center' : ''
                } px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors duration-200`}
                title={isCollapsed ? 'Logout' : ''}
              >
                <LogOut size={20} />
                {!isCollapsed && <span className="ml-3">Logout</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content - Adjust margin/padding based on sidebar state */}
        <div
          className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-out
          ${isCollapsed ? 'md:ml-20' : 'md:ml-72'}`}
        >
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between bg-gray-800 border-b border-gray-700/50 px-6 py-4">
            <h1 className="text-xl font-semibold text-white">
              {location.pathname.includes('adminHome') && 'Admin Dashboard'}
              {location.pathname.includes('feedback') && 'Feedback'}
              {location.pathname.includes('allUsers') && 'User Management'}
            </h1>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg bg-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200">
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 pt-20 md:pt-6 bg-gray-900">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

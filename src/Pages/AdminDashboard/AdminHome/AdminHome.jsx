import React, { useState } from 'react';
import {
  Mail,
  User,
  Users,
  Calendar,
  ArrowRight,
  Activity,
  Bell,
} from 'lucide-react';
import { MdOutlineAttachMoney } from 'react-icons/md';
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from 'recharts';
import useAuth from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import useAdminHome from '@/hooks/useAdminHome';
import { Helmet } from 'react-helmet-async';

const SummaryCard = ({ icon, title, value, color, change }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-md ${color}`}>{icon}</div>
          <h3 className="text-sm font-medium text-gray-300">{title}</h3>
        </div>
        {change && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              change.startsWith('+')
                ? 'bg-green-900/30 text-green-400'
                : 'bg-red-900/30 text-red-400'
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <div className="flex items-baseline">
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </div>
);

const AdminHome = () => {
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const { dashboardData, loading } = useAdminHome();
  const {
    totalUsers: users = 0,
    totalFeedback: messages = 0,
    totalFreeUsers = 0,
    totalProUsers = 0,
    totalEliteUsers = 0,
    latestFeedback: feedbacks = [],
    totalRevenue = 0,
  } = dashboardData;

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const data = [
    { name: 'Pro Users', value: totalProUsers, color: '#8b5cf6' },
    { name: 'Elite Users', value: totalEliteUsers, color: '#06b6d4' },
    { name: 'Free Users', value: totalFreeUsers, color: '#34d399' },
  ];

  const renderActiveShape = props => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill="#fff"
          className="text-sm"
        >
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#fff"
          className="text-xs"
        >{`${value} Users`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
          className="text-xs"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const feedbackTypeColors = {
    Feedback: 'bg-emerald-500',
    'Feature Request': 'bg-blue-500',
    'Bug Report': 'bg-red-500',
    Question: 'bg-amber-500',
  };

  const renderSkeletonCard = () => (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="h-10 w-24 bg-gray-700 rounded-md animate-pulse"></div>
        <div className="h-6 w-14 bg-gray-700 rounded-full animate-pulse"></div>
      </div>
      <div className="h-8 w-20 bg-gray-700 rounded-md animate-pulse"></div>
    </div>
  );

  const renderSkeletonFeedback = () => (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50 p-6">
      <div className="flex justify-between mb-4">
        <div className="h-6 w-32 bg-gray-700 rounded-md animate-pulse"></div>
        <div className="h-6 w-20 bg-gray-700 rounded-md animate-pulse"></div>
      </div>
      <div className="h-4 w-full bg-gray-700 rounded-md animate-pulse mb-2"></div>
      <div className="h-4 w-3/4 bg-gray-700 rounded-md animate-pulse"></div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Admin Home | BrainZap</title>
      </Helmet>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back,{' '}
              <span className="text-purple-400">{user?.displayName}</span>
            </h1>
            <p className="text-gray-400">
              Here's what's happening on your platform today
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-gray-300 hover:bg-gray-700 border border-gray-700">
              <Calendar size={16} />
              <span>Today</span>
            </button>
            <button className="relative rounded-lg bg-gray-800 px-3 py-2 text-gray-300 hover:bg-gray-700 border border-gray-700">
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-xs text-white">
                2
              </span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Overview</h2>
            <div className="flex items-center text-xs font-medium text-purple-400">
              <span>Last 30 days</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loading ? (
              <>
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index}>{renderSkeletonCard()}</div>
                  ))}
              </>
            ) : (
              <>
                <SummaryCard
                  icon={<Users size={18} className="text-white" />}
                  title="Total Users"
                  value={users}
                  color="bg-purple-500/20 text-purple-400"
                  change="+12%"
                />
                <SummaryCard
                  icon={<Mail size={18} className="text-white" />}
                  title="Total Messages"
                  value={messages}
                  color="bg-blue-500/20 text-blue-400"
                  change="+5%"
                />
                <SummaryCard
                  icon={
                    <MdOutlineAttachMoney size={18} className="text-white" />
                  }
                  title="Total Revenue"
                  value={`$ ${totalRevenue.toFixed(2)}`}
                  color="bg-green-500/20 text-green-400"
                  change="+70%"
                />
                <SummaryCard
                  icon={<Activity size={18} className="text-white" />}
                  title="Total Feedback"
                  value={messages}
                  color="bg-amber-500/20 text-amber-400"
                  change="+18%"
                />
              </>
            )}
          </div>
        </section>

        {/* User Overview Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Distribution */}
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50 col-span-1 lg:col-span-2">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  User Distribution
                </h2>
                <Link
                  to="/dashboard/allUsers"
                  className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  View all users <ArrowRight size={14} />
                </Link>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Pie Chart */}
                <div className="h-64 w-full lg:w-2/3">
                  {loading ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="h-32 w-32 rounded-full bg-gray-700 animate-pulse"></div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          activeIndex={activeIndex}
                          activeShape={renderActiveShape}
                          data={data}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          onMouseEnter={onPieEnter}
                        >
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              stroke="rgba(0,0,0,0.1)"
                              strokeWidth={1}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            borderColor: '#374151',
                            borderRadius: '0.375rem',
                            color: '#f9fafb',
                          }}
                          formatter={(value, name) => [
                            `${value} Users (${((value / users) * 100).toFixed(
                              1
                            )}%)`,
                            name,
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* User Type Cards */}
                <div className="w-full lg:w-1/3 flex flex-col gap-3">
                  {loading ? (
                    <>
                      {Array(3)
                        .fill(0)
                        .map((_, index) => (
                          <div
                            key={index}
                            className="h-14 bg-gray-700/50 rounded-md animate-pulse"
                          ></div>
                        ))}
                    </>
                  ) : (
                    <>
                      <div className="bg-gray-700/20 rounded-md p-3 border border-green-500/20 hover:border-green-500/40 transition-all">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs font-medium text-white">
                              Free Users
                            </span>
                          </div>
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-900/30 text-green-400 font-semibold">
                            {users > 0
                              ? Math.round((totalFreeUsers / users) * 100)
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="text-xl font-bold text-white mb-1">
                          {totalFreeUsers}
                        </div>
                        <div className="mt-1 w-full h-1.5 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full transition-all duration-700 ease-in-out"
                            style={{
                              width: `${
                                users > 0 ? (totalFreeUsers / users) * 100 : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-gray-700/20 rounded-md p-3 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                            <span className="text-xs font-medium text-white">
                              Pro Users
                            </span>
                          </div>
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-900/30 text-purple-400 font-semibold">
                            {users > 0
                              ? Math.round((totalProUsers / users) * 100)
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="text-xl font-bold text-white mb-1">
                          {totalProUsers}
                        </div>
                        <div className="mt-1 w-full h-1.5 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 rounded-full transition-all duration-700 ease-in-out"
                            style={{
                              width: `${
                                users > 0 ? (totalProUsers / users) * 100 : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-gray-700/20 rounded-md p-3 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-xs font-medium text-white">
                              Elite Users
                            </span>
                          </div>
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-900/30 text-blue-400 font-semibold">
                            {users > 0
                              ? Math.round((totalEliteUsers / users) * 100)
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="text-xl font-bold text-white mb-1">
                          {totalEliteUsers}
                        </div>
                        <div className="mt-1 w-full h-1.5 bg-gray-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-in-out"
                            style={{
                              width: `${
                                users > 0 ? (totalEliteUsers / users) * 100 : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Feedback */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                Recent Feedback
              </h2>
              <Link
                to="/dashboard/feedback"
                className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                View all messages <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid gap-4">
              {loading ? (
                <>
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index}>{renderSkeletonFeedback()}</div>
                    ))}
                </>
              ) : feedbacks && feedbacks.length > 0 ? (
                feedbacks.slice(0, 2).map((feedback, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700/50 p-5"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                          {feedback.name ? (
                            <span className="text-xs font-medium text-white">
                              {feedback.name
                                .split(' ')
                                .map(n => n[0])
                                .join('')
                                .toUpperCase()}
                            </span>
                          ) : (
                            <User size={14} className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">
                            {feedback.name}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {feedback.email}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          feedbackTypeColors[feedback.feedbackType] ||
                          'bg-gray-500'
                        }`}
                      >
                        {feedback.feedbackType}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {feedback.message}
                    </p>
                    <div className="mt-3 text-xs text-gray-500">
                      {feedback.date}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-400">No feedback available</p>
                </div>
              )}
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default AdminHome;

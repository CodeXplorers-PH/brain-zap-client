import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, Calendar, CheckCircle } from "lucide-react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const SummaryCard = ({ icon, title, value, gradient, description }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.3 }}
    className="group relative overflow-hidden rounded-2xl border border-gray-800 p-6 backdrop-blur-md transition-all duration-300"
    style={{
      background: "rgba(17, 24, 39, 0.7)",
    }}
  >
    <div
      className={`absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br ${gradient} opacity-20 rounded-full blur-3xl group-hover:scale-125 group-hover:opacity-40 transition-all duration-500`}
    />
    <div className="relative z-10 flex items-center gap-4 mb-4">
      <div className="bg-gradient-to-tr from-purple-600 to-indigo-500 p-3 rounded-xl text-white">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-3xl font-bold text-purple-400">{value}</p>
      {description && <p className="text-sm text-white/80">{description}</p>}
    </div>
  </motion.div>
);

const feedbacks = [
  {
    name: "John Doe",
    email: "john.doe@email.com",
    message: "Loving the platform!",
    feedbackType: "Feedback",
    date: "2025-04-27",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@email.com",
    message:
      "Smooth and intuitiveajsdhbasjbdaashb d sd asdbabsdbahdbhadas dasd ashdasd ad .",
    feedbackType: "Bug Report",
    date: "2025-04-26",
  },
  {
    name: "Alice Johnson",
    email: "alice.j@email.com",
    message: "Support was quick.",
    feedbackType: "General Question",
    date: "2025-04-25",
  },
  {
    name: "Alice Johnson",
    email: "alice.j@email.com",
    message: "Support was quick.",
    feedbackType: "Feature Request",
    date: "2025-04-25",
  },
];

const AdminHome = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState(0);
  const [messages, setMessages] = useState(0);
  const [totalFreeUsers, setTotalFreeUsers] = useState(0);
  const [totalProUsers, setTotalProUsers] = useState(0);
  const [totalEliteUsers, setTotalEliteUsers] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const axiosSecure = useAxiosSecure();

  // Pie Charts Starts Here
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const data = [
    { name: "Pro Users", value: totalProUsers, color: "#8b5cf6" }, // purple
    { name: "Elite Users", value: totalEliteUsers, color: "#06b6d4" }, // cyan
    { name: "Free Users", value: totalFreeUsers, color: "#34d399" }, // green
  ];

  const renderActiveShape = (props) => {
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
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
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
        >{`${value} Users`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  // Pie Charts Ends Here

  // Getting Admin Dashboard Data By GraphQL
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axiosSecure.post(`/adminDashboard`, {
          query: `
            query {
              adminDashboard {
                totalUsers
                totalFeedback
                totalFreeUsers
                totalProUsers
                totalEliteUsers
              }
            }
          `,
        });

        const data = res?.data?.data?.adminDashboard;
        setUsers(data?.totalUsers || 0);
        setMessages(data?.totalFeedback || 0);
        setTotalFreeUsers(data?.totalFreeUsers || 0);
        setTotalProUsers(data?.totalProUsers || 0);
        setTotalEliteUsers(data?.totalEliteUsers || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user?.email) {
      fetchDashboardData();
    }
  }, [user, axiosSecure]);

  const gradients = [
    "from-indigo-500 via-purple-500 to-pink-500",
    "from-cyan-500 via-blue-500 to-indigo-500",
    "from-green-400 via-emerald-500 to-teal-500",
  ];

  return (
    <div className="px-4 py-6 space-y-10">
      {/* Heading */}
      <section>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            BrainZap Dashboard
          </span>
        </h1>
        <p className="text-gray-300 mb-8 text-center">
          Track platform activity and manage insights effortlessly.
        </p>
      </section>

      {/* Stats Cards  Section*/}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SummaryCard
          icon={<User size={24} />}
          title="Total Users"
          value={users}
          description="Registered users on the platform"
          gradient={gradients[0]}
        />
        <SummaryCard
          icon={<Mail size={24} />}
          title="Total Messages"
          value={messages}
          description="Messages received via contact form"
          gradient={gradients[1]}
        />
        <SummaryCard
          icon={<MdOutlineAttachMoney size={24} />}
          title="Total Revenue"
          value="Coming Soon"
          description="Revenue tracking will be available soon"
          gradient={gradients[2]}
        />
      </section>

      {/* User Overview section */}
      <section className="w-full mt-20">
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 text-center">
            User Overview
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Pie Chart */}
          <div className="h-[300px] w-full lg:w-1/2">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Free / Pro / Elite User Cards */}
          <div className="flex flex-col md:flex-row gap-6 w-full lg:w-1/2">
            {[
              {
                label: "Free Users",
                count: totalFreeUsers,
                color: "from-green-400 to-teal-500",
              },
              {
                label: "Pro Users",
                count: totalProUsers,
                color: "from-purple-500 to-indigo-500",
              },
              {
                label: "Elite Users",
                count: totalEliteUsers,
                color: "from-cyan-400 to-sky-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="group relative flex-1 overflow-hidden rounded-2xl border border-gray-700 p-5 backdrop-blur-md transition-all duration-300"
                style={{
                  background: "rgba(17, 24, 39, 0.7)",
                }}
              >
                <div
                  className={`absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br ${item.color} opacity-20 rounded-full blur-3xl group-hover:scale-125 group-hover:opacity-40 transition-all duration-500`}
                />
                <div className="relative z-10">
                  <div
                    className={`h-2 w-full rounded-full mb-4 bg-gradient-to-r ${item.color}`}
                  />
                  <h3 className="text-xl font-semibold text-white">
                    {item.label}
                  </h3>
                  <p className="text-3xl font-bold text-white mt-4">
                    {item.count}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <Link
          to="/dashboard/allUsers"
          className="text-purple-400 hover:underline text-sm flex justify-end mt-3"
        >
          See More →
        </Link>
      </section>

      {/* Messages/Feedback Section */}
      <div className="w-full mt-20">
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 text-center">
            Recent Feedback
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feedbacks.slice(0, 3).map((feedback, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-800 p-6 backdrop-blur-md transition-all duration-300"
              style={{
                background: "rgba(17, 24, 39, 0.7)",
              }}
            >
              {/* Gradient Background Effect */}
              <div
                className={`absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br ${gradients[idx]} opacity-20 rounded-full blur-3xl group-hover:scale-125 group-hover:opacity-40 transition-all duration-500`}
              />

              {/* Feedback Type (Rounded Badge) */}
              <div
                className={`absolute top-4 right-4 px-3 py-1 text-xs text-white font-semibold rounded-full ${
                  feedback.feedbackType === "Feedback"
                    ? "bg-green-600"
                    : feedback.feedbackType === "Feature Request"
                    ? "bg-blue-500"
                    : feedback.feedbackType === "Bug Report"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {feedback.feedbackType}
              </div>

              {/* Card Content */}
              <div className="relative z-10">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {feedback.name}
                </h4>{" "}
                <p className="text-xs text-white/60 flex items-center gap-1 mb-2">
                  {" "}
                  <Mail className="size-4" /> {feedback.email}
                </p>
                <p className="text-sm text-white/80">
                  {feedback.message.length > 40
                    ? feedback.message.substring(0, 40) + "..."
                    : feedback.message}
                </p>
                {/* Icons for Type and Date */}
                <div className="flex items-center gap-1 text-xs text-white/60 mt-2">
                  <Calendar size={14} />
                  {feedback.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <Link
          to="/dashboard/messages"
          className="text-purple-400 hover:underline text-sm flex justify-end mt-3"
        >
          See More →
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;

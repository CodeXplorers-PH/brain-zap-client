import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Mail, User } from "lucide-react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import useAuth from "@/hooks/useAuth";

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

const AdminHome = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState(0);
  const [messages, setMessages] = useState(0);
  const [totalFreeUsers, setTotalFreeUsers] = useState(0);
  const [totalProUsers, setTotalProUsers] = useState(0);
  const [totalEliteUsers, setTotalEliteUsers] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    axiosPublic.get(`/adminDashboard/${user?.email}`).then((res) => {
      setUsers(res?.data?.totalUsers || 0);
      setMessages(res?.data?.totalFeedback || 0);
      setTotalFreeUsers(res?.data?.totalFreeUsers || 0);
      setTotalProUsers(res?.data?.totalProUsers || 0);
      setTotalEliteUsers(res?.data?.totalEliteUsers || 0);
      console.log(res?.data);
    });
  }, [axiosPublic, user?.email]);

  const gradients = [
    "from-indigo-500 via-purple-500 to-pink-500",
    "from-cyan-500 via-blue-500 to-indigo-500",
    "from-green-400 via-emerald-500 to-teal-500",
  ];

  return (
    <div className="px-4 py-6 space-y-10">
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
      <div className="h-[400px] w-full">
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
    </div>
  );
};

export default AdminHome;

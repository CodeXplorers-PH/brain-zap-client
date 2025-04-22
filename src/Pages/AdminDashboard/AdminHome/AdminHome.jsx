import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Mail, User } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const Card = ({ icon, title, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative bg-[#111827]/60 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-md hover:shadow-purple-600/30 transition-all duration-300"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="bg-gradient-to-tr from-purple-600 to-indigo-500 p-3 rounded-xl text-white">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
};

const AdminHome = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axiosPublic
      .get(`/api/users/${user?.email}`)
      .then((res) => setUsers(res.data));
    axiosPublic.get("/api/messages").then((res) => setMessages(res.data));
  }, [axiosPublic, user?.email]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 py-6">
      {/* Users Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">All Users</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {users.map((user) => (
            <Card key={user._id} icon={<User size={20} />} title={user.name}>
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.photoURL || "https://i.ibb.co/0jqHpnp/default-user.png"
                  }
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-white text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-300 text-xs">{user.email}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Messages Section */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Messages</h2>
        <div className="space-y-6">
          {messages.map((msg) => (
            <Card key={msg._id} icon={<Mail size={20} />} title={msg.subject}>
              <p className="text-gray-200 text-sm mb-2">{msg.message}</p>
              <p className="text-purple-300 text-xs">From: {msg.senderEmail}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

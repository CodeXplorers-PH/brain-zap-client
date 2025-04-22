import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { User, Trash2, ShieldCheck, Lock } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const Card = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-br from-[#1f2937]/50 to-[#111827]/60 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-purple-600/30 transition-all duration-300"
    >
      {children}
    </motion.div>
  );
};

const AllUsers = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axiosPublic.get(`/api/users/${user?.email}`).then((res) => setUsers(res.data));
    axiosPublic.get("/api/messages").then((res) => setMessages(res.data));
  }, [axiosPublic, user?.email]);

  const handleDelete = (id) => {
    console.log("Deleting user:", id);
  };

  const handleLock = (id) => {
    console.log("Locking user:", id);
  };

  const handleMakeAdmin = (id) => {
    console.log("Making admin:", id);
  };

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 py-6">
      {/* Title */}
      <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center gap-2">
        <User className="border-2 w-12 rounded-full" />
        All Users
      </h2>

      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="px-4 py-2 rounded-md w-full max-w-md bg-[#1f2937]/50 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user._id}>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user?.photoURL || "https://i.ibb.co/0jqHpnp/default-user.png"}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border border-purple-600 shadow-md"
              />
              <div className="text-white text-base">
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-gray-300 text-sm">{user.email}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <button
                onClick={() => handleDelete(user._id)}
                className="text-xs px-2 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-600 hover:text-white transition-all"
              >
                <Trash2 size={14} className="inline mr-1" />
                Delete
              </button>
              <button
                onClick={() => handleLock(user._id)}
                className="text-xs px-2 py-1 border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-600 hover:text-white transition-all"
              >
                <Lock size={14} className="inline mr-1" />
                Lock
              </button>
              <button
                onClick={() => handleMakeAdmin(user._id)}
                className="text-xs px-2 py-1 border border-green-500 text-green-500 rounded-md hover:bg-green-600 hover:text-white transition-all"
              >
                <ShieldCheck size={14} className="inline mr-1" />
                Admin
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;

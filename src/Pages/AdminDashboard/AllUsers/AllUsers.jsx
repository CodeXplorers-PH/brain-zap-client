import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { User, Trash2, ShieldCheck, Lock } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Card = ({ children, gradient }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-2xl border border-gray-800 p-6 backdrop-blur-md transition-all duration-300`}
      style={{
        background: "rgba(17, 24, 39, 0.7)",
      }}
    >
      {/* Gradient Glow Background */}
      <div
        className={`absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br ${gradient} opacity-20 rounded-full blur-3xl group-hover:scale-125 group-hover:opacity-40 transition-all duration-500`}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const AllUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const axiosPublic = useAxiosPublic();

  const gradients = [
    "from-indigo-500 via-purple-500 to-pink-500",
    "from-cyan-500 via-blue-500 to-indigo-500",
    "from-green-400 via-emerald-500 to-teal-500",
    "from-sky-400 via-blue-500 to-purple-500",
  ];

  useEffect(() => {
    axiosPublic
      .get(`/api/users/${user?.email}`)
      .then((res) => setUsers(res.data));
  }, [axiosPublic, user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete this user!",
      background: "rgba(30, 30, 60, 0.85)",
      color: "#fff",
      backdrop: `rgba(0, 0, 0, 0.4)`,
      customClass: {
        popup: "rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg",
        title: "text-blue-400 text-lg font-semibold",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4",
        htmlContainer: "text-sm text-gray-300",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/deleteUser/${id}/${user?.email}`)
          .then((res) => {
            if (res.data?.message === "User deleted successfully.") {
              setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
                background: "rgba(30, 30, 60, 0.85)",
                color: "#fff",
                backdrop: `rgba(0, 0, 0, 0.4)`,
                customClass: {
                  popup:
                    "rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg",
                  title: "text-blue-400 text-lg font-semibold",
                  confirmButton:
                    "bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4",
                  htmlContainer: "text-sm text-gray-300",
                },
              });
            } else {
              throw new Error("User not found or could not be deleted.");
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text:
                error.response?.data?.message ||
                error.message ||
                "Something went wrong.",
              icon: "error",
              background: "rgba(30, 30, 60, 0.85)",
              color: "#fff",
              backdrop: `rgba(0, 0, 0, 0.4)`,
              customClass: {
                popup:
                  "rounded-xl shadow-lg border border-red-500 backdrop-blur-lg",
                title: "text-red-400 text-lg font-semibold",
                confirmButton:
                  "bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded mt-4",
                htmlContainer: "text-sm text-gray-300",
              },
            });
          });
      }
    });
  };

  const handleLock = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Lock for 1 hr!",
      background: "rgba(30, 30, 60, 0.85)",
      color: "#fff",
      backdrop: `rgba(0, 0, 0, 0.4)`,
      customClass: {
        popup: "rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg",
        title: "text-blue-400 text-lg font-semibold",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4",
        htmlContainer: "text-sm text-gray-300",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const unlockTime = Date.now() + 3600000;

        axiosPublic
          .post(`/lockoutUser/${id}/${user?.email}`, { unlockTime })
          .then((response) => {
            // Show success message on success
            Swal.fire({
              title: "Locked!",
              text: "User has been locked for 1 hr.",
              icon: "success",
              background: "rgba(30, 30, 60, 0.85)",
              color: "#fff",
              backdrop: `rgba(0, 0, 0, 0.4)`,
              customClass: {
                popup:
                  "rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg",
                title: "text-blue-400 text-lg font-semibold",
                confirmButton:
                  "bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4",
                htmlContainer: "text-sm text-gray-300",
              },
            });
          })
          .catch((error) => {
            // Handle any errors here
            Swal.fire({
              title: "Error!",
              text: "There was an issue locking the user.",
              icon: "error",
              background: "rgba(30, 30, 60, 0.85)",
              color: "#fff",
              backdrop: `rgba(0, 0, 0, 0.4)`,
              customClass: {
                popup:
                  "rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg",
                title: "text-red-400 text-lg font-semibold",
                confirmButton:
                  "bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded mt-4",
                htmlContainer: "text-sm text-gray-300",
              },
            });
          });
      }
    });
  };

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
      background: "rgba(30, 30, 60, 0.85)",
      color: "#fff",
      backdrop: `rgba(0, 0, 0, 0.4)`,
      customClass: {
        popup: "rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg",
        title: "text-blue-400 text-lg font-semibold",
        confirmButton:
          "bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4",
        htmlContainer: "text-sm text-gray-300",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .patch(`/makeAdmin/${id}/${user?.email}`)
          .then((response) => {
            if (
              response?.data?.message === "User has been promoted to admin."
            ) {
              // ✅ Update the local state to reflect new admin role
              setUsers((prevUsers) =>
                prevUsers.map((u) =>
                  u._id === id ? { ...u, role: "admin" } : u
                )
              );

              Swal.fire({
                title: "Success!",
                text: "User has been granted admin access.",
                icon: "success",
                background: "rgba(30, 30, 60, 0.85)",
                color: "#fff",
                backdrop: `rgba(0, 0, 0, 0.4)`,
                customClass: {
                  popup:
                    "rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg",
                  title: "text-blue-400 text-lg font-semibold",
                  confirmButton:
                    "bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4",
                  htmlContainer: "text-sm text-gray-300",
                },
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "There was an issue making the user an admin.",
              icon: "error",
              background: "rgba(30, 30, 60, 0.85)",
              color: "#fff",
              backdrop: `rgba(0, 0, 0, 0.4)`,
              customClass: {
                popup:
                  "rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg",
                title: "text-red-400 text-lg font-semibold",
                confirmButton:
                  "bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded mt-4",
                htmlContainer: "text-sm text-gray-300",
              },
            });
          });
      }
    });
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto min-h-screen py-20 px-6">
      <div className="mb-10 text-center">
        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 flex items-center justify-center gap-2">
          <User size={26} className="border-2 w-14 rounded-full" />
          All Registerd Users
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
      </div>

      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, i) => {
          const gradient =
            gradients[Math.floor(Math.random() * gradients.length)];

          return (
            <Card key={user._id} gradient={gradient}>
              <div className="flex items-center gap-4 mb-4">
                {user?.photoURL && (
                  <Avatar className="w-16 h-16 rounded-full object-cover border border-purple-600 shadow-md">
                    <AvatarImage
                      src={user?.photoURL}
                      alt={`Photo of ${user?.displayName}`}
                    />
                    <AvatarFallback>
                      {user?.displayName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="text-white text-base">
                  <p className="font-semibold text-lg">{user.name}</p>
                  <p className="text-gray-300 text-sm">{user.email}</p>
                </div>
              </div>

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
                {user.role === "admin" ? (
                  <button className="text-xs px-2 py-1 border border-green-500  rounded-md bg-green-600 text-white transition-all">
                    Admin Account
                  </button>
                ) : (
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="text-xs px-2 py-1 border border-green-500 text-green-500 rounded-md hover:bg-green-600 hover:text-white transition-all"
                  >
                    <ShieldCheck size={14} className="inline mr-1" />
                    Admin
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default AllUsers;

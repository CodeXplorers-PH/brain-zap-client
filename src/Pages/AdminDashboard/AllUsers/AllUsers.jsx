import React, { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { Filter, Search, ShieldCheck, SlidersHorizontal, Trash2, Lock, User, AlertTriangle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AllUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    axiosSecure.get(`/allUsers/information`).then(res => {
      setUsers(res?.data?.users);
      setLoading(false);
    });
  }, [axiosSecure]);

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete this user!',
      background: 'rgba(30, 30, 60, 0.85)',
      color: '#fff',
      backdrop: `rgba(0, 0, 0, 0.4)`,
      customClass: {
        popup: 'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
        title: 'text-blue-400 text-lg font-semibold',
        confirmButton:
          'bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4',
        htmlContainer: 'text-sm text-gray-300',
      },
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/deleteUser/${id}`)
          .then(res => {
            if (res.data?.message === 'User deleted successfully.') {
              setUsers(prevUsers => prevUsers.filter(u => u._id !== id));
              Swal.fire({
                title: 'Deleted!',
                text: 'User has been deleted.',
                icon: 'success',
                background: 'rgba(30, 30, 60, 0.85)',
                color: '#fff',
                backdrop: `rgba(0, 0, 0, 0.4)`,
                customClass: {
                  popup:
                    'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
                  title: 'text-blue-400 text-lg font-semibold',
                  confirmButton:
                    'bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4',
                  htmlContainer: 'text-sm text-gray-300',
                },
              });
            } else {
              throw new Error('User not found or could not be deleted.');
            }
          })
          .catch(error => {
            Swal.fire({
              title: 'Error',
              text:
                error.response?.data?.message ||
                error.message ||
                'Something went wrong.',
              icon: 'error',
              background: 'rgba(30, 30, 60, 0.85)',
              color: '#fff',
              backdrop: `rgba(0, 0, 0, 0.4)`,
              customClass: {
                popup:
                  'rounded-xl shadow-lg border border-red-500 backdrop-blur-lg',
                title: 'text-red-400 text-lg font-semibold',
                confirmButton:
                  'bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded mt-4',
                htmlContainer: 'text-sm text-gray-300',
              },
            });
          });
      }
    });
  };

  const handleLock = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Lock for 1 hr!',
      background: 'rgba(30, 30, 60, 0.85)',
      color: '#fff',
      backdrop: `rgba(0, 0, 0, 0.4)`,
      customClass: {
        popup: 'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
        title: 'text-blue-400 text-lg font-semibold',
        confirmButton:
          'bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4',
        htmlContainer: 'text-sm text-gray-300',
      },
    }).then(result => {
      if (result.isConfirmed) {
        const unlockTime = Date.now() + 3600000;
        axiosSecure
          .post(`/lockoutUser/${id}`, { unlockTime })
          .then(response => {
            Swal.fire({
              title: 'Locked!',
              text: 'User has been locked for 1 hr.',
              icon: 'success',
              background: 'rgba(30, 30, 60, 0.85)',
              color: '#fff',
              backdrop: `rgba(0, 0, 0, 0.4)`,
              customClass: {
                popup:
                  'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
                title: 'text-blue-400 text-lg font-semibold',
                confirmButton:
                  'bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4',
                htmlContainer: 'text-sm text-gray-300',
              },
            });
          })
          .catch(error => {
            Swal.fire({
              title: 'Error!',
              text: 'There was an issue locking the user.',
              icon: 'error',
              background: 'rgba(30, 30, 60, 0.85)',
              color: '#fff',
              backdrop: `rgba(0, 0, 0, 0.4)`,
              customClass: {
                popup:
                  'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
                title: 'text-red-400 text-lg font-semibold',
                confirmButton:
                  'bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded mt-4',
                htmlContainer: 'text-sm text-gray-300',
              },
            });
          });
      }
    });
  };

  const handleMakeAdmin = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Make Admin!',
      background: 'rgba(30, 30, 60, 0.85)',
      color: '#fff',
      backdrop: `rgba(0, 0, 0, 0.4)`,
      customClass: {
        popup: 'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
        title: 'text-blue-400 text-lg font-semibold',
        confirmButton:
          'bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4',
        htmlContainer: 'text-sm text-gray-300',
      },
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/makeAdmin/${id}/${user?.email}`)
          .then(response => {
            if (
              response?.data?.message === 'User has been promoted to admin.'
            ) {
              setUsers(prevUsers =>
                prevUsers.map(u => (u._id === id ? { ...u, role: 'admin' } : u))
              );
              Swal.fire({
                title: 'Success!',
                text: 'User has been granted admin access.',
                icon: 'success',
                background: 'rgba(30, 30, 60, 0.85)',
                color: '#fff',
                backdrop: `rgba(0, 0, 0, 0.4)`,
                customClass: {
                  popup:
                    'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
                  title: 'text-blue-400 text-lg font-semibold',
                  confirmButton:
                    'bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4',
                  htmlContainer: 'text-sm text-gray-300',
                },
              });
            }
          })
          .catch(error => {
            Swal.fire({
              title: 'Error!',
              text: 'There was an issue making the user an admin.',
              icon: 'error',
              background: 'rgba(30, 30, 60, 0.85)',
              color: '#fff',
              backdrop: `rgba(0, 0, 0, 0.4)`,
              customClass: {
                popup:
                  'rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg',
                title: 'text-red-400 text-lg font-semibold',
                confirmButton:
                  'bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded mt-4',
                htmlContainer: 'text-sm text-gray-300',
              },
            });
          });
      }
    });
  };

  const filteredUsers = users?.filter(u => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Calculate user counts
  const totalUsers = users.length;
  const adminUsers = users.filter(u => u.role === 'admin').length;
  const standardUsers = totalUsers - adminUsers;

  const renderUserRow = user => {
    const membershipType = user.membershipType || 'Free';
    const membershipColor =
      {
        Free: 'bg-green-900/30 text-green-400',
        Pro: 'bg-purple-900/30 text-purple-400',
        Elite: 'bg-blue-900/30 text-blue-400',
      }[membershipType] || 'bg-green-900/30 text-green-400';

    return (
      <tr
        key={user._id}
        className="border-b border-gray-800 hover:bg-gray-800/50"
      >
        <td className="py-3 px-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9 rounded-full border border-gray-700">
              <AvatarImage src={user?.photoURL} />
              <AvatarFallback className="bg-gray-800 text-gray-300">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-white">{user.name}</div>
              <div className="text-xs text-gray-400">{user.email}</div>
            </div>
          </div>
        </td>
        <td className="py-3 px-4">
          <span className={`px-2 py-1 rounded-full text-xs ${membershipColor}`}>
            {membershipType}
          </span>
        </td>
        <td className="py-3 px-4">
          {user?.role === 'admin' ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-900/30 text-blue-400">
              <ShieldCheck size={14} className="mr-1" />
              Admin
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-700 text-gray-300">
              <User size={14} className="mr-1" />
              User
            </span>
          )}
        </td>
        <td className="py-3 px-4">
          <span className="text-sm text-gray-300">
            {user?.createdAt?.split('T')[0] || 'N/A'}
          </span>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-2">
            {user?.role !== 'admin' && (
              <button
                onClick={() => handleMakeAdmin(user?._id)}
                className="p-1 text-gray-400 hover:text-blue-400 rounded-md"
                title="Make Admin"
              >
                <ShieldCheck size={18} />
              </button>
            )}
            <button
              onClick={() => handleLock(user?._id)}
              className="p-1 text-gray-400 hover:text-yellow-400 rounded-md"
              title="Lock User"
            >
              <Lock size={18} />
            </button>
            <button
              onClick={() => handleDelete(user?._id)}
              className="p-1 text-gray-400 hover:text-red-400 rounded-md"
              title="Delete User"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const renderSkeletonRow = index => (
    <tr key={index} className="border-b border-gray-800 animate-pulse">
      <td className="py-3 px-4">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-gray-700"></div>
          <div>
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
            <div className="h-3 w-32 bg-gray-700 rounded mt-2"></div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="h-5 w-12 bg-gray-700 rounded-full"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-5 w-16 bg-gray-700 rounded-full"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 w-20 bg-gray-700 rounded"></div>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-700 rounded-md"></div>
          <div className="h-8 w-8 bg-gray-700 rounded-md"></div>
          <div className="h-8 w-8 bg-gray-700 rounded-md"></div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      {/* Header with welcome and stats */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="text-purple-400" size={24} />
            User Management
          </h1>
          <p className="text-gray-400">View and manage all registered users</p>
        </div>
        {/* <div className="flex gap-2 flex-wrap">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            <Download size={16} />
            Export Users
          </button>
        </div> */}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {totalUsers}
              </h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <User size={20} className="text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Admin Users</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {adminUsers}
              </h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <ShieldCheck size={20} className="text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Standard Users</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {standardUsers}
              </h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <User size={20} className="text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full md:w-64">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Filter
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <select
              className="pl-10 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white appearance-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={filterRole}
              onChange={e => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              {/* <option value="">User</option> */}
            </select>
          </div>
          <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 hover:text-purple-400">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* User table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900/50 text-gray-400 text-xs uppercase">
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Membership</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Joined</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => renderSkeletonRow(index))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map(renderUserRow)
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-400">
                    <div className="flex flex-col items-center">
                      <AlertTriangle
                        size={28}
                        className="text-yellow-500 mb-2"
                      />
                      <p>No users found matching your search criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between py-4 px-6 border-t border-gray-800">
          <div className="flex items-center text-sm text-gray-400">
            <span>
              Showing {filteredUsers.length} of {totalUsers} users
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600">
              Previous
            </button>
            <button className="px-3 py-1 rounded-md bg-purple-600 text-white">
              1
            </button>
            <button className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;

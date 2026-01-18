import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Users, Shield, Trash2, ArrowUpDown,
  User, Mail, Crown, CheckCircle, Filter,
  RefreshCcw, Calendar, Download
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterRole, setFilterRole] = useState("all");
  const usersPerPage = 10;

  // Fetch users
  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ["users", searchQuery, currentPage, sortField, sortOrder, filterRole],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: {
          search: searchQuery,
          page: currentPage,
          limit: usersPerPage,
          sort: sortField,
          order: sortOrder,
          role: filterRole
        },
      });
      return res.data;
    },
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Promote to Admin?",
      text: `Are you sure you want to grant admin privileges to ${user.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1FB6FF",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, promote",
      background: "#fff",
      customClass: {
        title: "font-unbounded text-[#0B2340]",
        popup: "rounded-3xl",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Promoted!",
                text: `${user.name} is now an admin.`,
                showConfirmButton: false,
                timer: 1500,
                confirmButtonColor: "#1FB6FF",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
              confirmButtonColor: "#1FB6FF",
            });
          });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Delete User?",
      text: `This action cannot be undone. ${user.name} will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#9CA3AF",
      confirmButtonText: "Delete User",
      background: "#fff",
      customClass: {
        title: "font-unbounded text-[#0B2340]",
        popup: "rounded-3xl",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Deleted",
                text: "User has been removed.",
                showConfirmButton: false,
                timer: 1500,
                confirmButtonColor: "#1FB6FF",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
              confirmButtonColor: "#1FB6FF",
            });
          });
      }
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const calculateStats = () => {
    const total = users.length;
    const admins = users.filter(u => u.role === 'admin').length;
    const regularUsers = total - admins;
    return { total, admins, regularUsers };
  };

  const stats = calculateStats();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[50vh]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-500">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-jakarta relative overflow-hidden p-4 lg:p-8">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#1FB6FF]/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#70C5D7]/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Premium Gradient Header */}
        <motion.div
          variants={itemVariants}
          className="relative mb-8 bg-gradient-to-br from-[#0B2340] to-[#02bfff] rounded-3xl p-6 md:p-10 overflow-hidden shadow-xl shadow-blue-900/10"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#02bfff]/30 rounded-full blur-[50px] -ml-10 -mb-10 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold font-unbounded text-white mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <Users className="text-white w-6 h-6" />
                  </div>
                  Manage Users
                </h1>
                <p className="text-white/80 text-base ml-13">Administrate user accounts, roles, and permissions.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => refetch()}
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/10 text-sm font-medium hover:bg-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <RefreshCcw className="mr-2 w-4 h-4 text-[#02bfff]" />
                  Refresh Data
                </button>
              </div>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Total Users */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Total Users</p>
                    <h3 className="text-2xl font-bold text-white font-unbounded">{stats.total}</h3>
                  </div>
                  <div className="p-2 rounded-lg bg-[#02bfff]/20 text-[#02bfff]">
                    <Users size={20} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Admins */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Administrators</p>
                    <h3 className="text-2xl font-bold text-white font-unbounded">{stats.admins}</h3>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                    <Crown size={20} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Regular Users */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Regular Users</p>
                    <h3 className="text-2xl font-bold text-white font-unbounded">{stats.regularUsers}</h3>
                  </div>
                  <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                    <User size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters & Search - Glassmorphic Bar */}
        <motion.div
          variants={itemVariants}
          className="mb-8 bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col md:flex-row items-center gap-4 sticky top-4 z-20"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-[#1FB6FF] transition-colors" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#1FB6FF]/20 focus:bg-white transition-all text-gray-700 font-medium placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="relative group min-w-[140px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#1FB6FF]/20 cursor-pointer font-bold text-gray-600 text-sm appearance-none hover:bg-gray-100 transition-colors"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admins</option>
                <option value="user">Users</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <ArrowUpDown size={14} className="text-gray-400" />
              </div>
            </div>

            <div className="relative group min-w-[140px]">
              <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={`${sortField}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortField(field);
                  setSortOrder(order);
                }}
                className="w-full pl-10 pr-8 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#1FB6FF]/20 cursor-pointer font-bold text-gray-600 text-sm appearance-none hover:bg-gray-100 transition-colors"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="email-asc">Email (A-Z)</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Users Table / Grid */}
        <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden min-h-[400px]">
          {isLoading ? (
            <div className="p-8 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : paginatedUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">No users found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="p-6 font-bold text-xs text-gray-400 uppercase tracking-wider font-unbounded">User Info</th>
                    <th className="p-6 font-bold text-xs text-gray-400 uppercase tracking-wider font-unbounded">Role</th>
                    <th className="p-6 font-bold text-xs text-gray-400 uppercase tracking-wider font-unbounded text-center">Status</th>
                    <th className="p-6 font-bold text-xs text-gray-400 uppercase tracking-wider font-unbounded text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {paginatedUsers.map((user, idx) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group hover:bg-blue-50/30 transition-colors border-b border-gray-50 last:border-none"
                      >
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 text-[#1FB6FF] flex items-center justify-center text-lg font-bold shadow-inner uppercase">
                              {user.photoURL ? <img src={user.photoURL} className="w-full h-full rounded-full object-cover" /> : user.name?.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-[#0B2340] text-base group-hover:text-[#1FB6FF] transition-colors">{user.name}</h4>
                              <p className="text-sm text-gray-500 flex items-center gap-1 font-medium">
                                <Mail size={12} /> {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${user.role === 'admin'
                            ? 'bg-purple-50 text-purple-600 border-purple-100'
                            : 'bg-blue-50 text-blue-600 border-blue-100'
                            }`}>
                            {user.role === 'admin' ? <Crown size={14} fill="currentColor" /> : <User size={14} />}
                            <span className="capitalize">{user.role || 'User'}</span>
                          </div>
                        </td>
                        <td className="p-6 text-center">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-600 border border-green-100">
                            <CheckCircle size={14} />
                            Active
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {user.role !== 'admin' && (
                              <button
                                onClick={() => handleMakeAdmin(user)}
                                className="p-2 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors tooltip tooltip-left"
                                title="Make Admin"
                              >
                                <Shield size={18} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                              title="Delete User"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}

          {/* Footer Pagination */}
          {totalPages > 1 && (
            <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <p className="text-sm text-gray-500 font-medium">
                Showing <span className="text-gray-900 font-bold">{((currentPage - 1) * usersPerPage) + 1}</span> to <span className="text-gray-900 font-bold">{Math.min(currentPage * usersPerPage, users.length)}</span> of {users.length}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${currentPage === i + 1
                      ? 'bg-[#1FB6FF] text-white shadow-lg shadow-cyan-200'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ManageUsers;
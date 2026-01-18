import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAllPayments from '../../hooks/useAllPayments';
import {
  Search,
  DollarSign,
  ArrowUpDown,
  TrendingUp,
  Users,
  Calendar,
  AlertTriangle,
  Download,
  Filter,
  CheckCircle,
  XCircle,
  Loader,
  RefreshCcw,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-[#DA3A60] w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#0B2340] mb-2 font-unbounded">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">We're having trouble displaying this information.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#0B2340] text-white px-6 py-3 rounded-xl hover:bg-[#1a3a5f] transition-colors font-bold"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const ManagePayments = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Use custom hook for cleaner code
  const [payments, refetch, isLoading, error] = useAllPayments();

  // Calculate statistics with safe number handling
  const stats = {
    totalAmount: payments.reduce((sum, payment) => sum + (Number(payment?.amount || payment?.price) || 0), 0),
    avgAmount: payments.length ?
      (payments.reduce((sum, payment) => sum + (Number(payment?.amount || payment?.price) || 0), 0) / payments.length) : 0,
    totalTransactions: payments.length,
    uniqueStudents: new Set(payments.filter(p => p?.studentEmail || p?.email).map(p => p.studentEmail || p.email)).size,
    completedPayments: payments.filter(p => p?.status === 'completed' || p?.status === 'succeeded').length,
    pendingPayments: payments.filter(p => p?.status === 'pending').length,
  };

  // Filter and sort payments
  const filteredPayments = payments
    .filter(payment => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = (
        payment?.studentEmail?.toLowerCase().includes(searchLower) ||
        payment?.email?.toLowerCase().includes(searchLower) ||
        payment?.transactionId?.toLowerCase().includes(searchLower) ||
        payment?.courseTitle?.toLowerCase().includes(searchLower) ||
        payment?.courseId?.toString().includes(searchLower)
      );

      const matchesStatus = filterStatus === 'all' || payment?.status === filterStatus;
      const matchesType = filterType === 'all' || payment?.paymentType === filterType;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc'
          ? new Date(b?.createdAt || b?.date || 0) - new Date(a?.createdAt || a?.date || 0)
          : new Date(a?.createdAt || a?.date || 0) - new Date(b?.createdAt || b?.date || 0);
      }
      if (sortBy === 'amount') {
        return sortOrder === 'desc'
          ? (Number(b?.amount || b?.price) || 0) - (Number(a?.amount || a?.price) || 0)
          : (Number(a?.amount || a?.price) || 0) - (Number(b?.amount || b?.price) || 0);
      }
      return 0;
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#02bfff] animate-spin mx-auto mb-4" />
          <p className="text-[#0B2340] text-lg font-bold">Loading payment information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage = error?.message || 'Unknown error';
    const is403 = errorMessage.includes('Access denied') || errorMessage.includes('403');
    const is404 = errorMessage.includes('404') || errorMessage.includes('not found');

    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <div className="text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-[#DA3A60]" />
          </div>
          <p className="text-[#0B2340] text-xl font-bold mb-2 font-unbounded">Error loading payments</p>
          <p className="text-gray-500 text-sm sm:text-base mb-6">{errorMessage}</p>

          {is403 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-yellow-800 text-sm">
                <strong>Access Denied:</strong> You need admin privileges to view all payments.
                Please contact an administrator if you believe this is an error.
              </p>
            </div>
          )}

          {is404 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-red-800 text-sm">
                <strong>Endpoint Not Found:</strong> The payments endpoint might not be available.
                Please check:
              </p>
              <ul className="text-red-700 text-xs mt-2 list-disc list-inside">
                <li>Backend server is running</li>
                <li>MongoDB connection is established</li>
                <li>You have admin privileges</li>
              </ul>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => refetch()}
              className="bg-[#0B2340] text-white px-6 py-2.5 rounded-xl hover:bg-[#1a3a5f] transition-colors text-sm font-bold shadow-lg shadow-blue-900/20"
            >
              Retry
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm font-bold"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-2 sm:p-4 md:p-6 font-jakarta">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Unified Gradient */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-6 md:mb-10 bg-gradient-to-br from-[#0B2340] to-[#02bfff] rounded-3xl p-6 md:p-10 overflow-hidden shadow-xl shadow-blue-900/10"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#02bfff]/30 rounded-full blur-[50px] -ml-10 -mb-10 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-unbounded text-white mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                    <CreditCard className="text-white w-6 h-6" />
                  </div>
                  Payment Management
                </h2>
                <p className="text-white/80 text-base flex items-center mt-1 ml-13">
                  Monitor and manage financial transactions
                </p>
              </div>
              <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
                <span className="inline-flex items-center px-4 py-2 rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/10 text-sm font-medium">
                  <Calendar className="mr-2 w-4 h-4 text-[#02bfff]" />
                  {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <button
                  onClick={() => refetch()}
                  className="inline-flex items-center px-4 py-2 rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/10 text-sm font-medium hover:bg-white/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <RefreshCcw className="mr-2 w-4 h-4 text-[#02bfff]" />
                  Refresh
                </button>
                <button className="inline-flex items-center px-4 py-2 rounded-xl bg-white text-[#0B2340] backdrop-blur-md border border-white/20 text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer">
                  <Download className="mr-2 w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>

            {/* Stats Cards - Glassmorphism */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold font-unbounded text-white group-hover:scale-105 transition-transform origin-left">
                      ${stats.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-[#02bfff] p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
                    <DollarSign className="text-white w-5 h-5" />
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-white/50 text-xs flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-[#00E599]" />
                    <span className="text-[#00E599] font-bold">+12%</span> from last month
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Avg. Payment</p>
                    <p className="text-2xl font-bold font-unbounded text-white group-hover:scale-105 transition-transform origin-left">
                      ${stats.avgAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-purple-500 p-2.5 rounded-xl shadow-lg shadow-purple-500/20">
                    <TrendingUp className="text-white w-5 h-5" />
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-white/50 text-xs">Per transaction average</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Transactions</p>
                    <p className="text-2xl font-bold font-unbounded text-white group-hover:scale-105 transition-transform origin-left">
                      {stats.totalTransactions}
                    </p>
                  </div>
                  <div className="bg-orange-500 p-2.5 rounded-xl shadow-lg shadow-orange-500/20">
                    <CreditCard className="text-white w-5 h-5" />
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-white/50 text-xs text-orange-200">
                    Completed: <span className="text-white font-bold">{stats.completedPayments}</span>
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Unique Students</p>
                    <p className="text-2xl font-bold font-unbounded text-white group-hover:scale-105 transition-transform origin-left">
                      {stats.uniqueStudents}
                    </p>
                  </div>
                  <div className="bg-pink-500 p-2.5 rounded-xl shadow-lg shadow-pink-500/20">
                    <Users className="text-white w-5 h-5" />
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <p className="text-white/50 text-xs text-pink-200">
                    Pending: <span className="text-white font-bold">{stats.pendingPayments}</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Search, Filter and Sort Section */}
        <div className="bg-white rounded-2xl p-4 md:p-6 mb-8 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2 lg:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by email, transaction ID, course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] bg-gray-50/50 text-[#0B2340] font-medium transition-all"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Filter className="text-gray-400 w-4 h-4" />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full appearance-none pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] bg-gray-50/50 text-[#0B2340] font-medium transition-all"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <ArrowUpDown className="text-gray-400 w-4 h-4" />
              </div>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="w-full appearance-none pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] bg-gray-50/50 text-[#0B2340] font-medium transition-all"
              >
                <option value="date-desc">Latest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Amount (High-Low)</option>
                <option value="amount-asc">Amount (Low-High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Student & ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Course / Service</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <DollarSign className="text-gray-300 w-8 h-8" />
                      </div>
                      <p className="text-lg font-bold text-[#0B2340] mb-1 font-unbounded">No payments found</p>
                      <p className="text-gray-500 text-sm mb-4">Try adjusting your search criteria or refresh the page</p>
                      <button
                        onClick={() => refetch()}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-[#0B2340] text-white rounded-lg hover:bg-[#1a3a5f] transition-colors text-sm font-bold"
                      >
                        <RefreshCcw className="w-4 h-4 ml-1" />
                        Refresh Payments
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment, index) => (
                    <motion.tr
                      key={payment._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#0B2340]">{payment.studentEmail || payment.email || 'N/A'}</span>
                          <span className="text-xs text-gray-400 font-mono mt-0.5 group-hover:text-[#02bfff] transition-colors">
                            #{payment.transactionId?.substring(0, 18) || 'PENDING'}...
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-600">
                          {payment.courseTitle || payment.paymentType || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-[#0B2340] font-unbounded">
                          ${(Number(payment?.amount || payment?.price) || 0).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${payment.status === 'completed' || payment.status === 'succeeded'
                            ? 'bg-green-50 text-green-700 border-green-100'
                            : payment.status === 'pending'
                              ? 'bg-yellow-50 text-yellow-700 border-yellow-100'
                              : 'bg-red-50 text-red-700 border-red-100'
                          }`}>
                          {payment.status === 'completed' || payment.status === 'succeeded' ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : payment.status === 'pending' ? (
                            <Loader className="w-3 h-3 animate-spin" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {payment.status?.toUpperCase() || 'PENDING'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                        {new Date(payment.createdAt || payment.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Wrap the export with ErrorBoundary
export default function WrappedManagePayments() {
  return (
    <ErrorBoundary>
      <ManagePayments />
    </ErrorBoundary>
  );
}

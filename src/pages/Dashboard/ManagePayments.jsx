import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAllPayments from '../../hooks/useAllPayments';
import { 
  FaSearch, 
  FaMoneyBillWave, 
  FaSortAmountDown, 
  FaChartLine, 
  FaUserGraduate,
  FaCalendarAlt,
  FaDollarSign,
  FaExclamationTriangle,
  FaDownload,
  FaFilter,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner
} from 'react-icons/fa';
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
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full text-center">
            <FaExclamationTriangle className="text-[#DA3A60] text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#005482] mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-4">We're having trouble displaying this information.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#005482] text-white px-6 py-2 rounded-lg hover:bg-[#005482]/90 transition-colors"
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
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="text-5xl text-[#70C5D7] animate-spin mx-auto mb-4" />
          <p className="text-[#005482] text-lg">Loading payment information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage = error?.message || 'Unknown error';
    const is403 = errorMessage.includes('Access denied') || errorMessage.includes('403');
    const is404 = errorMessage.includes('404') || errorMessage.includes('not found');
    
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-4">
        <div className="text-center max-w-lg w-full">
          <FaExclamationTriangle className="text-5xl text-[#DA3A60] mx-auto mb-4" />
          <p className="text-[#005482] text-lg sm:text-xl font-bold mb-4">Error loading payments</p>
          <p className="text-[#005482]/70 text-sm sm:text-base mb-6">{errorMessage}</p>
          
          {is403 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-left">
              <p className="text-yellow-800 text-sm">
                <strong>Access Denied:</strong> You need admin privileges to view all payments. 
                Please contact an administrator if you believe this is an error.
              </p>
            </div>
          )}
          
          {is404 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-left">
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
              className="bg-[#005482] text-white px-6 py-2.5 rounded-lg hover:bg-[#005482]/90 transition-colors text-sm font-medium min-h-[44px] touch-target"
            >
              Retry
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#70C5D7] text-white px-6 py-2.5 rounded-lg hover:bg-[#70C5D7]/90 transition-colors text-sm font-medium min-h-[44px] touch-target"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Gradient */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-6 md:mb-12 bg-gradient-to-r from-[#005482] to-[#70C5D7] rounded-2xl p-4 md:p-8 overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23FFFFFF' fill-opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}></div>
          </div>
          
          <div className="relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 flex items-center">
                  <FaMoneyBillWave className="mr-2 md:mr-3 text-[#FCBB45]" />
                  Payment Management
                </h2>
                <p className="text-white/80 text-base md:text-lg flex items-center">
                  <span className="w-6 md:w-10 h-0.5 bg-[#FCBB45] mr-2 md:mr-3"></span>
                  Monitor and manage all financial transactions
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
                <span className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 text-sm md:text-base">
                  <FaCalendarAlt className="mr-2 text-[#FCBB45]" />
                  {new Date().toLocaleDateString('en-US', { 
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <button
                  onClick={() => refetch()}
                  className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 text-sm md:text-base hover:bg-white/20 transition-colors"
                  title="Refresh payments list"
                >
                  <FaMoneyBillWave className="mr-2 text-[#FCBB45]" />
                  Refresh
                </button>
                <button className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 text-sm md:text-base hover:bg-white/20 transition-colors">
                  <FaDownload className="mr-2 text-[#FCBB45]" />
                  Export
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-xs md:text-sm mb-1">Total Revenue</p>
                    <p className="text-xl md:text-2xl font-bold text-white">${stats.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="bg-[#FCBB45] p-1.5 md:p-2 rounded-lg shadow-lg">
                    <FaDollarSign className="text-white text-lg md:text-xl" />
                  </div>
                </div>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10">
                  <p className="text-white/60 text-xs">All time earnings</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-xs md:text-sm mb-1">Average Payment</p>
                    <p className="text-xl md:text-2xl font-bold text-white">${stats.avgAmount.toFixed(2)}</p>
                  </div>
                  <div className="bg-[#DA3A60] p-1.5 md:p-2 rounded-lg shadow-lg">
                    <FaChartLine className="text-white text-lg md:text-xl" />
                  </div>
                </div>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10">
                  <p className="text-white/60 text-xs">Per transaction average</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-xs md:text-sm mb-1">Total Transactions</p>
                    <p className="text-xl md:text-2xl font-bold text-white">{stats.totalTransactions}</p>
                  </div>
                  <div className="bg-[#70C5D7] p-1.5 md:p-2 rounded-lg shadow-lg">
                    <FaMoneyBillWave className="text-white text-lg md:text-xl" />
                  </div>
                </div>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10">
                  <p className="text-white/60 text-xs">Completed: {stats.completedPayments}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-xs md:text-sm mb-1">Unique Students</p>
                    <p className="text-xl md:text-2xl font-bold text-white">{stats.uniqueStudents}</p>
                  </div>
                  <div className="bg-[#005482] p-1.5 md:p-2 rounded-lg shadow-lg">
                    <FaUserGraduate className="text-white text-lg md:text-xl" />
                  </div>
                </div>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10">
                  <p className="text-white/60 text-xs">Pending: {stats.pendingPayments}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Search, Filter and Sort Section */}
        <div className="bg-[#70C5D7]/10 rounded-xl p-3 md:p-6 mb-4 md:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {/* Search */}
            <div className="md:col-span-2 lg:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by email, transaction ID, course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-[#70C5D7] focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-white text-[#005482] text-sm md:text-base"
                />
                <FaSearch className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-[#005482]" />
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2">
                <FaFilter className="text-[#005482]" />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full appearance-none pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-[#70C5D7] focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-white text-[#005482] text-sm md:text-base"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2">
                <FaSortAmountDown className="text-[#005482]" />
              </div>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="w-full appearance-none pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-[#70C5D7] focus:outline-none focus:ring-2 focus:ring-[#DA3A60] bg-white text-[#005482] text-sm md:text-base"
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
          className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#70C5D7]/20"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#005482] text-white">
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Student Email</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Transaction ID</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Course/Service</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Amount</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Status</th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#70C5D7]/10">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-3 md:px-6 py-6 md:py-8 text-center text-[#005482]">
                      <FaMoneyBillWave className="text-3xl md:text-4xl text-[#DA3A60] mx-auto mb-2 md:mb-3" />
                      <p className="text-base md:text-lg font-medium mb-1">No payments found</p>
                      <p className="text-xs md:text-sm text-[#005482]/70 mb-4">Try adjusting your search criteria or refresh the page</p>
                      <button
                        onClick={() => refetch()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#005482] text-white rounded-lg hover:bg-[#005482]/90 transition-colors text-sm"
                      >
                        <FaMoneyBillWave className="text-sm" />
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
                      className="hover:bg-[#70C5D7]/5 transition-colors"
                    >
                      <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-[#005482]">
                        {payment.studentEmail || payment.email || 'N/A'}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4">
                        <span className="inline-flex items-center px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-[#FCBB45]/10 text-[#005482] text-xs md:text-sm font-medium">
                          {payment.transactionId || 'Pending'}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-[#005482]">
                        {payment.courseTitle || payment.paymentType || 'N/A'}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-[#DA3A60]">
                        ${(Number(payment?.amount || payment?.price) || 0).toFixed(2)}
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4">
                        <span className={`inline-flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium ${
                          payment.status === 'completed' || payment.status === 'succeeded'
                            ? 'bg-green-100 text-green-700'
                            : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {payment.status === 'completed' || payment.status === 'succeeded' ? (
                            <FaCheckCircle className="text-xs" />
                          ) : payment.status === 'pending' ? (
                            <FaSpinner className="text-xs animate-spin" />
                          ) : (
                            <FaTimesCircle className="text-xs" />
                          )}
                          {payment.status?.toUpperCase() || 'PENDING'}
                        </span>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-[#005482]">
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


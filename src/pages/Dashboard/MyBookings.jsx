import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';
import usePayments from '../../hooks/usePayments';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import {
  Book,
  CreditCard,
  Trash2,
  User,
  Calendar,
  GraduationCap,
  CheckCircle,
  Loader,
  Play,
  ExternalLink,
  ShoppingBag,
  DollarSign,
  Clock,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' or 'tutors'

  // Use hooks for cleaner code
  const [payments, refetchPayments, paymentsLoading] = usePayments();
  const [cart, refetchCart] = useCart();

  // Note: useCart doesn't expose loading state, but query handles it internally
  const isLoading = paymentsLoading;

  // Get unique paid courses (group by courseId to avoid duplicates)
  const paidCourses = payments
    .filter(payment => payment.courseId && (payment.status === 'completed' || payment.status === 'succeeded'))
    .reduce((acc, payment) => {
      const courseId = payment.courseId;
      if (!acc.find(c => c.courseId === courseId)) {
        acc.push({
          _id: payment._id,
          courseId: payment.courseId,
          courseTitle: payment.courseTitle,
          amount: payment.amount || payment.price,
          transactionId: payment.transactionId,
          createdAt: payment.createdAt || payment.date,
          status: 'Completed',
          isPaid: true,
          type: 'course'
        });
      }
      return acc;
    }, []);

  // Calculate totals
  const totalPaidCourses = paidCourses.length;
  const totalCartItems = cart.length;
  const totalSpent = payments
    .filter(p => p.status === 'completed' || p.status === 'succeeded')
    .reduce((sum, p) => sum + (Number(p.amount || p.price) || 0), 0);
  const cartTotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  // Handle Cancel Booking
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DA3A60',
      cancelButtonColor: '#0B2340',
      confirmButtonText: 'Yes, cancel it!',
      background: '#FFFFFF',
      customClass: {
        title: 'text-[#0B2340] font-bold font-unbounded',
        content: 'text-gray-600',
        confirmButton: 'rounded-xl',
        cancelButton: 'rounded-xl'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetchCart();
            Swal.fire({
              title: 'Canceled!',
              text: 'Your booking has been canceled.',
              icon: 'success',
              confirmButtonColor: '#00E599',
              background: '#FFFFFF',
              customClass: {
                title: 'text-[#0B2340] font-bold font-unbounded',
                content: 'text-gray-600',
                confirmButton: 'rounded-xl'
              }
            });
          }
        }).catch((error) => {
          console.error('Error canceling booking:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to cancel booking.',
            icon: 'error',
            confirmButtonColor: '#DA3A60',
            background: '#FFFFFF',
            customClass: {
              title: 'text-[#0B2340] font-bold font-unbounded',
              content: 'text-gray-600',
              confirmButton: 'rounded-xl'
            }
          });
        });
      }
    });
  };

  // Handle View Course
  const handleViewCourse = (courseId) => {
    navigate(`/courses/checkout/${courseId}`);
  };

  // Handle View Tutor
  const handleViewTutor = (tutorId) => {
    navigate(`/tutor/${tutorId}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4 font-jakarta">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="text-[#DA3A60] w-10 h-10" />
          </div>
          <p className="text-[#0B2340] text-xl font-bold mb-4 font-unbounded">Please log in to view your bookings</p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center bg-[#DA3A60] text-white px-8 py-3 rounded-xl hover:bg-[#b02a4a] transition-colors font-bold w-full"
          >
            Log In
          </Link>
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner">
                  <ShoppingBag size={28} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold font-unbounded text-white flex items-center gap-3">
                    My Bookings
                  </h2>
                  <p className="text-white/80 text-base font-medium mt-1">Manage your courses and tutoring sessions</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards - Glassmorphism style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Purchased Courses</p>
                <p className="text-2xl font-bold font-unbounded text-[#0B2340] group-hover:scale-105 transition-transform origin-left">
                  {totalPaidCourses}
                </p>
              </div>
              <div className="bg-[#02bfff]/10 p-2.5 rounded-xl">
                <GraduationCap className="text-[#02bfff] w-5 h-5" />
              </div>
            </div>
            <div className="pt-3 border-t border-gray-50">
              <p className="text-gray-400 text-xs">Total courses owned</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Pending Bookings</p>
                <p className="text-2xl font-bold font-unbounded text-[#0B2340] group-hover:scale-105 transition-transform origin-left">
                  {totalCartItems}
                </p>
              </div>
              <div className="bg-[#DA3A60]/10 p-2.5 rounded-xl">
                <Clock className="text-[#DA3A60] w-5 h-5" />
              </div>
            </div>
            <div className="pt-3 border-t border-gray-50">
              <p className="text-gray-400 text-xs">Awaiting payment</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Total Spent</p>
                <p className="text-2xl font-bold font-unbounded text-[#0B2340] group-hover:scale-105 transition-transform origin-left">
                  ${totalSpent.toFixed(2)}
                </p>
              </div>
              <div className="bg-[#FCBB45]/10 p-2.5 rounded-xl">
                <DollarSign className="text-[#FCBB45] w-5 h-5" />
              </div>
            </div>
            <div className="pt-3 border-t border-gray-50">
              <p className="text-gray-400 text-xs">Lifetime expenditure</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
          >
            <div className="absolute right-0 top-0 w-20 h-20 bg-[#00E599]/10 rounded-full -mr-5 -mt-5 blur-xl"></div>

            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Cart Total</p>
                <p className="text-2xl font-bold font-unbounded text-[#0B2340] group-hover:scale-105 transition-transform origin-left">
                  ${cartTotal.toFixed(2)}
                </p>
              </div>
              <div className="bg-[#00E599]/10 p-2.5 rounded-xl">
                <CreditCard className="text-[#00E599] w-5 h-5" />
              </div>
            </div>

            <div className="mt-4">
              {cart.length > 0 ? (
                <Link
                  to="/dashboard/payment"
                  className="flex items-center justify-center w-full py-2 bg-[#0B2340] text-white rounded-xl text-xs font-bold hover:bg-[#1a3a5f] transition-all shadow-lg shadow-blue-900/10"
                >
                  Pay Now <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              ) : (
                <button
                  disabled
                  className="flex items-center justify-center w-full py-2 bg-gray-100 text-gray-400 rounded-xl text-xs font-bold cursor-not-allowed"
                >
                  Pay Now
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-4 border-b border-gray-100">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-3 font-bold text-sm transition-all border-b-2 relative ${activeTab === 'courses'
                ? 'border-[#02bfff] text-[#02bfff]'
                : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
          >
            <div className="flex items-center gap-2">
              <GraduationCap className={activeTab === 'courses' ? "w-4 h-4" : "w-4 h-4 text-gray-400"} />
              <span>My Courses ({totalPaidCourses})</span>
            </div>
            {activeTab === 'courses' && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#02bfff]" />
            )}
          </button>

          {cart.length > 0 && (
            <button
              onClick={() => setActiveTab('tutors')}
              className={`px-6 py-3 font-bold text-sm transition-all border-b-2 relative ${activeTab === 'tutors'
                  ? 'border-[#DA3A60] text-[#DA3A60]'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
            >
              <div className="flex items-center gap-2">
                <Book className={activeTab === 'tutors' ? "w-4 h-4" : "w-4 h-4 text-gray-400"} />
                <span>Pending Bookings ({totalCartItems})</span>
              </div>
              {activeTab === 'tutors' && (
                <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DA3A60]" />
              )}
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100 min-h-[400px] flex flex-col items-center justify-center">
            <Loader className="text-[#02bfff] w-12 h-12 mx-auto mb-4 animate-spin" />
            <p className="text-[#0B2340] text-lg font-bold">Loading your bookings...</p>
          </div>
        )}

        {/* Courses Tab Content */}
        {!isLoading && activeTab === 'courses' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {paidCourses.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100 min-h-[400px] flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="text-[#02bfff] w-10 h-10" />
                </div>
                <p className="text-[#0B2340] text-xl font-bold mb-2 font-unbounded">You haven't purchased any courses yet</p>
                <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">Browse our extensive library of courses and start your learning journey today!</p>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 bg-[#02bfff] text-white px-8 py-3 rounded-xl hover:bg-[#02a0d6] transition-colors font-bold shadow-lg shadow-blue-400/20"
                >
                  Browse Courses <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Course</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Purchase Date</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Transaction ID</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {paidCourses.map((course, index) => (
                        <tr key={course._id || index} className="hover:bg-blue-50/30 transition-colors group">
                          <td className="px-6 py-4 text-sm text-gray-400 font-medium">{index + 1}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-[#02bfff]/10 flex items-center justify-center flex-shrink-0 text-[#02bfff]">
                                <GraduationCap className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-[#0B2340] truncate max-w-xs font-unbounded">
                                  {course.courseTitle || 'Unknown Course'}
                                </p>
                                <p className="text-xs text-gray-400 truncate mt-0.5 font-mono">ID: {course.courseId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {new Date(course.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-[#0B2340]">
                              ${(course.amount || 0).toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 text-xs font-mono border border-gray-100">
                              {course.transactionId || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                              <CheckCircle className="w-3 h-3" />
                              Paid
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleViewCourse(course.courseId)}
                                className="px-3 py-1.5 bg-[#02bfff]/10 text-[#02bfff] rounded-lg hover:bg-[#02bfff]/20 transition-colors text-xs font-bold flex items-center gap-1.5"
                              >
                                <Play className="w-3 h-3" />
                                View
                              </button>
                              <Link
                                to={`/courses/checkout/${course.courseId}`}
                                className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-xs font-bold flex items-center gap-1.5"
                              >
                                <ExternalLink className="w-3 h-3" />
                                Details
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Tutors/Cart Tab Content */}
        {!isLoading && activeTab === 'tutors' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100 min-h-[400px] flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Book className="text-[#DA3A60] w-10 h-10" />
                </div>
                <p className="text-[#0B2340] text-xl font-bold mb-2 font-unbounded">You have no pending bookings</p>
                <Link
                  to="/tutors"
                  className="inline-flex items-center gap-2 bg-[#DA3A60] text-white px-8 py-3 rounded-xl hover:bg-[#b02a4a] transition-colors font-bold mt-4 shadow-lg shadow-pink-500/20"
                >
                  Browse Tutors <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tutor</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {cart.map((item, index) => (
                        <tr key={item._id} className="hover:bg-pink-50/30 transition-colors group">
                          <td className="px-6 py-4 text-sm text-gray-400 font-medium">{index + 1}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#DA3A60]/10 flex items-center justify-center flex-shrink-0 text-[#DA3A60]">
                                <User className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-[#0B2340] truncate">
                                  {item.tutorName || 'Unknown Tutor'}
                                </p>
                                <p className="text-xs text-gray-400 truncate mt-0.5 font-mono">ID: {item.tutorId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                              <Book className="w-4 h-4 text-gray-400" />
                              {item.subject || 'Not specified'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-[#DA3A60]">
                              ${(item.price || 0).toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border
                              ${item.status === 'Accepted'
                                ? 'bg-green-50 text-green-700 border-green-100'
                                : item.status === 'Rejected'
                                  ? 'bg-red-50 text-red-700 border-red-100'
                                  : item.status === 'Canceled'
                                    ? 'bg-gray-100 text-gray-600 border-gray-200'
                                    : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                              }`}
                            >
                              {item.status || 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleViewTutor(item.tutorId)}
                                className="px-3 py-1.5 bg-[#02bfff]/10 text-[#02bfff] rounded-lg hover:bg-[#02bfff]/20 transition-colors text-xs font-bold"
                              >
                                View
                              </button>
                              {!item.isPaid && (
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs font-bold flex items-center gap-1.5"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';
import usePayments from '../../hooks/usePayments';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { 
  FaBook, 
  FaMoneyBillWave, 
  FaCreditCard, 
  FaTrash, 
  FaUser, 
  FaCalendarAlt, 
  FaGraduationCap,
  FaCheckCircle,
  FaSpinner,
  FaPlay,
  FaExternalLinkAlt
} from 'react-icons/fa';
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
      cancelButtonColor: '#70C5D7',
      confirmButtonText: 'Yes, cancel it!',
      background: '#FFFFFF',
      customClass: {
        title: 'text-[#005482] font-bold',
        content: 'text-[#70C5D7]'
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
              confirmButtonColor: '#DA3A60',
              background: '#FFFFFF',
              customClass: {
                title: 'text-[#005482] font-bold',
                content: 'text-[#70C5D7]'
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
              title: 'text-[#005482] font-bold',
              content: 'text-[#70C5D7]'
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
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center p-4">
        <div className="text-center">
          <FaUser className="text-[#DA3A60] text-5xl mx-auto mb-4" />
          <p className="text-[#005482] text-xl font-semibold mb-4">Please log in to view your bookings</p>
          <Link 
            to="/login" 
            className="inline-block bg-[#DA3A60] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-opacity-90 transition-colors text-sm sm:text-base min-h-[44px] touch-target"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F8FAFC] p-2 sm:p-4 md:p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 sm:p-3 bg-[#FCBB45]/10 rounded-lg">
              <FaBook className="text-[#FCBB45] text-xl sm:text-2xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#005482]">My Bookings</h2>
          </div>
          <p className="text-[#70C5D7] ml-12 sm:ml-14 text-sm sm:text-base">Manage your courses and tutoring sessions</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 md:mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-[#70C5D7]/10">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-[#70C5D7]/10 rounded-lg">
                <FaGraduationCap className="text-[#70C5D7] text-lg sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-[#005482]/60">Purchased Courses</p>
                <p className="text-xl sm:text-2xl font-bold text-[#005482]">{totalPaidCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-[#70C5D7]/10">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-[#DA3A60]/10 rounded-lg">
                <FaBook className="text-[#DA3A60] text-lg sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-[#005482]/60">Pending Bookings</p>
                <p className="text-xl sm:text-2xl font-bold text-[#005482]">{totalCartItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-[#70C5D7]/10">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-[#FCBB45]/10 rounded-lg">
                <FaMoneyBillWave className="text-[#FCBB45] text-lg sm:text-xl" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-[#005482]/60">Total Spent</p>
                <p className="text-xl sm:text-2xl font-bold text-[#005482]">${totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-[#70C5D7]/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-[#005482]/10 rounded-lg">
                  <FaCreditCard className="text-[#005482] text-lg sm:text-xl" />
                </div>
                <p className="text-xs sm:text-sm text-[#005482]/60">Cart Total</p>
              </div>
              {cart.length > 0 ? (
                <Link 
                  to="/dashboard/payment"
                  className="bg-[#DA3A60] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-opacity-90 transition-colors text-xs sm:text-sm font-medium min-h-[44px] touch-target flex items-center"
                >
                  Pay Now
                </Link>
              ) : (
                <button 
                  disabled 
                  className="bg-[#DA3A60]/50 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg cursor-not-allowed text-xs sm:text-sm font-medium min-h-[44px] touch-target flex items-center"
                >
                  Pay Now
                </button>
              )}
            </div>
            <p className="text-lg sm:text-xl font-bold text-[#005482] mt-2">${cartTotal.toFixed(2)}</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 sm:gap-4 border-b border-[#70C5D7]/20">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base transition-colors border-b-2 min-h-[44px] touch-target ${
              activeTab === 'courses'
                ? 'border-[#DA3A60] text-[#DA3A60]'
                : 'border-transparent text-[#005482]/60 hover:text-[#005482]'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaGraduationCap />
              <span>My Courses ({totalPaidCourses})</span>
            </div>
          </button>
          {cart.length > 0 && (
            <button
              onClick={() => setActiveTab('tutors')}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base transition-colors border-b-2 min-h-[44px] touch-target ${
                activeTab === 'tutors'
                  ? 'border-[#DA3A60] text-[#DA3A60]'
                  : 'border-transparent text-[#005482]/60 hover:text-[#005482]'
              }`}
            >
              <div className="flex items-center gap-2">
                <FaBook />
                <span>Pending Bookings ({totalCartItems})</span>
              </div>
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-[#70C5D7]/10">
            <FaSpinner className="text-[#70C5D7] text-5xl mx-auto mb-4 animate-spin" />
            <p className="text-[#005482] text-lg">Loading your bookings...</p>
          </div>
        )}

        {/* Courses Tab */}
        {!isLoading && activeTab === 'courses' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {paidCourses.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center border border-[#70C5D7]/10">
                <FaGraduationCap className="text-[#DA3A60] text-4xl sm:text-5xl mx-auto mb-4" />
                <p className="text-[#005482] text-lg sm:text-xl font-semibold mb-4">You haven't purchased any courses yet</p>
                <p className="text-[#005482]/70 text-sm sm:text-base mb-6">Browse our courses and start learning today!</p>
                <Link 
                  to="/courses" 
                  className="inline-block bg-[#70C5D7] text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-colors text-sm sm:text-base min-h-[44px] touch-target"
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-[#70C5D7]/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#005482] text-white">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">#</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Course</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Purchase Date</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Amount</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Transaction ID</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Status</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#70C5D7]/10">
                      {paidCourses.map((course, index) => (
                        <tr key={course._id || index} className="hover:bg-[#70C5D7]/5 transition-colors">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-[#005482]">{index + 1}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#70C5D7]/10 flex items-center justify-center flex-shrink-0">
                                <FaGraduationCap className="text-[#70C5D7] text-sm sm:text-base" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-[#005482] truncate">
                                  {course.courseTitle || 'Unknown Course'}
                                </p>
                                <p className="text-xs text-[#005482]/60 truncate">ID: {course.courseId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-[#70C5D7] text-xs sm:text-sm" />
                              <span className="text-xs sm:text-sm text-[#005482]">
                                {new Date(course.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm font-medium text-[#DA3A60]">
                              ${(course.amount || 0).toFixed(2)}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FCBB45]/10 text-[#005482] text-xs font-medium truncate max-w-[120px] sm:max-w-none">
                              {course.transactionId || 'N/A'}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                              <FaCheckCircle className="text-xs" />
                              Paid
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleViewCourse(course.courseId)}
                                className="px-2 sm:px-3 py-1 bg-[#70C5D7]/10 text-[#70C5D7] rounded-lg hover:bg-[#70C5D7]/20 transition-colors text-xs sm:text-sm font-medium flex items-center gap-1 min-h-[44px] touch-target"
                              >
                                <FaPlay className="text-xs" />
                                <span className="hidden sm:inline">View</span>
                              </button>
                              <Link
                                to={`/courses/checkout/${course.courseId}`}
                                className="px-2 sm:px-3 py-1 bg-[#005482]/10 text-[#005482] rounded-lg hover:bg-[#005482]/20 transition-colors text-xs sm:text-sm font-medium flex items-center gap-1 min-h-[44px] touch-target"
                              >
                                <FaExternalLinkAlt className="text-xs" />
                                <span className="hidden sm:inline">Details</span>
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

        {/* Tutors/Cart Tab */}
        {!isLoading && activeTab === 'tutors' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center border border-[#70C5D7]/10">
                <FaBook className="text-[#DA3A60] text-4xl sm:text-5xl mx-auto mb-4" />
                <p className="text-[#005482] text-lg sm:text-xl font-semibold mb-4">You have no pending bookings</p>
                <Link 
                  to="/" 
                  className="inline-block bg-[#70C5D7] text-white px-6 py-3 rounded-xl hover:bg-opacity-90 transition-colors text-sm sm:text-base min-h-[44px] touch-target"
                >
                  Browse Tutors
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-[#70C5D7]/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#70C5D7]/5">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#005482]">#</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#005482]">Tutor</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#005482]">Subject</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#005482]">Date</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#005482]">Price</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#005482]">Status</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-[#005482]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#70C5D7]/10">
                      {cart.map((item, index) => (
                        <tr key={item._id} className="hover:bg-[#70C5D7]/5 transition-colors">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-[#005482]">{index + 1}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#70C5D7]/10 flex items-center justify-center flex-shrink-0">
                                <FaUser className="text-[#70C5D7] text-xs sm:text-sm" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-[#005482] truncate">
                                  {item.tutorName || 'Unknown Tutor'}
                                </p>
                                <p className="text-xs text-[#005482]/60 truncate">ID: {item.tutorId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center gap-2">
                              <FaGraduationCap className="text-[#FCBB45] text-xs sm:text-sm" />
                              <span className="text-xs sm:text-sm text-[#005482]">
                                {item.subject || 'Not specified'}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-[#70C5D7] text-xs sm:text-sm" />
                              <span className="text-xs sm:text-sm text-[#005482]">
                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm font-medium text-[#DA3A60]">
                              ${(item.price || 0).toFixed(2)}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <span className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium
                              ${item.status === 'Accepted' 
                                ? 'bg-green-100 text-green-800' 
                                : item.status === 'Rejected'
                                ? 'bg-red-100 text-red-800'
                                : item.status === 'Canceled'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {item.status || 'Pending'}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <button
                                onClick={() => handleViewTutor(item.tutorId)}
                                className="px-2 sm:px-3 py-1 bg-[#70C5D7]/10 text-[#70C5D7] rounded-lg hover:bg-[#70C5D7]/20 transition-colors text-xs sm:text-sm font-medium min-h-[44px] touch-target"
                              >
                                View
                              </button>
                              {!item.isPaid && (
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="px-2 sm:px-3 py-1 bg-[#DA3A60]/10 text-[#DA3A60] rounded-lg hover:bg-[#DA3A60]/20 transition-colors text-xs sm:text-sm font-medium flex items-center gap-1 min-h-[44px] touch-target"
                                >
                                  <FaTrash className="text-xs" />
                                  <span className="hidden sm:inline">Cancel</span>
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
    </motion.div>
  );
};

export default MyBookings;


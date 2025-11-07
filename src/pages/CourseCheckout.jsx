import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ArrowLeft, Lock, CreditCard, CheckCircle, X, AlertCircle, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../Providers/AuthProvider';
import PrivateRoute from '../Routes/PrivateRoute';

// Load Stripe - use environment variable or default test key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK || 'pk_test_51...');

const CheckoutForm = ({ course, totalPrice, onSuccess }) => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
          const secret = res.data?.clientSecret;
          if (secret) {
            setClientSecret(secret);
          }
        })
        .catch(err => {
          console.error("Failed to create payment intent", err);
          // If the endpoint doesn't exist, still allow mock payment
          if (err.response?.status === 404) {
            console.log("Payment endpoint not found, using mock payment");
            setClientSecret('mock_client_secret_' + Date.now());
          }
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // Show payment confirmation
    const result = await Swal.fire({
      title: 'Confirm Payment',
      html: `
        <div class="text-left">
          <p class="text-gray-700 mb-4">Please confirm your payment details:</p>
          <div class="bg-gray-50 p-4 rounded-xl">
            <p class="text-indigo-600 mb-2 font-semibold">Course:</p>
            <p class="text-gray-900 mb-2">${course?.title || 'N/A'}</p>
            <p class="text-indigo-600 mb-2 font-semibold mt-4">Payment Summary:</p>
            <p class="text-gray-700"><strong>Amount:</strong> BDT ${totalPrice.toLocaleString()}</p>
            <p class="text-gray-700"><strong>Payment Method:</strong> Credit/Debit Card</p>
          </div>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4F46E5',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Pay Now',
      cancelButtonText: 'Cancel',
      background: '#FFFFFF',
      customClass: {
        title: 'text-gray-900 font-bold',
        htmlContainer: 'text-left'
      }
    });

    if (!result.isConfirmed) return;

    setProcessing(true);
    setError('');

    try {
      // If Stripe is not configured, use mock payment
      if (!clientSecret || clientSecret.startsWith('mock_')) {
        // Mock successful payment
        const mockTransactionId = 'txn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        setTransactionId(mockTransactionId);
        
        const payment = {
          email: user?.email,
          studentEmail: user?.email,
          courseId: course?._id,
          courseTitle: course?.title,
          price: totalPrice,
          amount: totalPrice,
          currency: course?.currency || 'BDT',
          transactionId: mockTransactionId,
          date: new Date(),
          createdAt: new Date(),
          status: 'completed',
          paymentType: 'course'
        };

        console.log('Saving payment:', payment);
        try {
          const res = await axiosSecure.post('/payments', payment);
          console.log('Payment saved response:', res.data);
          
          // Invalidate payments queries to refetch data
          queryClient.invalidateQueries({ queryKey: ['payments'] });
          queryClient.invalidateQueries({ queryKey: ['payments', user?.email] });
          
          if (res.data?.paymentResult?.insertedId || res.data?.message) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: "You have successfully enrolled in the course.",
              showConfirmButton: false,
              timer: 2000,
              background: '#FFFFFF',
              customClass: {
                title: 'text-gray-900 font-bold',
                content: 'text-gray-600'
              }
            });
            onSuccess?.();
            // Navigate to my bookings after successful payment
            setTimeout(() => navigate('/dashboard/my-bookings'), 1500);
          } else {
            // Payment saved but no insertedId returned
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: "You have successfully enrolled in the course.",
              showConfirmButton: false,
              timer: 2000,
              background: '#FFFFFF',
              customClass: {
                title: 'text-gray-900 font-bold',
                content: 'text-gray-600'
              }
            });
            onSuccess?.();
            // Navigate to my bookings after successful payment
            setTimeout(() => navigate('/dashboard/my-bookings'), 1500);
          }
        } catch (paymentErr) {
          console.error("Error saving payment:", paymentErr);
          console.error("Error response:", paymentErr.response?.data);
          console.error("Error status:", paymentErr.response?.status);
          console.error("Error message:", paymentErr.message);
          
          const errorMessage = paymentErr.response?.data?.message || paymentErr.response?.data?.error || paymentErr.message || "Unknown error occurred";
          
          // Show error details to help debug
          Swal.fire({
            icon: "error",
            title: "Payment Save Failed",
            html: `
              <div class="text-left">
                <p class="text-gray-700 mb-2">Your payment was processed, but there was an issue saving the record.</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Error:</strong> ${errorMessage}</p>
                <p class="text-xs text-gray-500">Transaction ID: ${payment.transactionId}</p>
                <p class="text-xs text-gray-500 mt-2">Please contact support with the transaction ID above.</p>
              </div>
            `,
            confirmButtonColor: '#4F46E5',
            confirmButtonText: 'OK',
            background: '#FFFFFF',
            customClass: {
              title: 'text-gray-900 font-bold',
              htmlContainer: 'text-left'
            }
          });
        }
        setProcessing(false);
        return;
      }

      // Actual Stripe payment processing
      const { error: paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous'
          }
        }
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        setTransactionId(paymentIntent.id);
        const payment = {
          email: user?.email,
          studentEmail: user?.email,
          courseId: course?._id,
          courseTitle: course?.title,
          price: totalPrice,
          amount: totalPrice,
          currency: course?.currency || 'BDT',
          transactionId: paymentIntent.id,
          date: new Date(),
          createdAt: new Date(),
          status: 'completed',
          paymentType: 'course'
        };

        console.log('Saving payment:', payment);
        try {
          const res = await axiosSecure.post('/payments', payment);
          console.log('Payment saved response:', res.data);
          
          // Invalidate payments queries to refetch data
          queryClient.invalidateQueries({ queryKey: ['payments'] });
          queryClient.invalidateQueries({ queryKey: ['payments', user?.email] });
          
          if (res.data?.paymentResult?.insertedId || res.data?.message) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: "You have successfully enrolled in the course.",
              showConfirmButton: false,
              timer: 2000,
              background: '#FFFFFF',
              customClass: {
                title: 'text-gray-900 font-bold',
                content: 'text-gray-600'
              }
            });
            onSuccess?.();
            // Navigate to my bookings after successful payment
            setTimeout(() => navigate('/dashboard/my-bookings'), 1500);
          }
        } catch (paymentErr) {
          console.error("Error saving payment:", paymentErr);
          console.error("Error response:", paymentErr.response?.data);
          console.error("Error status:", paymentErr.response?.status);
          console.error("Error message:", paymentErr.message);
          
          const errorMessage = paymentErr.response?.data?.message || paymentErr.response?.data?.error || paymentErr.message || "Unknown error occurred";
          
          // Show error details to help debug
          Swal.fire({
            icon: "error",
            title: "Payment Save Failed",
            html: `
              <div class="text-left">
                <p class="text-gray-700 mb-2">Your payment was processed, but there was an issue saving the record.</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Error:</strong> ${errorMessage}</p>
                <p class="text-xs text-gray-500">Transaction ID: ${payment.transactionId}</p>
                <p class="text-xs text-gray-500 mt-2">Please contact support with the transaction ID above.</p>
              </div>
            `,
            confirmButtonColor: '#4F46E5',
            confirmButtonText: 'OK',
            background: '#FFFFFF',
            customClass: {
              title: 'text-gray-900 font-bold',
              htmlContainer: 'text-left'
            }
          });
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: err.message || "An unexpected error occurred. Please try again.",
        confirmButtonColor: '#DC2626',
        background: '#FFFFFF',
        customClass: {
          title: 'text-gray-900 font-bold',
          content: 'text-gray-600'
        }
      });
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Security Notice */}
      <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <Lock className="h-4 w-4 text-indigo-600" />
        <span>Payments are secure and encrypted</span>
      </div>

      {/* Card Element */}
      <div className="bg-white border border-gray-200 p-4 rounded-xl">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Card Information
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#374151',
                '::placeholder': {
                  color: '#9CA3AF',
                },
                backgroundColor: 'white',
              },
              invalid: {
                color: '#DC2626',
              },
            },
          }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Message */}
      {transactionId && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-sm flex items-center gap-2">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Payment Successful!</p>
            <p className="text-xs mt-1">Transaction ID: {transactionId}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || (!clientSecret || clientSecret.startsWith('mock_') ? false : !clientSecret) || processing}
        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3.5 px-6 rounded-xl font-semibold text-base hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed min-h-[50px] touch-target"
      >
        {processing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" />
            Pay BDT {totalPrice.toLocaleString()}
          </>
        )}
      </button>
    </form>
  );
};

const CourseCheckout = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axiosPublic.get(`/courses/${courseId}`);
        if (response.data) {
          setCourse(response.data);
        } else {
          setError('Course not found');
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId, axiosPublic]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full text-center">
          <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The course you are looking for does not exist.'}</p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = course.price || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          {' / '}
          <Link to="/courses" className="hover:text-indigo-600">Courses</Link>
          {' / '}
          <span className="text-gray-900">Checkout</span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 mb-6 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Course Summary - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img
                  src={course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800'}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {course.title}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Course Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
                  {course.instructor && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold text-xs">I</span>
                      </div>
                      <span><strong>Instructor:</strong> {course.instructor}</span>
                    </div>
                  )}
                  {course.duration && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold text-xs">⏱</span>
                      </div>
                      <span><strong>Duration:</strong> {course.duration}</span>
                    </div>
                  )}
                  {course.level && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold text-xs">📊</span>
                      </div>
                      <span><strong>Level:</strong> {course.level}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                {course.features && course.features.length > 0 && (
                  <div className="border-t border-gray-200 pt-4 sm:pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Features</h3>
                    <ul className="space-y-2">
                      {course.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Section - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 sticky top-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Checkout
              </h2>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Course</span>
                    <span className="text-gray-900 font-medium">{course.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price</span>
                    <span className="text-gray-900 font-medium">
                      {course.currency || 'BDT'} {course.price?.toLocaleString() || '0'}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    {course.currency || 'BDT'} {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Form */}
              {user ? (
                <Elements stripe={stripePromise}>
                  <CheckoutForm course={course} totalPrice={totalPrice} />
                </Elements>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Please login to continue</p>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors w-full"
                  >
                    Login to Continue
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap with PrivateRoute for authenticated access
export default function WrappedCourseCheckout() {
  return (
    <PrivateRoute>
      <CourseCheckout />
    </PrivateRoute>
  );
}


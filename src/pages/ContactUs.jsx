import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, AlertCircle } from 'lucide-react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { toast } from 'react-toastify';

export default function ContactUs() {
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
    captcha: '',
  });
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  const [loading, setLoading] = useState(false);

  // Generate simple math captcha
  React.useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaAnswer(num1 + num2);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate captcha
    if (parseInt(formData.captcha) !== captchaAnswer) {
      toast.error('Incorrect captcha answer. Please try again.');
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.mobile || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axiosPublic.post('/contacts', {
        name: formData.name,
        email: formData.email,
        phone: formData.mobile,
        subject: formData.subject,
        message: formData.message,
      });

      if (response.data.insertedId) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          mobile: '',
          subject: '',
          message: '',
          captcha: '',
        });
        // Regenerate captcha
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCaptchaAnswer(num1 + num2);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate captcha numbers for display
  const captchaNum1 = Math.floor(captchaAnswer / 2);
  const captchaNum2 = captchaAnswer - captchaNum1;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-600 mb-6">
          <span className="hover:text-indigo-600">Home</span> / <span className="text-gray-900">Contact Us</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">
          Contact Us
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Section - Contact Details */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-red-600 font-semibold text-xs sm:text-sm uppercase mb-2">CONTACT DETAILS</h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Get in Touch</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Statistical Research Consultants Bangladesh (SRCBD) is a research-based consultancy firm from Dhaka, Bangladesh.
              </p>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Our Address</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  118/1 Anol, Dakkhinkhan, Dhaka-1230, Bangladesh.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Contact</h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  <a href="tel:+8801792087904" className="hover:text-indigo-600 transition break-all">
                    +8801792087904
                  </a>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  <a href="mailto:srcbd.org@gmail.com" className="hover:text-indigo-600 transition break-all">
                    srcbd.org@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="relative w-full">
            <div className="bg-gradient-to-br from-red-500 via-pink-500 to-red-600 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 relative overflow-hidden">
              {/* Decorative wave pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                  <path
                    d="M0,200 Q100,150 200,200 T400,200 L400,0 L0,0 Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-white/90 text-xs sm:text-sm mb-4 sm:mb-6">
                  Your email address will not be published. Required fields are marked *
                </p>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name*"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-red-600/20 backdrop-blur-sm border border-red-400/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email*"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-red-600/20 backdrop-blur-sm border border-red-400/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Your Mobile*"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-red-600/20 backdrop-blur-sm border border-red-400/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject*"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-red-600/20 backdrop-blur-sm border border-red-400/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[44px]"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Write your message..."
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-red-600/20 backdrop-blur-sm border border-red-400/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none min-h-[120px]"
                    />
                  </div>

                  {/* Captcha */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                    <span className="text-white text-sm sm:text-base font-semibold">
                      {captchaNum1} + {captchaNum2} =
                    </span>
                    <input
                      type="number"
                      name="captcha"
                      placeholder="Answer"
                      value={formData.captcha}
                      onChange={handleChange}
                      required
                      className="w-full sm:w-24 px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-red-600/20 backdrop-blur-sm border border-red-400/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[44px]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px] touch-target"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
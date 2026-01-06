import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, Clock, BookOpen, Users, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { toast } from 'react-toastify';

export default function ContactUs() {
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    subject: '',
    message: '',
    captcha: '',
  });
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  const [loading, setLoading] = useState(false);

  // Generate simple math captcha
  useEffect(() => {
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
    if (!formData.name || !formData.email || !formData.university || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      // Appending University to message or sending as payload if supported. 
      // Sending as separate field for now, but also appending to message for safety in case backend ignores unknown fields.
      const payload = {
        name: formData.name,
        email: formData.email,
        university: formData.university,
        phone: "N/A", // Phone field removed from UI as per new requirement "name, mail, subject, description, University"
        subject: formData.subject,
        message: `University: ${formData.university}\n\n${formData.message}`,
      };

      const response = await axiosPublic.post('/contacts', payload);

      if (response.data.insertedId) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          university: '',
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
    <div className="min-h-screen bg-[#fffff0] text-[#0B2340] font-sans selection:bg-[#1FB6FF] selection:text-white">

      {/* Header Section */}
      <section className="bg-[#0B2340] text-white pt-36 pb-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#1FB6FF] uppercase tracking-wider">Contact Us</h1>
          <p className="text-xl md:text-2xl text-[#8892b0] mb-8 leading-relaxed">
            We would love to hear from you.
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Whether you have questions about our training programs, seminars, research tools, collaborations, or student activities, the BIRST team is always ready to assist you.
          </p>
        </motion.div>
      </section>

      {/* Intro Statement */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-[#0B2340]/80 leading-relaxed max-w-4xl mx-auto"
        >
          At Bangladesh Institute of Research and Statistical Training (BIRST), we believe communication is the first step toward meaningful learning and impactful research. Feel free to reach out to us for academic support, institutional partnerships, or general inquiries.
        </motion.p>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-2 gap-16">

        {/* Left Column: Contact Info & Inquiries */}
        <div className="space-y-16">

          {/* Get in Touch */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-8 border-b-2 border-[#1FB6FF] inline-block pb-2">Get in Touch</h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#1FB6FF]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#1FB6FF]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Address</h3>
                  <p className="text-gray-600">Bangladesh Institute of Research and Statistical Training (BIRST)</p>
                  <p className="text-gray-600">Bangladesh</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#1FB6FF]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#1FB6FF]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-gray-600"><a href="mailto:info@birstbd.com" className="hover:text-[#1FB6FF]">info@birstbd.com</a></p>
                  <p className="text-gray-600"><a href="mailto:contact@birstbd.com" className="hover:text-[#1FB6FF]">contact@birstbd.com</a></p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#1FB6FF]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#1FB6FF]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <p className="text-gray-600"><a href="tel:+880-XXXXXXXXXX" className="hover:text-[#1FB6FF]">+880-XXXXXXXXXX</a></p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#1FB6FF]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#1FB6FF]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Office Hours</h3>
                  <p className="text-gray-600">Sunday – Thursday</p>
                  <p className="text-gray-600">10:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Academic & Training Inquiries */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#1FB6FF] inline-block pb-2">Academic & Training Inquiries</h2>
            <p className="mb-4 text-gray-700 font-medium">For questions related to:</p>
            <ul className="space-y-2 mb-6 text-gray-600 list-disc pl-5 marker:text-[#1FB6FF]">
              <li>Research methodology training</li>
              <li>Statistical analysis workshops</li>
              <li>AI-powered research tools</li>
              <li>Seminars and academic sessions</li>
              <li>Student enrollment and progress tracking</li>
            </ul>
            <p className="text-sm text-gray-500 italic">Please email us with a clear subject line, and our academic coordination team will respond as soon as possible.</p>
          </motion.div>

          {/* Collaboration & Partnership */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#1FB6FF] inline-block pb-2">Collaboration & Partnership</h2>
            <p className="mb-4 text-gray-700 font-medium">We welcome collaboration with:</p>
            <ul className="space-y-2 mb-6 text-gray-600 list-disc pl-5 marker:text-[#1FB6FF]">
              <li>Universities and research institutions</li>
              <li>Faculty members and researchers</li>
              <li>Academic organizations and professionals</li>
            </ul>
            <p className="text-sm text-gray-500 italic">If you are interested in hosting seminars, conducting joint research, or contributing as a trainer, please contact us via email with your proposal.</p>
          </motion.div>

        </div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:sticky lg:top-24 h-fit"
        >
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-[#0B2340] mb-2">Send Us a Message</h2>
            <p className="text-gray-500 mb-8">
              Have a question or suggestion? Use the contact form below to send us a message. Our team will get back to you within 24–48 working hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#0B2340] focus:outline-none focus:ring-2 focus:ring-[#1FB6FF] focus:border-transparent transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#0B2340] focus:outline-none focus:ring-2 focus:ring-[#1FB6FF] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">University / Institute</label>
                  <input
                    type="text"
                    name="university"
                    placeholder="e.g. University of Dhaka"
                    value={formData.university}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#0B2340] focus:outline-none focus:ring-2 focus:ring-[#1FB6FF] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#0B2340] focus:outline-none focus:ring-2 focus:ring-[#1FB6FF] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  placeholder="Write your message details here..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[#0B2340] focus:outline-none focus:ring-2 focus:ring-[#1FB6FF] focus:border-transparent resize-none transition-all"
                />
              </div>

              {/* Captcha */}
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                <span className="text-[#0B2340] font-bold text-lg whitespace-nowrap">
                  {captchaNum1} + {captchaNum2} =
                </span>
                <input
                  type="number"
                  name="captcha"
                  placeholder="?"
                  value={formData.captcha}
                  onChange={handleChange}
                  required
                  className="w-24 px-4 py-2 rounded-lg bg-white border border-gray-300 text-[#0B2340] focus:outline-none focus:ring-2 focus:ring-[#1FB6FF] text-center font-bold"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1FB6FF] hover:bg-[#0099e6] text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        </motion.div>

      </div>
    </div>
  );
}
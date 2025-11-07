import React from 'react';
import { Target, Users, Award, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Page3DWrapper, { Card3D, Text3D, Float3D, Icon3D, Button3D } from '../components/ui/Page3DWrapper';
import { motion } from 'framer-motion';

export default function AboutUs() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower researchers and professionals with advanced statistical knowledge, research methodologies, and data analysis skills through comprehensive training and consultancy services.',
      link: '/about/mission',
    },
    {
      icon: TrendingUp,
      title: 'Our Vision',
      description: 'To become the leading research and statistical training institute in Bangladesh, fostering excellence in research and data-driven decision making.',
      link: '/about/vision',
    },
    {
      icon: Award,
      title: 'Our Values',
      description: 'We are committed to excellence, integrity, innovation, and continuous learning. We believe in making quality education accessible to all.',
      link: '/about/team',
    },
  ];

  const stats = [
    { label: 'Years of Experience', value: '10+', icon: Award },
    { label: 'Courses Offered', value: '50+', icon: TrendingUp },
    { label: 'Students Trained', value: '5000+', icon: Users },
    { label: 'Research Projects', value: '200+', icon: Target },
  ];

  return (
    <Page3DWrapper className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Text3D className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            About Us
          </Text3D>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-indigo-100 max-w-3xl mx-auto px-4"
          >
            Statistical Research Consultants Bangladesh (SRCBD) - Towards Excellence Through Data
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        {/* Breadcrumbs */}
        <div className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
          <span className="hover:text-indigo-600">Home</span> / <span className="text-gray-900">About Us</span>
        </div>

        {/* Introduction */}
        <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 mb-8 sm:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <Text3D className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Who We Are</Text3D>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                Statistical Research Consultants Bangladesh (SRCBD) is a research-based consultancy firm from Dhaka, Bangladesh. 
                We specialize in providing comprehensive statistical training, research support, and data analysis services.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
                With a team of experienced researchers, statisticians, and data scientists, we have been serving 
                the academic and professional community since our establishment. Our mission is to bridge the gap 
                between theoretical knowledge and practical application in research and data analysis.
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                We offer a wide range of services including statistical training, research methodology workshops, 
                data analysis consulting, and publication support to help individuals and organizations achieve their goals.
              </p>
            </div>
            <div className="relative mt-6 md:mt-0">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">Expert Team</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Experienced professionals</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">Quality Training</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Comprehensive courses</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">Research Support</h3>
                      <p className="text-xs sm:text-sm text-gray-600">End-to-end assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card3D key={index} delay={index * 0.1} className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-5 md:p-6 text-center">
                <Icon3D delay={index * 0.15}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-600" />
                  </div>
                </Icon3D>
                <motion.div
                  initial={{ scale: 0, rotateX: 180 }}
                  animate={{ scale: 1, rotateX: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-1 sm:mb-2"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
              </Card3D>
            );
          })}
        </section>

        {/* Mission, Vision, Values */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card3D key={index} delay={index * 0.15} className="bg-white rounded-lg sm:rounded-xl shadow-lg p-6 sm:p-8 border-t-4 border-indigo-500">
                <Link to={value.link} className="block h-full">
                  <Icon3D delay={index * 0.15}>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-600" />
                    </div>
                  </Icon3D>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{value.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{value.description}</p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-indigo-600 font-semibold text-sm sm:text-base"
                  >
                    Learn More
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                </Link>
              </Card3D>
            );
          })}
        </section>

        {/* What We Offer */}
        <section className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 mb-8 sm:mb-12">
          <Text3D className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">What We Offer</Text3D>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              'Comprehensive statistical training programs',
              'Research methodology workshops',
              'Data analysis and consulting services',
              'Publication support and guidance',
              'Software-specific training (SPSS, Stata, R, Python)',
              'Customized corporate training programs',
              'Online and in-person learning options',
              'Certificate programs and professional development',
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-2 sm:gap-3"
              >
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <Card3D className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 text-white text-center">
          <Text3D className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Start Your Journey?</Text3D>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg lg:text-xl text-indigo-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
          >
            Join our community of learners and researchers. Explore our courses, services, and resources to advance your career.
          </motion.p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <Button3D className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-indigo-600 rounded-lg font-semibold inline-flex items-center justify-center gap-2 text-sm sm:text-base min-h-[44px] touch-target">
              <Link to="/courses" className="flex items-center gap-2">
                Browse Courses
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button3D>
            <Button3D className="px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-sm sm:text-base min-h-[44px] touch-target">
              <Link to="/contact">Contact Us</Link>
            </Button3D>
          </div>
        </Card3D>
      </div>
    </Page3DWrapper>
  );
}
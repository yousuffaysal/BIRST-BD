import React from 'react';
import { ArrowLeft, Target, Users, BookOpen, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OurMission() {
  const missionPoints = [
    {
      icon: BookOpen,
      title: 'Comprehensive Training',
      description: 'Provide world-class statistical and research methodology training programs that are accessible to all.',
    },
    {
      icon: Users,
      title: 'Empower Professionals',
      description: 'Equip researchers, analysts, and professionals with the skills needed to excel in their fields.',
    },
    {
      icon: Globe,
      title: 'Bridge Knowledge Gaps',
      description: 'Connect theoretical knowledge with practical application through hands-on learning experiences.',
    },
    {
      icon: Target,
      title: 'Quality Excellence',
      description: 'Maintain the highest standards in education, research support, and consultancy services.',
    },
  ];

  const objectives = [
    'Develop and deliver comprehensive training programs in statistics, research methodology, and data analysis',
    'Provide accessible education through both online and in-person learning platforms',
    'Foster a community of learners and researchers committed to data-driven decision making',
    'Support research projects and publications through expert consultation and guidance',
    'Collaborate with academic institutions, organizations, and professionals to advance research excellence',
    'Continuously innovate and update our curriculum to reflect current best practices and emerging trends',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-indigo-100 hover:text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to About Us
          </Link>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="w-12 h-12" />
              <h1 className="text-5xl md:text-6xl font-bold">
                Our Mission
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Empowering minds through excellence in research and professional development
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-indigo-600">Home</Link> /{' '}
          <Link to="/about" className="hover:text-indigo-600">About Us</Link> /{' '}
          <span className="text-gray-900">Our Mission</span>
        </div>

        {/* Mission Statement */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission Statement</h2>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 mb-8 border-l-4 border-indigo-600">
              <p className="text-xl md:text-2xl text-gray-800 leading-relaxed text-center font-medium italic">
                "To empower researchers and professionals with advanced statistical knowledge, research methodologies, 
                and data analysis skills through comprehensive training and consultancy services, fostering excellence 
                in research and data-driven decision making across Bangladesh and beyond."
              </p>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              Our mission drives everything we do. We are committed to making high-quality statistical and research 
              training accessible to everyone, regardless of their background or location.
            </p>
          </div>
        </section>

        {/* Mission Components */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          {missionPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all border-t-4 border-indigo-500"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{point.title}</h3>
                <p className="text-gray-700 leading-relaxed">{point.description}</p>
              </div>
            );
          })}
        </section>

        {/* Core Objectives */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Core Objectives</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {objectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                </div>
                <p className="text-gray-700 leading-relaxed">{objective}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600 mb-2">5000+</div>
              <div className="text-gray-700 font-semibold">Professionals Trained</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600 mb-2">200+</div>
              <div className="text-gray-700 font-semibold">Research Projects Supported</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-700 font-semibold">Training Programs Offered</div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us in Our Mission</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Whether you're a researcher, professional, or student, we invite you to be part of our mission 
            to advance research excellence and statistical literacy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/courses"
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2"
            >
              Explore Our Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Get Involved
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

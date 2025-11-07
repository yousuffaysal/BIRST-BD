import React from 'react';
import { ArrowLeft, Eye, Rocket, Globe, Award, Target, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OurVision() {
  const visionPillars = [
    {
      icon: Globe,
      title: 'Regional Leadership',
      description: 'Become the leading research and statistical training institute in Bangladesh, recognized for excellence across South Asia.',
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Set the standard for world-class training and research support services in the region.',
    },
    {
      icon: Rocket,
      title: 'Innovation Hub',
      description: 'Foster innovation in research methodologies and data analysis techniques.',
    },
    {
      icon: Target,
      title: 'Accessibility',
      description: 'Make high-quality statistical and research training accessible to everyone.',
    },
  ];

  const futureGoals = [
    {
      year: '2025',
      goal: 'Launch comprehensive online learning platform with 100+ courses',
    },
    {
      year: '2026',
      goal: 'Establish partnerships with 50+ academic institutions',
    },
    {
      year: '2027',
      goal: 'Train 10,000+ professionals across various sectors',
    },
    {
      year: '2030',
      goal: 'Become the premier research and statistical training hub in South Asia',
    },
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
              <Eye className="w-12 h-12" />
              <h1 className="text-5xl md:text-6xl font-bold">
                Our Vision
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Shaping the future of research and statistical excellence in Bangladesh
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
          <span className="text-gray-900">Our Vision</span>
        </div>

        {/* Vision Statement */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Vision Statement</h2>
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 mb-8 border-l-4 border-purple-600">
              <p className="text-xl md:text-2xl text-gray-800 leading-relaxed text-center font-medium italic">
                "To become the leading research and statistical training institute in Bangladesh, fostering excellence 
                in research and data-driven decision making, and empowering individuals and organizations to achieve 
                their full potential through the power of data and evidence-based insights."
              </p>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              Our vision guides our strategic direction and inspires us to continuously innovate and excel in 
              everything we do. We envision a future where data literacy and research excellence are the norm 
              across all sectors in Bangladesh.
            </p>
          </div>
        </section>

        {/* Vision Pillars */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          {visionPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all border-t-4 border-purple-500"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
                <p className="text-gray-700 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </section>

        {/* Looking Ahead */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Looking Ahead</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {futureGoals.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border-l-4 border-indigo-600"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {item.year}
                  </div>
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">{item.goal}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vision Impact */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Vision in Action</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-indigo-50 rounded-xl">
              <Star className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence in Education</h3>
                <p className="text-gray-700">
                  We strive to deliver training programs that meet international standards while remaining 
                  accessible and relevant to the local context.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-purple-50 rounded-xl">
              <Star className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Research Innovation</h3>
                <p className="text-gray-700">
                  We promote innovative research methodologies and support cutting-edge research projects 
                  that contribute to knowledge advancement.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl">
              <Star className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Community Building</h3>
                <p className="text-gray-700">
                  We foster a vibrant community of researchers, professionals, and learners who support 
                  and inspire each other in their journey toward excellence.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-indigo-50 rounded-xl">
              <Star className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Social Impact</h3>
                <p className="text-gray-700">
                  Through our training and research support, we aim to contribute to evidence-based 
                  policy making and positive social change in Bangladesh.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Be Part of Our Vision</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join us as we work toward making our vision a reality. Together, we can transform research 
            and statistical training in Bangladesh.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/courses"
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Start Learning
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Partner With Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

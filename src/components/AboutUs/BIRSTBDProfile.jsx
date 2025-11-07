import React from 'react';
import { ArrowLeft, Building2, MapPin, Calendar, Users, Target, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BIRSTBDProfile() {
  const highlights = [
    {
      icon: Target,
      title: 'Our Focus',
      description: 'Research excellence and statistical training',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Experienced researchers and statisticians',
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'Internationally recognized training programs',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Cutting-edge methodologies and tools',
    },
  ];

  const milestones = [
    {
      year: '2015',
      title: 'Foundation',
      description: 'Statistical Research Consultants Bangladesh (SRCBD) was established with a vision to bridge the gap between theoretical knowledge and practical application.',
    },
    {
      year: '2018',
      title: 'Expansion',
      description: 'Expanded services to include online training programs and corporate consultancy, reaching a wider audience across Bangladesh.',
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched comprehensive online learning platform and virtual training programs, adapting to the changing needs of learners.',
    },
    {
      year: '2024',
      title: 'BIRST Initiative',
      description: 'Announced the establishment of Bangladesh Institute for Research and Statistical Training (BIRST) to further expand our impact.',
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
              <Building2 className="w-12 h-12" />
              <h1 className="text-5xl md:text-6xl font-bold">
                BIRSTBD Profile
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Bangladesh Institute for Research and Statistical Training - Empowering Excellence Through Data
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
          <span className="text-gray-900">BIRSTBD Profile</span>
        </div>

        {/* Overview Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Bangladesh Institute for Research and Statistical Training (BIRST) is an innovative initiative 
                by Statistical Research Consultants Bangladesh (SRCBD), designed to provide comprehensive research 
                and statistical training to professionals, researchers, and students across Bangladesh and beyond.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our institute represents the culmination of years of experience in statistical consulting, research 
                methodology training, and data analysis services. We combine academic rigor with practical application, 
                ensuring that our programs are both theoretically sound and immediately applicable in real-world scenarios.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                At BIRST, we believe that data literacy and research skills are fundamental to progress in any field. 
                Our mission is to democratize access to high-quality statistical and research training, making it 
                accessible to individuals and organizations regardless of their background or location.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl">
                <MapPin className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Established</h3>
                  <p className="text-gray-600">Under SRCBD Foundation (2015)</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Community</h3>
                  <p className="text-gray-600">5000+ Professionals Trained</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all border-t-4 border-indigo-500"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            );
          })}
        </section>

        {/* Our Journey */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex gap-6 md:gap-8 relative"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {milestone.year}
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-full bg-gray-300"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Makes Us Different</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Practical Approach</h3>
              <p className="text-gray-700">
                Our training programs emphasize hands-on experience with real datasets and case studies, 
                ensuring you can apply what you learn immediately in your work.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Faculty</h3>
              <p className="text-gray-700">
                Learn from industry professionals and academic experts with years of experience in research, 
                statistics, and data analysis across various fields.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Learning</h3>
              <p className="text-gray-700">
                We offer both online and in-person training options, allowing you to learn at your own pace 
                and in a format that works best for your schedule.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Support</h3>
              <p className="text-gray-700">
                Beyond training, we provide ongoing consultation, research support, and a community of 
                learners and researchers to help you succeed.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Be part of Bangladesh's premier research and statistical training institute. Start your journey today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/courses"
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Explore Courses
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

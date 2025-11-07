import React from 'react';
import { ArrowLeft, Users, Award, GraduationCap, Briefcase, Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OurTeam() {
  const teamMembers = [
    {
      name: 'Dr. Mohammad Hasan',
      role: 'Director & Lead Statistician',
      expertise: 'Statistical Analysis, Research Methodology',
      education: 'PhD in Statistics, University of Dhaka',
      experience: '15+ years in research and statistical consulting',
      image: null,
    },
    {
      name: 'Dr. Fatema Begum',
      role: 'Senior Research Consultant',
      expertise: 'Data Science, Machine Learning',
      education: 'PhD in Data Science, International University',
      experience: '12+ years in data analysis and research',
      image: null,
    },
    {
      name: 'Mr. Kamrul Hasan',
      role: 'Training Program Coordinator',
      expertise: 'Statistical Software, Research Training',
      education: 'MSc in Applied Statistics, University of Dhaka',
      experience: '10+ years in training and education',
      image: null,
    },
    {
      name: 'Ms. Rehana Khatun',
      role: 'Research Methodology Specialist',
      expertise: 'Survey Design, Qualitative Research',
      education: 'MSc in Social Research, BRAC University',
      experience: '8+ years in research methodology',
      image: null,
    },
  ];

  const teamStats = [
    { label: 'Team Members', value: '20+', icon: Users },
    { label: 'PhD Holders', value: '8', icon: GraduationCap },
    { label: 'Years Experience', value: '12+', icon: Briefcase },
    { label: 'Certifications', value: '50+', icon: Award },
  ];

  const values = [
    'Commitment to Excellence',
    'Continuous Learning',
    'Collaborative Spirit',
    'Innovation & Creativity',
    'Integrity & Professionalism',
    'Student-Centered Approach',
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
              <Users className="w-12 h-12" />
              <h1 className="text-5xl md:text-6xl font-bold">
                Our Team
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Meet the dedicated professionals driving excellence in research and statistical training
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
          <span className="text-gray-900">Our Team</span>
        </div>

        {/* Team Introduction */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Expert Team</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our team consists of experienced researchers, statisticians, data scientists, and educators 
              with advanced degrees and extensive industry experience. We are committed to providing the highest 
              quality training and research support services.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Each member brings unique expertise and passion for teaching, ensuring that our programs are 
              comprehensive, practical, and aligned with current industry standards and best practices.
            </p>
          </div>
        </section>

        {/* Team Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {teamStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
              </div>
            );
          })}
        </section>

        {/* Team Members */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Team Members</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all border-t-4 border-indigo-500"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-indigo-600 font-semibold mb-3">{member.role}</p>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>{member.education}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Briefcase className="w-4 h-4" />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-3">
                    <strong className="text-gray-900">Expertise:</strong> {member.expertise}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${member.name.toLowerCase().replace(/\s+/g, '.')}@birstbd.com`}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-indigo-100 transition text-gray-600 hover:text-indigo-600"
                      title="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="p-2 bg-gray-100 rounded-lg hover:bg-indigo-100 transition text-gray-600 hover:text-indigo-600"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Values */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-indigo-600" />
                </div>
                <p className="text-gray-800 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join Our Team */}
        <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Team</h2>
            <p className="text-lg text-gray-700 mb-8">
              We are always looking for talented and passionate individuals to join our team. If you share 
              our commitment to excellence in research and education, we'd love to hear from you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Contact Us About Opportunities
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Work With Our Team</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Experience the expertise and dedication of our team through our training programs and research support services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/courses"
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Explore Our Programs
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

import React from 'react';
import { Target, Users, Award, TrendingUp, CheckCircle, ArrowRight, Play, Layers, Sparkles, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 bg-[#0F172A] overflow-hidden min-h-[60vh] flex items-center justify-center">
        {/* Abstract Cinematic Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20 -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-[#0F172A]/90 to-[#0F172A] -z-10" />

        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#1FB6FF]/20 rounded-full blur-[120px] -z-10 animate-pulse" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#1FB6FF] text-xs font-bold uppercase tracking-wider mb-8 backdrop-blur-md">
              <Sparkles className="w-3 h-3" />
              <span>Who We Are</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 leading-tight">
              Driving Excellence <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FB6FF] to-sky-300">Through Data</span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Statistical Research Consultants Bangladesh (SRCBD) is bridging the gap between theoretical knowledge and practical application.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- BENTO GRID INFO SECTION --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">

          {/* Box 1: Mission (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-1 bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 group-hover:bg-blue-100 transition-colors duration-500" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#1FB6FF]/10 rounded-xl flex items-center justify-center text-[#1FB6FF]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              To empower researchers and professionals with advanced statistical knowledge, research methodologies, and data analysis skills through comprehensive training and consultancy services.
            </p>
          </motion.div>

          {/* Box 2: Quick Stat (Small) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#1FB6FF] rounded-3xl p-8 shadow-xl shadow-blue-400/30 flex flex-col items-center justify-center text-center text-white relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <span className="text-6xl font-black mb-2 block">10+</span>
              <span className="text-sm font-bold uppercase tracking-wider opacity-90">Years Experience</span>
            </div>
          </motion.div>

          {/* Box 3: Vision (Vertical) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:row-span-2 bg-gray-900 rounded-3xl p-8 shadow-xl flex flex-col relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-auto">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                To become the leading research and statistical training institute in Bangladesh, fostering excellence in research and data-driven decision making across all sectors.
              </p>
              <div className="mt-auto pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 text-white/80">
                  <Globe className="w-5 h-5 text-[#1FB6FF]" />
                  <span className="text-sm font-semibold">Global Standards</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Box 4: Values (Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row items-center gap-8 justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Core Values</h3>
              </div>
              <p className="text-gray-600">We are committed to excellence, integrity, innovation, and continuous learning.</p>
            </div>

            <div className="flex gap-4">
              <div className="text-center px-4">
                <div className="text-3xl font-bold text-gray-900">5k+</div>
                <div className="text-xs text-gray-400 font-bold uppercase">Students</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center px-4">
                <div className="text-3xl font-bold text-gray-900">50+</div>
                <div className="text-xs text-gray-400 font-bold uppercase">Courses</div>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center px-4">
                <div className="text-3xl font-bold text-gray-900">200+</div>
                <div className="text-xs text-gray-400 font-bold uppercase">Projects</div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- CINEMATIC VIDEO SECTION --- */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">See Us <span className="text-[#1FB6FF]">In Action</span></h2>
              <p className="text-gray-400 text-lg">Watch how we transform raw data into actionable insights and empower the next generation of researchers.</p>
            </div>
            <Link to="/gallery/video" className="group flex items-center gap-3 text-white font-bold border-b border-[#1FB6FF] pb-1 hover:text-[#1FB6FF] transition-colors">
              View Video Gallery
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 group"
          >
            {/* Video Placeholder / Thumbnail - In a real app this would be a video player or iframe */}
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
              alt="Team working on data"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors duration-500">
              <button className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 group-hover:scale-110 group-hover:bg-[#1FB6FF] group-hover:border-[#1FB6FF] transition-all duration-300 shadow-2xl">
                <Play className="w-10 h-10 ml-1 fill-current" />
              </button>
            </div>

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Inside SRCBD</h3>
                  <p className="text-gray-400 text-sm">A glimpse into our workshop culture</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA / WHAT WE OFFER --- */}
      <section className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-12">Empowering Your Research Journey</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-16">
            {[
              'Comprehensive statistical training programs',
              'Research methodology workshops',
              'Data analysis and consulting services',
              'Publication support and guidance',
              'Software-specific training (SPSS, Stata, R, Python)',
              'Customized corporate training programs',
              'Online and in-person learning options',
              'Certificate programs and professional development',
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>

          <Link to="/contact">
            <button className="px-10 py-5 bg-[#1FB6FF] text-white font-bold rounded-full text-lg shadow-xl shadow-blue-200 hover:bg-blue-600 hover:scale-105 transition-all duration-300">
              Start Your Collaboration
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
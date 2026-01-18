import React from 'react';
import { ArrowLeft, Building2, MapPin, Calendar, Users, Target, Award, TrendingUp, Sparkles, CheckCircle, Globe, Twitter, Linkedin, BookOpen, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      description: 'SRCBD established to bridge the gap between theory and practice.',
    },
    {
      year: '2018',
      title: 'Expansion',
      description: 'Launched online training & corporate consultancy across Bangladesh.',
    },
    {
      year: '2020',
      title: 'Digital Leap',
      description: 'Comprehensive online platform for remote learning.',
    },
    {
      year: '2024',
      title: 'BIRST Initiative',
      description: 'Establishment of Bangladesh Institute for Research and Statistical Training.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 bg-[#0F172A] overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-[#1FB6FF]/10 to-transparent -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0F172A] to-transparent -z-10" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] -z-10 animate-pulse" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#1FB6FF] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold tracking-wide uppercase">Back to Overview</span>
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#1FB6FF] text-xs font-bold uppercase tracking-wider mb-6">
                <Building2 className="w-3 h-3" />
                <span>Institute Profile</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tigher">
                BIRST<span className="text-[#1FB6FF]">BD</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 border-l-4 border-[#1FB6FF] pl-6">
                Bangladesh Institute for Research and Statistical Training — Empowering excellence through data-driven insights and rigorous academic standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#1FB6FF] blur-[80px] opacity-20 rounded-full" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-black text-white mb-1">2015</div>
                    <div className="text-xs text-slate-400 uppercase font-bold">Est. Year</div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <div className="text-3xl font-black text-white mb-1">5k+</div>
                    <div className="text-xs text-slate-400 uppercase font-bold">Alumni</div>
                  </div>
                  <div className="col-span-2 bg-[#1FB6FF]/10 rounded-2xl p-4 flex items-center gap-4">
                    <MapPin className="w-8 h-8 text-[#1FB6FF]" />
                    <div className="text-left">
                      <div className="text-white font-bold">Dhaka, Bangladesh</div>
                      <div className="text-xs text-[#1FB6FF]">Headquarters</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">

        {/* Bento Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 md:mb-24 auto-rows-[minmax(180px,auto)]">
          {/* Box 1: Main Text (Wide) */}
          <div className="md:col-span-2 md:row-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Pioneering Research Education</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Bangladesh Institute for Research and Statistical Training (BIRST) is an innovative initiative by Statistical Research Consultants Bangladesh (SRCBD). We exist to democratize access to high-quality statistical and research training.
              </p>
              <p>
                Our programs represent the culmination of years of experience in statistical consulting. We combine academic rigor with practical application.
              </p>
            </div>
          </div>

          {/* Box 2: Image with Info (Tall) */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
              alt="Students collaboration"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1FB6FF] text-white text-xs font-bold uppercase tracking-wider mb-3">
                <Users className="w-3 h-3" />
                <span>Community</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Empowering 5000+ Researchers across Bangladesh</h3>
              <p className="text-slate-300 text-sm line-clamp-2">Joining hands to build a data-literate nation through continuous learning and workshops.</p>
            </div>
          </div>

          {/* Box 3: Stats/Pillars */}
          {[
            { icon: Globe, label: "National Reach", sub: "64 Districts" },
            { icon: CheckCircle, label: "Certified", sub: "Quality Assured" },
            { icon: Award, label: "Excellence", sub: "Top Rated" },
            { icon: Target, label: "Impact", sub: "Real Results" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#1FB6FF] mb-3">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="font-bold text-gray-900 leading-tight">{item.label}</div>
              <div className="text-xs text-gray-500 font-semibold uppercase mt-1">{item.sub}</div>
            </div>
          ))}
        </section>

        {/* Video Section */}
        <section className="mb-24 relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 group aspect-video md:aspect-[21/9]">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
            alt="Digital conference"
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-indigo-900/30 group-hover:bg-indigo-900/20 transition-colors" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <Link to="/gallery/video" className="group/btn relative">
              <div className="absolute inset-0 bg-[#1FB6FF] rounded-full blur-xl opacity-50 group-hover/btn:opacity-80 animate-pulse" />
              <div className="relative w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white group-hover/btn:scale-110 group-hover/btn:bg-[#1FB6FF] group-hover/btn:border-[#1FB6FF] transition-all duration-300">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-current border-b-[10px] border-b-transparent ml-1" />
              </div>
            </Link>
            <h2 className="mt-8 text-3xl md:text-5xl font-black text-white drop-shadow-lg">Experience BIRST</h2>
            <p className="mt-4 text-white/90 text-lg font-medium max-w-xl">Watch how we are transforming the landscape of statistical research education.</p>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Our Core Pillars</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-lg shadow-gray-100 border border-gray-50 group transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1FB6FF] transition-colors duration-300">
                    <Icon className="w-7 h-7 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Leadership Section */}
        <section className="mb-16 md:mb-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Leadership & Acquaintance</h2>
            <p className="text-gray-500 text-lg">Guided by visionary leaders and expert statisticians.</p>
          </div>

          {/* Director Spotlight */}
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 md:p-12 mb-16 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1FB6FF]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="w-32 h-32 md:w-64 md:h-64 rounded-full border-4 border-white/10 shadow-2xl flex-shrink-0 overflow-hidden bg-white/5">
                {/* Placeholder for Director Image */}
                <img
                  src="https://ik.imagekit.io/2lax2ytm2/10001.png"
                  alt="Professor Hafiz T.A. Khan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1FB6FF]/20 text-[#1FB6FF] text-[10px] font-bold uppercase tracking-wider mb-2 border border-[#1FB6FF]/20">
                  <Award className="w-3 h-3" />
                  <span>Director & Lead Statistician</span>
                </div>
                <h3 className="text-xl md:text-4xl font-black text-white mb-1">Professor Hafiz T.A. Khan</h3>
                <p className="text-[#1FB6FF] text-sm md:text-base font-medium mb-3">Professor of Public Health and Statistics</p>

                <div className="space-y-1 mb-4 text-xs md:text-sm text-slate-300">
                  <p className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#1FB6FF] mt-1.5 shrink-0"></span> Post-Doctoral in Population Ageing 2005 (University of Oxford)</p>
                  <p className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0"></span> PhD in Applied Statistics 1996 (Edinburgh Napier University)</p>
                  <p className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0"></span> MSc in Statistics 1987 (University of Chittagong)</p>
                  <p className="flex gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0"></span> BSc in Statistics 1986 (University of Chittagong)</p>
                </div>

                <p className="text-slate-300 text-xs md:text-base leading-relaxed mb-4 md:mb-8 max-w-2xl italic opacity-80">
                  "Prior to joining UWL, he held several academic positions including Reader in Health Statistics at Birmingham City University and Research Fellow at the University of Oxford (2006-2008)."
                </p>

                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
                  <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
                    <div className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-xs md:text-sm text-slate-300">
                      34+ Years Experience
                    </div>
                    <div className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-xs md:text-sm text-slate-300">
                      Research Methodology
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3">
                    <a href="https://x.com/htakhan" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1FB6FF] border border-[#1FB6FF] flex items-center justify-center text-white hover:bg-white hover:text-[#1FB6FF] transition-all duration-300 shadow-lg shadow-blue-500/20">
                      <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/hafiz-t-a-khan-phd-978a9353/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1FB6FF] border border-[#1FB6FF] flex items-center justify-center text-white hover:bg-white hover:text-[#1FB6FF] transition-all duration-300 shadow-lg shadow-blue-500/20">
                      <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                    <a href="https://scholar.google.com/citations?user=z8-PmZcAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1FB6FF] border border-[#1FB6FF] flex items-center justify-center text-white hover:bg-white hover:text-[#1FB6FF] transition-all duration-300 shadow-lg shadow-blue-500/20" title="Google Scholar">
                      <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Members Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Dr. Anamul Haque Sajib',
                designation: 'Adjunct Faculty',
                role: 'Professor, Department of Statistics, DU',
                edu: 'PhD in Statistics (Nottingham)',
                stats: '16+ Years Exp',
                image: 'https://ik.imagekit.io/2lax2ytm2/10001.jpg',
                social: {
                  scholar: 'https://scholar.google.com/citations?user=rzyc9icAAAAJ&hl=en',
                  researchgate: 'https://www.researchgate.net/profile/Anamul-Sajib',
                  faculty: 'https://du.ac.bd/faculty/faculty_details/STA/2434'
                }
              },
              {
                name: 'Dr. Hossain, Md Pear',
                designation: 'Adjunct Faculty',
                role: 'Post-doctoral Fellow, Division of Epidemiology and Biostatistics, HKU',
                edu: 'PhD in Biomedical Sciences (CityU)',
                stats: 'HKU Fellow',
                image: 'https://ik.imagekit.io/2lax2ytm2/10001.jpg?updatedAt=1768594485417',
                social: {
                  twitter: '#',
                  linkedin: 'https://www.linkedin.com/in/mphossain/?originalSubdomain=hk&skipRedirect=true&originalSubdomain=hk',
                  scholar: 'https://scholar.google.com/citations?user=RUdvILMAAAAJ&hl=en'
                }
              },
              {
                name: 'Dr. Md. Shiblur Rahaman',
                designation: 'Adjunct Faculty',
                role: 'Associate Professor, Dept. of Environmental Science and Disaster Management, NSTU',
                edu: 'Ph.D. in Environmental Science (Hokkaido)',
                stats: '10+ Years Exp',
                image: 'https://ik.imagekit.io/2lax2ytm2/WhatsApp%20Image%202026-01-16%20at%2021.20.56.jpeg',
                social: {
                  twitter: '#',
                  linkedin: 'https://www.linkedin.com/in/md-shiblur-rahaman-phd-aa326228/?originalSubdomain=bd&skipRedirect=true&originalSubdomain=bd',
                  scholar: 'https://scholar.google.com/citations?user=V1gOoGAAAAAJ&hl=en'
                }
              }
            ].map((member, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-50 group text-center flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#1FB6FF]/10 transition-colors relative overflow-hidden">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <span className="text-2xl font-black text-gray-300 group-hover:text-[#1FB6FF] transition-colors z-10">{member.name.charAt(0)}</span>
                  )}
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">{member.designation}</p>
                <p className="text-[#1FB6FF] text-sm font-bold mb-4">{member.role}</p>

                {/* Social Links */}
                <div className="flex items-center gap-3 mb-4">
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-400 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.scholar && (
                    <a href={member.social.scholar} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Google Scholar">
                      <BookOpen className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.researchgate && (
                    <a href={member.social.researchgate} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-teal-600 transition-colors" title="ResearchGate">
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.faculty && (
                    <a href={member.social.faculty} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-indigo-600 transition-colors" title="Faculty Profile">
                      <Building2 className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="w-full pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {member.edu.split(' ')[0]}</span>
                  <span className="font-bold text-[#1FB6FF]">{member.stats}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Visual Journey Timeline */}
        <section className="bg-slate-900 rounded-3xl p-6 md:p-16 relative overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-[#1FB6FF] to-purple-500" />

          <div className="relative z-10 mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Our Journey</h2>
            <p className="text-slate-400 max-w-2xl">From a small consultancy team to a premier national institute.</p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative pt-8 group">
                {/* Timeline Line (Desktop) */}
                <div className="hidden md:block absolute top-0 left-0 w-full h-px bg-slate-800"></div>
                <div className="hidden md:block absolute top-0 left-0 w-3 h-3 rounded-full bg-[#1FB6FF] -translate-y-1.5 shadow-[0_0_15px_rgba(31,182,255,0.8)]"></div>

                {/* Mobile Line */}
                <div className="md:hidden absolute left-0 top-0 h-full w-px bg-slate-800 ml-4"></div>
                <div className="md:hidden absolute left-0 top-8 w-3 h-3 rounded-full bg-[#1FB6FF] ml-[13px] shadow-[0_0_15px_rgba(31,182,255,0.8)]"></div>

                <div className="pl-10 md:pl-0">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/5 mb-2 group-hover:from-[#1FB6FF] group-hover:to-white transition-all duration-500 select-none">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="mt-12 md:mt-20 text-center">
          <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-[#1FB6FF] text-white font-bold rounded-full shadow-xl shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-1 transition-all duration-300">
            Partner With Us
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>

      </div>
    </div>
  );
}
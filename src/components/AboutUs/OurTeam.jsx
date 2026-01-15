import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Users, Award, GraduationCap, Briefcase, Mail, Linkedin, Sparkles, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

export default function OurTeam() {
  const containerRef = useRef(null);
  const axiosPublic = useAxiosPublic();
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axiosPublic.get('/team-members');
        setTeamMembers(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTeam();
  }, [axiosPublic]);

  /* Removed static teamMembers array */

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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0B2340] text-white font-sans overflow-x-hidden selection:bg-[#1FB6FF] selection:text-[#0B2340]">

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#1FB6FF]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-[#7C4DFF]/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 pt-8 px-6 md:px-12 flex justify-between items-center">
        <Link
          to="/about"
          className="group flex items-center gap-2 text-[#8892b0] hover:text-[#1FB6FF] transition-colors duration-300"
        >
          <div className="p-2 rounded-full border border-white/10 group-hover:border-[#1FB6FF]/50 group-hover:bg-[#1FB6FF]/10 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-medium tracking-wide">Back to About Us</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1FB6FF]/10 border border-[#1FB6FF]/20 text-[#1FB6FF] font-semibold text-sm tracking-uppercase mb-6">
            <Users className="w-4 h-4" />
            <span>MEET THE EXPERTS</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            The Minds Behind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FB6FF] to-[#7C4DFF]">Excellence.</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl text-[#8892b0] max-w-3xl mx-auto leading-relaxed">
            Meet the dedicated professionals driving excellence in research and statistical training.
          </motion.p>
        </motion.div>
      </section>

      {/* Intro Section - Ivory Background */}
      <section className="relative z-10 py-24 px-6 md:px-12 bg-[#fffff0] text-[#0B2340]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Expert Team</h2>
              <p className="text-lg text-[#0B2340]/80 leading-relaxed mb-6">
                Our team consists of experienced researchers, statisticians, data scientists, and educators
                with advanced degrees and extensive industry experience. We are committed to providing the highest
                quality training and research support services.
              </p>
              <p className="text-lg text-[#0B2340]/80 leading-relaxed">
                Each member brings unique expertise and passion for teaching, ensuring that our programs are
                comprehensive, practical, and aligned with current industry standards and best practices.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {teamStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all"
                  >
                    <div className="w-12 h-12 bg-[#1FB6FF]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#1FB6FF]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-[#0B2340] mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Team Values - Deep Blue */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-[#8892b0]">The principles that guide our work and relationships.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-xl bg-[#112d50] border border-white/5 hover:border-[#1FB6FF]/30 transition-all duration-300 hover:bg-[#15355a] text-center"
              >
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1FB6FF] transition-colors">
                  <Sparkles className="w-5 h-5 text-[#1FB6FF] group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#1FB6FF] transition-colors">{value}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Grid - Ivory Background */}
      <section className="relative z-10 py-24 px-6 md:px-12 bg-[#fffff0]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#0B2340] mb-16 text-center">Key Team Members</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className={`absolute top-0 w-full h-1 bg-gradient-to-r ${member.color}`} />

                <div className="p-8 flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden`}>
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        member.name.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#0B2340] mb-2">{member.name}</h3>
                    <p className="text-[#1FB6FF] font-semibold mb-4 flex items-center gap-2">
                      <UserCheck className="w-4 h-4" />
                      {member.role}
                    </p>

                    <div className="space-y-2 mb-6 text-gray-600 text-sm">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#7C4DFF]" />
                        <span>{member.education}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#7C4DFF]" />
                        <span>{member.experience}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-800 mb-4">
                        <strong className="text-[#0B2340]">Expertise:</strong> {member.expertise}
                      </p>

                      <div className="flex gap-3">
                        <a href="#" className="p-2 rounded-lg bg-[#1FB6FF] text-white hover:bg-[#0077b5] transition-colors shadow-md">
                          <Mail className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 rounded-lg bg-[#1FB6FF] text-white hover:bg-[#0077b5] transition-colors shadow-md">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6 md:px-12 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-[#8892b0] mb-8 max-w-2xl mx-auto">
            We are always looking for talented individuals to join our team. If you share our commitment to excellence, we'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/courses" className="px-8 py-3 bg-[#1FB6FF] text-white rounded-full font-bold hover:bg-[#1a9cdb] transition-all hover:scale-105 shadow-[0_10px_30px_rgba(31,182,255,0.3)]">
              Explore Our Programs
            </Link>
            <Link to="/contact" className="px-8 py-3 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all">
              Contact Us About Opportunities
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
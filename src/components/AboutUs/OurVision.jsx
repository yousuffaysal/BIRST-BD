import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Eye, Rocket, Globe, Award, Target, TrendingUp, Star, Zap, Users, Lightbulb, Compass, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OurVision() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const visionPillars = [
    {
      icon: Globe,
      title: 'Regional Leadership',
      description: 'Become the leading research and statistical training institute in Bangladesh, recognized for excellence across South Asia.',
      color: "from-blue-400 to-cyan-300"
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Set the standard for world-class training and research support services in the region.',
      color: "from-purple-400 to-pink-300"
    },
    {
      icon: Rocket,
      title: 'Innovation Hub',
      description: 'Foster innovation in research methodologies and data analysis techniques.',
      color: "from-amber-400 to-orange-300"
    },
    {
      icon: Target,
      title: 'Accessibility',
      description: 'Make high-quality statistical and research training accessible to everyone.',
      color: "from-emerald-400 to-teal-300"
    },
  ];

  const futureGoals = [
    {
      year: '2025',
      goal: 'Launch comprehensive online learning platform with 100+ courses',
      icon: Zap
    },
    {
      year: '2026',
      goal: 'Establish partnerships with 50+ academic institutions',
      icon: Users
    },
    {
      year: '2027',
      goal: 'Train 10,000+ professionals across various sectors',
      icon: Lightbulb
    },
    {
      year: '2030',
      goal: 'Become the premier research and statistical training hub in South Asia',
      icon: Globe
    },
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
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0B2340] text-white overflow-x-hidden selection:bg-[#1FB6FF] selection:text-[#0B2340]">

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#1FB6FF]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#7C4DFF]/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
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
      <section className="relative z-10 pt-16 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center md:text-left md:flex justify-between items-center md:gap-16"
        >
          <div className="md:w-3/5">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1FB6FF]/10 border border-[#1FB6FF]/20 text-[#1FB6FF] font-semibold text-sm tracking-uppercase mb-6">
              <Compass className="w-4 h-4 animate-spin-slow" />
              <span>OUR DIRECTION</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-bold leading-tight mb-8">
              <span className="text-white">Shaping the</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FB6FF] to-[#7C4DFF]">Future</span> of <br />
              Data.
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-[#8892b0] max-w-2xl leading-relaxed">
              We envision a Bangladesh where decisions are driven by data, and excellence in research is the standard, not the exception.
            </motion.p>
          </div>

          <motion.div variants={fadeInUp} className="hidden md:flex md:w-2/5 justify-center relative">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 border border-dashed border-[#1FB6FF]/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart className="w-32 h-32 text-[#1FB6FF]" />
              </div>
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 p-4 bg-[#0d2a4d] border border-white/10 rounded-2xl shadow-xl backdrop-blur-md"
              >
                <Target className="w-8 h-8 text-[#7C4DFF]" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 p-4 bg-[#0d2a4d] border border-white/10 rounded-2xl shadow-xl backdrop-blur-md"
              >
                <Rocket className="w-8 h-8 text-cyan-400" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Vision Statement */}
      <section className="relative z-10 py-24 px-6 md:px-12 bg-[#fffff0] text-[#0B2340]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <QuoteIcon className="w-16 h-16 text-[#0B2340]/20 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-medium leading-normal md:leading-snug text-[#0B2340]">
            "To become the leading research and statistical training institute in Bangladesh, fostering excellence in research and data-driven decision making."
          </h2>
          <div className="mt-12 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#1FB6FF] to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Pillars Grid */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Strategic Pillars</h2>
          <p className="text-[#8892b0] text-lg max-w-xl">The core foundations upon which we build our future and serve our community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visionPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-3xl bg-[#112d50] border border-white/5 hover:border-[#1FB6FF]/30 transition-all duration-300 hover:bg-[#15355a]"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${pillar.color} rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#1FB6FF]/10 transition-colors">
                  <Icon className="w-7 h-7 text-white group-hover:text-[#1FB6FF] transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white/90 group-hover:text-white">{pillar.title}</h3>
                <p className="text-[#8892b0] leading-relaxed group-hover:text-white/80 transition-colors">
                  {pillar.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative z-10 py-24 bg-[#0d2a4d]/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold mb-16 text-center">Roadmap to <span className="text-[#1FB6FF]">2030</span></h2>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1FB6FF] via-[#7C4DFF] to-[#1FB6FF] opacity-30 md:-translate-x-1/2" />

            <div className="space-y-24">
              {futureGoals.map((goal, index) => {
                const isEven = index % 2 === 0;
                const Icon = goal.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className={`flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className="flex-1 md:text-right pl-16 md:pl-0 md:pr-16 w-full">
                      {isEven && (
                        <div className="md:text-right text-left">
                          <span className="text-6xl font-bold text-[#1FB6FF]/30 absolute -mt-12 right-12 md:static select-none">{goal.year}</span>
                          <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{goal.year} Milestone</h3>
                          <p className="text-[#8892b0] text-lg relative z-10">{goal.goal}</p>
                        </div>
                      )}
                      {!isEven && (
                        <div className="hidden md:block">
                          {/* Spacer for layout */}
                        </div>
                      )}
                    </div>

                    <div className="absolute left-0 md:left-1/2 w-12 h-12 rounded-full bg-[#0B2340] border-4 border-[#1FB6FF] z-10 flex items-center justify-center md:-translate-x-1/2 shadow-[0_0_20px_rgba(31,182,255,0.4)]">
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1 pl-16 md:pl-16 w-full mt-4 md:mt-0">
                      {!isEven && (
                        <div>
                          <span className="text-6xl font-bold text-[#1FB6FF]/30 absolute -mt-12 left-12 md:static select-none">{goal.year}</span>
                          <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{goal.year} Milestone</h3>
                          <p className="text-[#8892b0] text-lg relative z-10">{goal.goal}</p>
                        </div>
                      )}
                      {isEven && (
                        <div className="hidden md:block">
                          {/* Spacer for layout */}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Impact / CTA Section */}
      <section className="relative z-10 py-32 px-6 md:px-12 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8"
          >
            <Eye className="w-8 h-8 text-[#1FB6FF]" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">See the Future. <br /><span className="text-[#7C4DFF]">Be the Future.</span></h2>
          <p className="text-xl text-[#8892b0] mb-12 max-w-2xl mx-auto">
            Join a community that is reshaping the landscape of research and statistical analysis in South Asia.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link to="/courses" className="px-10 py-4 bg-[#1FB6FF] hover:bg-[#1a9cdb] text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-[0_10px_30px_rgba(31,182,255,0.3)]">
              Start Learning
            </Link>
            <Link to="/contact" className="px-10 py-4 bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-full font-bold text-lg transition-all">
              Partner With Us
            </Link>
          </div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </section>

    </div>
  );
}

function QuoteIcon({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 11H6C5.46957 11 4.96086 11.2107 4.58579 11.5858C4.21071 11.9609 4 12.4696 4 13V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H10C10.5304 21 11.0391 20.7893 11.4142 20.4142C11.7893 20.0391 12 19.5304 12 19V13C12 12.4696 11.7893 11.9609 11.4142 11.5858C11.0391 11.2107 10.5304 11 10 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 11H16C15.4696 11 14.9609 11.2107 14.5858 11.5858C14.2107 11.9609 14 12.4696 14 13V19C14 19.5304 14.2107 20.0391 14.5858 20.4142C14.9609 20.7893 15.4696 21 16 21H20C20.5304 21 21.0391 20.7893 21.4142 20.4142C21.7893 20.0391 22 19.5304 22 19V13C22 12.4696 21.7893 11.9609 21.4142 11.5858C21.0391 11.2107 20.5304 11 20 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 13V11C4 8 7 3 12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 13V11C14 8 17 3 22 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
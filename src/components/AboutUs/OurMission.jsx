import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Users, Brain, Zap, TrendingUp, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import missionCollabImage from '../../assets/images/birst_mission_collaboration.png';

// Premium Raising Effect Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] // Custom refined ease-out
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export default function OurMission() {
  return (
    <div className="min-h-screen bg-[#fffff0] text-[#0B2340] font-sans selection:bg-[#1FB6FF] selection:text-white overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <motion.section
        className="relative pt-32 pb-24 px-6 border-b border-[#0B2340]/10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-[#0B2340]/60 hover:text-[#1FB6FF] transition-colors mb-12 group text-sm font-bold tracking-widest uppercase"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to About
          </Link>

          <div className="max-w-5xl">
            <motion.div
              variants={fadeInUp}
              className="inline-block px-4 py-1.5 rounded-full border border-[#1FB6FF] text-[#1FB6FF] text-xs font-bold uppercase tracking-widest mb-8"
            >
              Official Mission Statement
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-black leading-[1.1] mb-10 text-[#0B2340]"
              style={{ fontFamily: 'var(--font-family-helvetica-rounded)' }}
            >
              Empowering the next generation of <span className="text-[#1FB6FF]">impactful researchers.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-[#0B2340]/70 leading-relaxed max-w-4xl border-l-4 border-[#1FB6FF] pl-8"
            >
              At Bangladesh Institute for Research and Statistical Training (BIRST), our mission is to empower students, researchers, and professionals with strong foundations in statistics, research methodology, and data-driven thinking—so they can produce high-quality, ethical, and impactful research.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* --- METHODOLOGY --- */}
      <motion.section
        className="py-24 px-6 border-b border-[#0B2340]/10 bg-white/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeInUp} className="order-2 lg:order-1 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#0B2340]/5 relative flex items-center justify-center shadow-lg border border-[#0B2340]/5">
              <img
                src={missionCollabImage}
                alt="Research Collaboration"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B2340]/20 to-transparent pointer-events-none" />
            </div>
            {/* Decorative brand line */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#1FB6FF]/20 rounded-2xl -z-10" />
          </motion.div>

          <motion.div variants={staggerContainer} className="order-1 lg:order-2">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-black mb-6 text-[#0B2340]" style={{ fontFamily: 'var(--font-family-helvetica-rounded)' }}>
              Bridging Theory & Practice
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-[#0B2340]/70 leading-relaxed mb-8">
              We are committed to bridging theory and practice through structured seminars, hands-on training, and mentorship led by experienced teachers, professors, and domain experts. By integrating modern statistical techniques and AI-assisted research tools, BIRST helps learners move confidently from research idea to publication-ready outcomes.
            </motion.p>
            <div className="grid grid-cols-2 gap-6">
              <motion.div variants={fadeInUp} className="p-6 bg-white border border-[#0B2340]/5 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-default">
                <div className="text-3xl font-bold text-[#1FB6FF] mb-1 group-hover:scale-110 transition-transform origin-left">Expert-Led</div>
                <div className="text-sm text-[#0B2340]/60 font-medium uppercase tracking-wider">Mentorship</div>
              </motion.div>
              <motion.div variants={fadeInUp} className="p-6 bg-white border border-[#0B2340]/5 rounded-xl shadow-sm hover:shadow-md transition-shadow group cursor-default">
                <div className="text-3xl font-bold text-[#1FB6FF] mb-1 group-hover:scale-110 transition-transform origin-left">AI-Powered</div>
                <div className="text-sm text-[#0B2340]/60 font-medium uppercase tracking-wider">Tools</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- WHAT WE STAND FOR (5 Points) --- */}
      <motion.section
        className="py-32 px-6 bg-[#fffff0]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#0B2340]" style={{ fontFamily: 'var(--font-family-helvetica-rounded)' }}>
              What We Stand For
            </h2>
            <div className="w-24 h-1.5 bg-[#1FB6FF] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Research Excellence",
                icon: BookOpen,
                desc: "Promote rigorous methodology, transparent analysis, and reproducible research standards."
              },
              {
                title: "Statistical Literacy",
                icon: TrendingUp,
                desc: "Build practical skills in statistics, data analysis, and interpretation for real-world research problems."
              },
              {
                title: "AI for Research",
                icon: Brain,
                desc: "Provide accessible AI tools for literature review, methodology support, data analysis, and manuscript improvement—used responsibly and ethically."
              },
              {
                title: "Learning by Doing",
                icon: Zap,
                desc: "Offer workshops, seminars, and guided sessions where learners actively practice what they learn."
              },
              {
                title: "Inclusive Growth",
                icon: Users,
                desc: "Create opportunities for students at all levels to track progress, showcase achievements, and grow as confident researchers."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl border border-[#0B2340]/5 hover:border-[#1FB6FF] hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-[#1FB6FF]/10 text-[#1FB6FF] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1FB6FF] group-hover:text-white transition-colors">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B2340] mb-4 group-hover:text-[#1FB6FF] transition-colors">{item.title}</h3>
                <p className="text-[#0B2340]/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- OUR IMPACT --- */}
      <motion.section
        className="py-24 px-6 bg-[#0B2340] text-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white/80 text-xs font-bold uppercase tracking-widest mb-8">
            <CheckCircle2 className="w-4 h-4 text-[#1FB6FF]" />
            <span>Real World Outcomes</span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black mb-8" style={{ fontFamily: 'var(--font-family-helvetica-rounded)' }}>
            Our Impact
          </motion.h2>

          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12">
            Through continuous training programs, expert-led seminars, and a supportive digital platform, BIRST aims to inspire a new generation of researchers in Bangladesh—equipped with the skills, confidence, and integrity needed to contribute meaningfully to academia, policy, and industry.
          </motion.p>

          <motion.div variants={fadeInUp} className="h-px w-full max-w-lg bg-gradient-to-r from-transparent via-[#1FB6FF] to-transparent mx-auto opacity-50" />
        </div>
      </motion.section>

      {/* --- CLOSING / CTA --- */}
      <motion.section
        className="py-32 px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-[#0B2340] mb-8" style={{ fontFamily: 'var(--font-family-helvetica-rounded)' }}>
            From Curiosity <br />
            <span className="text-[#1FB6FF]">to Competence.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-[#0B2340]/60 mb-12 font-medium">BIRST exists to turn curiosity into competence—and research into impact.</motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/courses" className="px-10 py-4 bg-[#1FB6FF] text-white rounded-full font-bold text-lg hover:bg-[#0B2340] transition-colors shadow-lg shadow-blue-500/20 group flex items-center gap-2">
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/contact" className="px-10 py-4 bg-transparent border-2 border-[#0B2340]/10 text-[#0B2340] rounded-full font-bold text-lg hover:border-[#0B2340] transition-colors">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
}
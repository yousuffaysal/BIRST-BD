import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  FileText,
  Users,
  Database,
  TrendingUp,
  ArrowRight,
  Target,
  Lightbulb,
  CheckCircle2,
  Zap,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Components ---

const ServiceCard = ({ service, index, activeIndex, setActiveIndex }) => {
  const isActive = activeIndex === index;

  return (
    <motion.div
      className={`relative overflow-hidden transition-all duration-500 ease-out cursor-pointer group ${isActive ? 'flex-[3]' : 'flex-[1]'} h-[500px] border-r border-gray-100 last:border-r-0`}
      onMouseEnter={() => setActiveIndex(index)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Background Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${isActive ? 'from-gray-50/50 to-white' : 'from-white to-gray-50'} transition-colors duration-500`} />

      <div className="relative h-full p-8 flex flex-col justify-between z-10">
        {/* Top: Icon & Number */}
        <div className="flex justify-between items-start">
          <div className={`p-4 rounded-2xl ${isActive ? 'bg-[#1FB6FF] text-white shadow-xl shadow-blue-200' : 'bg-gray-100/50 text-gray-400'} transition-all duration-500`}>
            <service.icon className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <span className="text-4xl font-black text-gray-100 select-none">0{index + 1}</span>
        </div>

        {/* Bottom: Content */}
        <div className="space-y-4">
          <h3 className={`text-2xl font-bold leading-tight ${isActive ? 'text-gray-900' : 'text-gray-400'} transition-colors duration-300`}>
            <span className={!isActive ? 'line-clamp-2' : ''}>{service.title}</span>
          </h3>

          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (i * 0.05) }}
                      className="flex items-center gap-3 text-sm font-medium text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1FB6FF]" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <button className="group flex items-center gap-2 text-[#1FB6FF] font-bold text-sm tracking-wide uppercase">
                  Explore Service
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const StatCounter = ({ label, value, suffix = "+" }) => (
  <div className="px-8 py-6 border-l border-gray-100 first:border-l-0">
    <h4 className="text-4xl md:text-5xl font-black text-[#1FB6FF] mb-2">{value}{suffix}</h4>
    <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">{label}</p>
  </div>
);

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: BarChart3,
      title: 'Statistical Data Analysis',
      description: 'Expert-led analysis using advanced methodologies. We transform raw numbers into strategic insights.',
      features: ['Inferential statistics', 'Multivariate modeling', 'Time series forecasting'],
    },
    {
      icon: Database,
      title: 'Data Collection & Management',
      description: 'End-to-end data lifecycle management securely handled from acquisition to validation.',
      features: ['Survey engineering', 'Quality assurance', 'Secure warehousing'],
    },
    {
      icon: FileText,
      title: 'Research & Publication',
      description: 'Comprehensive support for high-impact academic and business research publication.',
      features: ['Manuscript preparation', 'Peer-review guidance', 'Grant proposals'],
    },
    {
      icon: Users,
      title: 'Training & Workshops',
      description: 'Upskill your team with tailored programs on modern analytical tools and statistical software.',
      features: ['Corporate training', 'SPSS/R/Python workshops', 'Research methods'],
    },
    {
      icon: TrendingUp,
      title: 'Business Intelligence',
      description: 'Data-driven decision making frameworks designed to optimize your operational performance.',
      features: ['Custom dashboards', 'KPI tracking', 'Market intelligence'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffff0] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-bl from-blue-50/50 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="h-[1px] w-8 bg-[#1FB6FF]" />
                <span className="text-[#1FB6FF] font-bold uppercase tracking-widest text-xs">Our Expertise</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
                Data driven <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FB6FF] to-blue-600">solutions.</span>
              </h1>

              <p className="text-xl text-gray-500 max-w-lg leading-relaxed mb-10">
                We bridge the gap between complex data and actionable strategy through rigorous analysis and innovative research methods.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="relative px-8 py-4 bg-black !text-white font-bold rounded-full overflow-hidden group shadow-xl shadow-gray-200/50 min-w-[220px] text-center flex items-center justify-center">
                  <span className="absolute inset-0 w-full h-full bg-[#1FB6FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                  <span className="relative z-10 text-white">Get a Consultation</span>
                </Link>
                <Link to="/courses" className="px-8 py-4 bg-[#1FB6FF] text-white font-bold border border-[#1FB6FF] rounded-full hover:bg-blue-600 transition-colors shadow-lg shadow-blue-200/50 min-w-[220px] text-center flex items-center justify-center">
                  Explore Courses
                </Link>
              </div>
            </motion.div>

            {/* Visual Abstract / Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="bg-[#fffff0] p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 max-w-md ml-auto relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-[#1FB6FF]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Impact Radius</h3>
                    <p className="text-sm text-gray-400">Monthly Growth</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {[92, 78, 95].map((val, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-gray-500">
                        <span>Relevant 0{i + 1}</span>
                        <span>{val}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                          className="h-full bg-[#1FB6FF]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-10 -right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 right-20 w-56 h-56 bg-purple-400/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SERVICES INTERACTIVE LIST --- */}
      <section className="py-24 bg-[#ffffff] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Core Capabilities</h2>
            <div className="h-1 w-24 bg-[#1FB6FF]" />
          </div>

          {/* Desktop Horizontal Accordion */}
          <div className="hidden lg:flex w-full bg-[#fffff0] shadow-xl shadow-gray-200/40 rounded-3xl overflow-hidden border border-gray-100">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                activeIndex={activeService}
                setActiveIndex={setActiveService}
              />
            ))}
          </div>

          {/* Mobile Vertical List */}
          <div className="grid md:grid-cols-2 gap-6 lg:hidden">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6 text-[#1FB6FF]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                      <CheckCircle2 className="w-3 h-3 text-[#1FB6FF]" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMPREHENSIVE SERVICE GRID (Deep Dive) --- */}
      <section className="py-24 bg-[#fffff0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-6">Comprehensive Service Suite</h2>
            <p className="text-xl text-gray-500">
              Beyond core analysis, we offer specialized support tailored to every stage of your academic and professional journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Grant & Proposal Writing",
                desc: "Securing funding with compelling narratives backed by robust data strategies.",
                tags: ["Funding Strategy", "Budget Designs", "Technical Review"]
              },
              {
                title: "Thesis & Dissertation Defense",
                desc: "Rigorous preparation for your final defense, including mock sessions and slide deck optimization.",
                tags: ["Mock Defense", "Slide Design", "Q&A Prep"]
              },
              {
                title: "Questionnaire & Scale Development",
                desc: "Designing valid and reliable instruments for complex social and behavioral research.",
                tags: ["Psychometrics", "Pilot Testing", "Validation"]
              },
              {
                title: "Qualitative Coding (NVivo/Atlas.ti)",
                desc: "Thematic analysis and coding services for interview transcripts and focus group data.",
                tags: ["Thematic Analysis", "Content Analysis", "Transcription"]
              },
              {
                title: "Systematic Literature Reviews",
                desc: "Protocol-driven search, screening, and synthesis for high-evidence publications.",
                tags: ["PRISMA Guidelines", "Meta-Analysis", "Review Protocols"]
              },
              {
                title: "Corporate Data Strategy",
                desc: "Building the infrastructure and culture for data-driven decision making in your organization.",
                tags: ["Data Governance", "Infrastructure", "Team Training"]
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#ffffff] rounded-2xl p-8 hover:bg-blue-50 transition-colors duration-300 group border border-gray-100 hover:border-blue-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-[#1FB6FF]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#1FB6FF] transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, t) => (
                    <span key={t} className="px-3 py-1 bg-white text-xs font-bold text-gray-600 rounded-full border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COLLABORATIVE SKILL MODEL --- */}
      <section className="py-32 bg-[#001E2B] text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#1FB6FF] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left: Explanation */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-[1px] w-12 bg-[#1FB6FF]" />
                <span className="text-[#1FB6FF] font-bold uppercase tracking-widest text-xs">Holistic Growth Model</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                Building skills through <br />
                <span className="text-[#1FB6FF]">active collaboration.</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                We don't just teach tools; we cultivate researchers. Our unique "Collaborative Learning Ecosystem" immerses you in real-world projects, fostering skills that go beyond the classroom.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Peer-to-Peer Feedback Loops",
                    desc: "Engage in structured critique sessions where diverse perspectives sharpen your analytical reasoning."
                  },
                  {
                    title: "Live Project Immersion",
                    desc: "Work on actual datasets and research problems, not sanitary textbook examples."
                  },
                  {
                    title: "Cross-Disciplinary Mentorship",
                    desc: "Learn from statisticians, domain experts, and industry leaders in a unified environment."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 bg-white/5">
                      <CheckCircle2 className="w-5 h-5 text-[#1FB6FF]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed max-w-md">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual Model */}
            <div className="relative">
              {/* Central Hub */}
              <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#1FB6FF] rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                  <Users className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-6">The Collaborative Cycle</h3>
                <div className="space-y-4">
                  {["Concept Phase", "Data Strategy", "Analysis execution", "Review & Refine"].map((step, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                      <span className="text-[#1FB6FF] font-bold text-sm">0{i + 1}</span>
                      <span className="font-bold text-gray-200">{step}</span>
                      <div className="ml-auto w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_theme(colors.green.400)]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Connecting Nodes (Decorative) */}
              <div className="absolute top-1/2 left-[-50px] w-[50px] h-[1px] bg-gradient-to-r from-transparent to-white/20" />
              <div className="absolute bottom-[-30px] right-10 w-[1px] h-[30px] bg-gradient-to-b from-white/20 to-transparent" />
            </div>

          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-[#fffff0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 bg-[#fffff0]">
            <StatCounter label="Projects Completed" value="350" />
            <StatCounter label="Client Satisfaction" value="98" suffix="%" />
            <StatCounter label="Team Experts" value="45" />
            <StatCounter label="Publications" value="120" />
          </div>
        </div>
      </section>

      {/* --- PROCESS MARQUEE --- */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 flex justify-between items-end">
          <div>
            <span className="text-[#1FB6FF] font-bold uppercase tracking-widest text-xs block mb-2">Methodology</span>
            <h2 className="text-4xl font-black text-gray-900">How We Work</h2>
          </div>
          <p className="text-gray-400 text-sm hidden sm:block">Scroll right to explore</p>
        </div>

        <div className="flex gap-8 px-4 sm:px-6 overflow-x-auto pb-8 snap-x no-scrollbar">
          {[
            { step: "01", title: "Discovery", desc: "Understanding your core objectives and data landscape." },
            { step: "02", title: "Strategy", desc: "Designing a rigorous analytical framework tailored to your needs." },
            { step: "03", title: "Execution", desc: "Deploying advanced tools to gather and process data." },
            { step: "04", title: "Analysis", desc: "Uncovering patterns and validating hypotheses." },
            { step: "05", title: "Delivery", desc: "Presenting actionable insights and strategic recommendations." }
          ].map((item, i) => (
            <div key={i} className="min-w-[300px] flex-shrink-0 snap-center">
              <div className="border-t-2 border-gray-100 pt-6 group hover:border-[#1FB6FF] transition-colors duration-300">
                <span className="text-6xl font-black text-gray-100 mb-6 block group-hover:text-blue-50 transition-colors duration-300">{item.step}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MAGNETIC CTA --- */}
      <section className="py-24 bg-[#0F172A] text-white relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.600),theme(colors.slate.900))] opacity-40" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white/5 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">Ready to elevate your research?</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Transform uncertainty into strategy with our expert data solutions.
          </p>
          <button className="px-10 py-5 bg-[#1FB6FF] text-white font-bold text-lg rounded-full hover:bg-blue-500 transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
            Start Your Project
          </button>
        </div>
      </section>

    </div>
  );
}
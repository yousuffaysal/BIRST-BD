import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, FileText, Database, TrendingUp, Users, Lightbulb, Library, Globe, Target, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useSpring, useTransform, useInView, useScroll } from 'framer-motion';
import ResearchGuidance from '../components/Research/ResearchGuidance.jsx';
import ResearchLibrary from '../components/Research/ResearchLibrary.jsx';
import FieldGuides from '../components/Research/FieldGuides.jsx';
import Publications from '../components/Research/Publications.jsx';
import ResearchTools from '../components/Research/ResearchTools.jsx';
import MethodologyGuide from '../components/Research/MethodologyGuide.jsx';

export default function ResearchAndPublication() {
  const [activeTab, setActiveTab] = useState('guidance');

  const tabs = [
    { id: 'guidance', label: 'Research Guidance', icon: Lightbulb },
    { id: 'library', label: 'Resource Library', icon: Library },
    { id: 'fields', label: 'Field Guides', icon: Target },
    { id: 'publications', label: 'Publications', icon: FileText },
    { id: 'tools', label: 'Research Tools', icon: Database },
    { id: 'methodology', label: 'Methodology', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 bg-[#0F172A] overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-blue-900/20 to-transparent -z-10 pointer-events-none" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10 animate-pulse" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3 h-3" />
              <span>Knowledge Hub</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
              Research & <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FB6FF] to-blue-400">Publication Center</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Comprehensive guidance, cutting-edge tools, and a vast library of resources to support your journey from hypothesis to high-impact publication.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- NAVIGATION TABS --- */}
      <section className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto scrollbar-hide py-2 gap-2 md:gap-4 md:justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap outline-none
                    ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#1FB6FF] rounded-full shadow-lg shadow-blue-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CONTENT AREA --- */}
      <section className="max-w-7xl mx-auto py-10 md:py-16 px-4 sm:px-6 min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'guidance' && <ResearchGuidance />}
            {activeTab === 'library' && <ResearchLibrary />}
            {activeTab === 'fields' && <FieldGuides />}
            {activeTab === 'publications' && <Publications />}
            {activeTab === 'tools' && <ResearchTools />}
            {activeTab === 'methodology' && <MethodologyGuide />}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-white border-t border-gray-100 py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-black text-center text-gray-900 mb-16"
          >
            Our Research Ecosystem
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Resources', value: 1000, suffix: '+', icon: BookOpen },
              { label: 'Publications', value: 500, suffix: '+', icon: FileText },
              { label: 'Active Researchers', value: 2500, suffix: '+', icon: Users },
              { label: 'Field Guides', value: 50, suffix: '+', icon: Globe },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#1FB6FF] transition-all duration-300 shadow-sm group-hover:shadow-blue-200">
                    <Icon className="w-8 h-8 text-[#1FB6FF] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div className="text-4xl font-black text-gray-900 mb-2 flex justify-center items-center">
                    <CountingNumber value={stat.value} />
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section >
    </div >
  );
}

function CountingNumber({ value }) {
  const { scrollYProgress } = useScroll(); // Actually we need a different approach for in-view trigger
  // Better approach: use spring + useEffect with inView
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { bounce: 0, duration: 2000 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
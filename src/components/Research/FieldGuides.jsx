import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FlaskConical, Microscope, Calculator, GraduationCap, Stethoscope, Leaf, Code, Building2, Brain, X, Sparkles, Clock } from 'lucide-react';

export default function FieldGuides() {
  const [selectedField, setSelectedField] = useState(null);

  const handleExplore = (field) => {
    setSelectedField(field);
  };

  const closePopup = () => {
    setSelectedField(null);
  };

  const fieldGuides = [
    {
      field: 'Natural Sciences',
      icon: FlaskConical,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      description: 'Comprehensive guides for biology, chemistry, physics, and environmental science research.',
      topics: ['Experimental Design', 'Laboratory Safety', 'Data Collection', 'Statistical Analysis'],
      resources: 45,
    },
    {
      field: 'Medical & Health Sciences',
      icon: Stethoscope,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
      description: 'Research methodologies for clinical trials, medical studies, and public health research.',
      topics: ['Clinical Trials', 'Epidemiology', 'Biostatistics', 'Medical Ethics'],
      resources: 52,
    },
    {
      field: 'Social Sciences',
      icon: GraduationCap,
      bgColor: 'bg-sky-100',
      textColor: 'text-sky-600',
      description: 'Guide for psychology, sociology, anthropology, and political science research.',
      topics: ['Surveys & Interviews', 'Qualitative Analysis', 'Ethnography', 'Case Studies'],
      resources: 38,
    },
    {
      field: 'Technology & Engineering',
      icon: Code,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      description: 'Research approaches for computer science, software engineering, and technology innovation.',
      topics: ['Experimental Design', 'Prototyping', 'User Studies', 'Algorithm Analysis'],
      resources: 41,
    },
    {
      field: 'Business & Economics',
      icon: Building2,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      description: 'Research methods for business studies, economics, finance, and management.',
      topics: ['Market Research', 'Econometric Analysis', 'Case Studies', 'Quantitative Methods'],
      resources: 35,
    },
    {
      field: 'Mathematics & Statistics',
      icon: Calculator,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      description: 'Mathematical research methodologies, statistical analysis, and computational methods.',
      topics: ['Theoretical Proofs', 'Computational Methods', 'Statistical Modeling', 'Data Science'],
      resources: 28,
    },
    {
      field: 'Agricultural Sciences',
      icon: Leaf,
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-600',
      description: 'Research methods for agriculture, forestry, fisheries, and agricultural economics.',
      topics: ['Field Experiments', 'Crop Research', 'Livestock Studies', 'Sustainability'],
      resources: 22,
    },
    {
      field: 'Cognitive Sciences',
      icon: Brain,
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600',
      description: 'Research in neuroscience, cognitive psychology, and brain-computer interfaces.',
      topics: ['Neuroimaging', 'Behavioral Studies', 'Cognitive Testing', 'Brain Analysis'],
      resources: 31,
    },
  ];

  return (
    <div className="space-y-8 relative">
      {/* Introduction */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-['Unbounded']">Field-Specific Research Guides</h2>
        <p className="text-lg text-gray-700 leading-relaxed font-['Plus_Jakarta_Sans']">
          Different research fields require specialized approaches and methodologies. Explore our comprehensive guides tailored to various disciplines, each providing field-specific strategies, resources, and best practices.
        </p>
      </div>

      {/* Field Guides Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fieldGuides.map((guide, index) => {
          const Icon = guide.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-t-4 border-blue-500 group cursor-pointer"
            >
              <div className={`w-14 h-14 ${guide.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-7 h-7 ${guide.textColor}`} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Unbounded']">{guide.field}</h3>
              <p className="text-gray-600 text-sm mb-4 font-['Plus_Jakarta_Sans']">{guide.description}</p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2 font-['Unbounded'] uppercase tracking-wider">KEY TOPICS:</p>
                <div className="flex flex-wrap gap-2">
                  {guide.topics.map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-['Plus_Jakarta_Sans'] font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600 font-['Plus_Jakarta_Sans']">
                  <span className="font-bold text-blue-600">{guide.resources}</span> resources
                </span>
                <button
                  onClick={() => handleExplore(guide)}
                  className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all font-['Unbounded']"
                >
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Getting Started Section */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-600 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 -mr-8 -mt-8 bg-white/10 rounded-full blur-3xl"></div>
        <h3 className="text-2xl font-bold mb-4 font-['Unbounded'] relative z-10">New to Research in Your Field?</h3>
        <p className="mb-6 text-blue-100 font-['Plus_Jakarta_Sans'] relative z-10">
          Get started with our beginner-friendly guides that walk you through the fundamentals of conducting research in your specific field.
        </p>
        <div className="grid md:grid-cols-3 gap-4 relative z-10">
          {[
            'Step-by-step tutorials',
            'Common pitfalls to avoid',
            'Essential tools and software',
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 font-['Plus_Jakarta_Sans'] font-medium">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Modal Popup */}
      <AnimatePresence>
        {selectedField && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-[8px] p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[380px] aspect-square bg-[#0F172A] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            >
              {/* Background Decoration */}
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-blue-500/20 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-purple-500/20 rounded-full blur-[80px]"></div>

              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white z-10 group"
              >
                <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-center items-center px-6 py-6 text-center relative z-10">

                {/* Compact Icon */}
                <div className="relative mb-4">
                  <div className={`absolute inset-0 ${selectedField.bgColor.replace('100', '400')} opacity-30 blur-xl rounded-full animate-pulse`}></div>
                  <div className={`relative w-16 h-16 ${selectedField.bgColor} rounded-2xl flex items-center justify-center transform rotate-3 shadow-lg`}>
                    <selectedField.icon className={`w-7 h-7 ${selectedField.textColor}`} />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg scale-75 animate-bounce">
                    <Sparkles className="w-4 h-4 text-yellow-500 fill-current" />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xl font-bold text-white mb-2 font-['Unbounded'] tracking-tight leading-tight px-4">
                    {selectedField.field}
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3 w-full"
                >
                  <p className="text-slate-300 text-sm font-['Plus_Jakarta_Sans'] leading-snug px-2">
                    We're crafting the ultimate guide.
                  </p>

                  <div className="bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-sm mx-auto w-full max-w-[260px]">
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-['Plus_Jakarta_Sans']">
                      <Clock size={14} className="text-blue-400" />
                      <span>Launch: <span className="text-white font-semibold">Coming Week</span></span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-5 w-full"
                >
                  <button
                    onClick={closePopup}
                    className="bg-white text-[#0F172A] w-full max-w-[200px] py-2.5 rounded-lg font-bold text-sm font-['Unbounded'] hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] mx-auto block"
                  >
                    Notify Me
                  </button>
                  <p className="text-slate-500 text-[10px] font-['Plus_Jakarta_Sans'] mt-2">
                    Join <span className="text-white font-bold">{selectedField.resources}</span> others waiting
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
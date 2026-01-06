import React from 'react';
import { ArrowRight, FlaskConical, Microscope, Calculator, GraduationCap, Stethoscope, Leaf, Code, Building2, Brain } from 'lucide-react';

export default function FieldGuides() {
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
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Field-Specific Research Guides</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
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

              <h3 className="text-xl font-bold text-gray-900 mb-2">{guide.field}</h3>
              <p className="text-gray-600 text-sm mb-4">{guide.description}</p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">KEY TOPICS:</p>
                <div className="flex flex-wrap gap-2">
                  {guide.topics.map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">
                  <span className="font-bold text-blue-600">{guide.resources}</span> resources
                </span>
                <button className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Getting Started Section */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-600 rounded-2xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">New to Research in Your Field?</h3>
        <p className="mb-6 text-blue-100">
          Get started with our beginner-friendly guides that walk you through the fundamentals of conducting research in your specific field.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            'Step-by-step tutorials',
            'Common pitfalls to avoid',
            'Essential tools and software',
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
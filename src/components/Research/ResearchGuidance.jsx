import React from 'react';
import { CheckCircle, ArrowRight, Book, FileText, Lightbulb, Target } from 'lucide-react';

export default function ResearchGuidance() {
  const guideSteps = [
    {
      step: 1,
      title: 'Define Your Research Question',
      description: 'Start with a clear, focused research question that addresses a specific problem or gap in knowledge.',
      tips: [
        'Ensure your question is specific and measurable',
        'Consider the scope and feasibility',
        'Review existing literature to identify gaps',
      ],
    },
    {
      step: 2,
      title: 'Conduct Literature Review',
      description: 'Thoroughly review existing research to understand current knowledge and identify research gaps.',
      tips: [
        'Use academic databases (Google Scholar, PubMed, etc.)',
        'Organize findings using citation management tools',
        'Critically analyze and synthesize findings',
      ],
    },
    {
      step: 3,
      title: 'Choose Research Methodology',
      description: 'Select appropriate research methods that align with your research question and objectives.',
      tips: [
        'Quantitative: Surveys, experiments, statistical analysis',
        'Qualitative: Interviews, case studies, content analysis',
        'Mixed Methods: Combining both approaches',
      ],
    },
    {
      step: 4,
      title: 'Design Your Study',
      description: 'Create a detailed research design including sample selection, data collection methods, and ethical considerations.',
      tips: [
        'Define your target population and sampling strategy',
        'Plan data collection procedures',
        'Obtain necessary ethical approvals',
      ],
    },
    {
      step: 5,
      title: 'Collect and Analyze Data',
      description: 'Execute your research plan, collect data systematically, and analyze using appropriate statistical or qualitative methods.',
      tips: [
        'Maintain data quality and integrity',
        'Use appropriate analytical software',
        'Document all procedures and decisions',
      ],
    },
    {
      step: 6,
      title: 'Interpret and Report Findings',
      description: 'Interpret your results, discuss implications, and prepare publications or reports.',
      tips: [
        'Present findings clearly and objectively',
        'Discuss limitations and future directions',
        'Write for your target audience',
      ],
    },
  ];

  const resources = [
    {
      title: 'Research Ethics',
      description: 'Guidelines for ethical research conduct',
      icon: CheckCircle,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: 'Writing Guide',
      description: 'How to write effective research papers',
      icon: FileText,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: 'Citation Standards',
      description: 'APA, MLA, and Chicago style guides',
      icon: Book,
      bgColor: 'bg-sky-100',
      textColor: 'text-sky-600',
    },
    {
      title: 'Peer Review',
      description: 'Understanding the peer review process',
      icon: Target,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Introduction */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-50">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Research Guidance</h2>
            <p className="text-gray-500">Step-by-step guidance for conducting research</p>
          </div>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed">
          Whether you're a beginner researcher or an experienced academic, our comprehensive guide will help you navigate the research process from conception to publication. Follow these structured steps to ensure your research is rigorous, ethical, and impactful.
        </p>
      </div>

      {/* Research Steps */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-gray-900">Research Process Steps</h3>
        {guideSteps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all border-l-4 border-blue-500 group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <span className="text-xl font-bold text-blue-600">{step.step}</span>
              </div>
              <div className="flex-grow">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {step.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-gray-500">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Resources */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Resources</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer group border border-gray-100 hover:border-blue-100"
              >
                <div className={`w-12 h-12 ${resource.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${resource.textColor}`} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h4>
                <p className="text-gray-500 text-sm mb-4">{resource.description}</p>
                <button className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
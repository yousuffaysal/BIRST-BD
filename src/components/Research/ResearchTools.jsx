import React from 'react';
import { ExternalLink, Database, BarChart3, FileSpreadsheet, Code2, BookOpen, Calculator, Search } from 'lucide-react';

export default function ResearchTools() {
  const toolCategories = [
    {
      category: 'Data Analysis',
      icon: BarChart3,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      tools: [
        {
          name: 'SPSS',
          description: 'Statistical Package for the Social Sciences',
          link: 'https://www.ibm.com/spss',
          free: false,
        },
        {
          name: 'R Studio',
          description: 'Open-source statistical computing environment',
          link: 'https://www.rstudio.com',
          free: true,
        },
        {
          name: 'Python (Pandas, NumPy)',
          description: 'Data analysis and statistical computing libraries',
          link: 'https://www.python.org',
          free: true,
        },
        {
          name: 'STATA',
          description: 'Statistical software for data analysis',
          link: 'https://www.stata.com',
          free: false,
        },
      ],
    },
    {
      category: 'Literature & Reference',
      icon: BookOpen,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      tools: [
        {
          name: 'Zotero',
          description: 'Free citation management software',
          link: 'https://www.zotero.org',
          free: true,
        },
        {
          name: 'Mendeley',
          description: 'Reference manager and academic social network',
          link: 'https://www.mendeley.com',
          free: true,
        },
        {
          name: 'EndNote',
          description: 'Citation management and bibliography creation',
          link: 'https://endnote.com',
          free: false,
        },
        {
          name: 'Google Scholar',
          description: 'Search engine for scholarly literature',
          link: 'https://scholar.google.com',
          free: true,
        },
      ],
    },
    {
      category: 'Survey & Data Collection',
      icon: Database,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      tools: [
        {
          name: 'Google Forms',
          description: 'Create surveys and forms',
          link: 'https://www.google.com/forms',
          free: true,
        },
        {
          name: 'SurveyMonkey',
          description: 'Online survey platform',
          link: 'https://www.surveymonkey.com',
          free: true,
        },
        {
          name: 'Qualtrics',
          description: 'Advanced survey and research platform',
          link: 'https://www.qualtrics.com',
          free: false,
        },
        {
          name: 'REDCap',
          description: 'Research data collection platform',
          link: 'https://www.project-redcap.org',
          free: true,
        },
      ],
    },
    {
      category: 'Writing & Documentation',
      icon: FileSpreadsheet,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
      tools: [
        {
          name: 'LaTeX',
          description: 'Document preparation system for scientific writing',
          link: 'https://www.latex-project.org',
          free: true,
        },
        {
          name: 'Overleaf',
          description: 'Online LaTeX editor',
          link: 'https://www.overleaf.com',
          free: true,
        },
        {
          name: 'Grammarly',
          description: 'Writing assistance and grammar checker',
          link: 'https://www.grammarly.com',
          free: true,
        },
        {
          name: 'Hemingway Editor',
          description: 'Writing editor for clarity and style',
          link: 'https://hemingwayapp.com',
          free: true,
        },
      ],
    },
    {
      category: 'Statistical Calculators',
      icon: Calculator,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
      tools: [
        {
          name: 'G*Power',
          description: 'Statistical power analysis calculator',
          link: 'https://www.psychologie.hhu.de/gpower',
          free: true,
        },
        {
          name: 'Sample Size Calculator',
          description: 'Various online sample size calculators',
          link: '#',
          free: true,
        },
        {
          name: 'Effect Size Calculator',
          description: 'Calculate effect sizes and confidence intervals',
          link: '#',
          free: true,
        },
      ],
    },
    {
      category: 'Data Visualization',
      icon: BarChart3,
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
      tools: [
        {
          name: 'Tableau',
          description: 'Data visualization and business intelligence',
          link: 'https://www.tableau.com',
          free: false,
        },
        {
          name: 'Power BI',
          description: 'Microsoft business analytics tool',
          link: 'https://powerbi.microsoft.com',
          free: true,
        },
        {
          name: 'D3.js',
          description: 'JavaScript library for data visualization',
          link: 'https://d3js.org',
          free: true,
        },
        {
          name: 'Matplotlib/Seaborn',
          description: 'Python visualization libraries',
          link: 'https://matplotlib.org',
          free: true,
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <Database className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Research Tools & Software</h2>
            <p className="text-gray-600">Essential tools for conducting and managing research</p>
          </div>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          Discover a curated collection of software, platforms, and tools that can enhance your research workflow. From data analysis to citation management, find the right tools for your research needs.
        </p>
      </div>

      {/* Tool Categories */}
      {toolCategories.map((category, categoryIndex) => {
        const Icon = category.icon;
        return (
          <div key={categoryIndex} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${category.textColor}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {category.tools.map((tool, toolIndex) => (
                <div
                  key={toolIndex}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-indigo-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{tool.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                    </div>
                    {tool.free && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded ml-2">
                        Free
                      </span>
                    )}
                  </div>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Getting Started Guide */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">Getting Started with Research Tools</h3>
        <p className="mb-6 text-indigo-100">
          Not sure which tools to use? Our beginner's guide will help you choose the right tools based on your research needs and field of study.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-bold mb-2">For Beginners</h4>
            <ul className="space-y-1 text-sm text-indigo-100">
              <li>• Start with free, user-friendly tools</li>
              <li>• Take advantage of tutorials and documentation</li>
              <li>• Join user communities for support</li>
            </ul>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-bold mb-2">For Advanced Users</h4>
            <ul className="space-y-1 text-sm text-indigo-100">
              <li>• Explore specialized tools for your field</li>
              <li>• Consider tool integrations and workflows</li>
              <li>• Evaluate premium features if needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

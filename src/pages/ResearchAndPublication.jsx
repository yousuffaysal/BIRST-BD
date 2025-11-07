import React, { useState } from 'react';
import { BookOpen, Search, Filter, FileText, Database, TrendingUp, Users, Lightbulb, Library, Globe, Target } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Research & Publication Hub
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-indigo-100 max-w-3xl mx-auto px-4">
            Comprehensive guidance and resources for conducting research across various fields
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm md:text-base font-semibold transition-all whitespace-nowrap min-h-[44px] touch-target ${
                    activeTab === tab.id
                      ? 'text-indigo-600 border-b-4 border-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
        {activeTab === 'guidance' && <ResearchGuidance />}
        {activeTab === 'library' && <ResearchLibrary />}
        {activeTab === 'fields' && <FieldGuides />}
        {activeTab === 'publications' && <Publications />}
        {activeTab === 'tools' && <ResearchTools />}
        {activeTab === 'methodology' && <MethodologyGuide />}
      </section>

      {/* Quick Stats Section */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Research Community at a Glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { label: 'Research Resources', value: '1000+', icon: BookOpen },
              { label: 'Publications', value: '500+', icon: FileText },
              { label: 'Active Researchers', value: '2500+', icon: Users },
              { label: 'Field Guides', value: '50+', icon: Globe },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-4 sm:p-5 md:p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg sm:rounded-xl hover:shadow-lg transition-transform transform hover:-translate-y-1"
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-3 sm:mb-4 text-indigo-600" />
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-700 mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
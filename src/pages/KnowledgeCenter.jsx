import React, { useState } from 'react';
import { BookOpen, Search, GraduationCap, FileText, Database, Users, Award, TrendingUp, Lightbulb, Target, Globe, Calendar, Eye, User } from 'lucide-react';

export default function KnowledgeCenter() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources', icon: Globe },
    { id: 'tutorials', label: 'Tutorials', icon: GraduationCap },
    { id: 'guides', label: 'Guides', icon: FileText },
    { id: 'templates', label: 'Templates', icon: Database },
    { id: 'case-studies', label: 'Case Studies', icon: Target },
    { id: 'webinars', label: 'Webinars', icon: Users },
  ];

  const resources = [
    {
      id: 1,
      title: 'Complete Guide to Research Methodology',
      category: 'guides',
      type: 'Guide',
      description: 'A comprehensive step-by-step guide covering all aspects of research methodology from formulation to publication.',
      author: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      views: 1250,
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Statistical Analysis Tutorial Series',
      category: 'tutorials',
      type: 'Tutorial',
      description: 'Interactive tutorial series covering descriptive statistics, inferential statistics, and advanced modeling techniques.',
      author: 'Prof. Michael Chen',
      date: '2024-02-20',
      views: 890,
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Research Proposal Template',
      category: 'templates',
      type: 'Template',
      description: 'Professional research proposal template with all necessary sections and formatting guidelines.',
      author: 'Research Team',
      date: '2024-03-10',
      views: 2100,
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Case Study: Clinical Research in Bangladesh',
      category: 'case-studies',
      type: 'Case Study',
      description: 'In-depth case study analyzing the implementation and outcomes of a large-scale clinical research project.',
      author: 'Dr. Ahmed Rahman',
      date: '2024-01-28',
      views: 650,
      rating: 4.6,
    },
    {
      id: 5,
      title: 'Data Visualization Best Practices',
      category: 'guides',
      type: 'Guide',
      description: 'Learn how to create effective data visualizations that communicate your research findings clearly.',
      author: 'Dr. Emily Watson',
      date: '2024-02-05',
      views: 1100,
      rating: 4.8,
    },
    {
      id: 6,
      title: 'Online Webinar: Writing for Publication',
      category: 'webinars',
      type: 'Webinar',
      description: 'Recorded webinar covering strategies for writing research papers that get accepted in top journals.',
      author: 'Prof. David Lee',
      date: '2024-03-15',
      views: 2300,
      rating: 4.9,
    },
  ];

  const filteredResources = activeCategory === 'all'
    ? resources
    : resources.filter(r => r.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-600 mb-6">
          <span className="hover:text-indigo-600">Home</span> / <span className="hover:text-indigo-600">Research & Publication</span> / <span className="text-gray-900">Knowledge Center</span>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Lightbulb className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Knowledge Center</h1>
              <p className="text-xl text-indigo-100">Access comprehensive tutorials, guides, templates, and educational resources</p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                    activeCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources, tutorials, guides..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeCategory === 'all' ? 'All Resources' : categories.find(c => c.id === activeCategory)?.label}
            </h2>
            <span className="text-gray-600">
              {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-indigo-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded mb-2">
                      {resource.type}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{resource.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(resource.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Eye className="w-4 h-4" />
                      <span>{resource.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-gray-700">{resource.rating}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold">
                  <BookOpen className="w-4 h-4" />
                  View Resource
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Knowledge Center Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Resources', value: '150+', icon: FileText, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
              { label: 'Tutorials', value: '45+', icon: GraduationCap, bgColor: 'bg-green-100', textColor: 'text-green-600' },
              { label: 'Active Learners', value: '5000+', icon: Users, bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
              { label: 'Success Rate', value: '95%', icon: TrendingUp, bgColor: 'bg-orange-100', textColor: 'text-orange-600' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-8 h-8 ${stat.textColor}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { BarChart3, FileText, Users, Database, TrendingUp, CheckCircle, ArrowRight, Target, Lightbulb } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: BarChart3,
      title: 'Statistical Data Analysis',
      description: 'Comprehensive statistical analysis services for research projects, business data, and academic studies. We provide expert analysis using advanced statistical software.',
      features: [
        'Descriptive and inferential statistics',
        'Regression analysis',
        'Time series analysis',
        'Multivariate analysis',
        'Custom statistical modeling',
      ],
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      icon: Database,
      title: 'Data Collection & Management',
      description: 'Professional data collection services including survey design, data entry, cleaning, and database management for research and business purposes.',
      features: [
        'Survey design and administration',
        'Data entry and cleaning',
        'Database design and management',
        'Data validation and quality assurance',
        'Secure data storage solutions',
      ],
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      icon: FileText,
      title: 'Research & Publication Support',
      description: 'End-to-end research support from proposal development to publication. We help researchers at every stage of their research journey.',
      features: [
        'Research proposal writing',
        'Literature review assistance',
        'Manuscript preparation',
        'Journal submission guidance',
        'Publication support',
      ],
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      icon: Users,
      title: 'Training & Workshops',
      description: 'Professional training programs and workshops on statistics, data analysis, research methods, and software tools for individuals and organizations.',
      features: [
        'Statistics and data analysis training',
        'Software-specific workshops (SPSS, Stata, R, Python)',
        'Research methodology courses',
        'Customized corporate training',
        'Online and in-person options',
      ],
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
    {
      icon: TrendingUp,
      title: 'Business Intelligence & Analytics',
      description: 'Transform your business data into actionable insights. We provide analytics solutions to help businesses make data-driven decisions.',
      features: [
        'Dashboard development',
        'KPI tracking and reporting',
        'Predictive analytics',
        'Market research analysis',
        'Performance optimization',
      ],
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
    },
    {
      icon: Target,
      title: 'Consulting Services',
      description: 'Expert consulting services for research design, methodology selection, data analysis strategies, and academic writing support.',
      features: [
        'Research methodology consulting',
        'Statistical analysis consulting',
        'Grant proposal support',
        'Thesis and dissertation help',
        'Academic writing assistance',
      ],
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-600 mb-6">
          <span className="hover:text-indigo-600">Home</span> / <span className="text-gray-900">Services</span>
        </div>

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive research, data analysis, and training services to support your academic and professional goals
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-t-4 border-indigo-500 group"
              >
                <div className={`w-16 h-16 ${service.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${service.textColor}`} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all group">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 md:p-12 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Expert Team',
                description: 'Our team consists of experienced researchers, statisticians, and data scientists with advanced degrees and industry experience.',
              },
              {
                icon: Target,
                title: 'Proven Results',
                description: 'We have successfully completed hundreds of research projects and trained thousands of professionals across various industries.',
              },
              {
                icon: Lightbulb,
                title: 'Innovative Solutions',
                description: 'We stay updated with the latest tools, techniques, and methodologies to provide cutting-edge solutions.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-indigo-100">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact us today to discuss how we can help with your research, data analysis, or training needs.
          </p>
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition inline-flex items-center gap-2">
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
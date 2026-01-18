import React, { useState, useEffect } from 'react';
import { FileText, Calendar, User, ExternalLink, Search, Filter, Download, Eye } from 'lucide-react';
import useAxiosPublic from '../../hooks/useAxiosPublic';

export default function Publications() {
  const axiosPublic = useAxiosPublic();
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'Journal Article', 'Conference Paper', 'Book Chapter', 'Thesis', 'Report'];

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await axiosPublic.get('/research/publications');
        setPublications(response.data || []);
        setFilteredPublications(response.data || []);
      } catch (error) {
        console.error('Error fetching publications:', error);
        setPublications(samplePublications);
        setFilteredPublications(samplePublications);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  useEffect(() => {
    let filtered = publications;

    if (searchTerm) {
      filtered = filtered.filter(
        (pub) =>
          pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pub.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
          pub.abstract?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedYear !== 'all') {
      filtered = filtered.filter((pub) => pub.year === parseInt(selectedYear));
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((pub) => pub.category === selectedCategory);
    }

    setFilteredPublications(filtered);
  }, [searchTerm, selectedYear, selectedCategory, publications]);

  const samplePublications = [
    {
      _id: '1',
      title: 'Advanced Statistical Methods for Research Analysis',
      authors: ['Dr. John Smith', 'Dr. Jane Doe'],
      year: 2024,
      category: 'Journal Article',
      journal: 'Research Methods Quarterly',
      abstract: 'This paper explores advanced statistical techniques for analyzing complex research data...',
      doi: '10.1234/rmq.2024.001',
      url: '#',
    },
    {
      _id: '2',
      title: 'Ethical Considerations in Modern Research',
      authors: ['Prof. Robert Johnson'],
      year: 2023,
      category: 'Book Chapter',
      journal: 'Research Ethics Handbook',
      abstract: 'A comprehensive review of ethical principles and guidelines...',
      doi: '10.1234/reh.2023.005',
      url: '#',
    },
  ];

  // Get unique years for filter
  const years = ['all', ...new Set(publications.map((pub) => pub.year).filter(Boolean))].sort((a, b) => {
    if (a === 'all') return -1;
    if (b === 'all') return 1;
    return b - a;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-sky-500 rounded-full flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-['Unbounded']">Research Publications</h2>
            <p className="text-sm md:text-base text-gray-600 font-['Plus_Jakarta_Sans']">Browse our collection of published research</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search publications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base font-['Plus_Jakarta_Sans']"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base font-['Plus_Jakarta_Sans']"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Years' : year}
                </option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base font-['Plus_Jakarta_Sans']"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="text-gray-600 text-sm md:text-base font-['Plus_Jakarta_Sans']">
        Found <span className="font-bold text-blue-600 font-['Unbounded']">{filteredPublications.length}</span> publications
      </div>

      {/* Publications List */}
      {filteredPublications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12 text-center">
          <FileText className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 text-base md:text-lg font-['Plus_Jakarta_Sans']">No publications found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPublications.map((publication) => (
            <div
              key={publication._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 md:p-8 border border-gray-100 relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

              <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full font-['Unbounded']">
                      {publication.category}
                    </span>
                    {publication.doi && (
                      <span className="text-xs text-gray-400 font-['Plus_Jakarta_Sans'] hidden sm:inline-block">DOI: {publication.doi}</span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight font-['Unbounded'] group-hover:text-blue-600 transition-colors">
                    {publication.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-['Plus_Jakarta_Sans']">
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                      <User className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-700">{publication.authors.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-700">{publication.year}</span>
                    </div>
                    {publication.journal && (
                      <div className="hidden sm:flex items-center gap-1.5 px-2 py-1">
                        <span className="italic text-gray-600">{publication.journal}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                {publication.abstract && (
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed font-['Plus_Jakarta_Sans'] line-clamp-3 md:line-clamp-2 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                    "{publication.abstract}"
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 !text-white rounded-xl hover:bg-blue-600 transition-all duration-300 text-sm font-bold font-['Unbounded'] shadow-lg shadow-gray-200 hover:shadow-blue-200 transform hover:-translate-y-0.5"
                >
                  <ExternalLink className="w-4 h-4 !text-white" />
                  Read Full Text
                </a>
                <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-100 text-gray-700 rounded-xl hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 text-sm font-bold font-['Unbounded']">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-100 text-gray-700 rounded-xl hover:border-blue-100 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 text-sm font-bold font-['Unbounded']">
                  <Eye className="w-4 h-4" />
                  Cite Paper
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
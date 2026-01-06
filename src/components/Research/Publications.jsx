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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-500 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Research Publications</h2>
            <p className="text-gray-600">Browse our collection of published research</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search publications by title, author, or abstract..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
      <div className="text-gray-600">
        Found <span className="font-bold text-blue-600">{filteredPublications.length}</span> publications
      </div>

      {/* Publications List */}
      {filteredPublications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 text-lg">No publications found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPublications.map((publication) => (
            <div
              key={publication._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-blue-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{publication.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{publication.authors.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{publication.year}</span>
                    </div>
                  </div>
                  {publication.journal && (
                    <p className="text-sm text-gray-600 italic mb-2">{publication.journal}</p>
                  )}
                  {publication.abstract && (
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{publication.abstract}</p>
                  )}
                  {publication.doi && (
                    <p className="text-xs text-gray-500 mb-4">DOI: {publication.doi}</p>
                  )}
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded ml-4">
                  {publication.category}
                </span>
              </div>

              <div className="flex gap-2">
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  Read Full Text
                </a>
                <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                  <Download className="w-4 h-4" />
                  PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                  <Eye className="w-4 h-4" />
                  Cite
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Library, Search, Filter, Download, ExternalLink, BookOpen, FileText, Database, Globe, Tag } from 'lucide-react';
import useAxiosPublic from '../../hooks/useAxiosPublic';

export default function ResearchLibrary() {
  const axiosPublic = useAxiosPublic();
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = ['all', 'Methodology', 'Statistics', 'Data Analysis', 'Survey Design', 'Academic Writing', 'Ethics', 'Software Tools'];
  const types = ['all', 'Article', 'Guide', 'Tool', 'Dataset', 'Tutorial', 'Template'];

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axiosPublic.get('/research/resources');
        setResources(response.data || []);
        setFilteredResources(response.data || []);
      } catch (error) {
        console.error('Error fetching research resources:', error);
        setResources([]);
        setFilteredResources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [axiosPublic]);

  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((resource) => resource.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((resource) => resource.type === selectedType);
    }

    setFilteredResources(filtered);
  }, [searchTerm, selectedCategory, selectedType, resources]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Article':
        return FileText;
      case 'Tool':
        return Database;
      case 'Dataset':
        return Database;
      case 'Tutorial':
        return BookOpen;
      default:
        return Library;
    }
  };

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
            <Library className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Research Resource Library</h2>
            <p className="text-sm md:text-base text-gray-600">Comprehensive collection of research resources, guides, and tools</p>
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
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-gray-600 text-sm md:text-base">
        Found <span className="font-bold text-blue-600">{filteredResources.length}</span> resources
      </div>

      {/* Resources List */}
      {filteredResources.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12 text-center">
          <Library className="w-12 h-16 md:w-16 md:h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 text-base md:text-lg">No resources found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <div
                key={resource._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-4 md:p-6 border-l-4 border-blue-500 h-full flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TypeIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {resource.type || 'Resource'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                  {resource.category && (
                    <p className="text-xs md:text-sm text-blue-600 font-medium mb-2">{resource.category}</p>
                  )}
                  {resource.description && (
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">{resource.description}</p>
                  )}

                  {resource.tags && resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-[10px] md:text-xs rounded"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 3 && (
                        <span className="text-[10px] md:text-xs text-gray-500">+{resource.tags.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 !text-white rounded-lg hover:bg-blue-700 transition flex-1 justify-center text-sm"
                    >
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 !text-white" />
                      View
                    </a>
                  )}
                  {resource.downloadUrl && (
                    <button className="flex items-center gap-2 px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm">
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                      Save
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
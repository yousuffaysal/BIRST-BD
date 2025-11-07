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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
            <Library className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Research Resource Library</h2>
            <p className="text-gray-600">Comprehensive collection of research resources, guides, and tools</p>
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
              placeholder="Search resources by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
      <div className="text-gray-600">
        Found <span className="font-bold text-indigo-600">{filteredResources.length}</span> resources
      </div>

      {/* Resources List */}
      {filteredResources.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Library className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 text-lg">No resources found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <div
                key={resource._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-indigo-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <TypeIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">
                        {resource.type || 'Resource'}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h3>
                {resource.category && (
                  <p className="text-sm text-indigo-600 font-medium mb-2">{resource.category}</p>
                )}
                {resource.description && (
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{resource.description}</p>
                )}

                {resource.tags && resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{resource.tags.length - 3} more</span>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex-1 justify-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                  )}
                  {resource.downloadUrl && (
                    <button className="flex items-center gap-2 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                      <Download className="w-4 h-4" />
                      Download
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


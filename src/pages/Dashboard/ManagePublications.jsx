import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, FileText, Calendar, User, ExternalLink } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function ManagePublications() {
  const axiosSecure = useAxiosSecure();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    authors: [],
    year: new Date().getFullYear(),
    category: 'Journal Article',
    journal: '',
    abstract: '',
    doi: '',
    url: '',
  });

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await axiosSecure.get('/research/publications');
      setPublications(response.data || []);
    } catch (error) {
      console.error('Error fetching publications:', error);
      toast.error('Failed to load publications');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAuthorsChange = (e) => {
    const authors = e.target.value.split(',').map(a => a.trim()).filter(a => a);
    setFormData(prev => ({ ...prev, authors }));
  };

  const openModal = (publication = null) => {
    if (publication) {
      setEditingPublication(publication);
      setFormData({
        title: publication.title || '',
        authors: Array.isArray(publication.authors) ? publication.authors : [],
        year: publication.year || new Date().getFullYear(),
        category: publication.category || 'Journal Article',
        journal: publication.journal || '',
        abstract: publication.abstract || '',
        doi: publication.doi || '',
        url: publication.url || '',
      });
    } else {
      setEditingPublication(null);
      setFormData({
        title: '',
        authors: [],
        year: new Date().getFullYear(),
        category: 'Journal Article',
        journal: '',
        abstract: '',
        doi: '',
        url: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPublication(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingPublication) {
        const response = await axiosSecure.put(`/research/publications/${editingPublication._id}`, formData);
        if (response.data) {
          toast.success('Publication updated successfully');
          fetchPublications();
          closeModal();
        }
      } else {
        const response = await axiosSecure.post('/research/publications', formData);
        if (response.data.insertedId) {
          toast.success('Publication added successfully');
          fetchPublications();
          closeModal();
        }
      }
    } catch (error) {
      console.error('Error saving publication:', error);
      toast.error('Failed to save publication');
    }
  };

  const handleDelete = (publication) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete this publication',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/research/publications/${publication._id}`);
          if (response.data) {
            toast.success('Publication deleted successfully');
            fetchPublications();
          }
        } catch (error) {
          console.error('Error deleting publication:', error);
          toast.error('Failed to delete publication');
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Publications</h2>
          <p className="text-gray-600 mt-1">Add, edit, and delete publications</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="w-5 h-5" />
          Add New Publication
        </button>
      </div>

      <div className="space-y-4">
        {publications.map((publication) => (
          <div
            key={publication._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-indigo-500"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{publication.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{Array.isArray(publication.authors) ? publication.authors.join(', ') : publication.authors}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{publication.year}</span>
                  </div>
                </div>
                {publication.journal && (
                  <p className="text-sm text-gray-600 italic mb-2">{publication.journal}</p>
                )}
                {publication.doi && (
                  <p className="text-xs text-gray-500 mb-2">DOI: {publication.doi}</p>
                )}
              </div>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded ml-4">
                {publication.category}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openModal(publication)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(publication)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {publications.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-600">No publications found. Click "Add New Publication" to get started.</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingPublication ? 'Edit Publication' : 'Add New Publication'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Authors * (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.authors.join(', ')}
                    onChange={handleAuthorsChange}
                    required
                    placeholder="Dr. John Smith, Dr. Jane Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Year *</label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      required
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Journal Article">Journal Article</option>
                      <option value="Conference Paper">Conference Paper</option>
                      <option value="Book Chapter">Book Chapter</option>
                      <option value="Thesis">Thesis</option>
                      <option value="Report">Report</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Journal/Publisher</label>
                  <input
                    type="text"
                    name="journal"
                    value={formData.journal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Abstract</label>
                  <textarea
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">DOI</label>
                    <input
                      type="text"
                      name="doi"
                      value={formData.doi}
                      onChange={handleInputChange}
                      placeholder="10.1234/example.2024.001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">URL</label>
                    <input
                      type="url"
                      name="url"
                      value={formData.url}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                  >
                    <Save className="w-5 h-5" />
                    {editingPublication ? 'Update' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




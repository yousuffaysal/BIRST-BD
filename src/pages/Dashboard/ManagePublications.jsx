import React, { useState, useEffect } from 'react';
import {
  Plus, Edit, Trash2, Save, X, FileText, Calendar, User,
  ExternalLink, BookOpen, GraduationCap, Layout, Link as LinkIcon,
  Loader
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
      setLoading(true);
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
    // Split by comma and filter empty strings
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
      title: 'Delete Publication?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#9CA3AF',
      confirmButtonText: 'Yes, delete it',
      background: '#fff',
      customClass: {
        title: "font-unbounded text-[#0B2340]",
        popup: "rounded-3xl",
      }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Journal Article': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Conference Paper': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Book Chapter': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Thesis': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] min-h-[600px] bg-[#FAFAFA] font-jakarta overflow-hidden flex flex-col relative rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] m-4 lg:m-0">

      {/* Unified Gradient Header */}
      <div className="px-8 py-8 border-b border-gray-100 bg-gradient-to-br from-[#0B2340] to-[#02bfff] text-white relative overflow-hidden shrink-0 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#02bfff]/30 rounded-full blur-[40px] -ml-10 -mb-10 pointer-events-none"></div>

        <div className="relative z-10 flex items-center gap-5 w-full md:w-auto">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner">
            <FileText size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-unbounded text-white flex items-center gap-3">
              Manage Publications
            </h2>
            <p className="text-white/80 text-base font-medium mt-1">Research papers, articles & journals</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#02bfff] hover:bg-white/90 rounded-xl font-bold transition-all shadow-lg shadow-black/5"
          >
            <Plus size={20} strokeWidth={3} />
            Add New Publication
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-400">
            <Loader className="animate-spin text-[#02bfff]" size={40} />
            <span className="font-bold text-sm uppercase tracking-widest">Loading Publications...</span>
          </div>
        ) : publications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <BookOpen size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2340] mb-2 font-unbounded">No Publications Found</h3>
            <p className="text-gray-500">Get started by adding your first research paper</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 pb-10"
          >
            {publications.map((publication) => (
              <motion.div
                key={publication._id}
                variants={itemVariants}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-6 flex flex-col md:flex-row gap-6 relative"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#02bfff] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className={`px-3 py-1 text-xs font-bold rounded-lg border uppercase ${getCategoryColor(publication.category)}`}>
                      {publication.category}
                    </span>
                    {publication.year && (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                        <Calendar size={12} /> {publication.year}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#0B2340] group-hover:text-[#02bfff] transition-colors font-unbounded leading-snug">
                    {publication.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User size={16} className="text-gray-400 shrink-0" />
                    <span className="font-medium">
                      {Array.isArray(publication.authors) ? publication.authors.join(', ') : publication.authors}
                    </span>
                  </div>

                  {publication.journal && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 italic border-l-2 border-gray-200 pl-3">
                      <BookOpen size={16} className="text-gray-400 shrink-0 not-italic" />
                      {publication.journal}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 pt-2">
                    {publication.doi && (
                      <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#02bfff] transition-colors">
                        <ExternalLink size={12} /> DOI: {publication.doi}
                      </a>
                    )}
                    {publication.url && (
                      <a href={publication.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#02bfff] transition-colors">
                        <LinkIcon size={12} /> View Source
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex md:flex-col items-center justify-center gap-2 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0 md:w-32">
                  <button
                    onClick={() => openModal(publication)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-[#02bfff] rounded-xl font-bold text-sm transition-all"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(publication)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all text-sm font-bold"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0B2340]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 content-start overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col my-8"
            >
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0 sticky top-0 z-20 backdrop-blur-md">
                <h3 className="text-2xl font-bold font-unbounded text-[#0B2340]">
                  {editingPublication ? 'Edit Publication' : 'Add New Publication'}
                </h3>
                <button onClick={closeModal} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Main Info */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Publication Title <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                        placeholder="Title of the paper or article"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Authors <span className="text-red-500">*</span> (Comma separated)</label>
                      <input
                        type="text"
                        value={formData.authors.join(', ')}
                        onChange={handleAuthorsChange}
                        required
                        placeholder="e.g. Dr. A. Smith, B. Jones"
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Year <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Category <span className="text-red-500">*</span></label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium appearance-none"
                      >
                        <option value="Journal Article">Journal Article</option>
                        <option value="Conference Paper">Conference Paper</option>
                        <option value="Book Chapter">Book Chapter</option>
                        <option value="Thesis">Thesis</option>
                        <option value="Report">Report</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Journal / Publisher</label>
                    <input
                      type="text"
                      name="journal"
                      value={formData.journal}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      placeholder="e.g. Nature, IEEE Access"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Abstract</label>
                    <textarea
                      name="abstract"
                      value={formData.abstract}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      placeholder="Brief summary of the publication..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">DOI</label>
                      <input
                        type="text"
                        name="doi"
                        value={formData.doi}
                        onChange={handleInputChange}
                        placeholder="e.g. 10.1109/XXX.2024.12345"
                        className="w-full px-4 py-3 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">URL</label>
                      <input
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleInputChange}
                        placeholder="https://..."
                        className="w-full px-4 py-3 bg-white border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex gap-4 sticky bottom-0 bg-white z-10 pb-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0B2340] text-white rounded-xl hover:bg-[#1a3a5f] transition-all font-bold shadow-lg shadow-blue-900/20"
                    >
                      <Save size={20} />
                      {editingPublication ? 'Update Publication' : 'Add Publication'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

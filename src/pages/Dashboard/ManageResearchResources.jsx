import React, { useState, useEffect } from 'react';
import {
  Plus, Edit, Trash2, Save, X, Book, FileText, Tag,
  Calendar, User, Link as LinkIcon, Download, Variable,
  Video, File, Layout, Search, Loader
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function ManageResearchResources() {
  const axiosSecure = useAxiosSecure();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Methodology',
    type: 'PDF',
    url: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    tags: [],
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/research/resources');
      setResources(response.data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load resources');
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

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t);
    setFormData(prev => ({ ...prev, tags }));
  };

  const openModal = (resource = null) => {
    if (resource) {
      setEditingResource(resource);
      setFormData({
        title: resource.title || '',
        description: resource.description || '',
        category: resource.category || 'Methodology',
        type: resource.type || 'PDF',
        url: resource.url || '',
        author: resource.author || '',
        date: resource.date ? new Date(resource.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        tags: Array.isArray(resource.tags) ? resource.tags : [],
      });
    } else {
      setEditingResource(null);
      setFormData({
        title: '',
        description: '',
        category: 'Methodology',
        type: 'PDF',
        url: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        tags: [],
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingResource(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingResource) {
        const response = await axiosSecure.put(`/research/resources/${editingResource._id}`, formData);
        if (response.data) {
          toast.success('Resource updated successfully');
          fetchResources();
          closeModal();
        }
      } else {
        const response = await axiosSecure.post('/research/resources', formData);
        if (response.data.insertedId) {
          toast.success('Resource added successfully');
          fetchResources();
          closeModal();
        }
      }
    } catch (error) {
      console.error('Error saving resource:', error);
      toast.error('Failed to save resource');
    }
  };

  const handleDelete = (resource) => {
    Swal.fire({
      title: 'Delete Resource?',
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
          const response = await axiosSecure.delete(`/research/resources/${resource._id}`);
          if (response.data) {
            toast.success('Resource deleted successfully');
            fetchResources();
          }
        } catch (error) {
          console.error('Error deleting resource:', error);
          toast.error('Failed to delete resource');
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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'PDF': return <FileText size={24} className="text-red-500" />;
      case 'Video': return <Video size={24} className="text-purple-500" />;
      case 'Article': return <Layout size={24} className="text-blue-500" />;
      case 'Book': return <Book size={24} className="text-orange-500" />;
      default: return <File size={24} className="text-gray-500" />;
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
            <Book size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-unbounded text-white flex items-center gap-3">
              Manage Resources
            </h2>
            <p className="text-white/80 text-base font-medium mt-1">Tools, templates & learning materials</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#02bfff] hover:bg-white/90 rounded-xl font-bold transition-all shadow-lg shadow-black/5"
          >
            <Plus size={20} strokeWidth={3} />
            Add New Resource
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-400">
            <Loader className="animate-spin text-[#02bfff]" size={40} />
            <span className="font-bold text-sm uppercase tracking-widest">Loading Resources...</span>
          </div>
        ) : resources.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FileText size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2340] mb-2 font-unbounded">No Resources Found</h3>
            <p className="text-gray-500">Get started by uploading your first resource</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-10"
          >
            {resources.map((resource) => (
              <motion.div
                key={resource._id}
                variants={itemVariants}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0B2340] to-[#02bfff] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                    {getTypeIcon(resource.type)}
                  </div>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg border border-indigo-100 uppercase tracking-wide">
                    {resource.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0B2340] mb-2 font-unbounded line-clamp-2 group-hover:text-[#02bfff] transition-colors">
                  {resource.title}
                </h3>

                <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {Array.isArray(resource.tags) && resource.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-md">
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium mb-4">
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-gray-400" />
                    {resource.author}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-gray-400" />
                    {new Date(resource.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openModal(resource)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-[#02bfff] rounded-xl font-bold text-sm transition-all"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(resource)}
                    className="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
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
                  {editingResource ? 'Edit Resource' : 'Add New Resource'}
                </h3>
                <button onClick={closeModal} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Resource Title <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      placeholder="e.g. Advanced Research Methodologies"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Description <span className="text-red-500">*</span></label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      placeholder="Brief overview of the resource content..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Category <span className="text-red-500">*</span></label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium appearance-none"
                      >
                        <option value="Methodology">Methodology</option>
                        <option value="Data Analysis">Data Analysis</option>
                        <option value="Writing & Publishing">Writing & Publishing</option>
                        <option value="Research Ethics">Research Ethics</option>
                        <option value="Statistics">Statistics</option>
                        <option value="Field-Specific">Field-Specific</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">File Type <span className="text-red-500">*</span></label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium appearance-none"
                      >
                        <option value="PDF">PDF Document</option>
                        <option value="Article">Web Article</option>
                        <option value="Book">Book / E-Book</option>
                        <option value="Video">Video Tutorial</option>
                        <option value="Tool">Software / Tool</option>
                        <option value="Template">Template</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Author / Source <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Date <span className="text-red-500">*</span></label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Resource URL <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleInputChange}
                        required
                        placeholder="https://..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Tags (Comma separated)</label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        value={formData.tags.join(', ')}
                        onChange={handleTagsChange}
                        placeholder="methodology, qualitative, beginner"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
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
                      {editingResource ? 'Update Resource' : 'Add Resource'}
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

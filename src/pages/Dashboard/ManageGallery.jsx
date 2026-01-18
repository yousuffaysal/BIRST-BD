import React, { useState, useEffect } from 'react';
import {
  Plus, Edit, Trash2, Image, Video, Save, X, ExternalLink,
  PlayCircle, Upload, Film, ImageIcon, Loader, RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function ManageGallery() {
  const axiosSecure = useAxiosSecure();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('photo');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // ImgBB API Key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const [formData, setFormData] = useState({
    title: '',
    type: 'photo',
    thumbnail: '',
    youtubeUrl: '',
    images: [],
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  // File states
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, [activeTab]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(`/gallery?type=${activeTab}`);
      setItems(response.data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      toast.error('Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  // Upload utility
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    try {
      const response = await fetch(image_hosting_api, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error('ImgBB upload failed');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      return null;
    }
  };

  // Extract YouTube video ID from URL
  const extractYouTubeId = (url) => {
    if (!url) return '';
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  // Get YouTube thumbnail
  const getYouTubeThumbnail = (url) => {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Auto-generate thumbnail from YouTube URL
    if (name === 'youtubeUrl' && value) {
      const thumbnail = getYouTubeThumbnail(value);
      if (thumbnail) {
        setFormData(prev => ({
          ...prev,
          thumbnail,
          videoUrl: value,
        }));
      }
    }
  };

  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleImageFilesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImageFiles(files);
    }
  };

  const openModal = (item = null) => {
    setThumbnailFile(null);
    setImageFiles([]); // Reset files

    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        type: item.type || activeTab,
        thumbnail: item.thumbnail || '',
        youtubeUrl: item.youtubeUrl || item.videoUrl || '',
        images: Array.isArray(item.images) ? item.images : [],
        date: item.date ? new Date(item.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        description: item.description || '',
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        type: activeTab,
        thumbnail: '',
        youtubeUrl: '',
        images: [],
        date: new Date().toISOString().split('T')[0],
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setThumbnailFile(null);
    setImageFiles([]);
    setUploading(false);
    setFormData({
      title: '',
      type: activeTab, // Preserve current tab type
      thumbnail: '',
      youtubeUrl: '',
      images: [],
      date: new Date().toISOString().split('T')[0],
      description: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalThumbnail = formData.thumbnail;
      let finalImages = [...formData.images];

      // Upload thumbnail only if a new file is selected
      if (thumbnailFile) {
        const url = await uploadImageToImgBB(thumbnailFile);
        if (url) {
          finalThumbnail = url;
        } else {
          toast.error('Failed to upload thumbnail');
          setUploading(false);
          return;
        }
      }

      // Upload gallery images only if new files are selected
      if (imageFiles.length > 0) {
        try {
          const uploadPromises = imageFiles.map(file => uploadImageToImgBB(file));
          const newUrls = await Promise.all(uploadPromises);
          const validUrls = newUrls.filter(url => url !== null);
          finalImages = [...finalImages, ...validUrls];
        } catch (err) {
          console.error('Error uploading images:', err);
          toast.error('Failed to upload some images');
        }
      }

      const payload = {
        title: formData.title,
        type: formData.type,
        date: formData.date,
        description: formData.description,
      };

      if (formData.type === 'video') {
        if (!formData.youtubeUrl) {
          toast.error('Please enter a YouTube URL');
          setUploading(false);
          return;
        }
        payload.videoUrl = formData.youtubeUrl;
        payload.youtubeUrl = formData.youtubeUrl;
        payload.youtubeId = extractYouTubeId(formData.youtubeUrl);
        payload.thumbnail = finalThumbnail || getYouTubeThumbnail(formData.youtubeUrl);
      } else {
        payload.images = finalImages;
        payload.thumbnail = finalThumbnail || (finalImages.length > 0 ? finalImages[0] : '');
        payload.imageCount = finalImages.length;
      }

      if (editingItem) {
        const response = await axiosSecure.put(`/gallery/${editingItem._id}`, payload);
        if (response.data) {
          toast.success('Gallery item updated successfully');
          fetchGallery();
          closeModal();
        }
      } else {
        const response = await axiosSecure.post('/gallery', payload);
        if (response.data.insertedId) {
          toast.success('Gallery item added successfully');
          fetchGallery();
          closeModal();
        }
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
      toast.error('Failed to save gallery item');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: 'Delete Item?',
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
          const response = await axiosSecure.delete(`/gallery/${item._id}`);
          if (response.data) {
            toast.success('Gallery item deleted successfully');
            fetchGallery();
          }
        } catch (error) {
          console.error('Error deleting gallery item:', error);
          toast.error('Failed to delete gallery item');
        }
      }
    });
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


  return (
    <div className="h-[calc(100vh-100px)] min-h-[600px] bg-[#FAFAFA] font-jakarta overflow-hidden flex flex-col relative rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] m-4 lg:m-0">

      {/* Unified Gradient Header */}
      <div className="px-8 py-8 border-b border-gray-100 bg-gradient-to-br from-[#0B2340] to-[#02bfff] text-white relative overflow-hidden shrink-0 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#02bfff]/30 rounded-full blur-[40px] -ml-10 -mb-10 pointer-events-none"></div>

        <div className="relative z-10 flex items-center gap-5 w-full md:w-auto">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner">
            <ImageIcon size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-unbounded text-white flex items-center gap-3">
              Media Gallery
            </h2>
            <p className="text-white/80 text-base font-medium mt-1">Manage your photos and videos</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#02bfff] hover:bg-white/90 rounded-xl font-bold transition-all shadow-lg shadow-black/5"
          >
            <Plus size={20} strokeWidth={3} />
            Add New Item
          </button>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="px-8 pt-6 pb-2">
          <div className="flex bg-white/50 backdrop-blur-md p-1 rounded-2xl border border-gray-200 w-fit">
            <button
              onClick={() => setActiveTab('photo')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'photo'
                  ? 'bg-[#02bfff] text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              <Image size={18} />
              Photo Gallery
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'video'
                  ? 'bg-[#02bfff] text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
            >
              <Video size={18} />
              Video Gallery
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-400">
              <Loader className="animate-spin text-[#02bfff]" size={40} />
              <span className="font-bold text-sm uppercase tracking-widest">Loading Media...</span>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                {activeTab === 'photo' ? <Image size={48} className="text-gray-400" /> : <Film size={48} className="text-gray-400" />}
              </div>
              <h3 className="text-xl font-bold text-[#0B2340] mb-2 font-unbounded">No {activeTab}s found</h3>
              <p className="text-gray-500">Get started by adding a new item</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10"
            >
              {items.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    {item.thumbnail ? (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Image size={48} />
                      </div>
                    )}

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 group-hover:bg-[#02bfff] group-hover:border-[#02bfff] transition-all duration-300 group-hover:scale-110">
                          <PlayCircle className="text-white fill-white/20" size={24} />
                        </div>
                      </div>
                    )}

                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => openModal(item)}
                        className="p-2 bg-white text-gray-700 hover:text-[#02bfff] rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 bg-white text-red-500 hover:text-red-600 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-[#0B2340] mb-2 line-clamp-1 group-hover:text-[#02bfff] transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{item.description || "No description provided."}</p>
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-400">
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                      {item.type === 'photo' && item.images && (
                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                          <Image size={12} /> {item.images.length + (item.thumbnail ? 1 : 0)} items
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0B2340]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="text-2xl font-bold font-unbounded text-[#0B2340]">
                  {editingItem ? 'Edit Media' : 'Add New Media'}
                </h3>
                <button onClick={closeModal} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                        placeholder="Event title..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium appearance-none"
                      >
                        <option value="photo">Photo Album</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                    />
                  </div>

                  {formData.type === 'video' ? (
                    <div className="space-y-4 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#0B2340] flex items-center gap-2">
                          <Video size={16} /> YouTube URL
                        </label>
                        <input
                          type="url"
                          name="youtubeUrl"
                          value={formData.youtubeUrl}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-blue-900 placeholder-blue-300"
                          placeholder="https://youtube.com/watch?v=..."
                        />
                      </div>
                      {formData.thumbnail && (
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-blue-200 shadow-sm">
                          <img src={formData.thumbnail} className="w-full h-full object-cover" alt="Preview" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <PlayCircle className="text-white drop-shadow-lg" size={48} />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <Image size={16} /> Main Thumbnail
                        </label>

                        <div className="flex items-start gap-4">
                          {formData.thumbnail && (
                            <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 shrink-0 relative">
                              <img src={formData.thumbnail} className="w-full h-full object-cover" alt="Thumb" />
                            </div>
                          )}
                          <label className="flex-1 cursor-pointer">
                            <div className="h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#02bfff] hover:text-[#02bfff] hover:bg-blue-50 transition-all">
                              <Upload size={20} />
                              <span className="text-xs font-bold">Click to upload</span>
                            </div>
                            <input type="file" accept="image/*" onChange={handleThumbnailFileChange} className="hidden" />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                          <ImageIcon size={16} /> Album Photos
                        </label>

                        {formData.images.length > 0 && (
                          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-2">
                            {formData.images.map((img, idx) => (
                              <div key={idx} className="relative aspect-square group rounded-lg overflow-hidden border border-gray-200">
                                <img src={img} className="w-full h-full object-cover" />
                                <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-md p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <label className="cursor-pointer block">
                          <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-500 hover:border-[#02bfff] hover:text-[#02bfff] hover:bg-blue-50 transition-all font-medium text-sm">
                            <Plus size={18} /> Add Photos
                          </div>
                          <input type="file" accept="image/*" multiple onChange={handleImageFilesChange} className="hidden" />
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium resize-none"
                      placeholder="Add details about this item..."
                    />
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={uploading}
                      className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0B2340] text-white rounded-xl hover:bg-[#1a3a5f] transition-all font-bold shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {uploading ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
                      {uploading ? 'Processing...' : (editingItem ? 'Update Gallery' : 'Save to Gallery')}
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

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image, Video, Save, X, ExternalLink } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    title: '',
    type: 'photo',
    thumbnail: '',
    youtubeUrl: '',
    images: [],
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  useEffect(() => {
    fetchGallery();
  }, [activeTab]);

  const fetchGallery = async () => {
    try {
      const response = await axiosSecure.get(`/gallery?type=${activeTab}`);
      setItems(response.data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      toast.error('Failed to load gallery items');
    } finally {
      setLoading(false);
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

  const handleImagesChange = (e) => {
    const urls = e.target.value.split('\n').filter(url => url.trim());
    setFormData(prev => ({
      ...prev,
      images: urls,
    }));
  };

  const openModal = (item = null) => {
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
    setFormData({
      title: '',
      type: 'photo',
      thumbnail: '',
      youtubeUrl: '',
      images: [],
      date: new Date().toISOString().split('T')[0],
      description: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const payload = {
        title: formData.title,
        type: formData.type,
        date: formData.date,
        description: formData.description,
      };

      if (formData.type === 'video') {
        if (!formData.youtubeUrl) {
          toast.error('Please enter a YouTube URL');
          return;
        }
        payload.videoUrl = formData.youtubeUrl;
        payload.youtubeUrl = formData.youtubeUrl;
        payload.youtubeId = extractYouTubeId(formData.youtubeUrl);
        payload.thumbnail = formData.thumbnail || getYouTubeThumbnail(formData.youtubeUrl);
      } else {
        payload.images = formData.images;
        payload.thumbnail = formData.thumbnail || formData.images[0];
        payload.imageCount = formData.images.length;
      }

      if (editingItem) {
        // Update
        const response = await axiosSecure.put(`/gallery/${editingItem._id}`, payload);
        if (response.data) {
          toast.success('Gallery item updated successfully');
          fetchGallery();
          closeModal();
        }
      } else {
        // Create
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
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete this gallery item',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Gallery</h2>
          <p className="text-gray-600 mt-1">Add, edit, and delete gallery items</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="w-5 h-5" />
          Add New Item
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => {
            setActiveTab('photo');
            setLoading(true);
          }}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === 'photo'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Image className="w-4 h-4 inline mr-2" />
          Photo Gallery
        </button>
        <button
          onClick={() => {
            setActiveTab('video');
            setLoading(true);
          }}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === 'video'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Video className="w-4 h-4 inline mr-2" />
          Video Gallery
        </button>
      </div>

      {/* Gallery Items */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
          >
            {/* Thumbnail */}
            <div className="relative h-48 bg-gray-200">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {item.type === 'video' ? <Video className="w-12 h-12" /> : <Image className="w-12 h-12" />}
                </div>
              )}
              {item.type === 'video' && item.youtubeId && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                    <Video className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(item.date).toLocaleDateString()}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openModal(item)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-600">No {activeTab} items found. Click "Add New Item" to get started.</p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="photo">Photo</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {formData.type === 'video' ? (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        YouTube URL * (e.g., https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID)
                      </label>
                      <input
                        type="url"
                        name="youtubeUrl"
                        value={formData.youtubeUrl}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Paste your YouTube video URL here. Thumbnail will be generated automatically.
                      </p>
                    </div>
                    {formData.thumbnail && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Preview Thumbnail
                        </label>
                        <img
                          src={formData.thumbnail}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-gray-300"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Thumbnail Image URL (ImgBB) *
                      </label>
                      <input
                        type="url"
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="https://i.ibb.co/..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Upload your image to ImgBB and paste the direct link here.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Image URLs (ImgBB) * (One URL per line)
                      </label>
                      <textarea
                        name="images"
                        value={formData.images.join('\n')}
                        onChange={handleImagesChange}
                        rows="6"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="https://i.ibb.co/...&#10;https://i.ibb.co/...&#10;https://i.ibb.co/..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Upload images to ImgBB and paste one direct link per line.
                      </p>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Optional description"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                  >
                    <Save className="w-5 h-5" />
                    {editingItem ? 'Update' : 'Save'}
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



import React, { useState, useEffect } from 'react';
import { Calendar, Image, Video, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';

export default function Gallery() {
  const axiosPublic = useAxiosPublic();
  const [activeTab, setActiveTab] = useState('photo');
  const [photoAlbums, setPhotoAlbums] = useState([]);
  const [videoAlbums, setVideoAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axiosPublic.get('/gallery');
        if (response.data) {
          setPhotoAlbums(response.data.filter(item => item.type === 'photo') || []);
          setVideoAlbums(response.data.filter(item => item.type === 'video') || []);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
        // Use sample data
        setPhotoAlbums(samplePhotoAlbums);
        setVideoAlbums(sampleVideoAlbums);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const samplePhotoAlbums = [
    {
      _id: '1',
      title: 'Training on Statistics with Stata',
      thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
      date: '2020-12-17',
      type: 'photo',
      imageCount: 25,
    },
    {
      _id: '2',
      title: 'Data Visualization and Analysis with MS Power BI',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      date: '2020-12-17',
      type: 'photo',
      imageCount: 18,
    },
    {
      _id: '3',
      title: 'Research Methodology Workshop',
      thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      date: '2021-03-15',
      type: 'photo',
      imageCount: 32,
    },
  ];

  const sampleVideoAlbums = [
    {
      _id: '1',
      title: 'Machine Learning in Bangla',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
      date: '2020-12-17',
      type: 'video',
      videoUrl: '#',
      youtubeId: null,
    },
  ];

  const currentAlbums = activeTab === 'photo' ? photoAlbums : videoAlbums;
  const totalPages = Math.ceil(currentAlbums.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAlbums = currentAlbums.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
          <span className="hover:text-indigo-600">Home</span> / <span className="text-gray-900">Gallery</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Gallery
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => {
              setActiveTab('photo');
              setCurrentPage(1);
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition min-h-[44px] touch-target ${
              activeTab === 'photo'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Image className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Photo Gallery</span>
            <span className="sm:hidden">Photos</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('video');
              setCurrentPage(1);
            }}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition min-h-[44px] touch-target ${
              activeTab === 'video'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Video className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Video Gallery</span>
            <span className="sm:hidden">Videos</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {paginatedAlbums.map((album) => (
            <div
              key={album._id}
              className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-blue-500 h-40 sm:h-48">
                {album.thumbnail ? (
                  <img
                    src={album.thumbnail}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white p-3 sm:p-4">
                    <div className="text-center">
                      <p className="text-xs sm:text-sm mb-1 sm:mb-2">SRCBD</p>
                      <p className="text-sm sm:text-base md:text-lg font-bold">{album.title}</p>
                    </div>
                  </div>
                )}
                {activeTab === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <Video className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-indigo-600" />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {album.title}
                </h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  {activeTab === 'photo' ? (
                    <Link
                      to={`/gallery/photo/${album._id}`}
                      className="flex items-center gap-1.5 sm:gap-2 text-indigo-600 font-semibold hover:gap-2.5 sm:hover:gap-3 transition-all group text-sm sm:text-base"
                    >
                      See Album
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <Link
                      to="/gallery/video"
                      className="flex items-center gap-1.5 sm:gap-2 text-indigo-600 font-semibold hover:gap-2.5 sm:hover:gap-3 transition-all group text-sm sm:text-base"
                    >
                      See Videos
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {new Date(album.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                {activeTab === 'photo' && album.imageCount && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    {album.imageCount} photos
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 sm:gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 min-h-[44px] touch-target"
              aria-label="Previous page"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <span className="px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base text-gray-700 font-semibold">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 min-h-[44px] touch-target"
              aria-label="Next page"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
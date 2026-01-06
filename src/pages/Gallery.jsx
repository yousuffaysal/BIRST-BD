import React, { useState, useEffect } from 'react';
import { Calendar, Image, Video, ArrowRight, ArrowLeft, Layers, Sparkles, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 bg-[#0F172A] overflow-hidden">
        {/* Abstract Cinematic Background */}
        <div className="absolute top-0 right-0 w-[80%] h-full bg-gradient-to-l from-blue-900/10 to-transparent -z-10 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#1FB6FF]/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#1FB6FF] text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
              <Layers className="w-3 h-3" />
              <span>Visual Archive</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FB6FF] to-sky-300">Gallery</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Explore moments from our journey—workshops, milestones, and the vibrant community that defines us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 pb-20">

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1.5 rounded-full shadow-xl shadow-gray-200/50 inline-flex">
            {['photo', 'video'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 min-w-[140px] z-10 outline-none
                            ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabGallery"
                    className="absolute inset-0 bg-[#1FB6FF] rounded-full shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {tab === 'photo' ? <Image className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                  {tab === 'photo' ? 'Photo Gallery' : 'Video Gallery'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-20"
            >
              <div className="w-12 h-12 border-4 border-blue-100 border-t-[#1FB6FF] rounded-full animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab + currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {paginatedAlbums.map((album) => (
                <motion.div
                  key={album._id}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 border border-gray-100"
                >
                  {/* Thumbnail */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/40 transition-colors duration-500 z-10" />

                    {album.thumbnail ? (
                      <img
                        src={album.thumbnail}
                        alt={album.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 font-bold">No Image</span>
                      </div>
                    )}

                    {/* Overlay Content */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {activeTab === 'photo' ? (
                        <Link
                          to={`/gallery/photo/${album._id}`}
                          className="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#1FB6FF] hover:text-white"
                        >
                          View Album
                        </Link>
                      ) : (
                        <Link
                          to="/gallery/video"
                          className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1FB6FF] transform scale-50 group-hover:scale-100 transition-all duration-300 hover:bg-[#1FB6FF] hover:text-white"
                        >
                          <Play className="w-6 h-6 ml-1 fill-current" />
                        </Link>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 z-20 text-white/90 text-xs font-bold bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(album.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#1FB6FF] transition-colors">
                      {album.title}
                    </h3>
                    {activeTab === 'photo' && album.imageCount && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Image className="w-4 h-4" />
                        <span>{album.imageCount} Photos</span>
                      </div>
                    )}
                    {activeTab === 'video' && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Video className="w-4 h-4" />
                        <span>Video Content</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1FB6FF] hover:text-white hover:border-[#1FB6FF] transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold text-gray-400 tracking-wider">
              PAGE {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1FB6FF] hover:text-white hover:border-[#1FB6FF] transition-all"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
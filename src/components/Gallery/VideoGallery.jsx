import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Video, Play, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

export default function VideoGallery() {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosPublic.get('/gallery/video');
        if (response.data) {
          setVideos(response.data);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        // Sample data
        setVideos([
          {
            _id: '1',
            title: 'Machine Learning in Bangla',
            thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
            date: '2020-12-17',
            videoUrl: '#',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/gallery')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Gallery
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Video Gallery</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
            >
              {/* Main Media Area - Shows Video if available, otherwise Thumbnail */}
              <div className="relative aspect-video bg-black">
                {video.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white bg-gradient-to-br from-indigo-500 to-purple-600">
                        <Video className="w-12 h-12" />
                      </div>
                    )}
                    {/* Overlay for non-youtube videos or just visual flair if needed */}
                    {!video.youtubeId && video.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-indigo-600 ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{video.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(video.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>

                  {!video.youtubeId && video.videoUrl && (
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all"
                    >
                      Watch Video
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
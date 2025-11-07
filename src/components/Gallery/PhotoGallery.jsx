import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Image } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

export default function PhotoGallery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [album, setAlbum] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axiosPublic.get(`/gallery/photo/${id}`);
        if (response.data) {
          setAlbum(response.data.album);
          setImages(response.data.images || []);
        }
      } catch (error) {
        console.error('Error fetching album:', error);
        // Sample data
        setAlbum({
          title: 'Training on Statistics with Stata',
          date: '2020-12-17',
        });
        setImages([
          'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAlbum();
    }
  }, [id]);

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

        {album && (
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{album.title}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              {new Date(album.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
            >
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
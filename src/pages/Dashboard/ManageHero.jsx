import React, { useState, useEffect } from 'react';
import { Save, Image, Upload } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

export default function ManageHero() {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // ImgBB API Key
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const [formData, setFormData] = useState({
        heroImage: '',
        title: '',
        subtitle: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchHeroSettings();
    }, []);

    const fetchHeroSettings = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get('/site-settings/hero');
            if (response.data && response.data.heroImage) {
                setFormData({
                    heroImage: response.data.heroImage,
                    title: response.data.title || '',
                    subtitle: response.data.subtitle || ''
                });
            }
        } catch (error) {
            console.error('Error fetching hero settings:', error);
            toast.error('Failed to load hero settings');
        } finally {
            setLoading(false);
        }
    };

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let finalImageUrl = formData.heroImage;

            if (selectedFile) {
                const url = await uploadImageToImgBB(selectedFile);
                if (url) {
                    finalImageUrl = url;
                } else {
                    toast.error('Failed to upload image');
                    setUploading(false);
                    return;
                }
            }

            const payload = {
                heroImage: finalImageUrl,
                title: formData.title,
                subtitle: formData.subtitle
            };

            const response = await axiosSecure.put('/site-settings/hero', payload);

            if (response.data) {
                toast.success('Hero section updated successfully');
                setFormData(prev => ({ ...prev, heroImage: finalImageUrl }));
                setSelectedFile(null);
            }
        } catch (error) {
            console.error('Error updating hero settings:', error);
            toast.error('Failed to update hero settings');
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Manage Hero Section</h2>
                    <p className="text-gray-600 mt-1">Update the main hero image and text</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Image Preview */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Hero Image
                        </label>

                        <div className="mb-4">
                            {formData.heroImage || selectedFile ? (
                                <div className="relative w-full h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden border">
                                    <img
                                        src={selectedFile ? URL.createObjectURL(selectedFile) : formData.heroImage}
                                        alt="Hero Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-64 md:h-80 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
                                    <Image className="w-12 h-12 mb-2" />
                                    <p>No image set</p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition border border-gray-300">
                                <Upload className="w-5 h-5" />
                                <span>Choose New Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                            {selectedFile && <span className="text-sm text-gray-600">{selectedFile.name}</span>}
                        </div>
                    </div>

                    {/* Optional Text Fields if they want to make text dynamic later, keeping invisible/optional for now or just visible? 
             User only asked for Image. Use hidden or just don't show?
             I'll add them but keep them optional/secondary. Actually I'll interpret "want to this img will be dynamic" as just image for now.
             But I added title/subtitle in state. I'll just leave them out of UI to avoid confusion unless user asks, 
             OR I can verify if they want text dynamic too. 
             "change this image anytime everyday without change any design and without change anything"
             Implies just image. I'll comment out text fields in UI or just remove them to be safe/simple.
          */}

                    <div className="pt-4 border-t">
                        <button
                            type="submit"
                            disabled={uploading}
                            className={`flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg ${uploading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <Save className="w-5 h-5" />
                            {uploading ? 'Uploading & Saving...' : 'Save Changes'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

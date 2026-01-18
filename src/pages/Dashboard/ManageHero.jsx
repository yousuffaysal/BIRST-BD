import React, { useState, useEffect } from 'react';
import { Save, Image as ImageIcon, Upload, Loader, Layout, Type, MousePointerClick, X, Monitor } from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        fetchHeroSettings();
    }, []);

    const fetchHeroSettings = async () => {
        try {
            setLoading(true);
            const response = await axiosSecure.get('/site-settings/hero');
            if (response.data) {
                setFormData({
                    heroImage: response.data.heroImage || '',
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
            return data.success ? data.data.url : null;
        } catch (error) {
            console.error('Image upload error:', error);
            return null;
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                toast.success('Hero updated successfully');
                setFormData(prev => ({ ...prev, heroImage: finalImageUrl }));
                setSelectedFile(null);
                setPreviewUrl(null);
            }
        } catch (error) {
            console.error('Error updating hero settings:', error);
            toast.error('Failed to update hero settings');
        } finally {
            setUploading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#02bfff]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-jakarta relative p-4 lg:p-8 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#02bfff]/5 to-transparent pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#02bfff]/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                className="max-w-6xl mx-auto relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
                    <motion.div variants={itemVariants}>
                        <h1 className="text-4xl font-bold font-unbounded text-[#0B2340] mb-2">Hero Section</h1>
                        <p className="text-gray-500">Manage the visual impact of your landing page.</p>
                    </motion.div>
                </div>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column: Visual Preview */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative group">
                            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold rounded-full flex items-center gap-1">
                                <Monitor size={12} /> Desktop Preview
                            </div>

                            {/* Image Container */}
                            <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                                {previewUrl || formData.heroImage ? (
                                    <img
                                        src={previewUrl || formData.heroImage}
                                        alt="Hero Preview"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                        <ImageIcon size={48} className="mb-2 opacity-50" />
                                        <span className="text-sm font-medium">No Image Set</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                                {/* Text Overlay Preview */}
                                <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                                    <h2 className="text-3xl md:text-4xl font-black font-unbounded leading-tight mb-2 opacity-90 truncate">
                                        {formData.title || "Your Hero Title"}
                                    </h2>
                                    <p className="text-lg opacity-80 font-medium truncate">
                                        {formData.subtitle || "A catchy subtitle for your visitors"}
                                    </p>
                                </div>
                            </div>

                            {/* Upload Overlay (Interactive) */}
                            <div className="p-6 bg-white border-t border-gray-100">
                                <label className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-[#02bfff] transition-all group/upload">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <div className="w-12 h-12 bg-blue-50 text-[#02bfff] rounded-full flex items-center justify-center mb-3 group-hover/upload:scale-110 transition-transform">
                                            <Upload size={20} />
                                        </div>
                                        <p className="mb-1 text-sm text-gray-700 font-bold"><span className="text-[#02bfff]">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 1920x1080px)</p>
                                    </div>
                                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                </label>
                                {selectedFile && (
                                    <div className="mt-4 flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                                        <span className="text-sm text-[#02bfff] font-bold truncate pr-4">{selectedFile.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                                            className="text-blue-400 hover:text-red-500 transition-colors"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Settings & Actions */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
                            <div className="flex items-center gap-2 mb-6 text-[#0B2340]">
                                <Type size={20} className="text-[#02bfff]" />
                                <h3 className="text-lg font-bold font-unbounded">Content</h3>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Headline</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter main headline..."
                                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#02bfff] font-bold text-[#0B2340] placeholder-gray-400 transition-all font-unbounded text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Subheadline</label>
                                    <textarea
                                        name="subtitle"
                                        rows="3"
                                        value={formData.subtitle}
                                        onChange={handleInputChange}
                                        placeholder="Enter supporting text..."
                                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#02bfff] font-medium text-gray-700 resize-none transition-all text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#0B2340] rounded-[2rem] p-6 shadow-xl shadow-[#0B2340]/20 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#02bfff] rounded-full blur-[50px] opacity-20 pointer-events-none"></div>
                            <div className="flex items-center gap-2 mb-4">
                                <MousePointerClick size={20} className="text-[#02bfff]" />
                                <h3 className="text-lg font-bold font-unbounded">Actions</h3>
                            </div>
                            <p className="text-gray-400 text-sm mb-6">
                                Changes will reflect immediately on the live website.
                            </p>

                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#02bfff] text-white rounded-xl font-bold hover:bg-[#0099cc] transition-all shadow-lg shadow-cyan-500/20 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {uploading ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
                                {uploading ? 'Publishing...' : 'Save Changes'}
                            </button>
                        </div>
                    </motion.div>

                </form>
            </motion.div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Image as ImageIcon, X, Plus, Upload, Loader, Layout, Search, PenTool, Trash2, Calendar, User, FileText, ChevronRight, Tag, Link as LinkIcon, Save, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
    const axiosSecure = useAxiosSecure();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('list'); // 'list' or 'form'
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Initial State
    const initialFormState = {
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImage: { url: '', alt: '', caption: '' },
        tags: [],
        references: [],
        author: {
            name: '',
            role: '',
            bio: '',
            avatar: '',
            socials: { linkedin: '', twitter: '' }
        },
        category: 'Editorial',
        readingTime: { minutes: 5, words: 0 },
        // ... maintain other fields for structure if needed
        tableOfContents: [],
        contentType: 'RESEARCH_ARTICLE',
        difficultyLevel: 'INTERMEDIATE',
        completionTime: '15–20 minutes',
        language: 'en',
    };

    const [formData, setFormData] = useState(initialFormState);
    const [tempTag, setTempTag] = useState('');
    const [tempRef, setTempRef] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [authorAvatarFile, setAuthorAvatarFile] = useState(null);
    const [authorAvatarPreview, setAuthorAvatarPreview] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Slug Generator
    useEffect(() => {
        if (!editMode && formData.title) {
            const generatedSlug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [formData.title, editMode]);

    // Reading Time
    useEffect(() => {
        const text = formData.content.replace(/<[^>]*>/g, '');
        const words = text ? text.split(/\s+/).length : 0;
        const minutes = Math.ceil(words / 200);
        setFormData(prev => ({ ...prev, readingTime: { words, minutes } }));
    }, [formData.content]);


    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get('/blogs');
            setBlogs(res.data);
        } catch (error) {
            console.error('Failed to fetch blogs', error);
            toast.error("Failed to load blogs");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child, subchild] = name.split('.');
            if (subchild) {
                setFormData(prev => ({
                    ...prev, [parent]: { ...prev[parent], [child]: { ...prev[parent][child], [subchild]: value } }
                }));
            } else {
                setFormData(prev => ({
                    ...prev, [parent]: { ...prev[parent], [child]: value }
                }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Array Handlers
    const addTag = (e) => {
        if ((e.key === 'Enter' || e.type === 'click') && tempTag.trim()) {
            e.preventDefault();
            setFormData(p => ({ ...p, tags: [...p.tags, tempTag.trim()] }));
            setTempTag('');
        }
    };
    const removeTag = (idx) => setFormData(p => ({ ...p, tags: p.tags.filter((_, i) => i !== idx) }));

    const addRef = (e) => {
        if ((e.key === 'Enter' || e.type === 'click') && tempRef.trim()) {
            e.preventDefault();
            setFormData(p => ({ ...p, references: [...(p.references || []), tempRef.trim()] }));
            setTempRef('');
        }
    };
    const removeRef = (idx) => setFormData(p => ({ ...p, references: p.references.filter((_, i) => i !== idx) }));

    // Image Upload
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (type === 'cover') {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
            } else if (type === 'author') {
                setAuthorAvatarFile(file);
                setAuthorAvatarPreview(URL.createObjectURL(file));
            }
        }
    };

    const uploadToImgBB = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await fetch(image_hosting_api, { method: 'POST', body: formData });
            const data = await response.json();
            return data.success ? data.data.url : null;
        } catch (error) {
            console.error('Image upload error:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title?.trim() || !formData.content?.trim()) {
            return toast.error('Title and Content are required.');
        }

        setUploading(true);
        try {
            let coverUrl = formData.coverImage.url;
            if (imageFile) {
                const uploaded = await uploadToImgBB(imageFile);
                if (uploaded) coverUrl = uploaded;
            }

            let authorAvatarUrl = formData.author.avatar;
            if (authorAvatarFile) {
                const uploaded = await uploadToImgBB(authorAvatarFile);
                if (uploaded) authorAvatarUrl = uploaded;
            }

            const payload = {
                ...formData,
                coverImage: { ...formData.coverImage, url: coverUrl },
                author: { ...formData.author, avatar: authorAvatarUrl },
                image: coverUrl, // fallback
            };

            if (editMode) {
                await axiosSecure.put(`/blogs/${currentId}`, payload);
                toast.success('Blog updated successfully');
            } else {
                await axiosSecure.post('/blogs', payload);
                toast.success('Blog created successfully');
            }

            resetForm();
            fetchBlogs();
            setActiveTab('list');
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong.');
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setImageFile(null);
        setImagePreview(null);
        setAuthorAvatarFile(null);
        setAuthorAvatarPreview(null);
        setEditMode(false);
        setCurrentId(null);
        setTempTag('');
        setTempRef('');
    };

    const handleEdit = (blog) => {
        const mergedData = {
            ...initialFormState,
            ...blog,
            coverImage: { ...initialFormState.coverImage, ...(blog.coverImage || { url: blog.image }) },
            author: { ...initialFormState.author, ...(typeof blog.author === 'string' ? { name: blog.author } : blog.author) },
            tags: blog.tags || [],
            references: blog.references || [],
        };
        setFormData(mergedData);
        setImagePreview(mergedData.coverImage.url);
        setAuthorAvatarPreview(mergedData.author.avatar);
        setEditMode(true);
        setCurrentId(blog._id);
        setActiveTab('form');
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id, title) => {
        Swal.fire({
            title: 'Delete Article?',
            text: `Permanently delete "${title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Yes, delete',
            background: '#fff',
            customClass: {
                title: "font-unbounded text-[#0B2340]",
                popup: "rounded-3xl",
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/blogs/${id}`);
                    fetchBlogs();
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Article removed.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false,
                        customClass: {
                            title: "font-unbounded text-[#0B2340]",
                            popup: "rounded-3xl",
                        }
                    });
                } catch (error) {
                    toast.error('Failed to delete.');
                }
            }
        });
    };

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof blog.author === 'string' ? blog.author : blog.author?.name)?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-jakarta relative p-4 lg:p-8 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#02bfff]/5 to-transparent pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#02bfff]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-4xl font-bold font-unbounded text-[#0B2340] mb-2">Blog Management</h1>
                        <p className="text-gray-500">Create, edit, and manage your editorial content.</p>
                    </motion.div>

                    <div className="flex bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm relative">
                        {/* Tab Switcher */}
                        <motion.div
                            className="absolute inset-y-1.5 rounded-xl bg-[#02bfff] shadow-lg shadow-cyan-200"
                            layoutId="activeTab"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            style={{
                                width: '50%',
                                left: activeTab === 'list' ? '4px' : '50%'
                            }}
                        />
                        <button
                            onClick={() => { setActiveTab('list'); if (editMode) resetForm(); }}
                            className={`relative z-10 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors duration-300 flex items-center gap-2 ${activeTab === 'list' ? 'text-white' : 'text-gray-500 hover:text-[#0b2340]'}`}
                        >
                            <Layout size={16} /> Manage Posts
                        </button>
                        <button
                            onClick={() => { setActiveTab('form'); resetForm(); }}
                            className={`relative z-10 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors duration-300 flex items-center gap-2 ${activeTab === 'form' ? 'text-white' : 'text-gray-500 hover:text-[#0b2340]'}`}
                        >
                            <PenTool size={16} /> Create New
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'list' ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Search Bar */}
                            <div className="relative max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by title or author..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#02bfff] transition-all outline-none text-gray-700 font-medium"
                                />
                            </div>

                            {/* Blog List Grid */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 gap-4"
                            >
                                {loading ? (
                                    <div className="flex justify-center p-12"><Loader className="animate-spin text-[#02bfff]" /></div>
                                ) : filteredBlogs.length === 0 ? (
                                    <div className="text-center p-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                        <p className="text-gray-400 font-medium">No blogs found.</p>
                                    </div>
                                ) : (
                                    filteredBlogs.map((blog) => (
                                        <motion.div
                                            key={blog._id}
                                            variants={itemVariants}
                                            layout
                                            className="group bg-white rounded-3xl p-4 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#02bfff]/30 transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
                                        >
                                            <div className="w-full md:w-32 h-32 md:h-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0 relative">
                                                <img
                                                    src={blog.coverImage?.url || blog.image || 'https://via.placeholder.com/150'}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-[#02bfff]/0 group-hover:bg-[#02bfff]/10 transition-colors" />
                                            </div>

                                            <div className="flex-1 text-center md:text-left space-y-2">
                                                <h3 className="text-lg font-bold text-[#0B2340] group-hover:text-[#02bfff] transition-colors font-unbounded line-clamp-1">{blog.title}</h3>
                                                <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold text-gray-500">
                                                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                    <span className="flex items-center gap-1.5"><User size={12} /> {typeof blog.author === 'string' ? blog.author : blog.author?.name || 'Unknown'}</span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                    <span className="text-[#02bfff] bg-blue-50 px-2 py-0.5 rounded-md">{blog.readingTime?.minutes || 5} min read</span>
                                                </div>
                                                <p className="text-sm text-gray-400 line-clamp-1 max-w-2xl hidden md:block">{blog.excerpt || "No excerpt details available..."}</p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleEdit(blog)}
                                                    className="p-3 rounded-xl bg-gray-50 text-gray-600 hover:bg-[#02bfff] hover:text-white transition-colors"
                                                    title="Edit"
                                                >
                                                    <PenTool size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog._id, blog.title)}
                                                    className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
                        >
                            <div className="h-2 w-full bg-gradient-to-r from-[#02bfff] to-cyan-300" />

                            <form onSubmit={handleSubmit} className="p-8 lg:p-10 space-y-10">
                                {/* Section 1: Main Content */}
                                <div>
                                    <h3 className="text-xl font-bold font-unbounded text-[#0B2340] mb-6 flex items-center gap-2">
                                        <FileText className="text-[#02bfff]" size={24} /> Content Details
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Title</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    placeholder="Article Headline..."
                                                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#02bfff] font-bold text-[#0B2340] placeholder-gray-400 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Slug (Auto-generated)</label>
                                                <div className="relative">
                                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-mono">/blog/</span>
                                                    <input
                                                        type="text"
                                                        name="slug"
                                                        value={formData.slug}
                                                        onChange={handleChange}
                                                        className="w-full pl-20 pr-5 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#02bfff] font-mono text-sm text-[#02bfff] transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Excerpt</label>
                                                <textarea
                                                    name="excerpt"
                                                    rows="3"
                                                    value={formData.excerpt}
                                                    onChange={handleChange}
                                                    placeholder="Brief summary for social cards..."
                                                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#02bfff] font-medium text-gray-700 resize-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Cover Image</label>
                                            <div className="relative h-full min-h-[250px] border-3 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 hover:bg-[#02bfff]/5 hover:border-[#02bfff]/50 transition-all cursor-pointer group flex flex-col items-center justify-center overflow-hidden">
                                                <input type="file" onChange={(e) => handleFileChange(e, 'cover')} className="absolute inset-0 opacity-0 z-10 cursor-pointer" />
                                                {imagePreview ? (
                                                    <>
                                                        <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                        <div className="absolute top-4 right-4 z-20">
                                                            <button
                                                                type="button"
                                                                onClick={(e) => { e.preventDefault(); setImagePreview(null); setImageFile(null); setFormData(p => ({ ...p, coverImage: { ...p.coverImage, url: '' } })) }}
                                                                className="p-2 bg-white/90 rounded-full text-red-500 hover:bg-red-500 hover:text-white shadow-lg transition-colors"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="text-center p-6 transition-transform group-hover:scale-110 max-w-[80%]">
                                                        <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[#02bfff] mx-auto mb-4">
                                                            <Upload size={28} />
                                                        </div>
                                                        <p className="font-bold text-[#0B2340]">Click to upload cover</p>
                                                        <p className="text-xs text-gray-400 mt-2">or paste URL below</p>
                                                    </div>
                                                )}
                                            </div>
                                            {/* URL Fallback */}
                                            <div className="flex items-center gap-2 mt-2 px-1">
                                                <LinkIcon size={14} className="text-gray-400" />
                                                <input
                                                    type="text"
                                                    placeholder="https://..."
                                                    value={formData.coverImage.url}
                                                    onChange={handleChange}
                                                    name="coverImage.url"
                                                    className="bg-transparent border-none outline-none text-xs text-gray-500 w-full hover:text-[#02bfff] focus:text-[#02bfff] transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Markdown Editor Area */}
                                    <div className="space-y-3 mt-8">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Article Content (Markdown)</label>
                                        <div className="relative">
                                            <textarea
                                                name="content"
                                                value={formData.content}
                                                onChange={handleChange}
                                                className="w-full h-[500px] p-6 bg-[#1a1a1a] text-gray-300 font-mono text-sm rounded-3xl outline-none focus:ring-4 focus:ring-gray-200 resize-y shadow-inner leading-relaxed"
                                                placeholder="# Begin your masterpiece..."
                                            />
                                            <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs font-bold text-gray-400 border border-white/10">
                                                {formData.readingTime.words} words
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px w-full bg-gray-100" />

                                {/* Section 2: Metadata & Author */}
                                <div className="grid lg:grid-cols-2 gap-12">
                                    {/* Tags & Refs */}
                                    <div>
                                        <h3 className="text-lg font-bold font-unbounded text-[#0B2340] mb-6 flex items-center gap-2">
                                            <Tag className="text-[#02bfff]" size={20} /> Metadata
                                        </h3>
                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Tags</label>
                                                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl focus-within:ring-2 focus-within:ring-[#02bfff] transition-all">
                                                    <Plus size={18} className="text-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={tempTag}
                                                        onChange={(e) => setTempTag(e.target.value)}
                                                        onKeyDown={addTag}
                                                        placeholder="Add tags..."
                                                        className="bg-transparent border-none outline-none text-sm font-medium w-full py-2 text-[#0B2340]"
                                                    />
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {formData.tags.map((tag, i) => (
                                                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#02bfff] text-xs font-bold">
                                                            {tag}
                                                            <button type="button" onClick={() => removeTag(i)} className="hover:text-[#0b2340]"><X size={12} /></button>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">References</label>
                                                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl focus-within:ring-2 focus-within:ring-[#02bfff] transition-all">
                                                    <LinkIcon size={18} className="text-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={tempRef}
                                                        onChange={(e) => setTempRef(e.target.value)}
                                                        onKeyDown={addRef}
                                                        placeholder="Add URL references..."
                                                        className="bg-transparent border-none outline-none text-sm font-medium w-full py-2 text-[#0B2340]"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    {formData.references.map((ref, i) => (
                                                        <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 text-xs font-mono text-gray-600 border border-gray-100">
                                                            <span className="truncate flex-1">{ref}</span>
                                                            <button type="button" onClick={() => removeRef(i)} className="text-red-400 hover:text-red-600 ml-2"><X size={14} /></button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Author Profile */}
                                    <div>
                                        <h3 className="text-lg font-bold font-unbounded text-[#0B2340] mb-6 flex items-center gap-2">
                                            <User className="text-[#02bfff]" size={20} /> Author Card
                                        </h3>
                                        <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-gray-100 flex-shrink-0 overflow-hidden relative group cursor-pointer">
                                                    <input type="file" onChange={(e) => handleFileChange(e, 'author')} className="absolute inset-0 opacity-0 z-10 cursor-pointer" />
                                                    {authorAvatarPreview ? (
                                                        <img src={authorAvatarPreview} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <User size={24} />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Upload size={16} className="text-white" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 space-y-3">
                                                    <input
                                                        type="text"
                                                        name="author.name"
                                                        value={formData.author.name}
                                                        onChange={handleChange}
                                                        placeholder="Author Name"
                                                        className="w-full bg-white px-3 py-2 rounded-xl text-sm font-bold shadow-sm outline-none border border-transparent focus:border-[#02bfff] transition-all"
                                                    />
                                                    <input
                                                        type="text"
                                                        name="author.role"
                                                        value={formData.author.role}
                                                        onChange={handleChange}
                                                        placeholder="Job Title / Role"
                                                        className="w-full bg-white px-3 py-2 rounded-xl text-xs font-medium shadow-sm outline-none border border-transparent focus:border-[#02bfff] transition-all text-gray-500"
                                                    />
                                                </div>
                                            </div>
                                            <textarea
                                                name="author.bio"
                                                value={formData.author.bio}
                                                onChange={handleChange}
                                                placeholder="Short author bio..."
                                                className="w-full bg-white p-4 rounded-2xl text-xs text-gray-600 outline-none border border-transparent focus:border-[#02bfff] shadow-sm resize-none mb-4"
                                                rows="3"
                                            />
                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    name="author.socials.twitter"
                                                    value={formData.author.socials.twitter}
                                                    onChange={handleChange}
                                                    placeholder="Twitter URL"
                                                    className="bg-white px-3 py-2 rounded-xl text-[10px] shadow-sm outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    name="author.socials.linkedin"
                                                    value={formData.author.socials.linkedin}
                                                    onChange={handleChange}
                                                    placeholder="LinkedIn URL"
                                                    className="bg-white px-3 py-2 rounded-xl text-[10px] shadow-sm outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-20" /> {/* Spacer */}

                                {/* Sticky Footer Actions */}
                                <div className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-md p-4 lg:px-10 border-t border-gray-100 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => { setActiveTab('list'); resetForm(); }}
                                        className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={uploading}
                                        className="px-8 py-3 bg-[#02bfff] text-white rounded-xl font-bold hover:bg-[#0099cc] transition-all shadow-lg shadow-cyan-200/50 flex items-center gap-2 transform active:scale-95"
                                    >
                                        {uploading ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
                                        {editMode ? 'Save Changes' : 'Publish Article'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AddBlog;

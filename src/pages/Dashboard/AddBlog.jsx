
import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Image as ImageIcon, X, Plus, Upload, Loader, Layout } from 'lucide-react';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
    const axiosSecure = useAxiosSecure();
    const [blogs, setBlogs] = useState([]); // Kept for logic, though listing might be separate now or below
    const [loading, setLoading] = useState(true); // Kept for fetchBlogs logic
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Initial State following the requested JSON structure, adapted for new UI
    const initialFormState = {
        title: '',
        slug: '',
        excerpt: '',
        content: '', // Markdown/HTML

        coverImage: {
            url: '',
            alt: '',
            caption: ''
        },

        // Rich Data
        tags: [],
        references: [], // Mapped to earlier 'prerequisites' or new field? Let's add references support.

        author: {
            name: '',
            role: '',
            bio: '',
            avatar: '',
            socials: {
                linkedin: '',
                twitter: ''
            }
        },

        // Keeping these for data completeness, even if not explicitly in screenshot, we'll hide or put in "Advanced" if needed.
        // For now, I'll prioritize screenshot fields and execute mapped logic.
        category: 'Editorial',
        readingTime: { minutes: 5, words: 0 },
        tableOfContents: [], // Not explicitly in new UI, but kept for data structure
        contentType: 'RESEARCH_ARTICLE', // Not explicitly in new UI, but kept for data structure
        difficultyLevel: 'INTERMEDIATE', // Not explicitly in new UI, but kept for data structure
        completionTime: '15–20 minutes', // Not explicitly in new UI, but kept for data structure
        language: 'en', // Not explicitly in new UI, but kept for data structure
        targetAudience: [], // Not explicitly in new UI, but kept for data structure
        learningObjectives: [], // Not explicitly in new UI, but kept for data structure
        skillsCovered: [], // Not explicitly in new UI, but kept for data structure
        prerequisites: [], // Not explicitly in new UI, but kept for data structure
    };

    const [formData, setFormData] = useState(initialFormState);

    // Temporary inputs for array fields
    const [tempTag, setTempTag] = useState('');
    const [tempRef, setTempRef] = useState('');

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [authorAvatarFile, setAuthorAvatarFile] = useState(null);
    const [authorAvatarPreview, setAuthorAvatarPreview] = useState(null);

    useEffect(() => {
        fetchBlogs(); // Keep this for existing blog management logic
    }, []);

    // Auto-generate slug from title
    useEffect(() => {
        if (!editMode && formData.title) {
            const generatedSlug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [formData.title, editMode]);

    // Word count calculation
    useEffect(() => {
        const text = formData.content.replace(/<[^>]*>/g, ''); // Strip HTML
        const words = text ? text.split(/\s+/).length : 0;
        const minutes = Math.ceil(words / 200); // Avg reading speed
        setFormData(prev => ({
            ...prev,
            readingTime: { words, minutes }
        }));
    }, [formData.content]);


    const fetchBlogs = async () => {
        try {
            const res = await axiosSecure.get('/blogs');
            setBlogs(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch blogs', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested updates
        if (name.includes('.')) {
            const [parent, child, subchild] = name.split('.');
            if (subchild) {
                setFormData(prev => ({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: {
                            ...prev[parent][child],
                            [subchild]: value
                        }
                    }
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [parent]: {
                        ...prev[parent],
                        [child]: value
                    }
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
        // Using 'references' as a proxy for any list data if needed, or mapping to actual schema
        if ((e.key === 'Enter' || e.type === 'click') && tempRef.trim()) {
            e.preventDefault();
            setFormData(p => ({ ...p, references: [...(p.references || []), tempRef.trim()] }));
            setTempRef('');
        }
    };
    const removeRef = (idx) => setFormData(p => ({ ...p, references: p.references.filter((_, i) => i !== idx) }));

    // --- Image Upload Logic ---
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

        // Frontend Validation
        if (!formData.title?.trim() || !formData.content?.trim()) {
            return Swal.fire('Error', 'Title and Content are required fields.', 'error');
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

            // Construct final payload
            const payload = {
                ...formData,
                coverImage: { ...formData.coverImage, url: coverUrl },
                author: { ...formData.author, avatar: authorAvatarUrl },
                // Backwards compatibility for flat list view
                image: coverUrl, // For compatibility with existing blog list if it expects 'image'
                // Ensure arrays are arrays
                tags: formData.tags || [],
                references: formData.references || [],
                targetAudience: formData.targetAudience || [],
                learningObjectives: formData.learningObjectives || [],
                skillsCovered: formData.skillsCovered || [],
                prerequisites: formData.prerequisites || [],
                tableOfContents: formData.tableOfContents || []
            };

            if (editMode) {
                await axiosSecure.put(`/blogs/${currentId}`, payload);
                Swal.fire('Updated!', 'Blog updated successfully.', 'success');
            } else {
                await axiosSecure.post('/blogs', payload);
                Swal.fire('Success!', 'Blog added successfully.', 'success');
            }

            resetForm();
            fetchBlogs(); // Refresh the list of blogs after add/edit
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Something went wrong.', 'error');
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
        // Merge fetched data with initial structure to ensure all fields exist
        const mergedData = {
            ...initialFormState,
            ...blog,
            coverImage: { ...initialFormState.coverImage, ...(blog.coverImage || { url: blog.image }) }, // Fallback to flat image
            author: { ...initialFormState.author, ...(typeof blog.author === 'string' ? { name: blog.author } : blog.author) }, // Fallback to string author
            // Ensure arrays are properly merged, or default to empty if not present
            tags: blog.tags || [],
            references: blog.references || [], // Assuming references might be mapped from prerequisites or similar
            targetAudience: blog.targetAudience || [],
            learningObjectives: blog.learningObjectives || [],
            skillsCovered: blog.skillsCovered || [],
            prerequisites: blog.prerequisites || [],
            tableOfContents: blog.tableOfContents || []
        };

        setFormData(mergedData);
        setImagePreview(mergedData.coverImage.url);
        setAuthorAvatarPreview(mergedData.author.avatar);
        setEditMode(true);
        setCurrentId(blog._id);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/blogs/${id}`);
                    fetchBlogs();
                    Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
                } catch (error) {
                    Swal.fire('Error', 'Failed to delete.', 'error');
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4 font-sans text-gray-900">
            <div className="w-full max-w-4xl bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">

                {/* Header */}
                <div className="bg-[#FFD700] border-b-2 border-black p-6 flex justify-between items-start relative">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">New Entry</h1>
                        <p className="font-mono text-sm font-medium opacity-80">Share something new with the world.</p>
                    </div>
                    {/* Decorative Close Icon (Visual only as per UI, or works as reset) */}
                    <button onClick={() => window.history.back()} className="p-1 hover:bg-black/10 rounded transition">
                        <X size={24} strokeWidth={3} />
                    </button>

                    {/* Tag label mockup */}
                    <div className="absolute top-0 right-12 bg-black text-white px-3 py-1 text-xs font-bold uppercase rounded-b-lg">
                        Admin Mode
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 p-8 space-y-8">

                    {/* Row 1: Title & Slug */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full border-2 border-black rounded-lg p-3 font-mono text-sm focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-shadow"
                                placeholder="Enter a catchy title..."
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest">Slug</label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full border-2 border-black rounded-lg p-3 font-mono text-sm bg-gray-50 focus:outline-none"
                                placeholder="url-friendly-slug"
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-widest">Excerpt</label>
                        <input
                            type="text"
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            className="w-full border-2 border-black rounded-lg p-3 font-mono text-sm focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-shadow"
                            placeholder="A brief summary..."
                        />
                    </div>

                    {/* Cover Image - Dashed Area */}
                    <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-widest">Cover Image</label>
                        <div className="relative border-2 border-dashed border-black rounded-xl p-8 bg-gray-50 hover:bg-yellow-50 transition-colors group cursor-pointer">
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e, 'cover')}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {imagePreview ? (
                                <div className="relative aspect-video w-full h-64 overflow-hidden rounded-lg border-2 border-black">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setImagePreview(null); setImageFile(null); setFormData(prev => ({ ...prev, coverImage: { ...prev.coverImage, url: '' } })) }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full border-2 border-black hover:bg-red-600 transition"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-48 text-gray-500 group-hover:text-black">
                                    <ImageIcon size={48} strokeWidth={1.5} className="mb-4" />
                                    <p className="font-mono text-sm">Click to Upload Cover</p>
                                </div>
                            )}
                        </div>
                        {/* URL Fallback */}
                        <input
                            type="text"
                            name="coverImage.url"
                            value={formData.coverImage.url}
                            onChange={handleChange}
                            placeholder="Or paste image URL..."
                            className="w-full bg-transparent border-b border-black font-mono text-xs py-2 focus:outline-none text-gray-500"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase tracking-widest">Content (Markdown/HTML)</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full border-2 border-black rounded-lg p-4 font-mono text-sm h-64 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-shadow resize-y"
                            placeholder="# Start writing..."
                            required
                        ></textarea>
                    </div>

                    {/* Divider */}
                    <hr className="border-t-2 border-black border-dashed my-8" />

                    {/* Tags & Refs Row */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest">Tags (Enter to add)</label>
                            <div className="flex flex-wrap gap-2 mb-2 min-h-[40px]">
                                {formData.tags.map((tag, i) => (
                                    <span key={i} className="bg-yellow-300 border border-black rounded px-2 py-1 text-xs font-bold flex items-center gap-1">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(i)}><X size={12} /></button>
                                    </span>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={tempTag}
                                onChange={(e) => setTempTag(e.target.value)}
                                onKeyDown={addTag}
                                className="w-full border-2 border-black rounded-lg p-3 font-mono text-sm focus:outline-none"
                                placeholder="Design, Code, Life..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest">References (One per line)</label>
                            <div className="flex flex-col gap-1 mb-2">
                                {formData.references?.map((ref, i) => (
                                    <span key={i} className="text-xs font-mono bg-gray-100 px-2 py-1 truncate border border-gray-200 rounded flex justify-between">
                                        {ref} <button type="button" onClick={() => removeRef(i)} className="text-red-500 hover:text-red-700 ml-2">Del</button>
                                    </span>
                                ))}
                            </div>
                            <textarea
                                value={tempRef}
                                onChange={(e) => setTempRef(e.target.value)}
                                onKeyDown={addRef}
                                className="w-full border-2 border-black rounded-lg p-3 font-mono text-sm focus:outline-none h-32"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t-2 border-black border-dashed"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-4 text-xs font-bold uppercase tracking-widest">Author Details</span>
                        </div>
                    </div>

                    {/* Author Section */}
                    <div className="grid md:grid-cols-1 gap-6">
                        {/* Name & Role */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest">Author Name</label>
                                <input
                                    type="text"
                                    name="author.name"
                                    value={formData.author.name}
                                    onChange={handleChange}
                                    className="w-full border-2 border-black rounded-lg p-3 font-mono text-sm focus:outline-none"
                                    placeholder="e.g. Alex Fox"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest">Role / Job Title</label>
                                <input
                                    type="text"
                                    name="author.role"
                                    value={formData.author.role}
                                    onChange={handleChange}
                                    className="w-full border-2 border-black rounded-lg p-3 font-mono text-sm focus:outline-none"
                                    placeholder="e.g. Lead Engineer"
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest">Mini Bio</label>
                            <textarea
                                name="author.bio"
                                value={formData.author.bio}
                                onChange={handleChange}
                                className="w-full border-2 border-black rounded-lg p-3 font-mono text-sm focus:outline-none h-24"
                                placeholder="Short bio about the author..."
                            />
                        </div>

                        {/* Author Image & Socials */}
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="space-y-2 flex-shrink-0">
                                <label className="block text-xs font-bold uppercase tracking-widest text-center">Author Image</label>
                                <div className="w-24 h-24 border-2 border-black rounded-full overflow-hidden relative cursor-pointer group mx-auto bg-gray-50 hover:bg-yellow-100 transition">
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'author')}
                                        className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                                    />
                                    {authorAvatarPreview ? (
                                        <img src={authorAvatarPreview} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon size={24} className="text-gray-400 group-hover:text-black" />
                                        </div>
                                    )}
                                </div>
                                <p className="text-[10px] text-center font-mono text-gray-500">Click circle to upload</p>
                            </div>

                            <div className="flex-1 w-full space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest">Combined Socials</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="author.socials.twitter"
                                            value={formData.author.socials.twitter}
                                            onChange={handleChange}
                                            className="w-full border-2 border-black rounded-lg p-3 font-mono text-xs focus:outline-none"
                                            placeholder="https://twitter.com/..."
                                        />
                                        <input
                                            type="text"
                                            name="author.socials.linkedin"
                                            value={formData.author.socials.linkedin}
                                            onChange={handleChange}
                                            className="w-full border-2 border-black rounded-lg p-3 font-mono text-xs focus:outline-none"
                                            placeholder="https://linkedin.com/..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <hr className="border-t-2 border-black border-dashed my-8" />

                    {/* Actions */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={uploading}
                            className="bg-black text-white font-bold uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-gray-800 transition transform active:scale-95 disabled:opacity-50 flex items-center gap-2"
                        >
                            {uploading ? <Loader className="animate-spin" /> : <Plus size={20} className="stroke-[3px]" />}
                            {editMode ? 'Update Entry' : 'Save Changes'}
                        </button>
                    </div>

                </form>
            </div>

            {/* Existing Blogs Management */}
            <div className="mt-12 w-full max-w-4xl">
                <div className="bg-[#FFD700] border-2 border-black p-4 mb-4 flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-xl font-black uppercase tracking-tight">Archives & Management</h2>
                    <span className="font-mono text-xs font-bold bg-black text-white px-2 py-1">{blogs.length} ENTRIES</span>
                </div>

                <div className="bg-white border-2 border-black p-6 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-black font-mono text-xs uppercase tracking-wider">
                                    <th className="p-4 border-r-2 border-black w-1/2">Post Details</th>
                                    <th className="p-4 border-r-2 border-black">Author</th>
                                    <th className="p-4 border-r-2 border-black">Date</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="font-mono text-sm">
                                {loading ? (
                                    <tr><td colSpan="4" className="text-center p-8">Loading...</td></tr>
                                ) : blogs.length === 0 ? (
                                    <tr><td colSpan="4" className="text-center p-8 opacity-50">No entries found.</td></tr>
                                ) : (
                                    blogs.map(blog => (
                                        <tr key={blog._id} className="border-b border-black last:border-0 hover:bg-yellow-50 transition-colors">
                                            <td className="p-4 border-r-2 border-black">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 border-2 border-black bg-gray-100 flex-shrink-0 overflow-hidden">
                                                        <img
                                                            src={blog.coverImage?.url || blog.image || 'https://via.placeholder.com/150'}
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold line-clamp-1">{blog.title}</div>
                                                        <div className="text-[10px] uppercase tracking-widest opacity-60 flex gap-2">
                                                            <span>{blog.category}</span>
                                                            <span>•</span>
                                                            <span>{blog.readingTime?.minutes || 5} min</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 border-r-2 border-black text-xs">
                                                {typeof blog.author === 'object' ? blog.author.name : blog.author}
                                            </td>
                                            <td className="p-4 border-r-2 border-black text-xs">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-center gap-3">
                                                    <button
                                                        onClick={() => handleEdit(blog)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-yellow-300 border-2 border-black font-bold text-xs uppercase hover:bg-black hover:text-yellow-300 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                                                        title="Edit Entry"
                                                    >
                                                        <Layout size={14} strokeWidth={2.5} />
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(blog._id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-red-600 font-bold text-xs uppercase hover:bg-red-600 hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                                                        title="Delete Entry"
                                                    >
                                                        <X size={14} strokeWidth={2.5} />
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;


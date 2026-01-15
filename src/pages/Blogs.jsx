import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Search, Calendar, Clock, ArrowRight, User, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/blogs')
            .then((res) => {
                setBlogs(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            });
    }, [axiosPublic]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#FFFFF0]">
                <div className="flex flex-col items-center gap-4">
                    <span className="loading loading-spinner text-[#00BFFF] loading-lg"></span>
                    <p className="text-gray-500 font-medium animate-pulse">Loading Articles...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFFF0] font-sans">

            {/* Header Section */}
            <div className="bg-[#1A3C52] relative overflow-hidden pt-40 pb-20 px-4 sm:px-6 lg:px-8">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#00BFFF]/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#4AC6C6]/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

                <div className="container mx-auto relative z-10 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-[#00BFFF] text-xs font-bold uppercase tracking-wider mb-6 border border-white/5">
                            Our Blog
                        </span>
                        <h1 className="font-['Helvetica-Bold'] text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            Insights & <span className="text-[#00BFFF]">Perspectives</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Deep dives into technology, research methodologies, and the future of statistical analysis. Stay updated with our latest findings.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 -mt-10 relative z-20">

                {blogs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 bg-white rounded-[2rem] shadow-xl border border-gray-100 max-w-2xl mx-auto"
                    >
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Articles Published Yet</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            We are currently curating high-quality content for you. Please check back later for updates.
                        </p>
                        <Link to="/" className="px-8 py-3 bg-[#00BFFF] text-white font-bold rounded-full hover:bg-[#009ACD] transition-colors inline-flex items-center gap-2">
                            Go Back Home
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog, index) => {
                            // Extract data safely
                            const imageUrl = blog.coverImage?.url || blog.image || 'https://via.placeholder.com/800x600?text=No+Cover';
                            const authorName = typeof blog.author === 'object' ? blog.author.name : (blog.author || 'Admin');
                            const authorAvatar = typeof blog.author === 'object' && blog.author.avatar ? blog.author.avatar : null;
                            const readTime = blog.readingTime?.minutes || 5;
                            const category = blog.category || 'Research';

                            return (
                                <motion.div
                                    key={blog._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <Link to={`/blog/${blog._id}`} className="group flex flex-col h-full bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">

                                        {/* Image Container */}
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                                            <img
                                                src={imageUrl}
                                                alt={blog.title}
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/800x600?text=No+Cover'; }}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-xs font-bold text-[#1A3C52] uppercase tracking-wider rounded-full shadow-lg">
                                                    {category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Container */}
                                        <div className="flex flex-col flex-grow p-8">

                                            {/* Meta Data */}
                                            <div className="flex items-center gap-4 mb-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5 text-[#00BFFF]" />
                                                    <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                </div>
                                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5 text-[#00BFFF]" />
                                                    <span>{readTime} min read</span>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-[#1A3C52] mb-4 group-hover:text-[#00BFFF] transition-colors leading-tight line-clamp-2">
                                                {blog.title}
                                            </h3>

                                            <p className="text-gray-600 line-clamp-3 mb-8 flex-grow leading-relaxed">
                                                {blog.excerpt || blog.content?.replace(/<[^>]*>?/gm, "").substring(0, 150) + "..."}
                                            </p>

                                            <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                                                <div className="flex items-center gap-3">
                                                    {authorAvatar ? (
                                                        <img src={authorAvatar} alt={authorName} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
                                                    ) : (
                                                        <div className="w-9 h-9 rounded-full bg-[#00BFFF]/10 flex items-center justify-center text-[#00BFFF] font-bold text-sm">
                                                            <User className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-[#1A3C52]">{authorName}</span>
                                                    </div>
                                                </div>

                                                <span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#00BFFF] group-hover:text-white transition-all duration-300">
                                                    <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;

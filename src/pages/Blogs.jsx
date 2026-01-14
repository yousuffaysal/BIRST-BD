import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';

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
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-sm font-semibold tracking-wider text-primary uppercase">Our Latest Thoughts</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                        Insights & Perspectives
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Deep dives into technology, business, and the future of work.
                    </p>
                </div>

                {blogs.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl">
                        <p className="text-xl text-gray-500">There is no blog.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => {
                            // Extract data safely
                            const imageUrl = blog.coverImage?.url || blog.image || 'https://via.placeholder.com/800x600?text=No+Cover';
                            const authorName = typeof blog.author === 'object' ? blog.author.name : (blog.author || 'Admin');
                            const authorAvatar = typeof blog.author === 'object' && blog.author.avatar ? blog.author.avatar : null;
                            const readTime = blog.readingTime?.minutes || 5;
                            const category = blog.category || 'General';

                            return (
                                <Link to={`/blog/${blog._id}`} key={blog._id} className="group flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={imageUrl}
                                            alt={blog.title}
                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/800x600?text=No+Cover'; }}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur text-sm font-medium text-gray-900 rounded-full shadow-sm">
                                                {category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col flex-grow p-6">
                                        <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
                                            <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span>{readTime} min read</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {blog.title}
                                        </h3>

                                        <p className="text-gray-600 line-clamp-2 mb-6 flex-grow">
                                            {blog.excerpt || blog.content?.replace(/<[^>]*>?/gm, "").substring(0, 150) + "..."}
                                        </p>

                                        <div className="flex items-center gap-3 pt-6 border-t border-gray-100 mt-auto">
                                            {authorAvatar ? (
                                                <img src={authorAvatar} alt={authorName} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                    {authorName.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{authorName}</p>
                                                {typeof blog.author === 'object' && blog.author.role && (
                                                    <p className="text-xs text-gray-500">{blog.author.role}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;

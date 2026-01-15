import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Clock, Calendar, User, Tag, ArrowLeft, Target, Layers, Hash, BookOpen, Globe } from 'lucide-react';
import DOMPurify from 'dompurify';
const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get(`/blogs/${id}`)
            .then((res) => {
                setBlog(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching blog details:', error);
                setLoading(false);
            });
    }, [id, axiosPublic]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Blog Post Not Found</h2>
                <Link to="/blogs" className="btn btn-primary gap-2">
                    <ArrowLeft size={18} /> Back to Library
                </Link>
            </div>
        );
    }

    // Unpack Author Data safely
    const authorName = typeof blog.author === 'object' ? blog.author.name : (blog.author || 'Admin');
    const authorRole = typeof blog.author === 'object' ? (blog.author.role || 'Contributor') : 'Editor';
    const authorBio = typeof blog.author === 'object' ? blog.author.bio : '';
    const authorAvatar = typeof blog.author === 'object' && blog.author.avatar ? blog.author.avatar : null;

    // Unpack Image Data safely
    const coverImage = blog.coverImage?.url || blog.image || null;
    const coverCaption = blog.coverImage?.caption || '';

    // Metadata
    const readTime = blog.readingTime?.minutes || Math.ceil((blog.content || '').split(' ').length / 200) || 5;
    const difficulty = blog.difficultyLevel || 'Intermediate';

    return (
        <div className="min-h-screen bg-white">
            {/* Progress Bar (Optional - could be added later) */}

            <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                {/* Navigation */}
                <Link to="/blogs" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors mb-8 font-medium">
                    <ArrowLeft size={18} className="mr-2" />
                    Back to Articles
                </Link>

                {/* Header Section */}
                <header className="mb-10 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full uppercase tracking-wide">
                            {blog.category || 'General'}
                        </span>
                        <span className="flex items-center text-gray-500 text-sm">
                            <Clock size={16} className="mr-1.5" />
                            {readTime} min read
                        </span>
                        <span className="flex items-center text-gray-500 text-sm">
                            <Calendar size={16} className="mr-1.5" />
                            {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${difficulty === 'BEGINNER' ? 'border-green-200 text-green-700 bg-green-50' :
                            difficulty === 'ADVANCED' ? 'border-red-200 text-red-700 bg-red-50' :
                                'border-blue-200 text-blue-700 bg-blue-50'
                            }`}>
                            {difficulty}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        {blog.title}
                    </h1>

                    {blog.excerpt && (
                        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                            {blog.excerpt}
                        </p>
                    )}
                </header>

                {/* Cover Image */}
                {coverImage && (
                    <figure className="mb-12 rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={coverImage}
                            alt={blog.coverImage?.alt || blog.title}
                            className="w-full h-auto max-h-[500px] object-cover"
                        />
                        {coverCaption && (
                            <figcaption className="text-center text-gray-400 text-sm mt-3 italic">
                                {coverCaption}
                            </figcaption>
                        )}
                    </figure>
                )}

                <div className="grid lg:grid-cols-[1fr_300px] gap-12">

                    {/* Main Content */}
                    <div className="prose prose-lg prose-indigo max-w-none text-gray-800">
                        {/* Table of Contents (if exists) */}
                        {blog.tableOfContents && blog.tableOfContents.length > 0 && (
                            <div className="bg-gray-50 p-6 rounded-xl mb-8 not-prose border border-gray-100">
                                <h4 className="flex items-center text-lg font-bold text-gray-900 mb-4">
                                    <Layers size={20} className="mr-2 text-indigo-500" /> Table of Contents
                                </h4>
                                <ul className="space-y-2">
                                    {blog.tableOfContents.map((item, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="mr-2 text-gray-400 font-mono text-sm">{idx + 1}.</span>
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Blog HTML Content */}
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100 not-prose">
                                {blog.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors cursor-default">
                                        <Hash size={14} className="mr-1 text-gray-400" /> {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Author Info */}
                    <aside className="space-y-8">
                        {/* Author Card */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-8">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">About the Author</h3>
                            <div className="flex items-center gap-4 mb-4">
                                {authorAvatar ? (
                                    <img src={authorAvatar} alt={authorName} className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                                        {authorName.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <p className="font-bold text-gray-900 text-lg">{authorName}</p>
                                    <p className="text-sm text-primary font-medium">{authorRole}</p>
                                </div>
                            </div>
                            {authorBio && (
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {authorBio}
                                </p>
                            )}
                            {(blog.author?.socials?.linkedin || blog.author?.socials?.twitter) && (
                                <div className="flex gap-3 pt-4 border-t border-gray-50">
                                    {blog.author.socials.linkedin && (
                                        <a href={blog.author.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors">
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                        </a>
                                    )}
                                    {blog.author.socials.twitter && (
                                        <a href={blog.author.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1da1f2] transition-colors">
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Educational Objectives Card */}
                        {blog.learningObjectives && blog.learningObjectives.length > 0 && (
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                <h3 className="flex items-center text-sm font-bold text-blue-900 uppercase tracking-wider mb-4">
                                    <Target size={16} className="mr-2" /> Learning Objectives
                                </h3>
                                <ul className="space-y-3">
                                    {blog.learningObjectives.map((obj, i) => (
                                        <li key={i} className="flex items-start text-sm text-blue-800">
                                            <span className="mr-2 text-blue-400">•</span>
                                            {obj}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Audience & Skills */}
                        {(blog.targetAudience?.length > 0 || blog.skillsCovered?.length > 0) && (
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-6">
                                {blog.targetAudience?.length > 0 && (
                                    <div>
                                        <h3 className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                            <User size={16} className="mr-2" /> For Who?
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {blog.targetAudience.map((aud, i) => (
                                                <span key={i} className="px-2 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-600">
                                                    {aud}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {blog.skillsCovered?.length > 0 && (
                                    <div>
                                        <h3 className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                                            <BookOpen size={16} className="mr-2" /> Skills
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {blog.skillsCovered.map((skill, i) => (
                                                <span key={i} className="px-2 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-600">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* References */}
                        {blog.references && blog.references.length > 0 && (
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 mt-6">
                                <h3 className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                                    <Globe size={16} className="mr-2" /> References
                                </h3>
                                <ul className="space-y-2">
                                    {blog.references.map((ref, i) => (
                                        <li key={i} className="flex items-start">
                                            <a href={ref.startsWith('http') ? ref : `https://${ref}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all">
                                                {ref}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;

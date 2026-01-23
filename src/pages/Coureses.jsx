import React, { useState, useEffect, useContext } from 'react';
import { Clock, Users, Award, BookOpen, Star, ArrowRight, Play, ShoppingCart, Search, Filter, TrendingUp, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO/SEO';
import { pageSEO } from '../config/seoConfig';

// --- Demo Data Removed ---

export default function Coureses() {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categories = [
    'all',
    'Research & Methodology',
    'Statistics & Data Analysis',
    'Public Health & Social Sciences',
    'Data Science & AI Applications',
    'Professional & Career Skills',
    'Interdisciplinary Problem Solving',
    'Digital Tools & Technology',
    'Ethics, Compliance & Governance',
    'Capacity Building & Collaborative Projects',
    'Policy, Strategy & Management Training'
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get('/courses');
        setCourses(response.data || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [axiosPublic]);

  // Filter Logic
  const uniqueCourses = courses; // API should handle uniqueness, but if needed: courses.filter((v, i, a) => a.findIndex(v2 => (v2._id === v._id)) === i);

  const filteredCourses = uniqueCourses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Latest Included Courses for Sidebar (Just taking the last 3 added/demo entries)
  const latestCourses = [...uniqueCourses].slice(0, 5);

  const handleBuyCourse = (course) => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to purchase this course',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#000000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }
    navigate(`/courses/checkout/${course._id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fffff0]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading Learning Paths...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffff0] font-sans selection:bg-yellow-200 pt-20 lg:pt-20">
      <SEO
        title={pageSEO.courses.title}
        description={pageSEO.courses.description}
        keywords={pageSEO.courses.keywords}
        image={pageSEO.courses.image}
        path="/courses"
      />
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 sticky top-20 lg:top-20 z-30 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1" style={{ fontFamily: 'var(--font-family-space-grotesk)' }}>
                Explore Courses
              </h1>
              <p className="text-gray-500 text-sm">Discover your next learning journey</p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black transition-all duration-200"
                placeholder="Search for courses, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar (Left on Desktop) */}
          <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
            {/* Categories Widget */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold">
                <Filter className="w-5 h-5" />
                <h3>Categories</h3>
              </div>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {(showAllCategories ? categories : categories.slice(0, 5)).map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200 flex items-center justify-between group ${selectedCategory === category
                      ? 'bg-black text-white shadow-lg shadow-black/20'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    <span>{category === 'all' ? 'All Categories' : category}</span>
                    {selectedCategory === category && <ArrowRight className="w-4 h-4" />}
                  </button>
                ))}
                {categories.length > 5 && (
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="px-4 py-3 rounded-xl text-sm font-bold text-gray-500 hover:text-[#1FB6FF] hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2 border border-dashed border-gray-200 hover:border-[#1FB6FF]"
                  >
                    {showAllCategories ? (
                      <>
                        <span>Show Less</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <span>More Categories</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Latest Courses Widget */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hidden lg:block">
              <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <h3>Latest Included</h3>
              </div>
              <div className="space-y-4">
                {latestCourses.map((course, idx) => (
                  <div key={`latest-${idx}`} className="group cursor-pointer" onClick={() => navigate(`/courses/checkout/${course._id}`)}>
                    <div className="flex gap-4 items-start">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <img src={course.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors">
                          {course.title}
                        </h4>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-xs text-gray-500 font-medium">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                    {idx !== latestCourses.length - 1 && <div className="h-px bg-gray-50 my-4" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Advertising Widget */}
            <div className="bg-gradient-to-br from-[#1FB6FF] to-blue-600 p-6 rounded-3xl shadow-lg text-white text-center relative overflow-hidden hidden lg:block">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Get Certified!</h3>
                <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                  Boost your career with our premium certification programs. Validated by top industry experts.
                </p>
                <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-md active:scale-95">
                  Upgrade Now
                </button>
              </div>
            </div>
            {/* External Brand Ad (Long Section) */}
            <div onClick={() => navigate('/contact')} className="bg-gray-100 rounded-3xl border-2 border-dashed border-gray-300 p-8 text-center flex flex-col items-center justify-center min-h-[600px] group cursor-pointer hover:border-gray-400 transition-colors hidden lg:flex">
              <div className="mb-4 p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-gray-500 font-bold mb-2 uppercase tracking-widest text-sm">Advertisement</h4>
              <p className="text-gray-400 text-sm mb-6">Space available for brands</p>
              <span className="px-4 py-2 bg-white text-gray-600 text-xs font-bold rounded-full shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
                Contact to Advertise
              </span>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedCategory === 'all' ? 'All Courses' : selectedCategory}
                <span className="ml-3 text-sm font-normal text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                  {filteredCourses.length} results
                </span>
              </h2>
            </div>

            {/* Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6"
            >
              <AnimatePresence>
                {filteredCourses.map((course) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={course._id}
                    className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col group h-full"
                  >
                    {/* Image Part */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800'}
                        alt={course.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-bold text-gray-900 rounded-lg shadow-sm">
                          {course.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content Part */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-3 text-xs font-medium text-gray-500">
                        <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                          <Clock className="w-3.5 h-3.5" />
                          {course.duration || 'Flexible'}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-gray-900 font-bold">{course.rating}</span>
                          <span>({course.students})</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-[#1FB6FF] transition-colors">
                        {course.title}
                      </h3>

                      <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
                        {course.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-dashed border-gray-100 flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Price</span>
                          <span className="text-lg font-bold text-gray-900">
                            {course.currency} {course.price?.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => navigate(`/course-details/${course._id}`, { state: { course } })}
                          className="px-5 py-2.5 bg-[#1FB6FF] text-white text-sm font-bold rounded-lg hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2"
                        >
                          Details
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {courses.length === 0 && !loading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-1 md:col-span-2 relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0B2340] to-[#1a3a5f] p-12 text-center shadow-2xl border border-white/10"
              >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#1FB6FF]/20 rounded-full blur-[80px] animate-pulse"></div>
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
                  <div className="w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(31,182,255,0.2)]">
                    <BookOpen className="w-10 h-10 text-[#FFD700] animate-bounce" style={{ animationDuration: '3s' }} />
                  </div>

                  <div className="space-y-3 max-w-lg mx-auto">
                    <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                      New Curriculum <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FB6FF] to-[#00d2ff]">Coming Soon.</span>
                    </h3>
                    <p className="text-blue-200/80 text-lg leading-relaxed font-light">
                      We are crafting comprehensive learning paths designed to master research and data science. Stay tuned for expert-led courses.
                    </p>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="pt-4"
                  >
                    <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#0B2340] font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg shadow-white/10">
                      Get Notified
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ) : filteredCourses.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[32px] border border-gray-100 border-dashed">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  We couldn't find any courses matching your search "{searchQuery}". Try different keywords or categories.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-6 px-6 py-2 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-black transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect, useContext } from 'react';
import { Clock, Users, Award, BookOpen, Star, ArrowRight, Play, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

export default function Coureses() {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Statistics', 'Data Science', 'Research Methods', 'Software Training', 'Machine Learning'];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get('/courses');
        if (response.data && Array.isArray(response.data)) {
          // Only set courses if we get valid data from API
          setCourses(response.data);
        } else {
          // If API returns invalid data, set empty array
          setCourses([]);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Only use sample courses as fallback if there's a network error
        // and we want to show something. Otherwise, show empty state.
        setCourses([]);
        toast.error('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [axiosPublic]);

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading courses...</p>
        </div>
      </div>
    );
  }

  const handleBuyCourse = (course) => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to purchase this course',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#4F46E5',
        cancelButtonColor: '#6B7280',
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          {' / '}
          <span className="text-gray-900">Courses</span>
        </div>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Our Courses
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition min-h-[44px] touch-target ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category === 'all' ? 'All Courses' : category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={course.thumbnail || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800'}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-white">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-xs sm:text-sm">{course.rating || '4.5'}</span>
                    <span className="text-xs">({course.students || 0})</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 sm:px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 flex-1">
                  {course.description}
                </p>

                {/* Course Details */}
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  {course.duration && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600 flex-shrink-0" />
                      <span className="truncate">{course.duration}</span>
                    </div>
                  )}
                  {course.level && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600 flex-shrink-0" />
                      <span className="truncate">{course.level}</span>
                    </div>
                  )}
                  {course.instructor && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600 flex-shrink-0" />
                      <span className="truncate">{course.instructor}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                {course.features && course.features.length > 0 && (
                  <div className="mb-3 sm:mb-4">
                    <ul className="space-y-1">
                      {course.features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                          <Award className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Price and CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-indigo-600">
                      {course.currency || 'BDT'} {course.price?.toLocaleString() || '0'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleBuyCourse(course)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all group shadow-md hover:shadow-lg min-h-[44px] touch-target"
                  >
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-sm sm:text-base">Buy Now</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-3 sm:mb-4" />
            <p className="text-gray-600 text-base sm:text-lg">No courses found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import {
  Plus, Edit, Trash2, Save, X, Clock, Users, BookOpen,
  Star, DollarSign, Loader, GraduationCap, Layout,
  FileText, User, Image, BarChart3, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function ManageCourses() {
  const axiosSecure = useAxiosSecure();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Statistics',
    duration: '',
    level: 'Beginner',
    price: 0,
    currency: 'BDT',
    rating: 0,
    students: 0,
    thumbnail: '',
    instructor: '',
    instructorImage: '',
    instructorBio: '',
    whatYouWillLearn: [],
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/courses');
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleWhatYouWillLearnChange = (e) => {
    const whatYouWillLearn = e.target.value.split('\n');
    setFormData(prev => ({ ...prev, whatYouWillLearn }));
  };

  const openModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title || '',
        description: course.description || '',
        category: course.category || 'Statistics',
        duration: course.duration || '',
        level: course.level || 'Beginner',
        price: course.price || 0,
        currency: course.currency || 'BDT',
        rating: course.rating || 0,
        students: course.students || 0,
        thumbnail: course.thumbnail || '',
        instructor: course.instructor || '',
        instructorImage: course.instructorImage || '',
        instructorBio: course.instructorBio || '',
        whatYouWillLearn: Array.isArray(course.whatYouWillLearn) ? course.whatYouWillLearn : (Array.isArray(course.features) ? course.features : []),
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: '',
        description: '',
        category: 'Statistics',
        duration: '',
        level: 'Beginner',
        price: 0,
        currency: 'BDT',
        rating: 0,
        students: 0,
        thumbnail: '',
        instructor: '',
        instructorImage: '',
        instructorBio: '',
        whatYouWillLearn: [],
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Filter empty lines from whatYouWillLearn
      const cleanedData = {
        ...formData,
        whatYouWillLearn: formData.whatYouWillLearn.map(l => l.trim()).filter(Boolean)
      };

      if (editingCourse) {
        const response = await axiosSecure.put(`/courses/${editingCourse._id}`, cleanedData);
        if (response.data) {
          toast.success('Course updated successfully');
          fetchCourses();
          closeModal();
        }
      } else {
        const response = await axiosSecure.post('/courses', cleanedData);
        if (response.data.insertedId) {
          toast.success('Course added successfully');
          fetchCourses();
          closeModal();
        }
      }
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error('Failed to save course');
    }
  };

  const handleDelete = (course) => {
    Swal.fire({
      title: 'Delete Course?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#9CA3AF',
      confirmButtonText: 'Yes, delete it',
      background: '#fff',
      customClass: {
        title: "font-unbounded text-[#0B2340]",
        popup: "rounded-3xl",
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/courses/${course._id}`);
          if (response.data) {
            toast.success('Course deleted successfully');
            fetchCourses();
          }
        } catch (error) {
          console.error('Error deleting course:', error);
          toast.error('Failed to delete course');
        }
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="h-[calc(100vh-100px)] min-h-[600px] bg-[#FAFAFA] font-jakarta overflow-hidden flex flex-col relative rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] m-4 lg:m-0">

      {/* Unified Gradient Header */}
      <div className="px-8 py-8 border-b border-gray-100 bg-gradient-to-br from-[#0B2340] to-[#02bfff] text-white relative overflow-hidden shrink-0 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#02bfff]/30 rounded-full blur-[40px] -ml-10 -mb-10 pointer-events-none"></div>

        <div className="relative z-10 flex items-center gap-5 w-full md:w-auto">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner">
            <GraduationCap size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-unbounded text-white flex items-center gap-3">
              Manage Courses
            </h2>
            <p className="text-white/80 text-base font-medium mt-1">Curate your educational content</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#02bfff] hover:bg-white/90 rounded-xl font-bold transition-all shadow-lg shadow-black/5"
          >
            <Plus size={20} strokeWidth={3} />
            Add New Course
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-400">
            <Loader className="animate-spin text-[#02bfff]" size={40} />
            <span className="font-bold text-sm uppercase tracking-widest">Loading Courses...</span>
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <BookOpen size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2340] mb-2 font-unbounded">No Courses Found</h3>
            <p className="text-gray-500">Get started by adding your first course</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-10"
          >
            {courses.map((course) => (
              <motion.div
                key={course._id}
                variants={itemVariants}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0B2340] to-[#02bfff] flex items-center justify-center">
                      <BookOpen size={48} className="text-white/20" />
                    </div>
                  )}

                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0B2340] text-xs font-bold rounded-lg shadow-sm">
                      {course.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    {course.instructorImage && (
                      <img src={course.instructorImage} alt={course.instructor} className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                    )}
                    {course.instructor && (
                      <span className="text-xs font-bold text-white bg-black/40 px-2 py-1 rounded-full backdrop-blur-md">
                        {course.instructor}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-lg font-bold text-[#0B2340] line-clamp-2 group-hover:text-[#02bfff] transition-colors font-unbounded leading-tight">
                      {course.title}
                    </h3>
                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-sm font-bold text-[#02bfff]">
                        {course.currency} {course.price > 0 ? course.price.toLocaleString() : 'Free'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-500 mb-5 flex-1">
                    <p className="line-clamp-2 text-xs text-gray-400 mb-3">{course.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-600">
                      <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg">
                        <Clock size={12} className="text-blue-500" /> {course.duration}
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg">
                        <BarChart3 size={12} className="text-purple-500" /> {course.level}
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" /> {course.rating}
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg">
                        <Users size={12} className="text-green-500" /> {course.students}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => openModal(course)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-[#02bfff] rounded-xl font-bold text-sm transition-all"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course)}
                      className="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Header */}
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#0B2340] to-[#02bfff] shrink-0 sticky top-0 z-20">
                <h3 className="text-2xl font-bold font-unbounded text-white">
                  {editingCourse ? 'Edit Course' : 'Create New Course'}
                </h3>
                <button onClick={closeModal} className="p-2 hover:bg-white/20 rounded-full transition-colors text-white">
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info Section */}
                    <div>
                      <h4 className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-4 flex items-center gap-2">
                        <Layout size={16} /> Basic Information
                      </h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Course Title <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                            placeholder="Introduction to..."
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Category <span className="text-red-500">*</span></label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium appearance-none"
                          >
                            <option value="Statistics">Statistics</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Research Methods">Research Methods</option>
                            <option value="Software Training">Software Training</option>
                            <option value="Machine Learning">Machine Learning</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-6 space-y-2">
                        <label className="text-sm font-bold text-gray-700">Description <span className="text-red-500">*</span></label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          required
                          rows="3"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          placeholder="Write a compelling summary..."
                        />
                      </div>
                    </div>

                    {/* Details & Pricing */}
                    <div>
                      <h4 className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-4 flex items-center gap-2 border-t pt-6 border-gray-100">
                        <BarChart3 size={16} /> Level & Pricing
                      </h4>
                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Level</label>
                          <select
                            name="level"
                            value={formData.level}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium appearance-none"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Duration</label>
                          <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g. 12 Weeks"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Enrolled Students</label>
                          <input
                            type="number"
                            name="students"
                            value={formData.students}
                            onChange={handleInputChange}
                            min="0"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Price</label>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            min="0"
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Currency</label>
                          <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium appearance-none"
                          >
                            <option value="BDT">BDT</option>
                            <option value="USD">USD</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Rating (0-5)</label>
                          <input
                            type="number"
                            name="rating"
                            value={formData.rating}
                            onChange={handleInputChange}
                            min="0"
                            max="5"
                            step="0.1"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Instructor Section */}
                    <div>
                      <h4 className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-4 flex items-center gap-2 border-t pt-6 border-gray-100">
                        <User size={16} /> Instructor Info
                      </h4>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Instructor Name <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            name="instructor"
                            value={formData.instructor}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Instructor Image URL</label>
                          <input
                            type="url"
                            name="instructorImage"
                            value={formData.instructorImage}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Instructor Bio</label>
                        <input
                          type="text"
                          name="instructorBio"
                          value={formData.instructorBio}
                          onChange={handleInputChange}
                          placeholder="Brief professional bio..."
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Media & Content */}
                    <div>
                      <h4 className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-4 flex items-center gap-2 border-t pt-6 border-gray-100">
                        <Image size={16} /> Course Content & Media
                      </h4>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Course Thumbnail URL</label>
                          <input
                            type="url"
                            name="thumbnail"
                            value={formData.thumbnail}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          />
                          {formData.thumbnail && (
                            <div className="mt-2 h-32 w-48 rounded-xl overflow-hidden border border-gray-200">
                              <img src={formData.thumbnail} className="w-full h-full object-cover" alt="Preview" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">What You'll Learn (One point per line)</label>
                          <textarea
                            value={formData.whatYouWillLearn.join('\n')}
                            onChange={handleWhatYouWillLearnChange}
                            rows="5"
                            placeholder="• Master Python Programming&#10;• Build Real-world Projects&#10;• Get Certified"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="px-8 py-4 border-t border-gray-100 flex gap-4 bg-gray-50 shrink-0 sticky bottom-0 z-20">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0B2340] to-[#02bfff] text-white rounded-xl hover:shadow-lg transition-all font-bold"
                >
                  <Save size={20} />
                  {editingCourse ? 'Update Course' : 'Create Course'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

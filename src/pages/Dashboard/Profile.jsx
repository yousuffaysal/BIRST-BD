import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User, Mail, Phone, MapPin, Edit, Save, X, BookOpen, GraduationCap, Calendar, Shield, Camera, Award, Sparkles, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function Profile() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  // Fetch Profile Data
  const { data: profile, isLoading, refetch } = useQuery({
    queryKey: ['studentProfile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/profiles/${user.email}`);
        return res.data;
      } catch (err) {
        return null;
      }
    }
  });

  const isNewProfile = !profile?._id;

  useEffect(() => {
    if (user && !profile && !isLoading) {
      setFormData({
        name: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        phone: '',
        address: '',
        institution: '',
        bio: ''
      });
      setIsEditing(true);
    } else if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        photoURL: profile.photoURL,
        phone: profile.phone || '',
        address: profile.address || '',
        institution: profile.institution || '',
        bio: profile.bio || ''
      });
    }
  }, [user, profile, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('image', file);

    try {
      const res = await fetch(image_hosting_api, {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, photoURL: result.data.url }));
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNewProfile) {
        const payload = { ...formData, email: user.email };
        const res = await axiosSecure.post('/profiles', payload);
        if (res.data.insertedId) {
          toast.success("Profile created successfully!");
          refetch();
          setIsEditing(false);
        }
      } else {
        const { _id, ...updateData } = formData;
        const res = await axiosSecure.put(`/profiles/${profile._id}`, updateData);
        if (res.data.modifiedCount > 0) {
          toast.success("Profile updated successfully!");
          refetch();
          setIsEditing(false);
        } else {
          toast.info("No changes made.");
          setIsEditing(false);
        }
      }
    } catch (error) {
      toast.error("Failed to save profile.");
      console.error(error);
    }
  };

  // Fetch Enrollments
  const { data: courseEnrollments = [] } = useQuery({
    queryKey: ['my-course-enrollments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/course-enrollments/${user.email}`);
      return res.data;
    }
  });

  const { data: paymentEnrollments = [] } = useQuery({
    queryKey: ['my-payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    }
  });

  const { data: eventEnrollments = [] } = useQuery({
    queryKey: ['my-event-enrollments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/event-enrollments/${user.email}`);
      return res.data;
    }
  });

  const allCourses = [
    ...courseEnrollments.map(c => ({
      _id: c._id,
      title: c.courseTitle || c.courseName,
      date: c.createdAt,
      type: 'Free/Scholarship',
      status: 'Enrolled'
    })),
    ...paymentEnrollments
      .filter(p => p.courseId)
      .map(p => ({
        _id: p._id,
        title: p.courseTitle,
        date: p.createdAt,
        type: 'Paid',
        status: p.status
      }))
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FAFAFA]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1FB6FF]"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-jakarta relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#1FB6FF]/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#70C5D7]/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="max-w-7xl mx-auto p-4 lg:p-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-10">
          <h1 className="text-4xl font-bold font-unbounded text-[#0B2340] mb-2">My Profile</h1>
          <p className="text-gray-500">Manage your personal information and view your activity.</p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Profile Card */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#1FB6FF]/10 to-[#70C5D7]/10" />

              {/* Avatar */}
              <div className="relative z-10 mt-6 mb-4 group/avatar">
                <div className="w-32 h-32 rounded-full p-1 bg-white shadow-lg relative">
                  {uploading ? (
                    <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center animate-pulse border border-gray-100">
                      <div className="w-8 h-8 border-2 border-[#1FB6FF] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <img
                      src={formData.photoURL || profile?.photoURL || "https://ui-avatars.com/api/?name=" + (formData.name || "User") + "&background=1FB6FF&color=fff"}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}

                  {isEditing && (
                    <label className="absolute bottom-1 right-1 bg-[#1FB6FF] text-white p-2.5 rounded-full cursor-pointer hover:bg-cyan-500 transition-colors shadow-lg border-2 border-white">
                      <Camera size={16} />
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                  )}
                </div>
              </div>

              <div className="relative z-10 mb-6">
                <h2 className="text-xl font-bold text-[#0B2340] font-unbounded mb-1">{profile?.name || user?.displayName}</h2>
                <div className="flex items-center justify-center gap-2 text-sm text-[#1FB6FF] font-medium bg-[#1FB6FF]/5 px-3 py-1 rounded-full w-fit mx-auto">
                  <Shield size={14} />
                  {profile ? 'Registered Student' : 'Student'}
                </div>
              </div>

              {!isEditing && profile && (
                <button
                  onClick={() => {
                    setFormData(profile);
                    setIsEditing(true);
                    setActiveTab('info');
                  }}
                  className="w-full py-3 rounded-xl font-semibold bg-[#0B2340] text-white hover:bg-[#1FB6FF] transition-colors flex items-center justify-center gap-2"
                >
                  <Edit size={16} /> Edit Profile
                </button>
              )}
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 font-unbounded text-sm uppercase tracking-wider">Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-[#1FB6FF] group-hover:text-white transition-colors">
                      <BookOpen size={20} />
                    </div>
                    <span className="font-medium text-gray-700">Courses</span>
                  </div>
                  <span className="font-bold text-[#0B2340] text-lg">{allCourses.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      <Calendar size={20} />
                    </div>
                    <span className="font-medium text-gray-700">Events</span>
                  </div>
                  <span className="font-bold text-[#0B2340] text-lg">{eventEnrollments.length}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            {/* Tabs */}
            {profile && (
              <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { id: 'info', label: 'Personal Info', icon: User },
                  { id: 'courses', label: 'My Courses', icon: GraduationCap },
                  { id: 'events', label: 'My Events', icon: Calendar },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setIsEditing(false); }}
                    className={`relative px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-900 bg-white'
                      }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#0B2340] rounded-full shadow-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <tab.icon size={18} /> {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Content Area */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'info' && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold font-unbounded text-[#0B2340]">
                          {isNewProfile && isEditing ? 'Create Profile' : 'Personal Details'}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Manage your personal information</p>
                      </div>
                      {isEditing && !isNewProfile && (
                        <button onClick={() => setIsEditing(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors">
                          <X size={20} />
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#1FB6FF] transition-all font-semibold text-gray-900 placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            placeholder="+880..."
                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#1FB6FF] transition-all font-semibold text-gray-900 placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Institution</label>
                          <input
                            type="text"
                            name="institution"
                            value={formData.institution || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#1FB6FF] transition-all font-semibold text-gray-900 placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#1FB6FF] transition-all font-semibold text-gray-900 placeholder-gray-400"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Bio</label>
                          <textarea
                            name="bio"
                            value={formData.bio || ''}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#1FB6FF] transition-all font-medium text-gray-900 placeholder-gray-400 resize-none"
                          />
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                          {!isNewProfile && (
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors">
                              Cancel
                            </button>
                          )}
                          <button type="submit" disabled={uploading} className="px-8 py-3 rounded-xl font-bold bg-[#1FB6FF] text-white hover:bg-cyan-500 shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2">
                            <Save size={18} />Save Changes
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-y-10 gap-x-12">
                        {[
                          { icon: Mail, label: 'Email Address', value: profile?.email },
                          { icon: Phone, label: 'Phone Number', value: profile?.phone },
                          { icon: GraduationCap, label: 'Institution', value: profile?.institution },
                          { icon: MapPin, label: 'Address', value: profile?.address },
                        ].map((item, idx) => (
                          <div key={idx} className="flex gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#1FB6FF] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
                              <item.icon size={20} />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                              <p className="text-lg font-semibold text-[#0B2340]">{item.value || 'Not provided'}</p>
                            </div>
                          </div>
                        ))}

                        {profile?.bio && (
                          <div className="md:col-span-2 bg-[#F6F8FA] rounded-2xl p-6 relative">
                            <Sparkles className="absolute top-4 right-4 text-[#1FB6FF] opacity-50" size={20} />
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">About Me</p>
                            <p className="text-gray-700 leading-relaxed font-medium">{profile.bio}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'courses' && (
                  <motion.div
                    key="courses"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold font-unbounded text-[#0B2340]">Enrolled Courses</h2>
                      <div className="px-4 py-1 rounded-full bg-blue-50 text-[#1FB6FF] text-sm font-bold">{allCourses.length} Total</div>
                    </div>

                    {allCourses.length === 0 ? (
                      <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">You haven't enrolled in any courses yet.</p>
                        <Link to="/courses" className="inline-block mt-4 text-[#1FB6FF] font-bold hover:underline">Browse Courses</Link>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {allCourses.map((course, idx) => (
                          <div key={idx} className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#1FB6FF]/30 hover:shadow-lg transition-all duration-300 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1FB6FF] flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                                {course.title.charAt(0)}
                              </div>
                              <div>
                                <h3 className="font-bold text-[#0B2340] text-lg mb-1 group-hover:text-[#1FB6FF] transition-colors">{course.title}</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                  <span>{new Date(course.date).toLocaleDateString()}</span>
                                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                                  <span className="capitalize text-[#1FB6FF] font-medium">{course.type}</span>
                                </div>
                              </div>
                            </div>
                            <div className="px-4 py-2 rounded-lg bg-green-50 text-green-600 text-sm font-bold border border-green-100">
                              {course.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'events' && (
                  <motion.div
                    key="events"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold font-unbounded text-[#0B2340]">Registered Events</h2>
                      <div className="px-4 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-bold">{eventEnrollments.length} Total</div>
                    </div>

                    {eventEnrollments.length === 0 ? (
                      <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">You haven't registered for any events yet.</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {eventEnrollments.map((event, idx) => (
                          <div key={idx} className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                                <Calendar size={24} />
                              </div>
                              <div>
                                <h3 className="font-bold text-[#0B2340] text-lg mb-1 group-hover:text-purple-600 transition-colors">{event.eventTitle || event.title || 'Untitled Event'}</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                  <span>Reg: {new Date(event.createdAt).toLocaleDateString()}</span>
                                  {event.date && (
                                    <>
                                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                                      <span className="text-purple-600 font-medium">{event.date}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

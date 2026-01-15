
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User, Mail, Phone, MapPin, Edit, Save, X, BookOpen, GraduationCap, Calendar, Shield, Loader, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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
        // Update Existing
        // Exclude _id from payload to avoid immutable field error in MongoDB
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

  // Combine and deduplicate courses
  const allCourses = [
    ...courseEnrollments.map(c => ({
      _id: c._id,
      title: c.courseTitle || c.courseName,
      date: c.createdAt,
      type: 'Free/scholarship',
      status: 'Enrolled'
    })),
    ...paymentEnrollments
      .filter(p => p.courseId) // Only course payments
      .map(p => ({
        _id: p._id,
        title: p.courseTitle,
        date: p.createdAt,
        type: 'Paid',
        status: p.status
      }))
  ];

  const [activeTab, setActiveTab] = useState('info');

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A3D91]"></div></div>;
  }

  return (
    <div className="min-h-screen bg-[#FDF6E9] p-4 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Banner Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
          <div className="h-32 bg-gradient-to-r from-[#0A3D91] to-[#1FB6FF]"></div>
          <div className="px-8 pb-8">
            <div className="relative flex flex-col sm:flex-row items-center sm:items-end -mt-12 gap-6">
              {/* Profile Image with Upload */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 overflow-hidden flex-shrink-0">
                  {uploading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A3D91]"></div>
                    </div>
                  ) : (
                    formData.photoURL || profile?.photoURL ? (
                      <img src={formData.photoURL || profile?.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0A3D91] text-white text-4xl font-bold">
                        {formData.name?.charAt(0) || user?.displayName?.charAt(0)}
                      </div>
                    )
                  )}
                </div>

                {isEditing && (
                  <label className="absolute bottom-1 right-1 bg-white text-[#0A3D91] p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition border border-gray-100">
                    <Camera size={20} />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{profile?.name || user?.displayName}</h1>
                <p className="text-[#0A3D91] font-medium flex items-center justify-center sm:justify-start gap-2">
                  <Shield size={16} />
                  {isLoading ? 'Loading...' : (profile ? 'Registered Student' : 'Complete your profile')}
                </p>
              </div>

              <div>
                {!isEditing && profile && (
                  <button
                    onClick={() => {
                      setFormData(profile);
                      setIsEditing(true);
                      setActiveTab('info');
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#0A3D91] text-white rounded-xl hover:bg-[#08306B] transition shadow-lg"
                  >
                    <Edit size={18} /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        {profile && (
          <div className="bg-white rounded-2xl shadow-sm p-2 flex gap-2 overflow-x-auto">
            <button
              onClick={() => { setActiveTab('info'); setIsEditing(false); }}
              className={`px-6 py-2.5 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'info' ? 'bg-[#0A3D91] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <User size={18} /> Personal Info
            </button>
            <button
              onClick={() => { setActiveTab('courses'); setIsEditing(false); }}
              className={`px-6 py-2.5 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'courses' ? 'bg-[#0A3D91] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <BookOpen size={18} /> My Courses
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs ml-1">{allCourses.length}</span>
            </button>
            <button
              onClick={() => { setActiveTab('events'); setIsEditing(false); }}
              className={`px-6 py-2.5 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap ${activeTab === 'events' ? 'bg-[#0A3D91] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Calendar size={18} /> My Events
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs ml-1">{eventEnrollments.length}</span>
            </button>
          </div>
        )}

        {/* Tab Content */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

          {/* Personal Info Tab */}
          {activeTab === 'info' && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {isNewProfile && isEditing ? 'Create Your Student Profile' : 'Personal Information'}
                </h2>
                {isEditing && !isNewProfile && (
                  <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-red-500">
                    <X size={24} />
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      placeholder="+880..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>
                  {/* Institution */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Institution / Organization</label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>
                  {/* Address */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>
                  {/* Bio */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-gray-700">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio || ''}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0A3D91]"
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                    {!isNewProfile && (
                      <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200">Cancel</button>
                    )}
                    <button type="submit" className="flex items-center gap-2 px-8 py-2.5 bg-[#0A3D91] text-white rounded-xl font-bold hover:bg-[#08306B] shadow-lg" disabled={uploading}>
                      <Save size={18} /> {uploading ? 'Uploading...' : (isNewProfile ? 'Create Profile' : 'Save Changes')}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid md:grid-cols-2 gap-y-8 gap-x-12">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#0A3D91] mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <p className="font-semibold text-gray-900">{profile?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#0A3D91] mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <p className="font-semibold text-gray-900">{profile?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-[#0A3D91] mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Institution</p>
                      <p className="font-semibold text-gray-900">{profile?.institution || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#0A3D91] mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Address</p>
                      <p className="font-semibold text-gray-900">{profile?.address || 'Not provided'}</p>
                    </div>
                  </div>
                  {profile?.bio && (
                    <div className="md:col-span-2 pt-4 border-t border-gray-100 mt-2">
                      <p className="text-sm text-gray-500 mb-2">About Me</p>
                      <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* My Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Enrolled Courses</h2>
              {allCourses.length === 0 ? (
                <p className="text-gray-500 text-center py-8">You haven't enrolled in any courses yet.</p>
              ) : (
                <div className="grid gap-4">
                  {allCourses.map((course, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-gray-100 hover:shadow-md transition">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Enrolled on: {new Date(course.date).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${course.type === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {course.type}
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-200 text-gray-700 capitalize">
                            {course.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* My Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Registered Events</h2>
              {eventEnrollments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">You haven't registered for any events yet.</p>
              ) : (
                <div className="grid gap-4">
                  {eventEnrollments.map((event, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-gray-100 hover:shadow-md transition">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{event.eventTitle || event.title || 'Untitled Event'}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Registered on: {new Date(event.createdAt).toLocaleDateString()}
                        </p>
                        {event.date && (
                          <p className="text-sm text-blue-600 mt-1 font-semibold">
                            Event Date: {event.date}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}



import React, { useState, useEffect } from 'react';
import {
  Plus, Edit, Trash2, Save, X, Calendar, Clock, User,
  Mail, Phone, ExternalLink, MapPin, Globe, Mic, Users,
  Loader, CalendarDays, Video, RefreshCcw, Image
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function ManageEvents() {
  const axiosSecure = useAxiosSecure();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    type: 'webinar',
    date: '',
    time: '',
    speaker: '',
    speakerTitle: '',
    speakerImage: '',
    description: '',
    isFree: false,
    contact: {
      website: '',
      email: '',
      phone: '',
    },
    thumbnail: '',
    speakers: '',
    guests: '',
    topics: '',
    details: '',
    location: '',
    platform: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/events');
      setEvents(response.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [contactField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const openModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title || '',
        type: event.type || 'webinar',
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        time: event.time || '',
        speaker: event.speaker || '',
        speakerTitle: event.speakerTitle || '',
        speakerImage: event.speakerImage || '',
        description: event.description || '',
        isFree: event.isFree || false,
        contact: event.contact || { website: '', email: '', phone: '' },
        thumbnail: event.thumbnail || '',
        speakers: event.speakers ? event.speakers.join(', ') : '',
        guests: event.guests ? event.guests.join(', ') : '',
        topics: event.topics ? event.topics.join(', ') : '',
        details: event.details || '',
        location: event.location || '',
        platform: event.platform || '',
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        type: 'webinar',
        date: '',
        time: '',
        speaker: '',
        speakerTitle: '',
        speakerImage: '',
        description: '',
        isFree: false,
        contact: { website: '', email: '', phone: '' },
        thumbnail: '',
        speakers: '',
        guests: '',
        topics: '',
        details: '',
        location: '',
        platform: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Helper to process arrays
      const processArray = (str) => str ? str.split(',').map(s => s.trim()).filter(Boolean) : [];

      const payload = {
        ...formData,
        speakers: processArray(formData.speakers),
        guests: processArray(formData.guests),
        topics: processArray(formData.topics),
      };

      if (editingEvent) {
        const response = await axiosSecure.put(`/events/${editingEvent._id}`, payload);
        if (response.data) {
          toast.success('Event updated successfully');
          fetchEvents();
          closeModal();
        }
      } else {
        const response = await axiosSecure.post('/events', payload);
        if (response.data.insertedId) {
          toast.success('Event added successfully');
          fetchEvents();
          closeModal();
        }
      }
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
    }
  };

  const handleDelete = (event) => {
    Swal.fire({
      title: 'Delete Event?',
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
          const response = await axiosSecure.delete(`/events/${event._id}`);
          if (response.data) {
            toast.success('Event deleted successfully');
            fetchEvents();
          }
        } catch (error) {
          console.error('Error deleting event:', error);
          toast.error('Failed to delete event');
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

  const getTypeColor = (type) => {
    switch (type) {
      case 'webinar': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'seminar': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'workshop': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'conference': return 'bg-teal-100 text-teal-600 border-teal-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] min-h-[600px] bg-[#FAFAFA] font-jakarta overflow-hidden flex flex-col relative rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] m-4 lg:m-0">

      {/* Unified Gradient Header */}
      <div className="px-8 py-8 border-b border-gray-100 bg-gradient-to-br from-[#0B2340] to-[#02bfff] text-white relative overflow-hidden shrink-0 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#02bfff]/30 rounded-full blur-[40px] -ml-10 -mb-10 pointer-events-none"></div>

        <div className="relative z-10 flex items-center gap-5 w-full md:w-auto">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner">
            <CalendarDays size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-unbounded text-white flex items-center gap-3">
              Manage Events
            </h2>
            <p className="text-white/80 text-base font-medium mt-1">Organize webinars, workshops & conferences</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-[#02bfff] hover:bg-white/90 rounded-xl font-bold transition-all shadow-lg shadow-black/5"
          >
            <Plus size={20} strokeWidth={3} />
            Add New Event
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-400">
            <Loader className="animate-spin text-[#02bfff]" size={40} />
            <span className="font-bold text-sm uppercase tracking-widest">Loading Events...</span>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Calendar size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2340] mb-2 font-unbounded">No Events Found</h3>
            <p className="text-gray-500">Get started by creating your first event</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-10"
          >
            {events.map((event) => (
              <motion.div
                key={event._id}
                variants={itemVariants}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {event.thumbnail ? (
                    <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0B2340] to-[#02bfff] flex items-center justify-center">
                      <Calendar size={48} className="text-white/20" />
                    </div>
                  )}

                  <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
                    {event.isFree && (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-lg shadow-sm">FREE</span>
                    )}
                    <span className={`px-3 py-1 text-xs font-bold rounded-lg border shadow-sm uppercase ${getTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-[#0B2340] mb-3 line-clamp-1 group-hover:text-[#02bfff] transition-colors font-unbounded">
                    {event.title}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-500 mb-5 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[#02bfff]">
                        <Calendar size={14} />
                      </div>
                      <span className="font-medium text-gray-700">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                          <Clock size={14} />
                        </div>
                        <span className="font-medium text-gray-700">{event.time}</span>
                      </div>
                    )}
                    {event.speaker && (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                          <Mic size={14} />
                        </div>
                        <span className="font-medium text-gray-700">{event.speaker}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => openModal(event)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-[#02bfff] rounded-xl font-bold text-sm transition-all"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event)}
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
            className="fixed inset-0 bg-[#0B2340]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0 sticky top-0 z-20 backdrop-blur-md">
                <h3 className="text-2xl font-bold font-unbounded text-[#0B2340]">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h3>
                <button onClick={closeModal} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Basic Info Section */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-4 flex items-center gap-2">
                      <CalendarDays size={16} /> Basic Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Event Title <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          placeholder="e.g. Annual Tech Conference 2026"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Event Type <span className="text-red-500">*</span></label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium appearance-none"
                        >
                          <option value="webinar">Webinar</option>
                          <option value="seminar">Seminar</option>
                          <option value="workshop">Workshop</option>
                          <option value="conference">Conference</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Date & Location Section */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-4 flex items-center gap-2 border-t pt-6 border-gray-100">
                      <Clock size={16} /> Schedule & Location
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Date <span className="text-red-500">*</span></label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Time</label>
                        <input
                          type="text"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          placeholder="e.g. 10:00 AM - 4:00 PM"
                          className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="City, Country or 'Online'"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Platform / Venue</label>
                        <div className="relative">
                          <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="platform"
                            value={formData.platform}
                            onChange={handleInputChange}
                            placeholder="Zoom, Google Meet, or Hotel Name"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Speaker & Details Section */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-4 flex items-center gap-2 border-t pt-6 border-gray-100">
                      <Mic size={16} /> Speaker & Details
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Main Speaker</label>
                        <input
                          type="text"
                          name="speaker"
                          value={formData.speaker}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Speaker Title</label>
                        <input
                          type="text"
                          name="speakerTitle"
                          value={formData.speakerTitle}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <label className="text-sm font-bold text-gray-700">Speaker Image URL</label>
                      <input
                        type="url"
                        name="speakerImage"
                        value={formData.speakerImage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2 mb-6">
                      <label className="text-sm font-bold text-gray-700">Additional Speakers (comma separated)</label>
                      <input
                        type="text"
                        name="speakers"
                        value={formData.speakers}
                        onChange={handleInputChange}
                        placeholder="Dr. Smith, Prof. Johnson..."
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Guests (comma separated)</label>
                        <input
                          type="text"
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Topics (comma separated)</label>
                        <input
                          type="text"
                          name="topics"
                          value={formData.topics}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <label className="text-sm font-bold text-gray-700">Short Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Full Details / Agenda</label>
                      <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-4 flex items-center gap-2 border-t pt-6 border-gray-100">
                      <Phone size={16} /> Contact Information
                    </h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Website</label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="contact.website"
                            value={formData.contact.website}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="email"
                            name="contact.email"
                            value={formData.contact.email}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="contact.phone"
                            value={formData.contact.phone}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Media & Settings */}
                  <div>
                    <h4 className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-4 flex items-center gap-2 border-t pt-6 border-gray-100">
                      <Image size={16} /> Media & Settings
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Thumbnail URL</label>
                        <input
                          type="url"
                          name="thumbnail"
                          value={formData.thumbnail}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#02bfff]/20 focus:border-[#02bfff] outline-none transition-all font-medium"
                        />
                        {formData.thumbnail && (
                          <div className="mt-2 h-32 w-full rounded-xl overflow-hidden border border-gray-200">
                            <img src={formData.thumbnail} className="w-full h-full object-cover" alt="Preview" />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                        <input
                          type="checkbox"
                          name="isFree"
                          checked={formData.isFree}
                          onChange={handleInputChange}
                          id="isFree"
                          className="w-5 h-5 text-green-600 rounded focus:ring-green-500 border-gray-300"
                        />
                        <label htmlFor="isFree" className="text-sm font-bold text-green-700 cursor-pointer select-none">
                          Mark as Free Event (No payment required)
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex gap-4 sticky bottom-0 bg-white z-10">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0B2340] text-white rounded-xl hover:bg-[#1a3a5f] transition-all font-bold shadow-lg shadow-blue-900/20"
                    >
                      <Save size={20} />
                      {editingEvent ? 'Update Event' : 'Create Event'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

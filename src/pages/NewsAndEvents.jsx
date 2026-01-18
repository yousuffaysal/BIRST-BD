import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, User, Search, MapPin, ArrowRight, Filter, ChevronRight, Video, X, Users, FileText } from 'lucide-react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

// Helper for Water Fill Button (Reused concept for Marketing)
const WaterFillButton = ({ text, onClick, className }) => (
  <button
    onClick={onClick}
    className={`relative w-full py-4 overflow-hidden bg-black text-white font-semibold rounded-xl group isolated ${className}`}
  >
    <span className="relative z-10 font-[var(--font-family-space-grotesk)] transition-colors duration-500 group-hover:text-white">
      {text}
    </span>
    <div className="absolute inset-0 translate-y-full bg-[var(--color-birst-primary)] transition-transform duration-500 ease-out group-hover:translate-y-0"></div>
  </button>
);

// Modal Component (Duplicated from SeminarsSection for independence)
const SeminarModal = ({ seminar, onClose, onRegister }) => {
  if (!seminar) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Header Image */}
        <div className="h-48 relative overflow-hidden">
          <img
            src={seminar.thumbnail || seminar.image || 'https://via.placeholder.com/800x600?text=Event'}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
            <div>
              <span className="inline-block px-3 py-1 mb-2 text-xs font-bold text-black bg-[#FFD700] rounded-sm uppercase tracking-wider">
                {seminar.category || seminar.type || 'Event'}
              </span>
              <h2 className="text-3xl font-bold text-white leading-tight mb-4">{seminar.title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#FFD700] font-bold">
                    {new Date(seminar.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/50"></div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#FFD700]" />
                  <span>{seminar.time}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/50"></div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#FFD700]" />
                  <span>{seminar.location || 'Online'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* About */}
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <FileText size={16} /> About this Event
            </h4>
            <p className="text-gray-700 leading-relaxed text-lg">{seminar.details || seminar.description}</p>
          </div>

          {/* Speakers & Guests Grid */}
          <div className="grid md:grid-cols-2 gap-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div>
              <h4 className="text-sm font-bold text-[var(--color-birst-primary)] uppercase tracking-widest mb-4 flex items-center gap-2">
                <User size={16} /> Key Speakers
              </h4>
              <ul className="space-y-3">
                {seminar.speakers && seminar.speakers.length > 0 ? seminar.speakers.map((speaker, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                      {speaker.charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-800">{speaker}</span>
                  </li>
                )) : <li className="text-gray-500 italic">To be announced</li>}
              </ul>
            </div>
            {seminar.guests && seminar.guests.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-[var(--color-birst-accent)] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Users size={16} /> Special Guests
                </h4>
                <ul className="space-y-3">
                  {seminar.guests.map((guest, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">
                        {guest.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-800">{guest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3">Topics Covered:</h4>
            <div className="flex flex-wrap gap-2">
              {seminar.topics && seminar.topics.length > 0 ? seminar.topics.map((topic, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full border border-gray-200">
                  {topic}
                </span>
              )) : <span className="text-gray-500 italic">General Research Topics</span>}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={() => onRegister(seminar)}
              className="px-8 py-3 bg-[var(--color-birst-primary)] text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition-colors"
            >
              Complete Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function NewsAndEvents() {
  const axiosPublic = useAxiosPublic();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedSeminar, setSelectedSeminar] = useState(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    // Mock data/Sample data combined with fetch logic
    const fetchEvents = async () => {
      try {
        const response = await axiosPublic.get('/events');
        if (response.data && response.data.length > 0) {
          setEvents(response.data);
        } else {
          // Fallback to sample data if API is empty or fails
          setEvents(sampleEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents(sampleEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [axiosPublic]);

  const handleRegister = (event) => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to register for this event',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#000000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    Swal.fire({
      title: `Register for ${event.title}`,
      html: `
            <div style="text-align: left; overflow-y: auto; max-height: 60vh; padding: 0 5px;">
                 <style>
                    .swal2-input, .swal2-select { margin: 5px 0 15px !important; font-size: 14px !important; }
                    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                </style>
                <label style="font-weight: 500; font-size: 13px;">Full Name</label>
                <input id="swal-name" class="swal2-input" value="${user?.displayName || ''}" placeholder="Full Name">
                
                <label style="font-weight: 500; font-size: 13px;">Email Address</label>
                <input id="swal-email" class="swal2-input" value="${user?.email || ''}" readonly style="background-color: #f3f4f6;">
                
                <div class="form-grid">
                    <div>
                        <label style="font-weight: 500; font-size: 13px;">Phone Number</label>
                        <input id="swal-phone" class="swal2-input" placeholder="Phone">
                    </div>
                    <div>
                         <label style="font-weight: 500; font-size: 13px;">Institution/Org</label>
                         <input id="swal-institution" class="swal2-input" placeholder="Institution">
                    </div>
                </div>
            </div>
        `,
      confirmButtonText: 'Submit Registration',
      confirmButtonColor: '#0056D2',
      showCancelButton: true,
      preConfirm: () => {
        const name = document.getElementById('swal-name').value;
        const email = document.getElementById('swal-email').value;
        const phone = document.getElementById('swal-phone').value;
        const institution = document.getElementById('swal-institution').value;

        if (!name || !phone || !institution) {
          Swal.showValidationMessage('Please fill all fields');
          return false;
        }
        return { name, email, phone, institution, eventId: event._id, eventTitle: event.title };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.post('/event-enrollments', result.value);
          if (response.data.insertedId || response.data.exists) {
            Swal.fire({
              title: response.data.exists ? 'Already Registered' : 'Registration Successful!',
              text: response.data.exists ? 'You have already registered for this event.' : 'We will send you the details via email.',
              icon: response.data.exists ? 'info' : 'success',
              confirmButtonColor: '#0056D2'
            });
            if (selectedSeminar) setSelectedSeminar(null);
          }
        } catch (error) {
          Swal.fire('Error', 'Failed to register. Please try again.', 'error');
        }
      }
    });
  };

  const sampleEvents = [
    {
      _id: '1',
      title: 'Advanced Research Methodology Workshop',
      category: 'Workshop',
      date: '2025-12-15',
      time: '10:00 AM - 01:00 PM',
      location: 'Online (Zoom)',
      speaker: 'Dr. Ahasanul Haque',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
      description: 'A comprehensive deep dive into modern qualitative and quantitative research methods suitable for PhD candidates.',
    },
    {
      _id: '2',
      title: 'Mastering Thesis Writing Strategies',
      category: 'Training',
      date: '2025-12-20',
      time: '02:30 PM - 05:30 PM',
      location: 'Seminar Room A',
      speaker: 'Prof. Sarah Khan',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
      description: 'Unlock the secrets to writing a compelling thesis. Learn structural techniques and academic styling from experts.',
    },
    {
      _id: '3',
      title: 'BIRST Annual Research Conference 2026',
      category: 'Conference',
      date: '2026-01-15',
      time: '09:00 AM - 05:00 PM',
      location: 'BIRST Main Campus',
      speaker: 'Multiple Speakers',
      image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80',
      description: 'Join the largest gathering of researchers and statisticians in the country. Network and showcase your work.',
    },
    {
      _id: '4',
      title: 'AI Tools for Academic Writing',
      category: 'Seminar',
      date: '2026-02-10',
      time: '03:00 PM - 05:00 PM',
      location: 'Online',
      speaker: 'Ms. Farhana Yesmin',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
      description: 'Learn how to ethically use AI tools to enhance your research and writing productivity.',
    }
  ];

  // Filtering Logic
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || (event.type || event.category) === selectedCategory;
    const matchesDate = !filterDate || event.date === filterDate;
    return matchesSearch && matchesCategory && matchesDate;
  });

  const categories = ['All', 'Workshop', 'Seminar', 'Training', 'Conference', 'Webinar'];

  return (
    <div className="min-h-screen bg-[#FFFFF0] text-gray-800 font-['Helvetica']">

      {/* Page Header */}
      <div className="bg-[#FFFFF0] border-b border-gray-200 pt-32 pb-12">
        <div className="container px-4 mx-auto">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            <Link to="/" className="hover:text-[var(--color-birst-primary)] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[var(--color-birst-dark)]">News & Events</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-['Helvetica-Bold'] font-bold text-[var(--color-birst-dark)] mb-4">
            Latest Updates & <span className="text-[var(--color-birst-primary)]">Programs</span>
          </h1>
          <p className="max-w-2xl text-lg text-gray-500 leading-relaxed">
            Stay updated with the latest seminars, workshops, and news from BIRST. Join our community events to enhance your research skills.
          </p>
        </div>
      </div>

      <div className="container px-4 mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">

          {/* LEFT: Main Content Grid */}
          <main>
            {/* Mobile Filter Toggle (Optional/Hidden for desktop) */}

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredEvents.map((event, index) => {
                  const eventDate = new Date(event.date);
                  const day = eventDate.getDate();
                  const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();

                  return (
                    <motion.div
                      key={event._id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[var(--color-birst-primary)] hover:shadow-2xl transition-all duration-300 aspect-square"
                    >
                      {/* Image Header - Half Height */}
                      <div className="h-1/2 relative overflow-hidden shrink-0">
                        <img
                          src={event.thumbnail || event.image || 'https://via.placeholder.com/800x600?text=Event'}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-1.5 bg-[#FFD700] text-black font-bold text-sm rounded shadow-sm">
                            {event.category || event.type || 'Event'}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Date & Platform Row */}
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-baseline gap-1 text-[var(--color-birst-primary)]">
                            <span className="text-4xl font-extrabold">{day}</span>
                            <span className="text-lg font-bold uppercase">{month}</span>
                          </div>
                          <div className="h-8 w-[1px] bg-gray-200"></div>
                          <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                            <Video size={16} className="text-purple-500" />
                            {event.platform || 'Online'}
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-[var(--color-birst-dark)] mb-2 leading-snug group-hover:text-[var(--color-birst-primary)] transition-colors line-clamp-2">
                          {event.title}
                        </h3>

                        <p className="text-gray-600 mb-3 line-clamp-2 leading-relaxed text-sm">
                          {event.description}
                        </p>

                        {/* Meta Info Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock size={16} className="text-gray-400" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin size={16} className="text-gray-400" />
                            <span className="truncate">{event.location || 'Online'}</span>
                          </div>
                        </div>

                        <div className="mt-auto flex flex-col gap-4">
                          <WaterFillButton
                            text="Register Now"
                            onClick={() => handleRegister(event)}
                          />
                          <button
                            onClick={() => setSelectedSeminar(event)}
                            className="text-center text-sm font-bold text-gray-400 hover:text-[var(--color-birst-dark)] underline decoration-2 underline-offset-4 transition-colors"
                          >
                            View Seminar Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 text-gray-400">
                  <Search size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setFilterDate(''); }}
                  className="mt-6 text-[var(--color-birst-primary)] font-bold hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>

          {/* RIGHT: Sidebar */}
          <aside className="space-y-8 h-fit lg:sticky lg:top-28">

            {/* 1. Search Widget */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
              <h3 className="text-lg font-bold text-[var(--color-birst-dark)] mb-4 inline-block border-b-2 border-[#FFD700] pb-1">
                Search
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-birst-primary)]/20 focus:border-[var(--color-birst-primary)] transition-all text-sm font-medium"
                />
                <Search className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
              </div>
            </div>

            {/* 2. Filter Widget */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
              {/* Decorative Lineup */}
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <path d="M0 0L60 60M20 0L60 40M40 0L60 20M0 20L40 60M0 40L20 60" stroke="#000" strokeWidth="2" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-[var(--color-birst-dark)] mb-6 inline-block border-b-2 border-[#FFD700] pb-1">
                Filter Events
              </h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Filter size={12} /> Category
                </h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategory === cat ? 'bg-[var(--color-birst-primary)] border-[var(--color-birst-primary)]' : 'border-gray-300 bg-white group-hover:border-[var(--color-birst-primary)]'}`}>
                        {selectedCategory === cat && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <input
                        type="radio"
                        name="category"
                        className="hidden"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                      />
                      <span className={`text-sm font-medium transition-colors ${selectedCategory === cat ? 'text-[var(--color-birst-primary)]' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Calendar size={12} /> By Date
                </h4>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[var(--color-birst-primary)] text-sm font-medium text-gray-700"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                />
              </div>
            </div>

            {/* 3. Marketing Widget */}
            <div className="bg-[var(--color-birst-dark)] p-8 rounded-2xl relative overflow-hidden text-center group">
              <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 100 L100 0" stroke="white" strokeWidth="0.5" />
                  <path d="M20 100 L100 20" stroke="white" strokeWidth="0.5" />
                  <path d="M40 100 L100 40" stroke="white" strokeWidth="0.5" />
                  <path d="M60 100 L100 60" stroke="white" strokeWidth="0.5" />
                  <path d="M80 100 L100 80" stroke="white" strokeWidth="0.5" />
                  <path d="M0 80 L80 0" stroke="white" strokeWidth="0.5" />
                  <path d="M0 60 L60 0" stroke="white" strokeWidth="0.5" />
                  <path d="M0 40 L40 0" stroke="white" strokeWidth="0.5" />
                  <path d="M0 20 L20 0" stroke="white" strokeWidth="0.5" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <User className="text-[#FFD700]" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-['Helvetica-Bold']">
                  Join BIRST Today
                </h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                  Unlock exclusive research content, courses, and expert mentorship. Start your journey now.
                </p>
                <WaterFillButton
                  text="Register Now"
                  className="bg-white !text-black hover:text-white"
                  onClick={() => navigate('/login')}
                />
              </div>
            </div>

          </aside>

        </div>
      </div>

      {/* Modal Outlet */}
      {selectedSeminar && (
        <SeminarModal
          seminar={selectedSeminar}
          onClose={() => setSelectedSeminar(null)}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
}
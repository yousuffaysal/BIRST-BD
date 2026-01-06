import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ExternalLink, User, Search, MapPin, ArrowRight, Filter, ChevronRight } from 'lucide-react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

// Helper for Water Fill Button (Reused concept for Marketing)
const WaterFillButton = ({ text, onClick, className }) => (
  <button
    onClick={onClick}
    className={`relative w-full py-3 overflow-hidden bg-black text-white font-bold rounded-full group isolated ${className}`}
  >
    <span className="relative z-10 font-['Space_Grotesk'] transition-colors duration-500 group-hover:text-white uppercase tracking-wider text-sm">
      {text}
    </span>
    <div className="absolute inset-0 translate-y-full bg-[var(--color-birst-primary)] transition-transform duration-500 ease-out group-hover:translate-y-0"></div>
  </button>
);

export default function NewsAndEvents() {
  const axiosPublic = useAxiosPublic();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

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
                {filteredEvents.map((event) => (
                  <div key={event._id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[var(--color-birst-primary)] hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <div className="h-56 relative overflow-hidden bg-gray-100">
                      <img
                        src={event.image || event.thumbnail || 'https://via.placeholder.com/800x600?text=Event'}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-[var(--color-birst-dark)] shadow-sm">
                        {event.category || event.type || 'Event'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-sm text-[var(--color-birst-primary)] font-bold mb-3">
                        <Calendar size={14} />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>

                      <h3 className="text-xl font-bold text-[var(--color-birst-dark)] mb-3 leading-snug group-hover:text-[var(--color-birst-primary)] transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {event.description}
                      </p>

                      <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                          <MapPin size={14} />
                          <span className="truncate max-w-[150px]">{event.location || 'Online'}</span>
                        </div>
                        <button className="flex items-center gap-1 text-sm font-bold text-[var(--color-birst-dark)] hover:text-[var(--color-birst-primary)] transition-colors group-hover/btn">
                          Details <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
                  className="bg-white text-black hover:text-white"
                />
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight, Video, X, User, Users, FileText } from "lucide-react";
import { motion } from "framer-motion";
import seminarImage from "../../assets/seminar.png";

// Enhanced Data
// Data moved to API
// const seminars = [...];

// Modal Component
const SeminarModal = ({ seminar, onClose, onRegister }) => {
    if (!seminar) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scale-up border border-white/20">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-white hover:text-red-500 transition-all z-20"
                >
                    <X size={24} />
                </button>

                {/* Hero Header */}
                <div className="relative h-80 md:h-96">
                    <img src={seminar.thumbnail || seminarImage} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2340] via-[#0B2340]/50 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold text-[#0B2340] bg-[#FFD700] rounded-full uppercase tracking-widest shadow-lg">
                            {seminar.category || seminar.type || 'Event'}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 max-w-3xl font-[var(--font-family-space-grotesk)]">
                            {seminar.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-6 text-white/90 font-medium text-sm md:text-base">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                <span className="text-[#FFD700] font-bold text-lg">
                                    {new Date(seminar.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                <Clock size={16} className="text-[#FFD700]" />
                                <span>{seminar.time}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                <MapPin size={16} className="text-[#FFD700]" />
                                <span>{seminar.location || 'Online'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-0">
                    {/* Main Content */}
                    <div className="md:col-span-2 p-8 md:p-12 space-y-10">
                        {/* About */}
                        <section>
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <FileText size={18} className="text-[var(--color-birst-primary)]" /> About this Event
                            </h4>
                            <p className="text-gray-700 leading-relaxed text-lg font-light">
                                {seminar.details || seminar.description}
                            </p>
                        </section>

                        {/* Topics */}
                        <section>
                            <h4 className="text-sm font-bold text-gray-900 mb-4 font-[var(--font-family-space-grotesk)]">Topics Covered</h4>
                            <div className="flex flex-wrap gap-2">
                                {seminar.topics && seminar.topics.length > 0 ? seminar.topics.map((topic, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-xl border border-gray-100 hover:border-[var(--color-birst-primary)] transition-colors cursor-default">
                                        # {topic}
                                    </span>
                                )) : <span className="text-gray-500 italic">General Research Topics</span>}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / speakers */}
                    <div className="md:col-span-1 bg-gray-50 p-8 md:p-12 border-l border-gray-100 flex flex-col gap-8">
                        {/* Speakers */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">
                                Speakers
                            </h4>
                            <ul className="space-y-4">
                                {seminar.speakers && seminar.speakers.length > 0 ? seminar.speakers.map((speaker, idx) => (
                                    <li key={idx} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[var(--color-birst-primary)] font-bold text-sm group-hover:bg-[var(--color-birst-primary)] group-hover:text-white transition-colors">
                                            {speaker.charAt(0)}
                                        </div>
                                        <span className="font-bold text-gray-800 text-sm">{speaker}</span>
                                    </li>
                                )) : <li className="text-gray-500 italic text-sm">To be announced</li>}
                            </ul>
                        </div>

                        {/* Guests (Optional) */}
                        {seminar.guests && seminar.guests.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">
                                    Special Guests
                                </h4>
                                <ul className="space-y-4">
                                    {seminar.guests.map((guest, idx) => (
                                        <li key={idx} className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[var(--color-birst-accent)] font-bold text-sm group-hover:bg-[var(--color-birst-accent)] group-hover:text-white transition-colors">
                                                {guest.charAt(0)}
                                            </div>
                                            <span className="font-bold text-gray-800 text-sm">{guest}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA Section in Sidebar */}
                        <div className="mt-auto pt-8">
                            <button
                                onClick={() => onRegister(seminar)}
                                className="w-full py-4 bg-black text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                Register Now
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4">
                                Limited seats available.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Registration Modal Component
const RegistrationModal = ({ seminar, user, onClose, onSubmit }) => {
    if (!seminar) return null;

    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        institution: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, eventId: seminar._id, eventTitle: seminar.title });
    };

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative animate-scale-up overflow-hidden">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 font-[var(--font-family-space-grotesk)]">
                        Register for {seminar.title}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-birst-primary)] focus:ring-1 focus:ring-[var(--color-birst-primary)] transition-all text-gray-800 font-medium"
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    readOnly
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-birst-primary)] focus:ring-1 focus:ring-[var(--color-birst-primary)] transition-all text-gray-800 font-medium"
                                    placeholder="Phone"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Institution/Org</label>
                                <input
                                    type="text"
                                    value={formData.institution}
                                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-birst-primary)] focus:ring-1 focus:ring-[var(--color-birst-primary)] transition-all text-gray-800 font-medium"
                                    placeholder="Institution"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4 mt-6">
                            <button
                                type="submit"
                                className="flex-1 py-3.5 bg-[#0056D2] text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                            >
                                Submit Registration
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-3.5 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

import { AuthContext } from "../../Providers/AuthProvider";
import { useContext, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SeminarsSection = () => {
    const [selectedSeminar, setSelectedSeminar] = useState(null);
    const [registeringSeminar, setRegisteringSeminar] = useState(null);
    const [events, setEvents] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axiosPublic.get('/events');
                if (res.data) {
                    setEvents(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch events", error);
            }
        };
        fetchEvents();
    }, [axiosPublic]);

    const handleRegister = (seminar) => {
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
                    // Since this is on home page, maybe just go to login. 
                    // Or pass state to redirect back.
                    navigate('/login');
                }
            });
            return;
        }

        setRegisteringSeminar(seminar);
    };

    const handleRegistrationSubmit = async (data) => {
        try {
            const response = await axiosPublic.post('/event-enrollments', data);
            if (response.data.insertedId || response.data.exists) {
                Swal.fire({
                    title: response.data.exists ? 'Already Registered' : 'Registration Successful!',
                    text: response.data.exists ? 'You have already registered for this event.' : 'We will send you the details via email.',
                    icon: response.data.exists ? 'info' : 'success',
                    confirmButtonColor: '#0056D2'
                });
                setRegisteringSeminar(null);
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to register. Please try again.', 'error');
        }
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-end justify-between mb-16 gap-6 md:flex-row">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="inline-block px-3 py-1 mb-4 text-sm font-semibold tracking-wider uppercase text-[var(--color-birst-primary)] bg-blue-50 rounded-full"
                        >
                            Upcoming Events
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            className="text-3xl font-bold text-[var(--color-birst-dark)] lg:text-4xl"
                        >
                            Featured Seminars & Workshops
                        </motion.h2>
                    </div>
                    {/* FIXED: Restored Link to /newsAndEvents instead of inline toggle */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                        <Link to="/newsAndEvents" className="group flex items-center gap-2 font-semibold text-[var(--color-birst-primary)] hover:text-[var(--color-birst-accent)] transition-colors">
                            View All Events
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                {/* 2 Column Grid for BIGGER Cards */}
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                    {/* Limit to first 2 items from backend */}
                    {events.length > 0 ? (
                        events.slice(0, 2).map((seminar, index) => {
                            const eventDate = new Date(seminar.date);
                            const day = eventDate.getDate();
                            const month = eventDate.toLocaleString('default', { month: 'short' }).toUpperCase();

                            return (
                                <motion.div
                                    key={seminar._id}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 1.2, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[var(--color-birst-primary)] hover:shadow-2xl transition-all duration-300 h-full"
                                >
                                    {/* Image Header - Aspect Video for better fit with text */}
                                    <div className="h-64 relative overflow-hidden">
                                        <img
                                            src={seminar.thumbnail || seminarImage}
                                            alt="Seminar"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-4 py-1.5 bg-[#FFD700] text-black font-bold text-sm rounded shadow-sm">
                                                {seminar.category || seminar.type || 'Event'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-8 flex flex-col flex-1">
                                        {/* Date & Month Row */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="flex items-baseline gap-1 text-[var(--color-birst-primary)]">
                                                <span className="text-4xl font-extrabold">{day}</span>
                                                <span className="text-lg font-bold uppercase">{month}</span>
                                            </div>
                                            <div className="h-8 w-[1px] bg-gray-200"></div>
                                            <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                                                <Video size={16} className="text-purple-500" />
                                                {seminar.platform || 'Online'}
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-[var(--color-birst-dark)] mb-3 leading-snug group-hover:text-[var(--color-birst-primary)] transition-colors">
                                            {seminar.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                                            {seminar.description}
                                        </p>

                                        {/* Meta Info Grid */}
                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Clock size={16} className="text-gray-400" />
                                                <span>{seminar.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <MapPin size={16} className="text-gray-400" />
                                                <span className="truncate">{seminar.location || 'Online'}</span>
                                            </div>
                                        </div>

                                        {/* Actions Footer */}
                                        <div className="mt-auto flex flex-col gap-4">
                                            {/* Enroll Button with Water Fill Effect */}
                                            <button
                                                onClick={() => handleRegister(seminar)}
                                                className="w-full py-4 bg-black text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                            >
                                                Register Now
                                            </button>

                                            {/* Details Link */}
                                            <button
                                                onClick={() => setSelectedSeminar(seminar)}
                                                className="text-center text-sm font-bold text-gray-400 hover:text-[var(--color-birst-dark)] underline decoration-2 underline-offset-4 transition-colors"
                                            >
                                                View Seminar Details
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="col-span-1 md:col-span-2 text-center py-10 bg-gray-50 rounded-2xl">
                            <p className="text-gray-500">No upcoming events scheduled at the moment.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Registration Modal Outlet */}
            {registeringSeminar && (
                <RegistrationModal
                    seminar={registeringSeminar}
                    user={user}
                    onClose={() => setRegisteringSeminar(null)}
                    onSubmit={handleRegistrationSubmit}
                />
            )}

            {/* Modal Outlet */}
            {selectedSeminar && (
                <SeminarModal
                    seminar={selectedSeminar}
                    onClose={() => setSelectedSeminar(null)}
                    onRegister={(s) => {
                        setSelectedSeminar(null);
                        handleRegister(s);
                    }}
                />
            )}
        </section>
    );
};

export default SeminarsSection;
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
                    <img src={seminar.thumbnail || seminarImage} alt="Cover" className="w-full h-full object-cover" />
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

// Water Fill Button Component
const WaterFillButton = ({ text, onClick }) => (
    <button onClick={onClick} className="relative w-full py-4 overflow-hidden bg-black text-white font-semibold rounded-xl group isolated">
        <span className="relative z-10 font-[var(--font-family-space-grotesk)] transition-colors duration-500 group-hover:text-white">
            {text}
        </span>
        {/* Fill Effect Layer */}
        <div className="absolute inset-0 translate-y-full bg-[var(--color-birst-primary)] transition-transform duration-500 ease-out group-hover:translate-y-0 wave-effect"></div>
    </button>
);

import { AuthContext } from "../../Providers/AuthProvider";
import { useContext, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SeminarsSection = () => {
    const [selectedSeminar, setSelectedSeminar] = useState(null);
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

        Swal.fire({
            title: `Register for ${seminar.title}`,
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
                return { name, email, phone, institution, eventId: seminar._id, eventTitle: seminar.title };
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
                                            <WaterFillButton text="Register Now" onClick={() => handleRegister(seminar)} />

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

            {/* Modal Outlet */}
            {selectedSeminar && (
                <SeminarModal
                    seminar={selectedSeminar}
                    onClose={() => setSelectedSeminar(null)}
                    onRegister={handleRegister}
                />
            )}
        </section>
    );
};

export default SeminarsSection;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {
    Trash2, Search, Mail, Phone, MapPin, Calendar, Clock,
    Building2, CalendarRange, RefreshCcw, Loader, LayoutList
} from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ShowEventEnrollment = () => {
    const axiosSecure = useAxiosSecure();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const [enrollRes, profileRes] = await Promise.all([
                axiosSecure.get('/event-enrollments'),
                axiosSecure.get('/profiles')
            ]);

            // Create a map of email -> photoURL for quick lookup
            const profileMap = {};
            if (Array.isArray(profileRes.data)) {
                profileRes.data.forEach(profile => {
                    if (profile.email) {
                        profileMap[profile.email.toLowerCase()] = profile.photoURL;
                    }
                });
            }

            // Merge photoURL into enrollments
            const mergedData = (enrollRes.data || []).map(item => ({
                ...item,
                photoURL: profileMap[item.email?.toLowerCase()] || item.photoURL || item.image
            }));

            // Sort by newest first
            const sortedData = mergedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setEnrollments(sortedData);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load enrollments');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        Swal.fire({
            title: 'Delete Enrollment?',
            text: "This action cannot be undone!",
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
                    const res = await axiosSecure.delete(`/event-enrollments/${id}`);
                    if (res.data.message === 'Enrollment deleted successfully') {
                        toast.success('Enrollment deleted');
                        setEnrollments(prev => prev.filter(item => item._id !== id));
                    }
                } catch (error) {
                    toast.error('Failed to delete enrollment');
                }
            }
        });
    };

    const filteredEnrollments = enrollments.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.eventTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.institution?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group by Event Title
    const groupedEnrollments = filteredEnrollments.reduce((acc, enrollment) => {
        const event = enrollment.eventTitle || 'Unknown Event';
        if (!acc[event]) acc[event] = [];
        acc[event].push(enrollment);
        return acc;
    }, {});

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="h-[calc(100vh-100px)] min-h-[600px] bg-[#FAFAFA] font-jakarta overflow-hidden flex flex-col relative rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] m-4 lg:m-0">

            {/* Unified Gradient Header */}
            <div className="px-8 py-8 border-b border-gray-100 bg-gradient-to-br from-[#0B2340] to-[#02bfff] text-white relative overflow-hidden shrink-0 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#02bfff]/30 rounded-full blur-[40px] -ml-10 -mb-10 pointer-events-none"></div>

                {/* Title Section */}
                <div className="relative z-10 flex items-center gap-5 w-full md:w-auto">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shrink-0 shadow-inner">
                        <CalendarRange size={28} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold font-unbounded text-white flex items-center gap-3">
                            Event Enrollments
                        </h2>
                        <p className="text-white/80 text-base font-medium mt-1">Grouped by active events</p>
                    </div>
                </div>

                {/* Actions Section */}
                <div className="relative z-10 flex items-center gap-4 w-full md:w-auto">
                    <div className="relative group flex-1 md:w-96">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search participants or events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 outline-none focus:bg-white/20 focus:border-white/30 text-white placeholder-white/50 transition-all font-medium text-lg"
                        />
                    </div>
                    <button
                        onClick={fetchEnrollments}
                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white/90 hover:text-white transition-colors backdrop-blur-md border border-white/10"
                        title="Refresh"
                    >
                        <RefreshCcw size={22} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-400">
                        <Loader className="animate-spin text-[#02bfff]" size={40} />
                        <span className="font-bold text-sm uppercase tracking-widest">Loading Records...</span>
                    </div>
                ) : Object.keys(groupedEnrollments).length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <LayoutList size={48} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-[#0B2340] mb-2 font-unbounded">No Enrollments Found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-10"
                    >
                        {Object.entries(groupedEnrollments).map(([eventTitle, participants]) => (
                            <motion.div key={eventTitle} variants={sectionVariants} className="space-y-4">
                                <div className="flex items-center gap-4 pb-2 border-b border-gray-100">
                                    <div className="w-1.5 h-8 bg-gradient-to-b from-[#0B2340] to-[#02bfff] rounded-full"></div>
                                    <h3 className="text-xl font-bold font-unbounded text-[#0B2340]">
                                        {eventTitle}
                                    </h3>
                                    <span className="px-3 py-1 bg-blue-50 text-[#02bfff] text-xs font-bold rounded-full border border-blue-100">
                                        {participants.length} Participant{participants.length !== 1 ? 's' : ''}
                                    </span>
                                </div>

                                <div className="grid gap-4">
                                    {participants.map((enrollment) => (
                                        <div
                                            key={enrollment._id}
                                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col xl:flex-row gap-6 xl:items-center justify-between"
                                        >
                                            {/* Left: Participant Info */}
                                            <div className="flex items-start gap-5 min-w-0 xl:w-1/3">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B2340] to-[#02bfff] flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/10 overflow-hidden">
                                                    {enrollment.photoURL || enrollment.image ? (
                                                        <img
                                                            src={enrollment.photoURL || enrollment.image}
                                                            alt={enrollment.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-white font-bold text-xl font-unbounded">{enrollment.name.charAt(0)}</span>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="text-lg font-bold text-[#0B2340] mb-1 truncate">{enrollment.name}</h3>
                                                    <div className="flex flex-col gap-1 text-sm text-gray-500">
                                                        <span className="flex items-center gap-2 truncate">
                                                            <Mail size={14} className="text-[#02bfff]" /> {enrollment.email}
                                                        </span>
                                                        <span className="flex items-center gap-2 truncate">
                                                            <Phone size={14} className="text-[#02bfff]" /> {enrollment.phone}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Middle: Details */}
                                            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 min-w-0 flex-1 text-sm text-gray-500">
                                                <div className="flex items-center gap-2">
                                                    <Building2 size={16} className="text-gray-400" />
                                                    <span className="font-medium text-gray-700">{enrollment.institution || 'No Institution'}</span>
                                                </div>
                                                {/* Add more specific fields if available in event enrollment schema */}
                                            </div>

                                            {/* Right: Meta & Actions */}
                                            <div className="flex xl:flex-col items-center xl:items-end justify-between xl:justify-center gap-4 xl:gap-2 border-t xl:border-t-0 border-gray-100 pt-4 xl:pt-0 mt-2 xl:mt-0 xl:w-40 shrink-0">
                                                <div className="text-right">
                                                    <div className="flex items-center gap-1.5 text-sm font-bold text-[#0B2340] justify-end">
                                                        <Clock size={14} className="text-[#02bfff]" />
                                                        {new Date(enrollment.createdAt).toLocaleDateString()}
                                                    </div>
                                                    <span className="text-xs text-gray-400 font-medium">{new Date(enrollment.createdAt).toLocaleTimeString()}</span>
                                                </div>

                                                <button
                                                    onClick={(e) => handleDelete(enrollment._id, e)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg font-bold text-sm transition-all shadow-sm"
                                                >
                                                    <Trash2 size={16} /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ShowEventEnrollment;

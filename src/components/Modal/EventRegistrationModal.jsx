import React, { useState, useEffect } from "react";
import { X, User, Mail, Phone, Building, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EventRegistrationModal = ({ seminar, user, onClose, onSubmit }) => {
    if (!seminar) return null;

    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        institution: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate a small smooth delay or just call onSubmit
        await onSubmit({ ...formData, eventId: seminar._id, eventTitle: seminar.title });
        setIsSubmitting(false);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                {/* Backdrop with Blur */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20"
                >
                    {/* Decorative Header Background */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-[#0B2340] to-[#1a4c8a] z-0">
                        <div className="absolute top-[-50%] left-[-20%] w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-[#1FB6FF]/20 rounded-full blur-2xl" />
                    </div>

                    {/* Content Wrapper */}
                    <div className="relative z-10 px-6 pt-8 pb-8 md:px-10">
                        {/* Header Section */}
                        <div className="flex justify-between items-start mb-8">
                            <div className="text-white">
                                <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3">
                                    Event Registration
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                                    {seminar.title}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 -mt-6 border border-gray-100">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name Input */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-[var(--color-birst-primary)] transition-colors" size={18} />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[var(--color-birst-primary)] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email Input (Read Only) */}
                                <div className="space-y-1.5 opacity-70">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            readOnly
                                            className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-transparent rounded-xl text-gray-500 font-medium cursor-not-allowed select-none"
                                        />
                                    </div>
                                </div>

                                {/* Two Column Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Phone</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-[var(--color-birst-primary)] transition-colors" size={18} />
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[var(--color-birst-primary)] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400"
                                                placeholder="+880..."
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Institution</label>
                                        <div className="relative group">
                                            <Building className="absolute left-3.5 top-3.5 text-gray-400 group-focus-within:text-[var(--color-birst-primary)] transition-colors" size={18} />
                                            <input
                                                type="text"
                                                value={formData.institution}
                                                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[var(--color-birst-primary)] focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400"
                                                placeholder="University/Org"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="pt-4 flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-6 py-3.5 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors w-1/3"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#0056D2] to-[#1FB6FF] hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin w-5 h-5" />
                                                Registering...
                                            </>
                                        ) : (
                                            <>
                                                Confirm Registration
                                                <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default EventRegistrationModal;

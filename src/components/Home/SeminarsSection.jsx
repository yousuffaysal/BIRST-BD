import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight, Video, X, User, Users, FileText } from "lucide-react";
import { motion } from "framer-motion";
import seminarImage from "../../assets/seminar.png";

// Enhanced Data
const seminars = [
    {
        id: 1,
        title: "Advanced Research Methodology",
        day: "15",
        month: "DEC",
        time: "10:00 AM - 01:00 PM",
        platform: "Zoom Meeting",
        location: "Online",
        category: "Workshop",
        description: "A comprehensive deep dive into modern qualitative and quantitative research methods suitable for PhD candidates.",
        details: "This interactive workshop covers the entire research lifecycle, from problem formulation to hypothesis testing. Participants will learn how to design robust studies and avoid common pitfalls in academic research.",
        speakers: ["Dr. Ahasanul Haque", "Prof. M. Rahman"],
        guests: ["Dean of Social Sciences"],
        topics: ["Research Design", "Data Collection", "Statistical Analysis Introduction"]
    },
    {
        id: 2,
        title: "Mastering Thesis Writing",
        day: "20",
        month: "DEC",
        time: "02:30 PM - 05:30 PM",
        platform: "BIRST Campus",
        location: "Seminar Room A",
        category: "Training",
        description: "Unlock the secrets to writing a compelling thesis. Learn structural techniques and academic styling from experts.",
        details: "Writing a thesis can be daunting. This session breaks it down into manageable chapters. We focus on clarity, coherence, and argumentation. Special attention will be paid to the literature review and discussion sections.",
        speakers: ["Prof. Sarah Khan"],
        guests: ["Editor in Chief, BIRST Journal"],
        topics: ["Thesis Structure", "Academic Tone", "Citation Management"]
    },
    {
        id: 3,
        title: "Statistics for Beginners",
        day: "05",
        month: "JAN",
        time: "11:00 AM - 01:00 PM",
        platform: "Google Meet",
        location: "Online",
        category: "Webinar",
        description: "Demystifying statistics for non-math majors. Understand the basics of SPSS and data interpretation.",
        details: "An introductory course designed for researchers who find statistics challenging. We start from ground zero—variables, data types—and move to basic descriptive statistics and t-tests using SPSS.",
        speakers: ["Mr. Rahim Uddin"],
        guests: [],
        topics: ["Variables & Data", "Descriptive Stats", "SPSS Basics"]
    },
    {
        id: 4,
        title: "AI in Academic Writing",
        day: "12",
        month: "JAN",
        time: "03:00 PM - 05:00 PM",
        platform: "Zoom Meeting",
        location: "Online",
        category: "Seminar",
        description: "Ethical use of AI tools to enhance your writing workflow without compromising academic integrity.",
        details: "AI is changing the landscape of research. Learn how to use tools like ChatGPT and Jenni AI ethically for brainstorming, improving clarity, and summarization, while ensuring your work remains original.",
        speakers: ["Ms. Farhana Yesmin"],
        guests: ["AI Ethics Board Member"],
        topics: ["Prompt Engineering", "Plagiarism & AI", "Editing Workflows"]
    }
];

// Modal Component
const SeminarModal = ({ seminar, onClose }) => {
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
                    <img src={seminarImage} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                        <div>
                            <span className="inline-block px-3 py-1 mb-2 text-xs font-bold text-black bg-[#FFD700] rounded-sm uppercase tracking-wider">
                                {seminar.category}
                            </span>
                            <h2 className="text-3xl font-bold text-white leading-tight mb-4">{seminar.title}</h2>
                            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm font-medium">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[#FFD700] font-bold">{seminar.day} {seminar.month}</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-white/50"></div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={14} className="text-[#FFD700]" />
                                    <span>{seminar.time}</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-white/50"></div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-[#FFD700]" />
                                    <span>{seminar.location}</span>
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
                        <p className="text-gray-700 leading-relaxed text-lg">{seminar.details}</p>
                    </div>

                    {/* Speakers & Guests Grid */}
                    <div className="grid md:grid-cols-2 gap-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
                        <div>
                            <h4 className="text-sm font-bold text-[var(--color-birst-primary)] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <User size={16} /> Key Speakers
                            </h4>
                            <ul className="space-y-3">
                                {seminar.speakers.map((speaker, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                            {speaker.charAt(0)}
                                        </div>
                                        <span className="font-semibold text-gray-800">{speaker}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {seminar.guests.length > 0 && (
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
                            {seminar.topics.map((topic, idx) => (
                                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full border border-gray-200">
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Footer Action */}
                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button className="px-8 py-3 bg-[var(--color-birst-primary)] text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                            Complete Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Water Fill Button Component
const WaterFillButton = ({ text }) => (
    <button className="relative w-full py-4 overflow-hidden bg-black text-white font-semibold rounded-xl group isolated">
        <span className="relative z-10 font-[var(--font-family-space-grotesk)] transition-colors duration-500 group-hover:text-white">
            {text}
        </span>
        {/* Fill Effect Layer */}
        <div className="absolute inset-0 translate-y-full bg-[var(--color-birst-primary)] transition-transform duration-500 ease-out group-hover:translate-y-0 wave-effect"></div>
    </button>
);

const SeminarsSection = () => {
    const [selectedSeminar, setSelectedSeminar] = useState(null);

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
                    {/* Always limit to first 2 items */}
                    {seminars.slice(0, 2).map((seminar, index) => (
                        <motion.div
                            key={seminar.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.2, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[var(--color-birst-primary)] hover:shadow-2xl transition-all duration-300 h-full"
                        >

                            {/* Image Header - Aspect Video for better fit with text */}
                            <div className="h-64 relative overflow-hidden">
                                <img
                                    src={seminarImage}
                                    alt="Seminar"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-1.5 bg-[#FFD700] text-black font-bold text-sm rounded shadow-sm">
                                        {seminar.category}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-8 flex flex-col flex-1">
                                {/* Date & Month Row */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-baseline gap-1 text-[var(--color-birst-primary)]">
                                        <span className="text-4xl font-extrabold">{seminar.day}</span>
                                        <span className="text-lg font-bold uppercase">{seminar.month}</span>
                                    </div>
                                    <div className="h-8 w-[1px] bg-gray-200"></div>
                                    <div className="flex items-center gap-2 text-gray-500 font-medium text-sm">
                                        <Video size={16} className="text-purple-500" />
                                        {seminar.platform}
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
                                        <span className="truncate">{seminar.location}</span>
                                    </div>
                                </div>

                                {/* Actions Footer */}
                                <div className="mt-auto flex flex-col gap-4">
                                    {/* Enroll Button with Water Fill Effect */}
                                    <WaterFillButton text="Register Now" />

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
                    ))}
                </div>
            </div>

            {/* Modal Outlet */}
            {selectedSeminar && (
                <SeminarModal
                    seminar={selectedSeminar}
                    onClose={() => setSelectedSeminar(null)}
                />
            )}
        </section>
    );
};

export default SeminarsSection;
import React from "react";
import { CheckCircle, Clock, Award, FileText, Bell, ChevronRight, User, Download, Plus, Star, BookOpen, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { Safari } from "../ui/safari";
import logo from '../../assets/BIRST_LOGO.svg';

const TypingText = ({ text, className, isHighlight = false }) => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.3
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.span
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={className}
        >
            {text.split("").map((char, i) => (
                <motion.span key={i} variants={item} className={isHighlight ? "text-[var(--color-birst-primary)]" : ""}>
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

const DashboardPreviewSection = () => {
    return (
        <section className="py-16 lg:py-24 bg-[#FFFFF0] overflow-hidden relative font-['Helvetica']">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-birst-primary)]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-birst-accent)]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center mb-10 lg:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-widest uppercase text-[var(--color-birst-dark)] bg-white border border-gray-200 rounded-full shadow-sm"
                    >
                        Student Portal
                    </motion.span>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Helvetica-Bold'] text-[var(--color-birst-dark)]">
                        <TypingText text="Manage Your Research" className="block mb-2" />
                        <TypingText text="In One Place" isHighlight={true} />
                    </h2>
                </div>

                {/* SAFARI BROWSER FRAME */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                        type: "tween",
                        duration: 2.5, // Increased duration for slower animation
                        ease: "easeOut",
                        delay: 0.2
                    }}
                    className="relative w-full max-w-6xl mx-auto shadow-2xl rounded-xl"
                >
                    {/* The Safari SVG Frame */}
                    {/* Aspect ratio of 1203/753 is roughly 1.6 */}
                    <div className="relative w-full aspect-[1203/753]">
                        <Safari url="www.birstbd.institute" className="w-full h-full drop-shadow-2xl" />

                        {/* DASHBOARD CONTENT OVERLAY */}
                        {/* Positioned to fit inside the browser content area of the SVG */}
                        {/* DASHBOARD CONTENT OVERLAY */}
                        {/* Positioned to fit inside the browser content area of the SVG */}
                        <div className="absolute top-[6.9%] left-[1px] right-[1px] bottom-[1.6%] bg-gray-50 overflow-hidden rounded-b-lg">
                            {/* Scaling Wrapper for Desktop View on Mobile */}
                            <div className="w-[350%] h-[350%] scale-[0.285] md:w-full md:h-full md:scale-100 origin-top-left flex flex-row h-full bg-gray-50">

                                {/* SIDEBAR */}
                                <div className="w-64 bg-white border-r border-gray-100 flex flex-col p-6">
                                    <div className="flex items-center gap-2 mb-10">
                                        <img
                                            src={logo}
                                            alt="BIRST Logo"
                                            className="w-8 h-8 object-contain"
                                        />
                                        <span className="font-bold text-lg text-[var(--color-birst-dark)]">BIRST</span>
                                    </div>
                                    <nav className="space-y-2 flex-1">
                                        {['Dashboard', 'My Courses', 'Seminars', 'Certificates', 'Research'].map((item, i) => (
                                            <div key={item} className={`p-3 rounded-xl text-sm font-medium cursor-pointer transition-colors ${i === 0 ? 'bg-blue-50 text-[var(--color-birst-primary)]' : 'text-gray-500 hover:bg-gray-50'}`}>
                                                {item}
                                            </div>
                                        ))}
                                    </nav>
                                    <div className="p-4 bg-gray-50 rounded-xl mt-auto">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/440px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg" alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <div className="text-sm font-bold text-gray-900 truncate">A. Einstein</div>
                                                <div className="text-xs text-gray-400 truncate">Student</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* MAIN CONTENT AREA */}
                                <div className="flex-1 overflow-y-auto p-8 relative">

                                    {/* Header */}
                                    <div className="flex justify-between items-end mb-8">
                                        <div>
                                            <h1 className="text-2xl font-bold text-[var(--color-birst-dark)] mb-1">Welcome back, Albert! 👋</h1>
                                            <p className="text-gray-500">Here's what's happening with your research today.</p>
                                        </div>
                                        <button className="px-4 py-2 bg-[var(--color-birst-dark)] text-white rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center gap-2">
                                            <Plus className="w-4 h-4" /> New Course
                                        </button>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-6 mb-8">
                                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-blue-50 text-[var(--color-birst-primary)] rounded-xl">
                                                    <BookOpen className="w-6 h-6" />
                                                </div>
                                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                                            </div>
                                            <div className="text-3xl font-bold text-gray-900 mb-1">4</div>
                                            <div className="text-sm text-gray-500 font-medium">Active Courses</div>
                                        </div>
                                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                                    <Award className="w-6 h-6" />
                                                </div>
                                            </div>
                                            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
                                            <div className="text-sm text-gray-500 font-medium">Seminars Enrolled</div>
                                        </div>
                                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                                                    <Star className="w-6 h-6" />
                                                </div>
                                            </div>
                                            <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                                            <div className="text-sm text-gray-500 font-medium">Average Score</div>
                                        </div>
                                    </div>

                                    {/* Content Columns */}
                                    <div className="grid grid-cols-3 gap-8">

                                        {/* Left Column (Profile & Seminars) */}
                                        <div className="lg:col-span-2 space-y-8">

                                            {/* Profile Card - Redesigned to be Square & Perfect */}
                                            <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden relative group aspect-square flex flex-col items-center">
                                                {/* Gradient Header */}
                                                <div className="w-full h-[35%] bg-gradient-to-br from-[#a8c0ff] to-[#3f2b96] relative">
                                                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
                                                </div>

                                                {/* Profile Image - Overlapping */}
                                                <div className="relative -mt-16 mb-4">
                                                    <div className="w-32 h-32 rounded-full p-1 bg-white shadow-2xl shadow-blue-900/20">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg/440px-Einstein_1921_by_F_Schmutzer_-_restoration.jpg" alt="Profile" className="w-full h-full object-cover rounded-full" />
                                                    </div>
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 w-full px-6 pb-8 flex flex-col items-center text-center">
                                                    <h3 className="text-2xl font-black text-[#2D3748] mb-1">Albert Einstein</h3>
                                                    <p className="text-[#00BFFF] font-bold text-xs uppercase tracking-widest mb-2">Senior Research Fellow</p>
                                                    <p className="text-gray-400 text-sm font-medium mb-6">Physics & Mathematics</p>
                                                    <p className="text-gray-500 italic text-sm mb-6">"Imagination is more important than knowledge."</p>

                                                    {/* Stats */}
                                                    <div className="grid grid-cols-3 gap-6 w-full max-w-xs border-t border-gray-100 pt-6 mb-6">
                                                        <div>
                                                            <div className="text-xl font-bold text-gray-900">18</div>
                                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Papers</div>
                                                        </div>
                                                        <div className="border-x border-gray-100">
                                                            <div className="text-xl font-bold text-gray-900">5</div>
                                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ongoing</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-xl font-bold text-gray-900">1.8k</div>
                                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Citations</div>
                                                        </div>
                                                    </div>

                                                    {/* Socials */}
                                                    <div className="flex items-center gap-4 mt-auto">
                                                        <button className="w-10 h-10 rounded-full bg-gray-50 hover:bg-[#0077b5] hover:text-white flex items-center justify-center text-gray-400 transition-all duration-300">
                                                            <Linkedin size={18} />
                                                        </button>
                                                        <button className="w-10 h-10 rounded-full bg-gray-50 hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center text-gray-400 transition-all duration-300">
                                                            <Twitter size={18} />
                                                        </button>
                                                        <button className="w-10 h-10 rounded-full bg-gray-50 hover:bg-[#333] hover:text-white flex items-center justify-center text-gray-400 transition-all duration-300">
                                                            <BookOpen size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Upcoming Seminar */}
                                            <div className="p-6 bg-gradient-to-r from-[var(--color-birst-dark)] to-[#1a2f4d] rounded-2xl shadow-lg text-white relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
                                                <div className="relative z-10">
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div>
                                                            <div className="text-xs font-bold opacity-60 uppercase tracking-widest mb-1">Upcoming Seminar</div>
                                                            <h3 className="text-xl font-bold">Advance Regression and R language</h3>
                                                        </div>
                                                        <div className="px-3 py-1 bg-white/10 backdrop-blur rounded-lg text-xs font-bold">Tomorrow, 10:00 AM</div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <button className="px-4 py-2 bg-white text-[var(--color-birst-dark)] rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors">
                                                            Join Session
                                                        </button>
                                                        <span className="text-sm opacity-80">Zoom Link will be active in 14h</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Right Column (Certificates) */}
                                        <div className="space-y-6">
                                            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm h-full">
                                                <div className="flex justify-between items-center mb-6">
                                                    <h3 className="font-bold text-gray-900">Certificates</h3>
                                                    <span className="text-xs text-[var(--color-birst-primary)] font-bold cursor-pointer">View All</span>
                                                </div>

                                                <div className="space-y-4">
                                                    {[
                                                        { title: "Research Methodology", date: "Dec 2024", type: "Gold" },
                                                        { title: "Statistical Analysis", date: "Nov 2024", type: "Silver" },
                                                        { title: "Academic Writing", date: "Oct 2024", type: "Bronze" }
                                                    ].map((cert, index) => (
                                                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cert.type === 'Gold' ? 'bg-yellow-100 text-yellow-600' : cert.type === 'Silver' ? 'bg-gray-200 text-gray-600' : 'bg-orange-100 text-orange-600'}`}>
                                                                <Award className="w-5 h-5" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="text-sm font-bold text-gray-900">{cert.title}</div>
                                                                <div className="text-xs text-gray-500">Completed {cert.date}</div>
                                                            </div>
                                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200 text-gray-400 group-hover:text-[var(--color-birst-primary)] group-hover:border-[var(--color-birst-primary)] transition-all">
                                                                <Download className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                                                    <button className="text-sm text-gray-500 font-medium hover:text-[var(--color-birst-dark)] transition-colors">
                                                        Verify Certificate ID
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default DashboardPreviewSection;
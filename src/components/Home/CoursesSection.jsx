import React, { useState } from "react";
import { BookOpen, Target, ArrowRight, Sparkles, Users, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ResearchAvatar from "../../assets/images/research_avatar.png";

const courses = [
    {
        title: "SPSS Mastery for Researchers",
        tag: "Bestseller",
        desc: "Master statistical analysis tools.",
        tasks: "12 Modules",
        projects: "3 Projects",
        capacity: 85,
        meta: "Start date: Coming soon",
        startDate: "Coming soon",
        button: "Pre-Register",
        color: "bg-pink-100",
        avatar: "👩‍🔬", // Using emoji as 3D avatar placeholder
        isComingSoon: true
    },
    {
        title: "Python for Data Analysis",
        tag: "Coming Soon",
        desc: "Learn data science fundamentals.",
        tasks: "24 Modules",
        projects: "4 Projects",
        capacity: 15,
        meta: "Start date: Coming soon",
        startDate: "Coming soon",
        button: "Pre-Register",
        color: "bg-blue-100",
        avatar: "🧑‍💻",
        isComingSoon: true
    },
    {
        title: "How to Start Research from Absolute Zero",
        tag: "Beginner Friendly",
        desc: "Step-by-step guide to starting your journey.",
        tasks: "8 Modules",
        projects: "Individual",
        capacity: 92,
        meta: "Start date: Coming soon",
        startDate: "Coming soon",
        button: "Pre-Register",
        color: "bg-yellow-100",
        avatar: "🧑‍🎓",
        isComingSoon: true
    },
    {
        title: "Quantitative Data Analysis",
        tag: "Advanced",
        desc: "Deep dive into regression & models.",
        tasks: "16 Modules",
        projects: "Capstone",
        capacity: 45,
        meta: "Start date: Coming soon",
        startDate: "Coming soon",
        button: "Pre-Register",
        color: "bg-green-100",
        avatar: "📊",
        isComingSoon: true
    }
];

const ComingSoonModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={e => e.stopPropagation()}
                    className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative text-center"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-8 h-8 text-amber-500 fill-amber-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon!</h3>
                    <p className="text-gray-500 mb-8">We're putting the final touches on this course. Registration will open shortly!</p>
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-colors"
                    >
                        Got it
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const CoursesSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-24 bg-[#fffff0] overflow-hidden">
            <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center justify-between mb-16 text-center md:flex-row md:text-left">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-widest uppercase text-[var(--color-birst-primary)] bg-white border border-gray-100 rounded-full shadow-sm"
                        >
                            Learning Paths
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            className="text-4xl md:text-5xl font-bold text-[var(--color-birst-primary)] mb-4"
                            style={{ fontFamily: 'var(--font-family-space-grotesk)' }}
                        >
                            <span className="block">Develop Your Skills</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="text-lg text-gray-500 font-medium max-w-lg"
                            style={{ fontFamily: 'var(--font-family-space-grotesk)' }}
                        >
                            Explore our curated learning paths designed to take you from beginner to expert researcher.
                        </motion.p>
                    </div>
                    <motion.button
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex items-center gap-2 px-6 py-3 bg-[var(--color-birst-dark)] text-white rounded-full font-bold hover:bg-black transition-colors"
                    >
                        View All Paths
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-full mx-auto">
                    {courses.map((course, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-3 rounded-[40px] shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer aspect-square flex flex-col overflow-hidden"
                            onClick={() => setIsModalOpen(true)}
                        >
                            {/* Card Top - Colored Block with Inner Border Effect */}
                            <div className={`${course.color} p-5 rounded-[32px] relative flex-grow flex flex-col justify-between overflow-hidden`}>
                                {/* Header */}
                                <div className="relative z-10 w-full">
                                    <div className="flex gap-2 mb-3">
                                        <span className={`inline-block px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-bold text-gray-800`}>
                                            {course.tag}
                                        </span>
                                        {course.isComingSoon && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-black/5 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900 border border-black/10">
                                                <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                Coming Soon
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold leading-tight text-gray-900 mb-2 max-w-[85%] line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm font-medium text-gray-700 opacity-80 leading-relaxed max-w-[70%] line-clamp-2">
                                        {course.desc}
                                    </p>
                                </div>

                                {/* 3D Avatar (Big & Positioned) */}
                                <div className={`absolute -right-6 top-16 drop-shadow-2xl filter transition-transform group-hover:scale-110 group-hover:rotate-6 duration-500 z-0 ${typeof course.avatar === 'string' ? "text-[120px]" : ""}`}>
                                    {course.avatar}
                                </div>

                                {/* Stats & Progress */}
                                <div className="relative z-10 mt-4">
                                    <div className="flex items-center gap-4 mb-4 text-xs font-bold text-gray-700">
                                        <div className="flex items-center gap-1.5">
                                            <div className="p-1.5 bg-white/30 rounded-lg">
                                                <BookOpen className="w-4 h-4 opacity-80" />
                                            </div>
                                            <span>{course.tasks}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="p-1.5 bg-white/30 rounded-lg">
                                                <Target className="w-4 h-4 opacity-80" />
                                            </div>
                                            <span>{course.projects}</span>
                                        </div>
                                    </div>

                                    {course.isComingSoon ? (
                                        <div className="flex items-center justify-between py-2 border-t border-black/5 mt-2">
                                            <span className="text-sm font-bold text-gray-800 italic flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-gray-500" />
                                                Will be Started soon
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex justify-between items-end mb-2">
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                                    <Users className="w-3.5 h-3.5" />
                                                    <span>Seats Filled</span>
                                                </div>
                                                <span className="text-xs font-bold text-gray-900">{course.capacity}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-white/40 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${course.capacity}%` }}
                                                    transition={{ delay: 0.5 + (index * 0.1), duration: 1, ease: "easeOut" }}
                                                    className="h-full bg-black rounded-full"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Card Bottom - White Footer */}
                            <div className="px-5 py-4 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <div className="text-xs font-bold text-gray-400 mb-0.5">{course.meta.includes('Modules') ? 'Modules:' : 'Start date:'}</div>
                                    <div className="text-sm font-bold text-gray-900">{course.meta.includes('Modules') ? course.meta.split(': ')[1] : course.startDate}</div>
                                </div>
                                <button className={`px-6 py-2.5 text-sm font-bold rounded-full hover:scale-105 active:scale-95 transition-all ${course.isComingSoon ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-black text-white'}`}>
                                    {course.button}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <button className="px-6 py-3 bg-[var(--color-birst-dark)] text-white rounded-full font-bold">
                        View All Paths
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
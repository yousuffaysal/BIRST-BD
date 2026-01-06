import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
    Star,
    Globe,
    MessageSquare,
    CheckCircle,
    User,
    Share2,
    MoreHorizontal,
    PlayCircle,
    Clock,
    Award,
    BarChart,
    BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

const CourseDetails = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const [activeTab, setActiveTab] = useState('about');
    const [isSticky, setIsSticky] = useState(false);

    // Default Mock Data Template (Research Focused)
    const passedTitle = state?.course?.title || "Research Methodology & Data Analysis";

    const defaultCourse = {
        title: passedTitle,
        instructor: "Dr. Sarah Mitchell",
        rating: 4.8,
        reviews: 12543,
        enrolled: "45,230",
        level: "Intermediate level",
        duration: "4 weeks at 5-7 hours a week",
        schedule: "Flexible schedule",
        partner: "BIRST",
        modules: 6,
        description: `Deep dive into ${passedTitle}. This comprehensive course is designed for researchers, students, and professionals looking to master advanced methodologies. You will learn to apply critical thinking and analytical tools to solve complex research problems effectively.`,
        whatYouWillLearn: [
            `Master the fundamental principles of ${passedTitle} and its applications in real-world scenarios.`,
            "Design and execute robust research protocols adhering to ethical standards.",
            "Analyze complex datasets using modern statistical tools and software.",
            "Write high-impact research papers and proposals for academic publication."
        ],
        skills: [
            "Research Design", "Data Analysis", "Academic Writing", "Critical Thinking", "Statistical Software", "Grant Writing",
            "Ethics in Research", "Qualitative Methods", "Quantitative Methods", "Literature Review"
        ],
        syllabus: [
            { title: "Introduction to Research Fundamentals", duration: "2 hours to complete", content: "Module 1" },
            { title: "Designing Your Research Study", duration: "4 hours to complete", content: "Module 2" },
            { title: "Data Collection & Management", duration: "5 hours to complete", content: "Module 3" },
            { title: "Quantitative & Qualitative Analysis", duration: "8 hours to complete", content: "Module 4" },
            { title: "Academic Writing & Publishing", duration: "6 hours to complete", content: "Module 5" },
            { title: "Ethics & Future Directions", duration: "3 hours to complete", content: "Module 6" }
        ],
        instructorBio: "Dr. Sarah Mitchell is a Lead Researcher at BIRST with over 15 years of experience in academic research and policy analysis. She has mentored over 500 students and published widely in top-tier journals."
    };

    // Merge passed state with default structure (override default if state has specific fields)
    const course = { ...defaultCourse, ...state?.course };

    // Ensure description mentions the actual title if state passed one but description is missing
    if (!state?.course?.description && state?.course?.title) {
        course.description = `Master the art of ${state.course.title} with this specialized curriculum. Designed for aspiring researchers, this course covers all essential aspects from theory to practical application.`;
    }

    // Handle Scroll for Sticky Tab
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 450) setIsSticky(true);
            else setIsSticky(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 pt-20">
            {/* Hero Section */}
            <div className="bg-[#f5f7fa] border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative overflow-hidden">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                        <Link to="/" className="hover:underline">Home</Link>
                        <span>&gt;</span>
                        <Link to="/courses" className="hover:underline">Browse</Link>
                        <span>&gt;</span>
                        <span className="font-semibold text-gray-900">Data Science</span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col lg:flex-row gap-12 relative z-10">
                        <div className="flex-1">
                            {/* Partner Logo */}
                            <div className="mb-6">
                                <span className="text-3xl font-extrabold text-gray-800 tracking-tighter">{course.partner}</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                {course.title}
                            </h1>

                            <p className="text-lg text-gray-700 mb-6 max-w-2xl">
                                This course is part of multiple programs. <span className="text-blue-600 font-bold cursor-pointer hover:underline">Learn more</span>
                            </p>

                            <div className="flex items-center gap-4 mb-8">
                                <img
                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                    alt={course.instructor}
                                    className="w-10 h-10 rounded-full border border-gray-200"
                                />
                                <div className="text-sm">
                                    <span className="text-gray-900 font-bold block">Instructor: <span className="underline decoration-blue-300">{course.instructor}</span></span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                <button className="px-8 py-4 bg-[#0056D2] text-white font-bold text-lg rounded-lg shadow-sm hover:bg-[#00419e] transition-colors flex flex-col items-center justify-center min-w-[200px]">
                                    <span>Enroll for Free</span>
                                    <span className="text-xs font-normal opacity-90">Start Learning Today</span>
                                </button>
                                <div className="flex flex-col justify-center">
                                    <span className="font-bold text-gray-900">{course.enrolled}</span>
                                    <span className="text-sm text-gray-600">already enrolled</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Graphic / Card (Optional or Decorative) */}
                        <div className="hidden lg:block w-96 relative">
                            {/* Placeholder for specific graphic related to course */}
                            <div className="w-full h-full bg-blue-100/50 rounded-full blur-3xl absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Sub-Header */}
            <div className={`sticky top-20 z-40 bg-white border-b border-gray-200 transition-all ${isSticky ? 'shadow-md translate-y-0' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-8 overflow-x-auto no-scrollbar">
                        {['About', 'Outcomes', 'Modules', 'Recommendations', 'Testimonials', 'Reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => scrollToSection(tab.toLowerCase())}
                                className={`py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.toLowerCase()
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left Column (Main) */}
                    <div className="flex-1 space-y-16">

                        {/* About / What you'll learn */}
                        <section id="about" className="scroll-mt-40">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                {course.whatYouWillLearn.map((item, idx) => (
                                    <div key={idx} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                                        <CheckCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Skills */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills you'll gain</h2>
                            <div className="flex flex-wrap gap-2">
                                {course.skills.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Details Grid */}
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: Globe, title: "100% online", sub: "Start instantly and learn at your own schedule." },
                                { icon: BarChart, title: course.level, sub: "No prior experience required." },
                                { icon: Clock, title: "Flexible schedule", sub: course.duration },
                                { icon: MessageSquare, title: "English", sub: "Subtitles: English, Arabic..." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-2">
                                    <item.icon className="w-6 h-6 text-gray-900" />
                                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                                    <p className="text-sm text-gray-500">{item.sub}</p>
                                </div>
                            ))}
                        </section>

                        {/* Modules / Syllabus */}
                        <section id="modules" className="scroll-mt-40">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">There are {course.modules} modules in this course</h2>
                            <p className="text-gray-600 mb-8">{course.description}</p>

                            <div className="space-y-4">
                                {course.syllabus.map((mod, idx) => (
                                    <div key={idx} className="border-b border-gray-200 pb-4">
                                        <div className="flex justify-between items-start cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors group">
                                            <div className="flex gap-4">
                                                <div className="flex flex-col items-center justify-center w-12 pt-1">
                                                    <div className="w-3 h-3 rounded-full bg-blue-600 mb-1"></div>
                                                    <div className="w-0.5 h-full bg-gray-200"></div>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{mod.title}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                        <span>{mod.content}</span>
                                                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                                        <span>{mod.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-2">
                                                <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Instructor */}
                        <section id="instructor" className="pt-8 border-t border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructor</h2>
                            <div className="flex items-start gap-4">
                                <img
                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                    alt={course.instructor}
                                    className="w-24 h-24 rounded-full object-cover border border-gray-100"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 underline decoration-blue-300 underline-offset-4 mb-2">{course.instructor}</h3>
                                    <p className="text-sm font-bold text-gray-600 mb-1">Lead Researcher at {course.partner}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> 2,278,922 Learners</span>
                                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> 36 Courses</span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                                        {course.instructorBio}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Offered By */}
                        <section className="pt-8 border-t border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Offered by</h2>
                            <div className="flex items-center gap-6 p-6 border border-gray-200 rounded-xl shadow-sm bg-white">
                                <div className="w-16 h-16 bg-gray-900 flex items-center justify-center text-white font-bold text-xl rounded-lg">
                                    {course.partner}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{course.partner}</h3>
                                    <Link to="#" className="text-blue-600 font-bold text-sm hover:underline">Learn more</Link>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Right Column (Sidebar Sticky) */}
                    <div className="hidden lg:block w-80 flex-shrink-0">
                        {/* Sticky Layout Container */}
                        <div className="sticky top-40 space-y-6">
                            {/* Enrollment Card (Alternative to Hero button if scrolled past) */}
                            {isSticky && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white p-6 border border-gray-200 rounded-xl shadow-lg"
                                >
                                    <h3 className="font-bold text-gray-900 mb-2">Interested in this course?</h3>
                                    <button className="w-full py-3 bg-[#0056D2] text-white font-bold rounded-lg shadow-sm hover:bg-[#00419e] mb-3 transition-colors">
                                        Enroll for Free
                                    </button>
                                    <p className="text-xs text-center text-gray-500">More than 1.3 million learners enrolled</p>
                                </motion.div>
                            )}

                            {/* Trust/Social Proof */}
                            <div className="bg-white p-6">
                                <h4 className="font-bold text-gray-900 mb-4">Learner Reviews</h4>
                                <div className="flex items-end gap-2 mb-2">
                                    <span className="text-4xl font-bold text-gray-900">4.6</span>
                                    <div className="mb-2">
                                        <div className="flex text-amber-500">
                                            {[1, 2, 3, 4].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                            <Star className="w-4 h-4 fill-current text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mb-6">(43,167 reviews)</p>

                                <div className="space-y-3">
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <div key={stars} className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-600 w-3">{stars}</span>
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gray-400 rounded-full"
                                                    style={{ width: stars === 5 ? '75%' : stars === 4 ? '15%' : '5%' }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-400 w-8">{stars === 5 ? '72%' : '10%'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
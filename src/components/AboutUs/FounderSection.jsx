import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Phone, GraduationCap, Award, BookOpen, Globe, Target } from 'lucide-react';
import founderImage from '../../assets/images/founder.jpeg';

const FounderSection = () => {
    const contactDetails = [
        {
            icon: <Phone className="w-4 h-4" />,
            label: "+8801798039406",
            href: "tel:+8801798039406",
        },
        {
            icon: <Mail className="w-4 h-4" />,
            label: "mamun.stat@nstu.edu.bd",
            href: "mailto:mamun.stat@nstu.edu.bd",
        },
        {
            icon: <Linkedin className="w-4 h-4" />,
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/md-mamun-miah-4883a4118/",
        }
    ];

    const researchProfiles = [
        {
            name: "ORCID",
            href: "https://orcid.org/0000-0001-9670-7964",
            icon: <BookOpen className="w-5 h-5" />,
            color: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
        },
        {
            name: "ResearchGate",
            href: "https://www.researchgate.net/profile/Md-Mamun-Miah-4",
            icon: <Globe className="w-5 h-5" />,
            color: "bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100"
        },
        {
            name: "Google Scholar",
            href: "https://scholar.google.com/citations?user=Dsg3Qd4AAAAJ&hl=en",
            icon: <GraduationCap className="w-5 h-5" />,
            color: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
        },
        {
            name: "Web of Science",
            href: "https://www.webofscience.com/wos/author/record/HMP-2512-2023",
            icon: <Target className="w-5 h-5" />,
            color: "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
        },
    ];

    return (
        <section className="py-8 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row">
                        {/* Profile Image Column - Left Side */}
                        <div className="md:w-1/3 bg-slate-50 flex flex-col items-center justify-center p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-100 relative">
                            <div className="relative group">
                                <div className="w-56 h-56 rounded-full p-2 bg-white shadow-lg border border-slate-100 mb-4 overflow-hidden relative z-10">
                                    <img
                                        src={founderImage}
                                        alt="Md. Mamun Miah"
                                        className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                {/* Decorative circle behind */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-100/50 rounded-full blur-2xl -z-0" />
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-800">Md. Mamun Miah</h3>
                                <p className="text-[#1FB6FF] font-medium text-sm">Founder & Adjunct Faculty</p>
                                <p className="text-slate-600 font-semibold text-xs mb-3">BIRSTBD</p>
                                <div className="text-slate-500 text-xs font-medium px-4 space-y-1">
                                    <p className="font-semibold text-slate-700">Assistant Professor</p>
                                    <p>Department of Statistics</p>
                                    <p>Noakhali Science and Technology University (NSTU)</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Column - Right Side with Bento Grid */}
                        <div className="md:w-2/3 p-5 md:p-6">
                            {/* Bento Grid Layout */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-full auto-rows-fr">
                                {/* Research Profile Links - Top Row */}
                                {researchProfiles.map((profile, index) => (
                                    <a
                                        key={index}
                                        href={profile.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 ${profile.color}`}
                                    >
                                        {profile.icon}
                                        <span className="text-xs font-semibold text-center">{profile.name}</span>
                                    </a>
                                ))}

                                {/* Academic Profile - Spans 2 columns on mobile, 2x2 on desktop */}
                                <div className="col-span-2 row-span-1 md:row-span-2 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-2 bg-white rounded-lg text-[#1FB6FF] shadow-sm">
                                            <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-base">Academic Profile</h4>
                                    </div>
                                    <div className="space-y-2">
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm">M. Sc. in Statistics</p>
                                            <p className="text-xs text-slate-600">Jahangirnagar University</p>
                                            <p className="text-xs text-[#1FB6FF] font-semibold">2015</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm">B. Sc. (Hons.) in Statistics</p>
                                            <p className="text-xs text-slate-600">Jahangirnagar University</p>
                                            <p className="text-xs text-slate-500 font-semibold">2013</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Teaching Experience - Spans 2 columns */}
                                <div className="col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-100 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-2 bg-white rounded-lg text-amber-600 shadow-sm">
                                            <Award className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm">Teaching Experience</h4>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-800">8+ <span className="text-sm font-normal text-slate-500">Years</span></p>
                                    <p className="text-xs text-slate-600 mt-1">From 20 November 2017 to date</p>
                                </div>

                                {/* Research Experience - Spans 2 columns */}
                                <div className="col-span-2 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-2 bg-white rounded-lg text-purple-600 shadow-sm">
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm">Research Experience</h4>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-800">8 <span className="text-sm font-normal text-slate-500">Projects</span></p>
                                    <p className="text-xs text-slate-600 mt-1">Completed Research Projects</p>
                                </div>

                                {/* Contact Details - Bottom Row, Spans all columns */}
                                <div className="col-span-2 md:col-span-4 flex flex-wrap gap-3 bg-slate-50 border-2 border-slate-200 rounded-xl p-4">
                                    {contactDetails.map((detail, index) => (
                                        <a
                                            key={index}
                                            href={detail.href}
                                            target={detail.label === "LinkedIn" ? "_blank" : undefined}
                                            rel="noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-[#1FB6FF] font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                                        >
                                            {detail.icon}
                                            <span className="text-xs sm:text-sm hidden sm:inline">{detail.label}</span>
                                            <span className="text-xs sm:hidden">{detail.label.split('@')[0]}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FounderSection;

import React from "react";
import { BadgeCheck, Medal, Share2, Award } from "lucide-react";
import { motion } from "framer-motion";

import logo from '../../assets/BIRST_LOGO.svg';

const CertificateSection = () => {
    // ... (rest of code)
    // ... (rest of code)
    return (
        <section className="py-24 bg-[#fffff0] min-h-screen flex items-center justify-center" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <div className="container px-4 mx-auto">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.0, type: "spring", stiffness: 100, damping: 20 }}
                    >
                        <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold tracking-wider uppercase text-[var(--color-birst-primary)] bg-blue-50 rounded-full">
                            Recognition
                        </span>
                        <h2 className="mb-6 text-3xl font-bold lg:text-4xl text-[var(--color-birst-dark)]">
                            Share Your Achievements with the World
                        </h2>
                        <p className="mb-8 text-lg text-gray-600">
                            Earn verified digital certificates and badges upon completion of courses and workshops. Showcase your skills on LinkedIn and your CV.
                        </p>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: BadgeCheck,
                                    title: "Verified Certificates",
                                    desc: "Tamper-proof digital certificates with unique verification IDs."
                                },
                                {
                                    icon: Medal,
                                    title: "Skill Badges",
                                    desc: "Earn badges for mastering specific research tools and methodologies."
                                },
                                {
                                    icon: Share2,
                                    title: "One-Click Sharing",
                                    desc: "Easily share your success directly to social media platforms."
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                >
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-[var(--color-birst-primary)] shadow-sm">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-lg font-bold text-[var(--color-birst-dark)]">{item.title}</h4>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative flex justify-center w-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.0, type: "spring", bounce: 0.4, delay: 0.2 }}
                    >
                        {/* Certificate Mockup - Compact Fit */}
                        <div className="relative w-full max-w-4xl bg-white rounded-[32px] border-[12px] border-gray-900 shadow-2xl overflow-hidden transform hover:scale-[1.005] transition-transform duration-500 aspect-[1.6/1] flex flex-col">
                            <div className="flex-1 p-6 md:p-8 flex flex-col items-center text-center relative h-full justify-between">

                                {/* Top Section: Logo & Header */}
                                <div className="flex flex-col items-center w-full">
                                    <img
                                        src={logo}
                                        alt="BIRST Logo"
                                        className="w-12 h-12 md:w-14 md:h-14 object-contain mb-2"
                                    />

                                    {/* Header Tag */}
                                    <p className="text-gray-400 font-bold tracking-[0.25em] text-[8px] md:text-[9px] uppercase mb-1">Professional Certification</p>

                                    {/* Course Title */}
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight tracking-tight max-w-2xl">
                                        Advanced Research Methodology
                                    </h2>
                                </div>

                                {/* Middle Section: Recipient */}
                                <div className="flex flex-col items-center w-full">
                                    <p className="text-gray-400 font-bold tracking-[0.2em] text-[8px] md:text-[9px] uppercase mb-1">Issued To</p>
                                    <p className="text-xl md:text-2xl font-bold text-gray-900 mb-2 border-b border-gray-100 pb-1 px-8">
                                        Albert Einstein
                                    </p>

                                    {/* Description */}
                                    <p className="text-gray-500 text-[9px] md:text-[10px] max-w-md mx-auto leading-relaxed px-4">
                                        The bearer of this professional certificate has demonstrated a fundamental level of Research & Statistical mastery.
                                    </p>
                                </div>

                                {/* Footer Section: Compact & Visible */}
                                <div className="w-full flex justify-between items-end pt-2 bg-white">

                                    {/* Signature Block */}
                                    <div className="text-center w-1/3">
                                        <div className="mx-auto h-6 w-20 bg-contain bg-no-repeat bg-center mb-0.5 opacity-70"
                                            style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png)' }}></div>
                                        <div className="w-24 border-t border-gray-300 mx-auto mb-0.5"></div>
                                        <p className="text-[7px] md:text-[8px] font-bold text-gray-900 uppercase tracking-wider">Director Signature</p>
                                    </div>

                                    {/* Center Branding */}
                                    <div className="text-center w-1/3 pb-1">
                                        <BadgeCheck className="w-6 h-6 text-gray-900 mx-auto mb-0.5" strokeWidth={1.5} />
                                        <p className="text-[7px] md:text-[8px] text-gray-400 font-medium uppercase tracking-wide">
                                            BIRST Certified
                                        </p>
                                    </div>

                                    {/* Date Block */}
                                    <div className="text-center w-1/3">
                                        <div className="h-6 flex items-end justify-center mb-0.5">
                                            <p className="text-xs font-bold text-gray-800">Dec 20, 2024</p>
                                        </div>
                                        <div className="w-24 border-t border-gray-300 mx-auto mb-0.5"></div>
                                        <p className="text-[7px] md:text-[8px] font-bold text-gray-900 uppercase tracking-wider">Issued Date</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CertificateSection;
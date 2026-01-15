import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import local images directly
import imgResearch from '../../assets/images/hero/hero_research_training_1766860036175.png';
import imgDashboard from '../../assets/images/hero/hero_modern_dashboard_1766860068317.png';
import imgMobile from '../../assets/images/hero/hero_mobile_view_1766860094223.png';
import imgCollab from '../../assets/images/hero/hero_collaboration_career_1766860470975.png';

const heroImages = [
    imgResearch,
    imgDashboard,
    imgMobile,
    imgCollab
];

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 6000); // 6 seconds per slide

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden bg-[#FFFFF0]">
            {/* Background Slider */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                    <img
                        src={heroImages[currentIndex]}
                        alt="Hero Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Stronger overlay for max readability of dark text */}
                    <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/60"></div>
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
                <div className="text-center max-w-7xl mx-auto space-y-10">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="font-['Montserrat'] font-extrabold text-5xl md:text-7xl lg:text-8xl text-[#232323] leading-tight drop-shadow-sm tracking-tight"
                    >
                        Bangladesh Institute for <br />
                        <span className="text-[#00BFFF]">Research</span> and Statistical Training
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="font-['Montserrat'] text-xl md:text-3xl text-gray-800 font-semibold max-w-4xl mx-auto leading-normal"
                    >
                        Building careers in research and statistics through collaboration, modern tools, and professional training.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                    >
                        <Link
                            to="/login"
                            className="px-8 py-3.5 bg-[#00BFFF] text-white font-bold rounded-full shadow-lg shadow-blue-400/30 hover:bg-[#009ACD] transition-all transform hover:-translate-y-1 font-['Montserrat'] uppercase tracking-wide text-sm"
                        >
                            Start Learning
                        </Link>
                        <Link
                            to="/service"
                            className="px-8 py-3.5 bg-white text-[#232323] border border-gray-200 font-bold rounded-full shadow-lg hover:bg-gray-50 transition-all transform hover:-translate-y-1 font-['Montserrat'] uppercase tracking-wide text-sm"
                        >
                            Explore Services
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;
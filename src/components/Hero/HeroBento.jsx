import { useRef, useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Star, Users, Briefcase, Award } from 'lucide-react';
import { motion, useInView, animate } from 'framer-motion';

// Import images
import imgCollab from '../../assets/images/hero/hero_collaboration_career_1766860470975.png';
import imgResearch from '../../assets/images/hero/hero_research_training_1766860036175.png';

const CountUp = ({ to, suffix = "", duration = 2, decimals = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            const node = ref.current;
            const controls = animate(0, to, {
                duration: duration,
                onUpdate: (value) => {
                    node.textContent = value.toFixed(decimals) + suffix;
                }
            });
            return () => controls.stop();
        }
    }, [to, suffix, duration, inView, decimals]);

    return <span ref={ref}>0{suffix}</span>;
}

const HeroBento = () => {
    const [heroImage, setHeroImage] = useState(imgCollab);
    const axiosPublic = useAxiosPublic();

    // Fetch dynamic hero image
    useEffect(() => {
        axiosPublic.get('/site-settings/hero')
            .then(res => {
                if (res.data && res.data.heroImage) {
                    setHeroImage(res.data.heroImage);
                }
            })
            .catch(err => console.error("Failed to fetch hero image:", err));
    }, [axiosPublic]);

    return (
        <div className="w-full bg-[#FFFFF0] pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen relative">
            {/* White Screen Entrance Animation */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="absolute inset-0 bg-[#FFFFF0] z-50 pointer-events-none"
            />

            <div className="w-full max-w-[95%] xl:max-w-[1800px] mx-auto">

                {/* Main Grid Container - 2 Column Split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* LEFT COLUMN: Text + Stats/Reviews */}
                    <div className="flex flex-col gap-6">

                        {/* Top Block: Main Text Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-[#1A3C52] rounded-[2rem] p-8 sm:p-12 flex flex-col justify-center relative overflow-hidden group shadow-xl flex-grow"
                        >
                            {/* Abstract Background Decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00BFFF]/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:bg-[#00BFFF]/20"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#4AC6C6]/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

                            <div className="relative z-10">
                                <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-[#00BFFF] text-xs font-bold uppercase tracking-wider mb-6 border border-white/5">
                                    Online Research Platform
                                </span>
                                <h1 className="font-['Helvetica-Bold'] font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
                                    Start Your <span className="text-[#00BFFF]">Research</span> <br />
                                    Journey Today
                                </h1>
                                <p className="font-['Helvetica'] text-gray-300 text-lg mb-10 max-w-lg leading-relaxed">
                                    Join a vibrant community of learners and transform your aspirations into achievements with professional statistical training.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        to="/researchAndPublication"
                                        className="px-8 py-4 bg-[#00BFFF] text-white font-bold rounded-full shadow-lg shadow-blue-900/20 hover:bg-[#009ACD] hover:scale-105 transition-all duration-300 font-['Helvetica'] flex items-center gap-2 group/btn"
                                    >
                                        Get Started
                                        <ArrowUpRight size={20} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                    </Link>
                                    <Link
                                        to="/courses"
                                        className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all font-['Helvetica'] flex items-center justify-center w-12 h-12 !p-0 rounded-full"
                                        aria-label="View Courses"
                                    >
                                        <ArrowUpRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bottom Row: Stats & Reviews */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Combined Stats Block */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="bg-black rounded-[2rem] p-6 lg:p-8 flex items-center justify-between"
                            >
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-white">
                                        <CountUp to={20} suffix="+" />
                                    </h3>
                                    <p className="text-gray-400 text-sm font-medium">Partners</p>
                                </div>
                                <div className="text-center border-l border-gray-700 pl-4 md:pl-8">
                                    <h3 className="text-2xl font-bold text-white">
                                        <CountUp to={10} suffix="k+" />
                                    </h3>
                                    <p className="text-gray-400 text-sm font-medium">Students</p>
                                </div>
                                <div className="text-center border-l border-gray-700 pl-4 md:pl-8">
                                    <h3 className="text-2xl font-bold text-white">
                                        <CountUp to={700} suffix="+" />
                                    </h3>
                                    <p className="text-gray-400 text-sm font-medium">Instructors</p>
                                </div>
                            </motion.div>

                            {/* Review Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-gradient-to-br from-[#4AC6C6] to-[#009ACD] rounded-[2rem] p-6 lg:p-8 flex flex-col justify-center relative overflow-hidden"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl font-bold text-[#1A3C52]">
                                        <CountUp to={4.9} decimals={1} />
                                    </span>
                                    <div className="flex text-yellow-400 gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.4, delay: 0.8 + (i * 0.1) }}
                                            >
                                                <Star size={20} fill="currentColor" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex -space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-red-200 border-2 border-white"></div>
                                        <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white"></div>
                                        <div className="w-8 h-8 rounded-full bg-green-200 border-2 border-white"></div>
                                    </div>
                                    <div>
                                        <p className="text-[#1A3C52] font-bold text-sm">
                                            <CountUp to={100} suffix="k+" decimals={0} />
                                        </p>
                                        <p className="text-gray-100 text-xs font-medium">Student Reviews</p>
                                    </div>
                                </div>
                            </motion.div>

                        </div>

                    </div>

                    {/* RIGHT COLUMN: Full Height Image */}
                    <div className="flex flex-col h-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative rounded-[2rem] overflow-hidden shadow-xl group h-full min-h-[500px]"
                        >
                            <img
                                src={heroImage}
                                alt="Students Collaborating"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Optional Overlay if needed, but reference image is clean */}
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div> */}
                        </motion.div>
                    </div>

                </div>

                {/* Trusted Companies Strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-400 font-bold text-lg mb-8 uppercase tracking-widest">Trusted Company</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Using text for now as logos, replacing with actual SVGs or Images would be better */}
                        <span className="text-2xl font-bold text-gray-400">Google</span>
                        <span className="text-2xl font-bold text-gray-400">zoom</span>
                        <span className="text-2xl font-bold text-gray-400">slack</span>
                        <span className="text-2xl font-bold text-gray-400">coursera</span>
                        <span className="text-2xl font-bold text-gray-400">facebook</span>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default HeroBento;
import React, { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";


// Using existing hero images as placeholders for Student/Instructor
import imgStudent from "../../assets/images/hero/hero_collaboration_career_1766860470975.png";
import imgInstructor from "../../assets/images/hero/hero_research_training_1766860036175.png";
import useAuth from "../../hooks/useAuth";


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

const AboutSection = () => {
    const { user } = useAuth();

    return (
        <section className="relative w-full overflow-hidden bg-white">
            {/* Background Split */}
            <div className="absolute top-0 w-full h-[60%] bg-[#FFFFFF] z-0" />
            <div className="absolute bottom-0 w-full h-[40%] bg-[var(--color-birst-dark)] z-0" />

            <div className="container mx-auto px-4 relative z-10 py-24">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-20">
                    <div className="max-w-4xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="inline-block py-1.5 px-4 rounded-full bg-[var(--color-birst-primary)]/10 text-[var(--color-birst-primary)] text-sm font-bold uppercase tracking-widest mb-6 border border-[var(--color-birst-primary)]/20"
                        >
                            About BIRSTBD
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="font-['Helvetica-Bold'] font-bold text-5xl sm:text-6xl lg:text-8xl text-[var(--color-birst-dark)] leading-[0.85] tracking-tight uppercase"
                        >
                            Future-Ready <br /> Learning
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="flex items-center gap-6 mt-10 lg:mt-4 max-w-sm"
                    >
                        {/* Circular Video Badge mockup */}
                        <div className="relative shrink-0 w-20 h-20 rounded-full border border-[var(--color-birst-primary)]/30 flex items-center justify-center group cursor-pointer hover:border-[var(--color-birst-primary)] transition-colors bg-white shadow-lg">
                            <div className="absolute inset-1 rounded-full border border-[var(--color-birst-primary)]/20 border-dashed animate-spin-slow"></div>
                            <Play size={24} className="fill-[var(--color-birst-primary)] text-[var(--color-birst-primary)] relative z-10 ml-1" />
                        </div>

                        <div>
                            <p className="text-gray-600 text-sm font-medium leading-relaxed">
                                Interactive courses, expert instructors, and flexible learning—designed to help students succeed at every level.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative">

                    {/* Left Text (Trusted By) */}
                    <div className="lg:col-span-3 pb-16 hidden lg:block text-white/90">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="text-lg leading-relaxed max-w-[220px] font-['Helvetica']"
                        >
                            Trusted by schools, universities, educators, & learners worldwide.
                        </motion.p>
                    </div>

                    {/* Student Image (Center Left) */}
                    <div className="lg:col-span-4 relative mt-16 lg:mt-0">
                        {/* Floating Badge - Golden Seal */}
                        <motion.div
                            initial={{ scale: 0, rotate: -90, opacity: 0 }}
                            whileInView={{ scale: 1, rotate: -15, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.4
                            }}
                            className="absolute -top-16 -left-4 lg:-left-10 z-20 w-36 h-36 bg-gradient-to-br from-[#FFD700] via-[#FDB931] to-[#F3A505] rounded-full flex flex-col items-center justify-center text-black shadow-[0_0_30px_rgba(253,185,49,0.6)] border-[6px] border-white/90 ring-4 ring-[#FDB931]/50"
                        >
                            <span className="text-sm font-bold uppercase tracking-wider mb-0.5">Start</span>
                            <span className="text-xl font-['Helvetica-Bold'] font-extrabold leading-none">Learning</span>

                            {/* Shine effect line */}
                            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none"></div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.9,
                                ease: [0.16, 1, 0.3, 1], // Custom smooth ease
                                delay: 0.1
                            }}
                            className="relative rounded-[2rem] overflow-hidden aspect-[3/4] shadow-2xl origin-bottom"
                        >
                            <img src={imgStudent} alt="Student learning" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out" />
                        </motion.div>
                    </div>

                    {/* Instructor Image (Right) */}
                    <div className="lg:col-span-5 relative mt-16 lg:mt-0 lg:pl-10">
                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.9,
                                ease: [0.16, 1, 0.3, 1], // Custom smooth ease
                                delay: 0.25
                            }}
                            className="relative rounded-[2rem] overflow-hidden aspect-[4/5] lg:w-full shadow-2xl origin-bottom"
                        >
                            <img src={imgInstructor} alt="Instructor" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out" />

                            {/* Name Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 w-full bg-gradient-to-t from-[var(--color-birst-dark)] to-transparent">
                                <h4 className="text-white text-xl font-bold">Dianne Russell</h4>
                                <p className="text-[var(--color-birst-primary)] text-sm font-bold">Associate Professor</p>
                            </div>
                        </motion.div>

                        {/* Stats Card Overlay - Positioned overlapping to the right */}
                        <motion.div
                            initial={{ x: 60, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                delay: 0.6
                            }}
                            className="absolute bottom-12 -right-4 lg:-right-24 bg-[var(--color-birst-light)] p-8 w-64 shadow-xl z-30 border border-gray-100"
                        >
                            <h3 className="text-5xl font-['Helvetica-Bold'] font-bold text-[var(--color-birst-dark)] mb-2">
                                <CountUp to={20} suffix="+" />
                            </h3>
                            <p className="text-[var(--color-birst-dark)] font-bold text-sm leading-snug mb-8 opacity-80">
                                Courses Across Technology, Business, Design, and More
                            </p>
                            <Link
                                to={user ? "/dashboard" : "/signup"}
                                className="text-[var(--color-birst-primary)] border-b-2 border-[var(--color-birst-primary)] pb-0.5 font-bold text-sm hover:opacity-70 transition-opacity uppercase tracking-wide inline-block"
                            >
                                Join Now
                            </Link>
                        </motion.div>
                    </div>

                </div>

                {/* Mobile Only 'Trusted By' text */}
                <div className="lg:hidden mt-8 text-white/90 px-4 pt-12">
                    <p className="text-lg leading-relaxed">
                        Trusted by schools, universities, educators, & learners worldwide.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default AboutSection;
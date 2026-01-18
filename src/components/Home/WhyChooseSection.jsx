import React from "react";
import { GraduationCap, Cpu, Briefcase, Trophy, ChevronRight, Laptop, Pencil, Calculator, FileText, BookOpen, Lightbulb, Microscope, ScrollText, PenTool } from "lucide-react";
import { motion } from "framer-motion";

// Feature Data
const features = [
    {
        icon: GraduationCap,
        title: "Expert Mentorship",
        desc: "Learn directly from university professors and industry researchers."
    },
    {
        icon: Cpu,
        title: "AI-Powered Tools",
        desc: "Access exclusive AI tools designed to streamline your research process."
    },
    {
        icon: Briefcase,
        title: "Career Readiness",
        desc: "Holistic development focusing on both thesis success and career."
    },
    {
        icon: Trophy,
        title: "Train with Experts",
        desc: "Proven excellence backed by certified professionals and students."
    }
];

// Watermark Component - Fade in animation
const WatermarkIcon = ({ Icon, className, style, delay = 0 }) => (
    <motion.div
        className={`absolute text-gray-300 pointer-events-none select-none ${className}`}
        style={style}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: delay, ease: "easeOut" }}
        viewport={{ once: true }}
    >
        <Icon strokeWidth={1} />
    </motion.div>
);

const WhyChooseSection = () => {
    return (
        <section className="min-h-screen flex items-center py-16 lg:py-24 bg-[#FFFFF0] relative overflow-hidden">
            {/* Background Watermarks - Animated Entry */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                <WatermarkIcon Icon={Laptop} className="top-[-20%] left-[-20%] w-[1100px] h-[1100px] -rotate-12 opacity-40" delay={0} />
                <WatermarkIcon Icon={BookOpen} className="bottom-[-30%] left-[-10%] w-[1000px] h-[1000px] rotate-6 opacity-40" delay={0.2} />
                <WatermarkIcon Icon={Calculator} className="bottom-[-10%] right-[-15%] w-[900px] h-[900px] -rotate-12 opacity-40" delay={0.1} />
                <WatermarkIcon Icon={Pencil} className="top-[-20%] right-[-20%] w-[1000px] h-[1000px] rotate-45 opacity-40" delay={0.3} />

                <WatermarkIcon Icon={FileText} className="top-[20%] left-[30%] w-[700px] h-[700px] rotate-12 opacity-30" delay={0.4} />
                <WatermarkIcon Icon={GraduationCap} className="top-[-10%] left-[20%] w-[600px] h-[600px] -rotate-45 opacity-30" delay={0.2} />
                <WatermarkIcon Icon={Trophy} className="bottom-[-10%] right-[30%] w-[600px] h-[600px] rotate-12 opacity-30" delay={0.5} />
                <WatermarkIcon Icon={Microscope} className="top-[30%] right-[0%] w-[500px] h-[500px] -rotate-6 opacity-30" delay={0.1} />

                <WatermarkIcon Icon={Lightbulb} className="top-[50%] left-[-5%] w-[450px] h-[450px] rotate-12 opacity-20" delay={0.6} />
                <WatermarkIcon Icon={ScrollText} className="bottom-[20%] left-[10%] w-[500px] h-[500px] -rotate-12 opacity-20" delay={0.3} />
                <WatermarkIcon Icon={PenTool} className="top-[5%] right-[20%] w-[450px] h-[450px] rotate-45 opacity-20" delay={0.4} />
                <WatermarkIcon Icon={Cpu} className="bottom-[40%] right-[-5%] w-[400px] h-[400px] -rotate-12 opacity-20" delay={0.2} />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.5fr] gap-8 lg:gap-20">

                    {/* Left Content - Slide In from Left */}
                    <motion.div
                        className="flex flex-col justify-center mt-0 lg:-mt-40"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[var(--color-birst-primary)] font-bold text-xs sm:text-sm tracking-widest uppercase mb-4 pl-1">
                            / Why Choose Us?
                        </span>
                        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-['Helvetica-Bold'] font-bold text-[var(--color-birst-dark)] leading-[0.95] lg:leading-[0.9] mb-6 lg:mb-8">
                            The BIRST <br /> Difference
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 leading-relaxed max-w-md">
                            For over a decade, we've been a proud service provider, earning and maintaining the trust of the community in research and skills development.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto mt-2">
                            <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[var(--color-birst-primary)] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-[var(--color-birst-accent)] hover:shadow-xl transition-all w-full sm:w-auto group text-sm uppercase tracking-wide">
                                Join Now <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border-2 border-[var(--color-birst-dark)] text-[var(--color-birst-dark)] font-bold rounded-xl hover:bg-[var(--color-birst-dark)] hover:text-white transition-all w-full sm:w-auto group text-sm uppercase tracking-wide">
                                View Courses <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Vertical Divider - Grow vertically */}
                    <motion.div
                        className="hidden lg:block w-[1px] bg-gray-300 self-stretch"
                        initial={{ scaleY: 0, originY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    ></motion.div>

                    {/* Right Content - Staggered Grid Entry */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 mt-8 lg:mt-32"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.15 } }
                        }}
                    >
                        {/* Item 1: Top Left */}
                        <div className="p-8 md:pr-12 md:pb-12 border-b border-gray-300 md:border-r">
                            <FeatureItem item={features[0]} />
                        </div>
                        {/* Item 2: Top Right */}
                        <div className="p-8 md:pl-12 md:pb-12 border-b border-gray-300">
                            <FeatureItem item={features[1]} />
                        </div>
                        {/* Item 3: Bottom Left */}
                        <div className="p-8 md:pr-12 md:pt-12 border-b md:border-b-0 border-gray-300 md:border-r">
                            <FeatureItem item={features[2]} />
                        </div>
                        {/* Item 4: Bottom Right */}
                        <div className="p-8 md:pl-12 md:pt-12">
                            <FeatureItem item={features[3]} />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

// Feature Item with "Random" direction feel via variants
const FeatureItem = ({ item }) => {
    // Generate a seemingly random entrance direction based on simple math or just alternating
    const randomVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 15
            }
        }
    };

    return (
        <motion.div
            className="flex flex-col items-start gap-5"
            variants={randomVariants}
        >
            <div className="flex-shrink-0">
                {/* Icon with Brand Color, No Box */}
                <item.icon size={48} className="text-[var(--color-birst-primary)]" strokeWidth={1.5} />
            </div>
            <div>
                <h3 className="text-xl font-['Helvetica-Bold'] font-bold text-[var(--color-birst-dark)] mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{item.desc}</p>
            </div>
        </motion.div>
    );
};

export default WhyChooseSection;
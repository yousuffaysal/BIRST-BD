import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { bots } from "../../data/bots";
import { Link } from "react-router-dom";

const AiToolsSection = () => {
    return (
        <section className="relative bg-[#021a35]">

            <div
                className="w-full h-full"
            >
                {/* Animated Background Gradients - MOVED overflow-hidden HERE */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-[var(--color-birst-primary)] rounded-full blur-[120px] mix-blend-screen opacity-30"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, -60, 0],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 2
                        }}
                        className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[100px] mix-blend-screen opacity-20"
                    />
                    <motion.div
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-0 left-[20%] w-[500px] h-[500px] bg-blue-400 rounded-full blur-[120px] mix-blend-screen opacity-20"
                    />
                </div>

                {/* Background Texture/Overlay */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none fixed"></div>

                <div className="container relative z-10 px-4 pt-16 lg:pt-24 pb-24 lg:pb-48 mx-auto">

                    {/* Header */}
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest uppercase bg-white/10 border border-white/20 rounded-full backdrop-blur-md text-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                        >
                            AI-Powered Research
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mb-6 text-3xl sm:text-5xl lg:text-6xl font-bold text-white font-['Helvetica-Bold']"
                        >
                            Smart Tools for <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#00bfff]">Modern Scholars</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-300 max-w-2xl mx-auto"
                        >
                            Experience the future of academic research with our suite of intelligent assistants.
                        </motion.p>
                    </div>

                    {/* Sticky Stack Container */}
                    <div className="max-w-5xl mx-auto relative space-y-6">
                        {bots.map((tool, index) => (
                            <div
                                key={tool.id}
                                className="sticky top-20 pt-4 pb-4 min-h-[50vh] flex items-center justify-center"
                                style={{
                                    zIndex: index + 1
                                }}
                            >
                                {/* ShadCN Style Card */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full bg-white/95 backdrop-blur-xl rounded-[32px] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-6 md:p-10 transform transition-all hover:scale-[1.02] hover:bg-white relative overflow-hidden"
                                >

                                    {/* Background Glow */}
                                    <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${tool.gradient} opacity-5 blur-[100px] rounded-full`}></div>

                                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-16">

                                        {/* Left: Icon & ID */}
                                        <div className="flex-shrink-0 relative">
                                            <div className="w-20 h-20 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-200 border border-gray-100 flex items-center justify-center shadow-inner">
                                                <tool.icon className="w-10 h-10 md:w-16 md:h-16 text-[var(--color-birst-dark)]" strokeWidth={1.5} />
                                            </div>
                                            <div className="absolute -top-3 -right-3 w-8 h-8 md:w-10 md:h-10 bg-[var(--color-birst-primary)] rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg border-2 border-white">
                                                {index + 1}
                                            </div>
                                        </div>

                                        {/* Right: Content */}
                                        <div className="flex-grow text-center md:text-left">
                                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-[var(--color-birst-primary)] rounded-lg">
                                                    {tool.category}
                                                </span>
                                                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 rounded-lg">
                                                    {tool.version}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-birst-dark)] mb-3 font-['Helvetica-Bold']">
                                                {tool.name}
                                            </h3>
                                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                                {tool.description}
                                            </p>
                                            <Link
                                                to={`/bot/${tool.id}`}
                                                style={{ color: '#FFFFFF' }}
                                                className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-birst-dark)] text-[#FFFFFF] rounded-xl font-bold hover:bg-[var(--color-birst-primary)] transition-all duration-300 text-sm uppercase tracking-wide"
                                            >
                                                Launch Tool
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </div>

                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    <div className="h-24"></div>
                </div>
            </div>
        </section>
    );
};

export default AiToolsSection;
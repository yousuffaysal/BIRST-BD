import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Sparkles, ArrowRight, Grid3X3, Zap, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { bots } from '../data/bots';

// --- Background Component ---
const DotGridBackground = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle grid pattern */}
        <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
                backgroundImage: 'radial-gradient(#0B2340 1px, transparent 1px)',
                backgroundSize: '32px 32px'
            }}
        />
    </div>
);

const BotCard = ({ bot, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative bg-white rounded-2xl border border-slate-200 p-6 h-full flex flex-col hover:border-[#1FB6FF] hover:shadow-xl hover:shadow-[#1FB6FF]/10 transition-all duration-300"
        >
            {/* Hover Accent Line */}
            <div className="absolute top-0 left-6 right-6 h-1 bg-[#1FB6FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="p-3.5 bg-[#fffff0] rounded-xl text-[#0B2340] group-hover:bg-[#0B2340] group-hover:text-white transition-colors duration-300">
                    <bot.icon size={28} strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-[#fffff0] text-slate-500 border border-slate-100 font-['Helvetica-Bold']">
                        {bot.version}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="mb-6 flex-1">
                <h3 className="text-xl font-['Helvetica-Bold'] text-[#0B2340] mb-2 group-hover:text-[#1FB6FF] transition-colors">
                    {bot.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-['Helvetica'] line-clamp-3">
                    {bot.description}
                </p>
            </div>

            {/* Features (Mini) */}
            <div className="flex flex-wrap gap-2 mb-6">
                {bot.features.slice(0, 2).map((f, i) => (
                    <span key={i} className="text-[10px] text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-100 font-['Helvetica']">
                        {f}
                    </span>
                ))}
            </div>

            {/* Action */}
            <Link
                to={`/bot/${bot.id}`}
                style={{ color: '#FFFFFF' }}
                className="w-full py-3.5 flex items-center justify-center gap-2 rounded-xl bg-[#0B2340] text-white font-['Helvetica-Bold'] text-sm hover:bg-[#1FB6FF] transition-all duration-300 shadow-lg shadow-[#0B2340]/20 hover:shadow-[#1FB6FF]/30 group/btn mt-auto"
            >
                Launch Tool
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    );
};

const AiTools = () => {
    return (
        <div className="min-h-screen bg-[#fffff0] font-['Helvetica'] relative overflow-x-hidden selection:bg-[#1FB6FF]/20">
            <DotGridBackground />

            {/* Content Wrapper */}
            <div className="relative z-10 pt-[140px] pb-32 px-6">

                {/* Header Section */}
                <div className="max-w-7xl mx-auto mb-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 pb-12">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 mb-6"
                            >
                                <span className="h-px w-8 bg-[#1FB6FF]" />
                                <span className="text-xs font-['Helvetica-Bold'] uppercase tracking-[0.2em] text-[#1FB6FF]">
                                    Research Intelligence
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-['Helvetica-Bold'] text-[#0B2340] tracking-tight leading-[0.95] mb-6"
                            >
                                BIRSTBD <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2340] to-[#1FB6FF]">
                                    AI Ecosystem.
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-slate-500 max-w-lg leading-relaxed font-['Helvetica']"
                            >
                                A suite of advanced analytical agents designed to accelerate your research workflow with precision and depth.
                            </motion.p>
                        </div>

                        {/* Stats / Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="hidden md:flex gap-12"
                        >
                            <div>
                                <div className="text-3xl font-['Helvetica-Bold'] text-[#0B2340] mb-1">6+</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider font-['Helvetica-Bold']">Active Agents</div>
                            </div>
                            <div>
                                <div className="text-3xl font-['Helvetica-Bold'] text-[#0B2340] mb-1">v2.0</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider font-['Helvetica-Bold']">Core Version</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {bots.map((bot, index) => (
                            <BotCard key={bot.id} bot={bot} index={index} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AiTools;

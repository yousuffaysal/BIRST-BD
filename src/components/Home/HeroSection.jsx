
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const HeroSection = () => {
    const { user } = useAuth();
    return (
        <section className="relative bg-[var(--color-birst-dark)] text-white overflow-hidden py-24 lg:py-32">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] rounded-full bg-[var(--color-birst-primary)] blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-[var(--color-birst-accent)] blur-3xl opacity-30"></div>
            </div>

            <div className="container relative z-10 px-4 mx-auto text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm animate-fade-in-up">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-birst-primary)] animate-pulse"></span>
                    <span className="text-sm font-medium tracking-wide uppercase text-gray-200">
                        Welcome to BIRST
                    </span>
                </div>

                <h1 className="max-w-4xl mx-auto mb-6 text-5xl font-bold leading-tight tracking-tight lg:text-7xl animate-fade-in-up" style={{ fontFamily: 'var(--font-family-space-grotesk)' }}>
                    Empowering Bangladesh <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-birst-primary)] to-[var(--color-birst-accent)]">
                        Through Research & AI
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-300 lg:text-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    Bridging the gap between academic research and modern technology.
                    We provide advanced training, AI-powered tools, and expert guidance to future researchers.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <Link
                        to={user ? "/dashboard" : "/signup"}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white rounded-full bg-[var(--color-birst-primary)] hover:bg-[var(--color-srcbd-green-hover)] transition-all transform hover:scale-105 shadow-lg shadow-blue-500/25 font-semibold"
                    >
                        Get Started
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        to="/about/profile"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white transition-all border rounded-full border-white/20 hover:bg-white/10 hover:border-white/40 font-semibold"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
import React from "react";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "BIRST's research methodology workshop completely changed how I approached my thesis. The AI tools are a lifesaver!",
        name: "Sadia Afrin",
        role: "Masters Student, DU"
    },
    {
        quote: "I never thought statistics could be this easy to understand. The instructors explained everything so clearly.",
        name: "Rahim Ahmed",
        role: "Researcher, BRAC University"
    },
    {
        quote: "The personalized feedback on my research proposal helped me secure my scholarship. Forever grateful to BIRST.",
        name: "Nusrat Jahan",
        role: "PhD Candidate"
    }
];

const SuccessStoriesSection = () => {
    return (
        <section className="py-16 lg:py-24 bg-[var(--color-birst-dark)] relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 border border-white/50 rounded-full"></div>
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 text-3xl font-bold text-[var(--color-birst-primary)] lg:text-4xl"
                        style={{ fontFamily: 'var(--font-family-space-grotesk)' }}
                    >
                        Success Stories
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-lg text-gray-300"
                    >
                        Hear from our students and researchers who have transformed their academic careers with BIRST.
                    </motion.p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {testimonials.map((story, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                            <Quote className="absolute top-6 left-6 w-8 h-8 text-[var(--color-birst-primary)] opacity-50" />
                            <p className="mt-8 mb-6 text-lg italic text-gray-200 leading-relaxed">
                                "{story.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-500 rounded-full animate-pulse"></div>
                                <div>
                                    <div className="font-bold text-white">{story.name}</div>
                                    <div className="text-sm text-[var(--color-birst-primary)]">{story.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStoriesSection;
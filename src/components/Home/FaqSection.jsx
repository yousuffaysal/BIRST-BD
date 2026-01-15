import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "How do I enroll in a course?",
            answer: "Simply navigate to the Courses section, choose your desired program, and click on 'Enroll Now'. You will be guided through the registration and payment process."
        },
        {
            question: "Are the seminars free or paid?",
            answer: "We offer both free and paid seminars. Check the event details for specific pricing information. We regularly host free webinars for students."
        },
        {
            question: "How does the AI Research Paper Review work?",
            answer: "Our AI tool analyzes your uploaded document for structure, clarity, and methodology. It then provides instant feedback and suggestions for improvement."
        },
        {
            question: "Can I get a refund if I'm not satisfied?",
            answer: "Yes, we have a 7-day refund policy for our paid courses if you are not satisfied with the content. Terms and conditions apply."
        },
        {
            question: "Do you offer certificates for workshops?",
            answer: "Yes, all participants receive a verified digital certificate upon successful completion of any workshop or course."
        }
    ];

    return (
        <section className="py-24 bg-[#fffff0]">
            <div className="container px-4 mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold tracking-wider uppercase text-[var(--color-birst-primary)] bg-blue-50 rounded-full">
                        FAQ
                    </span>
                    <h2 className="mb-6 text-3xl font-bold lg:text-4xl text-[var(--color-birst-dark)]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                        Frequently Asked Questions
                    </h2>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="border-[2px] border-black rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--color-birst-primary)] bg-white"
                        >
                            <button
                                className="flex items-center justify-between w-full p-6 text-left group"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className={`text-lg font-bold transition-colors duration-300 ${openIndex === index ? 'text-[var(--color-birst-primary)]' : 'text-gray-700'}`}>
                                    {faq.question}
                                </span>
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 transform ${openIndex === index ? 'bg-[var(--color-birst-primary)] text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-[var(--color-birst-primary)] group-hover:text-white'}`}>
                                    {openIndex === index ? (
                                        <Minus className="w-5 h-5" />
                                    ) : (
                                        <Plus className="w-5 h-5" />
                                    )}
                                </div>
                            </button>

                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100/50">
                                    {faq.answer}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
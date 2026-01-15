import React from "react";
import { Download, FileText, Table } from "lucide-react";
import { motion } from "framer-motion";

const ResourcesSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center justify-between mb-12 text-center md:flex-row md:text-left"
                >
                    <div className="max-w-2xl">
                        <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold tracking-wider uppercase text-[var(--color-birst-primary)] bg-blue-50 rounded-full">
                            Free Resources
                        </span>
                        <h2 className="mb-4 text-3xl font-bold lg:text-4xl text-[var(--color-birst-primary)]" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                            Research Library
                        </h2>
                        <p className="text-gray-600">Download essential templates and datasets to kickstart your research.</p>
                    </div>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: "Thesis Template (APA Style)",
                            desc: "Standard formatted word document for thesis writing.",
                            type: "DOCX",
                            size: "2.4 MB",
                            link: "/resources/Thesis_Template_APA.docx"
                        },
                        {
                            title: "Research Proposal Sample",
                            desc: "A winning research proposal example with annotations.",
                            type: "PDF",
                            size: "1.1 MB",
                            link: "/resources/Research_Proposal_Sample.pdf"
                        },
                        {
                            title: "Statistical Test Cheat Sheet",
                            desc: "Quick reference guide for choosing the right test.",
                            type: "PDF",
                            size: "0.5 MB",
                            link: "/resources/Statistical_Test_Cheat_Sheet.pdf"
                        },
                        {
                            title: "Sample Dataset (SPSS)",
                            desc: "Practice dataset for quantitative analysis.",
                            type: "CSV",
                            size: "4.2 KB",
                            link: "/resources/Sample_Dataset.csv"
                        },
                        {
                            title: "Literature Review Matrix",
                            desc: "Excel sheet to organize your literature review.",
                            type: "XLSX",
                            size: "0.8 MB",
                            link: "/resources/Literature_Review_Matrix.xlsx"
                        },
                        {
                            title: "Consent Form Template",
                            desc: "Ethical clearance consent form for participants.",
                            type: "DOCX",
                            size: "1.5 MB",
                            link: "/resources/Consent_Form_Template.docx"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex items-start gap-4 p-6 transition-all border border-gray-100 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md hover:border-[var(--color-birst-primary)] group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-white rounded-lg shadow-sm text-[var(--color-birst-primary)] group-hover:bg-[var(--color-birst-primary)] group-hover:text-white transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="mb-1 text-lg font-bold text-[var(--color-birst-dark)]">{item.title}</h4>
                                <p className="mb-3 text-sm text-gray-500">{item.desc}</p>
                                <div className="flex items-center gap-4 text-xs font-semibold text-gray-400">
                                    <span className="px-2 py-1 bg-white border rounded">{item.type}</span>
                                    <span>{item.size}</span>
                                    <a
                                        href={item.link}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 ml-auto text-[var(--color-birst-primary)] hover:underline"
                                    >
                                        <Download className="w-3 h-3" />
                                        Download
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResourcesSection;
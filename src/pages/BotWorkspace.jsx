import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Paperclip, Loader2, Copy, Check, RefreshCw, ChevronLeft,
    Sparkles, PanelLeftClose, PanelLeftOpen, Maximize2, Minimize2, ArrowLeft,
    Menu, X, FileText, Settings
} from 'lucide-react';
import { useBotApi } from '../hooks/useBotApi';
import { bots } from '../data/bots';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '../components/Shared/CodeBlock';

const BotWorkspace = () => {
    const { id } = useParams();
    const bot = bots.find(b => b.id === id);

    const { executeBot, loading, response, error } = useBotApi();
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [copied, setCopied] = useState(false);

    // Mobile State
    const [mobileTab, setMobileTab] = useState('input'); // 'input' | 'output'
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Desktop sidebar toggle

    // Loading Timer State
    const [loadingDuration, setLoadingDuration] = useState(0);

    useEffect(() => {
        let interval;
        if (loading) {
            setLoadingDuration(0);
            interval = setInterval(() => {
                setLoadingDuration(prev => prev + 1);
            }, 1000);
        } else {
            setLoadingDuration(0);
        }
        return () => clearInterval(interval);
    }, [loading]);

    useEffect(() => {
        if (response && window.innerWidth < 1024) {
            setMobileTab('output');
        }
    }, [response]);

    if (!bot) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#fffff0] pt-[100px]">
                <h1 className="text-2xl text-[#0B2340] font-['Helvetica-Bold']">Bot Not Found</h1>
                <Link to="/aitools" className="mt-4 px-4 py-2 bg-[#0B2340] text-white rounded-lg hover:bg-[#1FB6FF] font-['Helvetica-Bold'] transition-colors">
                    Back to Tools
                </Link>
            </div>
        );
    }

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { ...inputs };
        if (file) {
            formData.pdf_file = file;
        }
        await executeBot(bot.id, formData);
        // Mobile: Auto-switch to output is handled by useEffect on response change, 
        // but we can also force it if we want to show the loading state there.
        if (window.innerWidth < 1024) {
            // Optional: set tabs immediately if you want to show loading spinner in output area
            // setMobileTab('output'); 
        }
    };

    const handleCopy = () => {
        if (response) {
            navigator.clipboard.writeText(response);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const toggleMobileTab = (tab) => {
        setMobileTab(tab);
    };

    // --- Field Rendering Logic ---
    const renderFields = () => {
        const inputClass = "w-full p-4 bg-[#0F2942] border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50 placeholder:text-slate-500 transition-all";
        const labelClass = "block text-xs font-bold text-[#1FB6FF] uppercase tracking-wider mb-2 font-['Helvetica-Bold']";
        const selectClass = "w-full p-4 bg-[#0F2942] border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50 appearance-none";

        switch (bot.id) {
            case 'citation':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className={labelClass}>BibTeX Citation</label>
                            <textarea
                                name="bibtex"
                                placeholder="@article{...}"
                                className={`${inputClass} font-mono text-sm`}
                                rows={6}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Style</label>
                            <div className="relative">
                                <select
                                    name="style"
                                    className={selectClass}
                                    onChange={handleInputChange}
                                    defaultValue="APA"
                                >
                                    <option value="APA">APA</option>
                                    <option value="MLA">MLA</option>
                                    <option value="IEEE">IEEE</option>
                                    <option value="Chicago">Chicago</option>
                                    <option value="Harvard">Harvard</option>
                                </select>
                                <ChevronLeft className="absolute right-4 top-1/2 -translate-y-1/2 rotate-[-90deg] h-4 w-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                );
            case 'idea':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className={labelClass}>Research Field</label>
                            <input
                                type="text"
                                name="field"
                                placeholder="e.g. Machine Learning"
                                className={inputClass}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Topic (Optional)</label>
                            <input
                                type="text"
                                name="topic"
                                placeholder="Specific area of interest..."
                                className={inputClass}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Novelty Level</label>
                            <div className="relative">
                                <select
                                    name="novelty"
                                    className={selectClass}
                                    onChange={handleInputChange}
                                    defaultValue="Medium"
                                >
                                    <option value="Low">Incremental</option>
                                    <option value="Medium">Moderate</option>
                                    <option value="High">Disruptive</option>
                                </select>
                                <ChevronLeft className="absolute right-4 top-1/2 -translate-y-1/2 rotate-[-90deg] h-4 w-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                );
            case 'writer':
                return (
                    <div>
                        <label className={labelClass}>Writing Prompt</label>
                        <textarea
                            name="input_text"
                            placeholder="Describe what you want to write..."
                            className={inputClass}
                            rows={8}
                            onChange={handleInputChange}
                        />
                    </div>
                );

            case 'questionaire':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className={labelClass}>Variables</label>
                            <input
                                type="text"
                                name="variables"
                                placeholder="e.g. Anxiety, Sleep Quality"
                                className={inputClass}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Population</label>
                                <input
                                    type="text"
                                    name="population"
                                    placeholder="e.g. Students"
                                    className={inputClass}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Culture/Region</label>
                                <input
                                    type="text"
                                    name="culture"
                                    placeholder="e.g. Bangladesh"
                                    className={inputClass}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Scale Type</label>
                                <div className="relative">
                                    <select name="scale" onChange={handleInputChange} className={selectClass}>
                                        <option value="5">5-Point Likert</option>
                                        <option value="7">7-Point Likert</option>
                                        <option value="binary">True/False</option>
                                    </select>
                                    <ChevronLeft className="absolute right-4 top-1/2 -translate-y-1/2 rotate-[-90deg] h-4 w-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Language</label>
                                <div className="relative">
                                    <select name="language" onChange={handleInputChange} className={selectClass}>
                                        <option value="English">English</option>
                                        <option value="Bangla">Bangla</option>
                                    </select>
                                    <ChevronLeft className="absolute right-4 top-1/2 -translate-y-1/2 rotate-[-90deg] h-4 w-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'sample_size':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className={labelClass}>Calculation Mode</label>
                            <div className="relative">
                                <select
                                    name="mode"
                                    onChange={handleInputChange}
                                    className={selectClass}
                                    defaultValue="prevalence"
                                >
                                    <option value="prevalence">Prevalence Study (Survey)</option>
                                    <option value="mean">Mean Estimation</option>
                                    <option value="regression">Regression Analysis</option>
                                </select>
                                <ChevronLeft className="absolute right-4 top-1/2 -translate-y-1/2 rotate-[-90deg] h-4 w-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {(!inputs.mode || inputs.mode === 'prevalence') && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Prevalence (p)</label>
                                        <input
                                            type="number" step="0.01" name="p"
                                            defaultValue="0.5"
                                            className={inputClass}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Precision (d)</label>
                                        <input
                                            type="number" step="0.01" name="d"
                                            defaultValue="0.05"
                                            className={inputClass}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Population Size (Optional)</label>
                                    <input
                                        type="number" name="population"
                                        placeholder="Leave empty for infinite"
                                        className={inputClass}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </>
                        )}

                        {inputs.mode === 'mean' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Std Dev (σ)</label>
                                    <input
                                        type="number" step="0.1" name="std_dev"
                                        defaultValue="1.0"
                                        className={inputClass}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Precision (d)</label>
                                    <input
                                        type="number" step="0.1" name="d"
                                        defaultValue="0.5"
                                        className={inputClass}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}

                        {inputs.mode === 'regression' && (
                            <div>
                                <label className={labelClass}>Number of Predictors</label>
                                <input
                                    type="number" name="predictors"
                                    defaultValue="3"
                                    className={inputClass}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                    </div>
                );
            case 'statistical':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>IV Type</label>
                                <div className="relative">
                                    <select name="iv_type" onChange={handleInputChange} className={selectClass}>
                                        <option value="categorical">Categorical</option>
                                        <option value="continuous">Continuous</option>
                                    </select>
                                    <ChevronLeft className="absolute right-4 top-1/2 -translate-y-1/2 rotate-[-90deg] h-4 w-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>DV Type</label>
                                <div className="relative">
                                    <select name="dv_type" onChange={handleInputChange} className={selectClass}>
                                        <option value="continuous">Continuous</option>
                                        <option value="categorical">Categorical</option>
                                    </select>
                                    <ChevronLeft className="absolute right-4 top-1/2 -translate-y-1/2 rotate-[-90deg] h-4 w-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Number of Groups (IV Levels)</label>
                            <input
                                type="number"
                                name="groups"
                                placeholder="e.g. 2, 3..."
                                className={inputClass}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                );
            case 'conference':
            case 'reviewer':
            case 'analyst':
                return (
                    <div className="space-y-6">
                        {(bot.id === 'reviewer' || bot.id === 'analyst' || bot.id === 'conference') && (
                            <div className="relative group">
                                <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" accept=".pdf" />
                                <label
                                    htmlFor="file-upload"
                                    className={`cursor-pointer flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-2xl transition-all ${file ? 'border-[#1FB6FF] bg-[#1FB6FF]/10' : 'border-white/10 hover:border-[#1FB6FF] hover:bg-white/5'}`}
                                >
                                    <div className={`p-3 rounded-full ${file ? 'bg-[#1FB6FF]/20 text-[#1FB6FF]' : 'bg-white/5 text-slate-400'}`}>
                                        <Paperclip size={24} />
                                    </div>
                                    <span className={`text-sm font-bold ${file ? 'text-[#1FB6FF]' : 'text-slate-400'}`}>
                                        {file ? file.name : "Upload PDF Paper"}
                                    </span>
                                </label>
                            </div>
                        )}
                        {bot.id !== 'analyst' && (
                            <div>
                                <label className={labelClass}>{bot.id === 'conference' ? "Inquiry" : "Specific Focus"}</label>
                                <textarea
                                    name="question"
                                    placeholder={bot.id === 'conference' ? "Ask about the conference..." : "e.g. Methodology, Results, Gaps..."}
                                    className={inputClass}
                                    rows={4}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className="flex h-screen bg-[#0B2340] overflow-hidden font-['Helvetica'] pt-[100px]">

            {/* --- Sidebar / Input Section (Mobile: Tab 1, Desktop: Sidebar) --- */}
            <div
                className={`
                    fixed inset-x-0 top-[100px] bottom-[70px] z-20 bg-[#0B2340] flex flex-col transition-all duration-300
                    lg:relative lg:inset-auto lg:top-0 lg:bottom-auto lg:shrink-0 lg:border-r lg:border-white/5
                    ${mobileTab === 'input' ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    ${isSidebarOpen ? 'lg:w-[450px]' : 'lg:w-0 lg:overflow-hidden lg:opacity-0'}
                `}
            >
                {/* Header (Mobile & Desktop) */}
                <div className="p-6 bg-[#0B2340] border-b border-white/5 flex items-center gap-4 shrink-0">
                    <Link to="/aitools" className="p-2.5 bg-white/5 rounded-xl hover:bg-white/10 text-white transition-colors border border-white/5">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-xl text-white font-['Helvetica-Bold'] truncate">{bot.name}</h1>
                        <div className="flex items-center gap-2 text-xs text-white/60 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1FB6FF]"></div>
                            <span className="uppercase tracking-wider font-bold">{bot.version}</span>
                        </div>
                    </div>
                </div>

                {/* Input Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-thin scrollbar-thumb-white/10">
                    <div className="mb-8 p-4 bg-[#1FB6FF]/5 rounded-xl border border-[#1FB6FF]/10 text-[#1FB6FF]/90 text-sm leading-relaxed">
                        {bot.description}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 pb-6 lg:pb-0">
                        {renderFields()}

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-2">
                                <span className="mt-0.5 block w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                w-full py-4 rounded-xl font-bold font-['Helvetica-Bold'] text-white shadow-xl transition-all flex items-center justify-center gap-2
                                ${loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-[#1FB6FF] hover:bg-[#0099DD] hover:shadow-[#1FB6FF]/25 hover:-translate-y-0.5'}
                            `}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} fill="currentColor" />}
                            {loading ? (loadingDuration > 15 ? 'Waking Up Server...' : 'Processing...') : 'Generate New Result'}
                        </button>
                    </form>
                </div>

                {/* Mobile Bottom Nav Spacer (Since Nav is sticky) */}
            </div>


            {/* --- Main Area / Output Section (Mobile: Tab 2, Desktop: Main) --- */}
            <div
                className={`
                    fixed inset-x-0 top-[100px] bottom-[70px] z-20 bg-[#F8FAFC] flex flex-col transition-all duration-300
                    lg:relative lg:inset-auto lg:top-0 lg:bottom-auto lg:flex-1 lg:translate-x-0
                    ${mobileTab === 'output' ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Mobile Header for Output */}
                <div className="lg:hidden p-6 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
                    <button
                        onClick={() => setMobileTab('input')}
                        className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-[#0B2340]"
                    >
                        <ChevronLeft size={20} />
                        Back to Inputs
                    </button>
                    <span className="text-sm font-bold uppercase tracking-widest text-[#0B2340]">Result</span>
                </div>

                {/* Desktop Top Bar */}
                <div className="hidden lg:flex h-16 bg-white border-b border-slate-200 items-center justify-between px-6 shrink-0 z-10">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 text-slate-400 hover:bg-slate-50 hover:text-[#0B2340] rounded-lg transition-colors"
                        >
                            {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                        </button>
                    </div>
                </div>

                {/* Output Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 scrollbar-thin">
                    <div className="max-w-4xl mx-auto h-full">
                        {loading && mobileTab === 'output' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center px-4">
                                <Loader2 size={48} className="text-[#1FB6FF] animate-spin mb-6" />

                                <h3 className="text-xl font-bold text-[#0B2340] animate-pulse">
                                    {loadingDuration > 15 ? "Waking Up AI Server..." : "Generating Result..."}
                                </h3>

                                <p className="text-slate-500 mt-3 max-w-sm">
                                    {loadingDuration > 30 ? (
                                        "The hosting server is in power-saving mode. It may take up to a minute to initialize for the first request. Thank you for your patience!"
                                    ) : loadingDuration > 15 ? (
                                        "Initializing the advanced models..."
                                    ) : (
                                        "Processing your request using BIRSTBD Intelligence."
                                    )}
                                </p>

                                {loadingDuration > 45 && (
                                    <div className="mt-8 p-3 bg-blue-50 text-[#0B2340] text-xs rounded-lg border border-blue-100 max-w-xs mx-auto">
                                        <p><strong>Note:</strong> We are using a cloud instance that sleeps when inactive. Once awake, subsequent requests will be instant.</p>
                                    </div>
                                )}
                            </div>
                        ) : response ? (
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="bg-white rounded-[24px] shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col overflow-hidden relative"
                            >
                                {/* Decorative Gradient Blur */}
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#1FB6FF] via-purple-500 to-[#1FB6FF] opacity-30"></div>

                                {/* Premium Header */}
                                <div className="bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 py-5 flex items-center justify-between border-b border-slate-100/50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#1FB6FF]/10 rounded-xl text-[#1FB6FF]">
                                            <Sparkles size={18} fill="currentColor" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-['Helvetica-Bold'] text-slate-800 tracking-tight">Generated Output</h2>
                                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">AI Powered Result</p>
                                        </div>
                                    </div>

                                    {/* Actions moved here for unified look */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleCopy}
                                            className={`
                                                group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border
                                                ${copied
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700 hover:shadow-sm'
                                                }
                                            `}
                                        >
                                            {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} className="group-hover:scale-105 transition-transform" />}
                                            {copied ? 'Copied' : 'Copy'}
                                        </button>

                                        <button
                                            onClick={() => window.location.reload()}
                                            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-700 hover:shadow-sm transition-all group"
                                        >
                                            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                                            New
                                        </button>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-8 md:p-10">
                                    <div className={`
                                        prose prose-lg max-w-none 
                                        prose-headings:font-['Helvetica-Bold'] prose-headings:tracking-tight prose-headings:text-slate-800
                                        prose-h1:text-3xl prose-h2:text-2xl
                                        prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-['Helvetica']
                                        prose-strong:text-slate-800 prose-strong:font-bold
                                        prose-ul:text-slate-600 prose-li:marker:text-[#1FB6FF]
                                        prose-a:text-[#1FB6FF] prose-a:no-underline hover:prose-a:underline
                                        prose-pre:bg-transparent prose-pre:p-0 prose-pre:shadow-none prose-pre:border-none prose-pre:rounded-none
                                        prose-code:bg-slate-100 prose-code:text-slate-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-medium prose-code:before:content-[''] prose-code:after:content-['']
                                        prose-blockquote:border-l-4 prose-blockquote:border-[#1FB6FF] prose-blockquote:bg-slate-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-slate-700
                                    `}>
                                        <ReactMarkdown
                                            components={{
                                                pre: CodeBlock
                                            }}
                                        >
                                            {response}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            /* Empty State */
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-100 select-none p-8">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-[28px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                    <div className="relative w-24 h-24 rounded-[24px] bg-white flex items-center justify-center mb-8 shadow-xl shadow-slate-200/50 border border-slate-100">
                                        <bot.icon size={48} className={`text-transparent bg-clip-text bg-gradient-to-tr ${bot.gradient}`} strokeWidth={1.5} />
                                    </div>
                                </div>
                                <h2 className="text-3xl text-[#0B2340] font-['Helvetica-Bold'] mb-3 tracking-tight">Workspace Ready</h2>
                                <p className="text-slate-500 max-w-md font-['Helvetica'] mx-auto text-lg leading-relaxed">
                                    Configure your requirements in the {window.innerWidth < 1024 ? 'inputs tab' : 'sidebar'} to let AI craft your content.
                                </p>
                                <button
                                    onClick={() => setMobileTab('input')}
                                    className="lg:hidden mt-8 px-8 py-3.5 bg-[#0B2340] text-white rounded-full font-bold shadow-lg shadow-[#0B2340]/20 active:scale-95 transition-all"
                                >
                                    Start Creating
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Mobile Bottom Navigation --- */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-2 z-50 flex items-center justify-around pb- safe-area-bottom">
                <button
                    onClick={() => setMobileTab('input')}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl flex-1 transition-colors ${mobileTab === 'input' ? 'text-[#1FB6FF] bg-blue-50' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                    <Settings size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Configure</span>
                </button>
                <div className="w-px h-8 bg-slate-100 mx-2"></div>
                <button
                    onClick={() => setMobileTab('output')}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl flex-1 transition-colors relative ${mobileTab === 'output' ? 'text-[#1FB6FF] bg-blue-50' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                    {/* Badge if response available */}
                    {response && (
                        <span className="absolute top-2 right-8 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    )}
                    <FileText size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Result</span>
                </button>
            </div>

        </div>
    );
};

export default BotWorkspace;

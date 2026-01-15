import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Paperclip, Loader2, Copy, Check, RefreshCw, ChevronLeft,
    Sparkles, PanelLeftClose, PanelLeftOpen, Maximize2, Minimize2, ArrowLeft
} from 'lucide-react';
import { useBotApi } from '../hooks/useBotApi';
import ReactMarkdown from 'react-markdown';
import { bots } from '../data/bots';

const BotWorkspace = () => {
    const { id } = useParams();
    const bot = bots.find(b => b.id === id);

    const { executeBot, loading, response, error } = useBotApi();
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    if (!bot) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#fffff0] pt-[100px]">
                <h1 className="text-2xl text-[#0B2340] font-['Helvetica-Bold']">Bot Not Found</h1>
                <Link to="/aitools" style={{ color: '#FFFFFF' }} className="mt-4 px-4 py-2 bg-[#0B2340] text-white rounded-lg hover:bg-[#1FB6FF] font-['Helvetica-Bold']">
                    Back to Tools
                </Link>
            </div>
        );
    }

    const handleInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { ...inputs };
        if (file) {
            formData.pdf_file = file;
        }
        await executeBot(bot.id, formData);
    };

    const handleCopy = () => {
        if (response) {
            navigator.clipboard.writeText(response);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // --- Field Rendering Logic (Same as before) ---
    const renderFields = () => {
        switch (bot.id) {
            case 'citation':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">BibTeX Citation</label>
                            <textarea
                                name="bibtex"
                                placeholder="@article{...}"
                                className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50 transition-all font-mono text-sm placeholder:text-slate-500"
                                rows={6}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Style</label>
                            <select
                                name="style"
                                className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50 appearance-none"
                                onChange={handleInputChange}
                                defaultValue="APA"
                            >
                                <option value="APA" className="text-black">APA</option>
                                <option value="MLA" className="text-black">MLA</option>
                                <option value="IEEE" className="text-black">IEEE</option>
                                <option value="Chicago" className="text-black">Chicago</option>
                                <option value="Harvard" className="text-black">Harvard</option>
                            </select>
                        </div>
                    </div>
                );
            case 'idea':
                return (
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="field"
                            placeholder="Research Field"
                            className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50 placeholder:text-slate-500"
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="topic"
                            placeholder="Topic (Optional)"
                            className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50 placeholder:text-slate-500"
                            onChange={handleInputChange}
                        />
                        <select
                            name="novelty"
                            className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50 appearance-none"
                            onChange={handleInputChange}
                            defaultValue="Medium"
                        >
                            <option value="Low" className="text-black">Incremental</option>
                            <option value="Medium" className="text-black">Moderate</option>
                            <option value="High" className="text-black">Disruptive</option>
                        </select>
                    </div>
                );
            case 'writer':
                return (
                    <textarea
                        name="input_text"
                        placeholder="What should I write?"
                        className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50 placeholder:text-slate-500"
                        rows={8}
                        onChange={handleInputChange}
                    />
                );

            case 'questionaire':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Variables</label>
                            <input
                                type="text"
                                name="variables"
                                placeholder="e.g. Anxiety, Sleep Quality"
                                className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50 placeholder:text-slate-500"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Population</label>
                                <input
                                    type="text"
                                    name="population"
                                    placeholder="e.g. University Students"
                                    className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50 placeholder:text-slate-500"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Culture/Region</label>
                                <input
                                    type="text"
                                    name="culture"
                                    placeholder="e.g. Bangladesh"
                                    className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50 placeholder:text-slate-500"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Scale Type</label>
                                <select name="scale" onChange={handleInputChange} className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl">
                                    <option value="5" className="text-black">5-Point Likert</option>
                                    <option value="7" className="text-black">7-Point Likert</option>
                                    <option value="binary" className="text-black">True/False</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Language</label>
                                <select name="language" onChange={handleInputChange} className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl">
                                    <option value="English" className="text-black">English</option>
                                    <option value="Bangla" className="text-black">Bangla</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 'sample_size':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Calculation Mode</label>
                            <select
                                name="mode"
                                onChange={handleInputChange}
                                className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50"
                                defaultValue="prevalence"
                            >
                                <option value="prevalence" className="text-black">Prevalence Study (Survey)</option>
                                <option value="mean" className="text-black">Mean Estimation</option>
                                <option value="regression" className="text-black">Regression Analysis</option>
                            </select>
                        </div>

                        {(!inputs.mode || inputs.mode === 'prevalence') && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Prevalence (p)</label>
                                        <input
                                            type="number" step="0.01" name="p"
                                            defaultValue="0.5"
                                            className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Precision (d)</label>
                                        <input
                                            type="number" step="0.01" name="d"
                                            defaultValue="0.05"
                                            className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Population Size (Optional)</label>
                                    <input
                                        type="number" name="population"
                                        placeholder="Leave empty for infinite"
                                        className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </>
                        )}

                        {inputs.mode === 'mean' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Std Dev (σ)</label>
                                    <input
                                        type="number" step="0.1" name="std_dev"
                                        defaultValue="1.0"
                                        className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Precision (d)</label>
                                    <input
                                        type="number" step="0.1" name="d"
                                        defaultValue="0.5"
                                        className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        )}

                        {inputs.mode === 'regression' && (
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Number of Predictors</label>
                                <input
                                    type="number" name="predictors"
                                    defaultValue="3"
                                    className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl"
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                    </div>
                );
            case 'statistical':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">IV Type</label>
                                <select name="iv_type" onChange={handleInputChange} className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl">
                                    <option value="categorical" className="text-black">Categorical</option>
                                    <option value="continuous" className="text-black">Continuous</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">DV Type</label>
                                <select name="dv_type" onChange={handleInputChange} className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl">
                                    <option value="continuous" className="text-black">Continuous</option>
                                    <option value="categorical" className="text-black">Categorical</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-['Helvetica-Bold']">Number of Groups (IV Levels)</label>
                            <input
                                type="number"
                                name="groups"
                                placeholder="e.g. 2, 3..."
                                className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50 placeholder:text-slate-500"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                );
            case 'conference':
            case 'reviewer':
            case 'analyst':
                return (
                    <div className="space-y-4">
                        {(bot.id === 'reviewer' || bot.id === 'analyst' || bot.id === 'conference') && (
                            <div className="relative group">
                                <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" accept=".pdf" />
                                <label
                                    htmlFor="file-upload"
                                    className={`cursor-pointer flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-xl transition-all ${file ? 'border-[#1FB6FF] bg-[#1FB6FF]/10' : 'border-white/10 hover:border-[#1FB6FF] hover:bg-white/5'}`}
                                >
                                    <Paperclip size={20} className={file ? 'text-[#1FB6FF]' : 'text-slate-400'} />
                                    <span className={`text-sm ${file ? 'text-[#1FB6FF]' : 'text-slate-400'}`}>
                                        {file ? file.name : "Upload PDF Paper"}
                                    </span>
                                </label>
                            </div>
                        )}
                        {bot.id !== 'analyst' && (
                            <textarea
                                name="question"
                                placeholder={bot.id === 'conference' ? "Ask about the conference..." : "Specific focus..."}
                                className="w-full p-4 bg-[#0B2340]/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1FB6FF]/50 placeholder:text-slate-500"
                                rows={4}
                                onChange={handleInputChange}
                            />
                        )}
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className="flex h-screen bg-[#0B2340] overflow-hidden font-['Helvetica'] pt-[100px]">

            {/* --- Sidebar (Left: Input) --- */}
            <motion.div
                initial={false}
                animate={{ width: isSidebarOpen ? '420px' : '0px', opacity: isSidebarOpen ? 1 : 0 }}
                className="relative bg-[#081A30] border-r border-white/5 flex flex-col shrink-0"
            >
                <div className="h-full flex flex-col w-[420px]"> {/* Fixed width inner container */}

                    {/* Header */}
                    <div className="p-6 bg-[#0B2340] border-b border-white/5 shrink-0 flex items-center gap-4">
                        <Link to="/aitools" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-white transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        {/* Bot Icon */}
                        <div className="p-2 bg-[#1FB6FF]/20 rounded-lg shadow-inner text-[#1FB6FF]">
                            <bot.icon size={24} />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-xl text-white font-['Helvetica-Bold']">{bot.name}</h1>
                            <div className="flex items-center gap-2 text-xs text-white/80 mt-1">
                                <span className="bg-[#1FB6FF]/20 text-[#1FB6FF] px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{bot.category}</span>
                                <span>{bot.version}</span>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Form Area */}
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <div className="mb-8">
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 border-l-2 border-[#1FB6FF] pl-4">
                                {bot.description}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {renderFields()}

                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                style={{ color: '#FFFFFF' }}
                                className={`w-full py-4 rounded-xl font-bold font-['Helvetica-Bold'] text-[#FFFFFF] shadow-lg transition-all flex items-center justify-center gap-2 ${loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-[#1FB6FF] hover:bg-[#0099DD] hover:shadow-xl shadow-[#1FB6FF]/20'}`}
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                                {loading ? 'Processing...' : 'Generate New Result'}
                            </button>
                        </form>
                    </div>

                    {/* Footer Credit */}
                    <div className="p-4 border-t border-white/5 text-center">
                        <p className="text-xs text-slate-500">Powered by BIRSTBD Intelligence</p>
                    </div>
                </div>
            </motion.div>


            {/* --- Main Area (Right: Results) --- */}
            <div className="flex-1 flex flex-col bg-[#fffff0] relative overflow-hidden">

                {/* Top Bar */}
                <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                        </button>
                        <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest font-['Helvetica-Bold']">
                            {isSidebarOpen ? 'Workspace' : `${bot.name} Workspace`}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {response && (
                            <>
                                <button
                                    onClick={handleCopy}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${copied ? 'bg-green-100 text-green-700 border-green-200' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-600 border border-slate-200 hover:border-slate-300 transition-all"
                                >
                                    <RefreshCw size={14} />
                                    Reset
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Workspace Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scrollbar-thin">
                    <div className="max-w-4xl mx-auto h-full">
                        {response ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[500px]"
                            >
                                <div className="border-b border-slate-100 p-6 flex items-center gap-2">
                                    <Sparkles className="text-[#1FB6FF]" size={20} />
                                    <h2 className="text-[#0B2340] font-['Helvetica-Bold'] text-lg">Generated Output</h2>
                                </div>
                                <div className="p-8 prose prose-slate max-w-none prose-headings:font-['Helvetica-Bold'] prose-p:font-['Helvetica'] prose-a:text-[#1FB6FF] font-['Helvetica']">
                                    <ReactMarkdown>{response}</ReactMarkdown>
                                </div>
                            </motion.div>
                        ) : (
                            /* Checkered Empty State */
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 select-none">
                                <div className="w-24 h-24 rounded-2xl bg-[#1FB6FF]/10 flex items-center justify-center mb-6 shadow-sm border border-[#1FB6FF]/20">
                                    <bot.icon size={48} className="text-[#1FB6FF]" />
                                </div>
                                <h2 className="text-3xl text-[#0B2340] font-['Helvetica-Bold'] mb-2">Ready to Create</h2>
                                <p className="text-slate-500 max-w-md font-['Helvetica']">
                                    Configure the parameters in the sidebar to generate {bot.category.toLowerCase()} results instantly.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default BotWorkspace;

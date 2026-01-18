import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `
You are BIRST AI, the intelligent assistant for Bangladesh Institute for Research and Statistical Training (BIRST), an initiative by Statistical Research Consultants Bangladesh (SRCBD).

## About BIRST
Bangladesh Institute for Research and Statistical Training (BIRST) is an innovative initiative by Statistical Research Consultants Bangladesh (SRCBD). We exist to democratize access to high-quality statistical and research training. Our programs represent the culmination of years of experience in statistical consulting, combining academic rigor with practical application.

## Mission
To empower researchers and professionals with advanced statistical knowledge, research methodologies, and data analysis skills through comprehensive training and consultancy services.

## Vision  
To become the leading research and statistical training institute in Bangladesh, fostering excellence in research and data-driven decision making across all sectors, maintaining global standards.

## History & Milestones
- **2015**: SRCBD established to bridge the gap between theory and practice
- **2018**: Launched online training & corporate consultancy across Bangladesh
- **2020**: Comprehensive online platform for remote learning
- **2024**: Establishment of Bangladesh Institute for Research and Statistical Training (BIRST)

## Key Statistics
- Established: 2015
- 5,000+ Alumni trained
- 50+ Courses offered
- 200+ Projects completed
- 10+ Years of experience
- National reach across 64 districts

## Leadership

### Director & Lead Statistician
**Professor Hafiz T.A. Khan**
- Professor of Public Health and Statistics
- Post-Doctoral in Population Ageing 2005 (University of Oxford)
- PhD in Applied Statistics 1996 (Edinburgh Napier University)
- MSc in Statistics 1987 (University of Chittagong)
- BSc in Statistics 1986 (University of Chittagong)
- 34+ Years of experience in research methodology
- Prior to joining UWL, held positions including Reader in Health Statistics at Birmingham City University and Research Fellow at the University of Oxford (2006-2008)
- Twitter: https://x.com/htakhan
- LinkedIn: https://www.linkedin.com/in/hafiz-t-a-khan-phd-978a9353/
- Google Scholar: https://scholar.google.com/citations?user=z8-PmZcAAAAJ&hl=en

### Adjunct Faculty

**Dr. Anamul Haque Sajib**
- Adjunct Faculty
- Professor, Department of Statistics, University of Dhaka
- PhD in Statistics (Nottingham)
- 16+ Years of experience
- Google Scholar: https://scholar.google.com/citations?user=rzyc9icAAAAJ&hl=en
- ResearchGate: https://www.researchgate.net/profile/Anamul-Sajib
- Faculty Profile: https://du.ac.bd/faculty/faculty_details/STA/2434

**Dr. Hossain, Md Pear**
- Adjunct Faculty
- Post-doctoral Fellow, Division of Epidemiology and Biostatistics, HKU
- PhD in Biomedical Sciences (CityU)
- HKU Fellow
- LinkedIn: https://www.linkedin.com/in/mphossain/
- Google Scholar: https://scholar.google.com/citations?user=RUdvILMAAAAJ&hl=en

**Dr. Md. Shiblur Rahaman**
- Adjunct Faculty
- Associate Professor, Dept. of Environmental Science and Disaster Management, NSTU
- Ph.D. in Environmental Science (Hokkaido)
- 10+ Years of experience
- LinkedIn: https://www.linkedin.com/in/md-shiblur-rahaman-phd-aa326228/
- Google Scholar: https://scholar.google.com/citations?user=V1gOoGAAAAAJ&hl=en

## Services & Programs
1. Comprehensive statistical training programs
2. Research methodology workshops
3. Data analysis and consulting services
4. Publication support and guidance
5. Software-specific training (SPSS, Stata, R, Python)
6. Customized corporate training programs
7. Online and in-person learning options
8. Certificate programs and professional development
9. AI-powered research tools
10. Seminars and academic sessions

## Core Values
- Excellence in research and training
- Integrity in all practices
- Innovation in teaching methods
- Continuous learning and improvement
- Student-centered approach
- Collaborative spirit

## Contact Information
- Address: H-16, RD-02, SEC-6/KA SENPARA PARBATA MIRPUR, Bangladesh
- Phone: 01827891389, 01551245430
- Email: info@birstbd.com, contact@birstbd.com
- Office Hours: Sunday – Thursday, 10:00 AM – 6:00 PM
- Headquarters: Dhaka, Bangladesh

## Your Role
Provide professional, encouraging, academic yet accessible responses. When asked about our team, director, or faculty, provide their names, credentials, and links. Keep answers concise and helpful. Use markdown formatting for better readability.
`;

export default function BirstAiChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // For full height mode
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm **BIRST AI**. How can I assist with your research or statistical training today? 🚀" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(GROQ_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        ...messages.map(m => ({ role: m.role, content: m.content })), // Clean messages
                        userMessage
                    ],
                    temperature: 0.7,
                    max_tokens: 1024,
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            const botMessage = {
                role: 'assistant',
                content: data.choices?.[0]?.message?.content || "I apologize, but I couldn't process that request."
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Groq API Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ Error: ${error.message || 'Connection failed'}. Please check your internet or API key.` }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Auto-resize textarea
    const handleInput = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] font-sans">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -180 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0B2340] rounded-full shadow-2xl flex items-center justify-center border-2 border-[#1FB6FF] group relative overflow-hidden touch-manipulation"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#1FB6FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-[#1FB6FF]" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isExpanded ? 'calc(100vh - 2rem)' : 'min(600px, calc(100vh - 2rem))',
                        }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className={`bg-white rounded-2xl shadow-2xl flex flex-col border border-[#0B2340]/10 overflow-hidden ${isExpanded
                            ? 'w-[calc(100vw-2rem)] sm:w-[450px]'
                            : 'w-[calc(100vw-2rem)] sm:w-[380px]'
                            } max-w-[450px]`}
                        style={{ maxHeight: 'calc(100vh - 2rem)' }}
                    >
                        {/* Header */}
                        <div className="bg-[#0B2340] p-3 sm:p-4 flex items-center justify-between text-white relative overflow-hidden shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-[#0B2340] to-blue-900 animate-gradient-x"></div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#1FB6FF]/20 rounded-full blur-3xl"></div>

                            <div className="flex items-center gap-2 sm:gap-3 relative z-10">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                                    <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-[#1FB6FF]" />
                                </div>
                                <div>
                                    <h3 className="font-bold font-['Unbounded'] text-xs sm:text-sm tracking-wide">BIRST AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        <span className="text-[9px] sm:text-[10px] text-white/70 uppercase tracking-widest font-bold">Online</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 relative z-10">
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="p-2 sm:p-2.5 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                                >
                                    {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 sm:p-2.5 hover:bg-red-500/80 rounded-full transition-colors text-white/70 hover:text-white touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(11,35,64,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(11,35,64,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                            {messages.map((msg, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={index}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed relative ${msg.role === 'user'
                                            ? 'bg-[#0B2340] text-white rounded-br-none'
                                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.role === 'assistant' && (
                                            <div className="absolute -top-6 -left-2 flex items-center gap-1 opacity-50">
                                                <span className="text-[10px] font-bold text-[#0B2340]">AI</span>
                                            </div>
                                        )}

                                        {msg.role === 'assistant' ? (
                                            <div dangerouslySetInnerHTML={{
                                                __html: msg.content
                                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                    .replace(/\n/g, '<br />')
                                            }} />
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 border border-gray-100 shadow-sm flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 text-[#1FB6FF] animate-spin" />
                                        <span className="text-xs text-gray-500 font-medium">Thinking...</span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 sm:p-4 bg-white border-t border-gray-100 shrink-0">
                            <div className="relative flex items-end gap-2 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-[#1FB6FF] focus-within:ring-2 focus-within:ring-[#1FB6FF]/20 transition-all p-2">
                                <textarea
                                    value={input}
                                    onChange={(e) => {
                                        setInput(e.target.value);
                                        handleInput(e);
                                    }}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask a question..."
                                    rows={1}
                                    className="w-full bg-transparent border-none focus:ring-0 text-gray-700 text-base resize-none max-h-32 py-2 px-2"
                                    style={{ minHeight: '40px', fontSize: '16px' }}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!input.trim() || isLoading}
                                    className={`p-2.5 sm:p-2 rounded-lg transition-all flex-shrink-0 mb-1 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center ${input.trim() && !isLoading
                                        ? 'bg-[#1FB6FF] text-white shadow-lg hover:bg-blue-600 active:scale-95'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-gray-400 font-medium">Powered by Groq & BIRST AI</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

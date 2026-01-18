
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export const CodeBlock = ({ children, className, node, ...props }) => {
    const [copied, setCopied] = useState(false);

    // Extract text content from children (which is typically a code element or string)
    const getTextContent = (children) => {
        if (typeof children === 'string') return children;
        if (Array.isArray(children)) return children.map(getTextContent).join('');
        if (children?.props?.children) return getTextContent(children.props.children);
        return '';
    };

    const textContent = getTextContent(children);

    // Determine language from className (e.g., "language-javascript")
    // ReactMarkdown passes the class to the <code> element, but we are wrapping the <pre>
    // Actually, usually <pre> contains <code>. Customizing <pre> gives us the wrapper.

    const handleCopy = () => {
        navigator.clipboard.writeText(textContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-6">
            {/* Header/Copy Bar */}
            <div className={`
                absolute top-3 right-3 z-10
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
            `}>
                <button
                    onClick={handleCopy}
                    className={`
                        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                        border backdrop-blur-sm
                        ${copied
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/20 hover:text-white'
                        }
                    `}
                >
                    {copied ? <Check size={14} strokeWidth={2.5} /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy Code'}
                </button>
            </div>

            {/* Code Content */}
            <pre
                {...props}
                className={`
                    !bg-black !text-[#1FB6FF] !rounded-xl !p-6 !m-0 overflow-x-auto shadow-2xl shadow-black/20 border border-white/10
                    scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent
                    relative font-mono text-sm leading-relaxed
                    [&_code]:!bg-transparent [&_code]:!text-inherit [&_code]:!p-0
                `}
            >
                {children}
            </pre>
        </div>
    );
};

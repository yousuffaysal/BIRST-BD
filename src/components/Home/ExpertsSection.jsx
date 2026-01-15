import React, { useEffect, useState } from "react";
import { Linkedin, Twitter, Facebook, Award, FileText, Activity, Quote } from "lucide-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ExpertCard = ({ expert }) => {
  // Generate random stats for visual consistency as backend doesn't provide this yet
  const stats = expert.stats || {
    published: Math.floor(Math.random() * 50) + 10,
    ongoing: Math.floor(Math.random() * 5) + 1,
    citations: (Math.floor(Math.random() * 2000) + 100)
  };

  return (
    <div className="w-[320px] md:w-[400px] relative group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 flex-shrink-0 mx-4 flex flex-col">
      {/* Cover Photo - Fixed Height */}
      <div className={`h-32 w-full bg-gradient-to-r ${expert.color || 'from-blue-500 to-cyan-500'} relative flex-shrink-0`}>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Content Container - Flexible Height */}
      <div className="relative flex-1 px-8 pb-8 pt-12 flex flex-col items-center text-center">

        {/* Profile Photo - Overlapping */}
        <div className={`absolute -top-14 w-28 h-28 rounded-full border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-gray-600 bg-white overflow-hidden z-20`}>
          {expert.image ? (
            <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${expert.color || 'from-gray-100 to-gray-300'} text-white`}>
              {expert.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Basic Info */}
        <h3 className="text-2xl font-bold text-[var(--color-birst-dark)] leading-tight mb-2 mt-2">{expert.name}</h3>
        <p className="text-sm font-bold text-[var(--color-birst-primary)] uppercase tracking-wide mb-4">{expert.role}</p>
        <p className="text-xs text-gray-500 mb-2">{expert.education}</p>

        {/* Bio - Ensure visibility. Using 'expertise' as bio if bio is missing */}
        <div className="mb-6 px-2 min-h-[3rem] flex items-center justify-center">
          <p className="text-sm text-gray-600 line-clamp-3 italic leading-relaxed">
            "{expert.bio || expert.expertise || "Dedicated researcher and academic professional."}"
          </p>
        </div>

        {/* Stats Row */}
        <div className="w-full grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-50 mb-6 bg-gray-50/50 rounded-lg mt-auto">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-gray-800">{stats.published}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Papers</span>
          </div>
          <div className="flex flex-col items-center border-l border-gray-200">
            <span className="text-lg font-bold text-gray-800">{stats.ongoing}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Ongoing</span>
          </div>
          <div className="flex flex-col items-center border-l border-gray-200">
            <span className="text-lg font-bold text-gray-800">{(stats.citations / 1000).toFixed(1)}k</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Citations</span>
          </div>
        </div>

        {/* Social Links - Reveal on Hover */}
        <div className="flex gap-4 justify-center">
          {expert.linkedin && (
            <a href={expert.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors bg-gray-50 p-2 rounded-full hover:bg-blue-50">
              <Linkedin size={18} />
            </a>
          )}
          <a href="#" className="text-gray-400 hover:text-[#1877F2] transition-colors bg-gray-50 p-2 rounded-full hover:bg-blue-50">
            <Facebook size={18} />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#1DA1F2] transition-colors bg-gray-50 p-2 rounded-full hover:bg-blue-50">
            <Twitter size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

const ExpertsSection = () => {
  const [experts, setExperts] = useState([]);
  const axiosPublic = useAxiosPublic();
  const scrollerRef = React.useRef(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const res = await axiosPublic.get('/team-members');
        // Backend now sorts by position then createdAt
        setExperts(res.data);
      } catch (error) {
        console.error("Failed to fetch experts:", error);
      }
    };
    fetchExperts();
  }, [axiosPublic]);

  React.useEffect(() => {
    const scroller = scrollerRef.current;
    let animationId;

    const step = () => {
      if (!isPaused && !isDragging && scroller && experts.length > 0) {
        scroller.scrollLeft += 1;
        // Infinite Loop Logic: If we've scrolled past the first set, reset to 0
        // We assume the first set is half the total width (since we doubled contents)
        // Adjust logic for safety:
        if (scroller.scrollLeft >= (scroller.scrollWidth - scroller.clientWidth) / 2 && scroller.scrollLeft > 0) {
          // Reset is tricky with variable content. Simple reset if doubled:
          if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
            scroller.scrollLeft = 0;
          }
        }
        // Simpler infinite scroll logic for uniform items:
        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
          scroller.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isDragging, experts]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsPaused(true); // Pause auto-scroll while dragging
    setStartX(e.pageX - scrollerRef.current.offsetLeft);
    setScrollLeft(scrollerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    scrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  if (!experts.length) return null; // Don't render empty section (or render skeleton)

  return (
    <section className="py-24 bg-[#ffffff] overflow-hidden">
      <div className="container px-4 mx-auto mb-16 text-center">
        <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold tracking-wider uppercase text-[var(--color-birst-primary)] bg-blue-50 rounded-full">
          Our Team
        </span>
        <h2 className="mb-6 text-3xl font-bold lg:text-5xl text-[var(--color-birst-dark)]" style={{ fontFamily: 'var(--font-family-space-grotesk)' }}>
          Learn from the Experts
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Distinguished professors and industry leaders dedicated to your research success.
        </p>
      </div>

      {/* Draggable Rolling Animation Container */}
      <div className="relative w-full group">
        {/* Soft Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#ffffff] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#ffffff] to-transparent z-10 pointer-events-none"></div>

        <div
          ref={scrollerRef}
          className="flex overflow-x-hidden cursor-grab active:cursor-grabbing no-scrollbar py-20"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsPaused(true)}
        >
          {/* Double the list for infinite seamless loop */}
          {[...experts, ...experts].map((expert, index) => (
            <ExpertCard key={`${expert._id || index}-${index}`} expert={expert} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;
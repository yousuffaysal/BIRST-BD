import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { AuthContext } from "../../Providers/AuthProvider";
import { motion } from "framer-motion";
import birstLogo from "../../assets/BIRST_LOGO.svg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !Object.values(dropdownRefs.current).some((ref) =>
          ref?.contains(e.target)
        )
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Structure: 
  // Courses, Services, Research & Publication, 
  // News & Events (Dropdown containing News, Gallery, About Us links), 
  // Contact Us
  const navItems = [
    { label: "Courses", to: "/courses" },
    { label: "Services", to: "/service" },
    { label: "Research & Publication", to: "/researchAndPublication" },
    {
      label: "News & Events",
      dropdown: [
        { label: "All News & Events", to: "/newsAndEvents" },
        { label: "Gallery", to: "/gallery" },
        { label: "About Us", to: "/about/profile" },
        { label: "Our Mission", to: "/about/mission" },
        { label: "Our Vision", to: "/about/vision" },
        { label: "Our Team", to: "/about/team" },
      ]
    },
    { label: "Contact Us", to: "/contact" },
  ];

  const handleLogout = () => {
    logOut().then(() => (window.location.href = "/"));
  };

  const linkClass = (isActive, isDropdown = false) =>
    `relative px-3 py-2 text-sm font-normal transition-colors whitespace-nowrap font-['Montserrat'] uppercase ${isActive ? "text-[#00BFFF]" : "text-[#232323] hover:text-[#00BFFF]"
    } ${isDropdown ? "flex items-center gap-1" : ""}`;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.67, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 w-full h-[100px] flex items-center transition-all duration-300 font-['Montserrat'] border-b-[2px] border-gray-200 ${isScrolled ? "bg-[#FFFFF0]/95 backdrop-blur-md shadow-sm" : "bg-[#FFFFF0]"
        }`}
    >
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src={birstLogo}
              alt="BIRST Logo"
              className="h-16 w-16 object-contain"
            />
            <div className="flex flex-col hidden sm:flex">
              <span className="font-bold text-[#232323] text-[15px] xl:text-[17px] leading-tight tracking-wide font-['Montserrat'] uppercase">
                Bangladesh Institute for
              </span>
              <span className="font-bold text-[#232323] text-[15px] xl:text-[17px] leading-tight tracking-wide font-['Montserrat'] uppercase">
                Research and Statistical Training
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-0 xl:space-x-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                ref={(el) => (dropdownRefs.current[item.label] = el)}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      className={linkClass(
                        item.dropdown.some(sub => location.pathname.startsWith(sub.to)),
                        true
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    <div
                      className={`absolute left-0 top-full mt-2 w-56 rounded-xl bg-white shadow-xl ring-1 ring-black/5 py-2 z-50 overflow-hidden transition-all duration-200 origin-top
                        ${activeDropdown === item.label ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
                    >
                      {item.dropdown.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 text-sm transition-colors font-['Montserrat'] ${isActive
                              ? "bg-blue-50 text-[#00BFFF] font-normal"
                              : "text-gray-700 hover:bg-gray-50 hover:text-[#00BFFF]"
                            }`
                          }
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => linkClass(isActive)}
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth / Start Learning */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {user ? (
              <>
                <NavLink to="/dashboard" className="text-sm font-normal text-gray-700 hover:text-[#00BFFF] transition-colors font-['Montserrat'] uppercase">
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-lg border border-[#00BFFF] text-[#00BFFF] font-normal text-sm hover:bg-[#00BFFF] hover:text-white transition-all font-['Montserrat'] uppercase"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-bold text-gray-700 hover:text-[#00BFFF] transition-colors font-['Montserrat'] uppercase mr-4"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="btn-registration"
                >
                  <span>Registration</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-[#FFFFF0] border-t border-gray-100 shadow-xl transition-all duration-300 overflow-hidden ${isMobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <>
                  <div className="px-4 py-2 text-sm font-bold text-gray-400 uppercase tracking-wider font-['Montserrat']">
                    {item.label}
                  </div>
                  {item.dropdown.map(sub => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setIsMobileOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-gray-700 rounded-xl hover:bg-gray-50 hover:text-[#00BFFF] pl-8 font-['Montserrat']"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  to={item.to}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-gray-700 rounded-xl hover:bg-gray-50 hover:text-[#00BFFF] font-['Montserrat']"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="pt-4 mt-4 border-t border-gray-100">
            {user ? (
              <button onClick={handleLogout} className="block w-full text-center px-6 py-3 border border-[#00BFFF] text-[#00BFFF] font-medium rounded-xl font-['Montserrat']">
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#00BFFF] text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 font-['Montserrat']"
              >
                <User size={18} />
                Start Learning
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
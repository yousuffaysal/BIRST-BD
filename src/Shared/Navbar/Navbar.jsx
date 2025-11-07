


// import React, { useState, useEffect, useContext } from 'react';

// import { Link, useLocation, NavLink } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';
// import { AuthContext } from '../../Providers/AuthProvider';
// import Shuffle from '../../components/Shuffle';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const location = useLocation();
//   const { user, logOut } = useContext(AuthContext); 

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { name: 'HOME', href: '/', isExternal: false },
//     { name: 'ABOUT', href: '/about', isExternal: false },
//     { name: 'Courses', href: '/courses', isExternal: false },
//     { name: 'Research and publication', href: '/researchAndPublication', isExternal: false },
//     { name: 'News and events', href: '/newsAndEvents', isExternal: false },
//     { name: 'Gallery', href: '/gallery', isExternal: false },
//     { name: 'AI Tools', href: '/aitools', isExternal: false },
//     { name: 'Service', href: '/service', isExternal: false },
//     { name: 'CONTACT', href: '/contact', isExternal: false },
//   ];

//   const handleNavClick = (href, isExternal) => {
//     if (isExternal) {
//       if (location.pathname !== '/') {
//         window.location.href = `/${href}`;
//       } else {
//         const element = document.querySelector(href);
//         if (element) {
//           element.scrollIntoView({ behavior: 'smooth' });
//         }
//       }
//     }
//     setIsOpen(false);
//   };

//   const handleLogout = () => {
//     logOut()
//       .then(() => {
//         window.location.href = '/'; // Navigate to home page after logout
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <nav className="relative z-50 bg-hero-bg">
//       <div className="w-full px-3 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16 md:h-20 lg:h-24 py-2">
//           {/* Logo */}
//           <Link to="/" className="flex-shrink-0 cursor-pointer">
//             <img 
//               src="https://res.cloudinary.com/duh7c5x99/image/upload/v1757758678/lebas_bhx7wl.png" 
//               alt="The Lebas Buying" 
//               className="h-10 md:h-16 lg:h-20 xl:h-24 w-auto"
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
//             <div className="flex items-center space-x-4 xl:space-x-8">
//               {navItems.map((item) => (
//                 item.isExternal ? (
//                   <button
//                     key={item.name}
//                     onClick={() => handleNavClick(item.href, item.isExternal)}
//                     className="text-white hover:text-mint-green transition-colors duration-300 px-2 py-2 relative group"
//                   >
//                     <Shuffle
//                       text={item.name}
//                       className="text-xs sm:text-sm font-medium"
//                       shuffleDirection="right"
//                       duration={0.35}
//                       animationMode="evenodd"
//                       shuffleTimes={1}
//                       ease="power3.out"
//                       stagger={0.03}
//                       threshold={0.1}
//                       triggerOnce={true}
//                       triggerOnHover={true}
//                       respectReducedMotion={true}
//                     />
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mint-green transition-all duration-300 group-hover:w-full"></span>
//                   </button>
//                 ) : (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     onClick={() => handleNavClick(item.href, item.isExternal)}
//                     className={`text-white hover:text-mint-green transition-colors duration-300 px-2 py-2 relative group ${
//                       location.pathname === item.href ? 'text-mint-green' : ''
//                     }`}
//                   >
//                     <Shuffle
//                       text={item.name}
//                       className="text-xs sm:text-sm font-medium"
//                       shuffleDirection="right"
//                       duration={0.35}
//                       animationMode="evenodd"
//                       shuffleTimes={1}
//                       ease="power3.out"
//                       stagger={0.03}
//                       threshold={0.1}
//                       triggerOnce={true}
//                       triggerOnHover={true}
//                       respectReducedMotion={true}
//                     />
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mint-green transition-all duration-300 group-hover:w-full"></span>
//                   </Link>
//                 )
//               ))}
//             </div>

//             {/* Auth Buttons (Desktop) */}
//             <div className="ml-4">
//               {user ? (
//                 <div className="flex items-center space-x-3">
//                   <NavLink
//                     to="/dashboard"
//                     className="px-3 py-2 text-xs sm:text-sm font-medium text-[#D0A96A] hover:text-[#B8945A] transition-all duration-300 hover:bg-gray-700/50 rounded-md"
//                   >
//                     Dashboard
//                   </NavLink>
//                   <button
//                     onClick={handleLogout}
//                     className="btn-elevated-hero text-sm sm:text-base"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <NavLink
//                   to="/signup"
//                   className="btn-elevated-hero text-sm sm:text-base"
//                 >
//                   Sign Up
//                 </NavLink>
//               )}
//             </div>
//           </div>

//           {/* Tablet Navigation */}
//           <div className="hidden md:flex lg:hidden items-center space-x-4">
//             <div className="flex items-center space-x-3">
//               {navItems.slice(0, 3).map((item) => (
//                 item.isExternal ? (
//                   <button
//                     key={item.name}
//                     onClick={() => handleNavClick(item.href, item.isExternal)}
//                     className="text-white hover:text-mint-green transition-colors duration-300 px-2 py-2 relative group"
//                   >
//                     <Shuffle
//                       text={item.name}
//                       className="text-xs font-medium"
//                       shuffleDirection="right"
//                       duration={0.35}
//                       animationMode="evenodd"
//                       shuffleTimes={1}
//                       ease="power3.out"
//                       stagger={0.03}
//                       threshold={0.1}
//                       triggerOnce={true}
//                       triggerOnHover={true}
//                       respectReducedMotion={true}
//                     />
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mint-green transition-all duration-300 group-hover:w-full"></span>
//                   </button>
//                 ) : (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     onClick={() => handleNavClick(item.href, item.isExternal)}
//                     className={`text-white hover:text-mint-green transition-colors duration-300 px-2 py-2 relative group ${
//                       location.pathname === item.href ? 'text-mint-green' : ''
//                     }`}
//                   >
//                     <Shuffle
//                       text={item.name}
//                       className="text-xs font-medium"
//                       shuffleDirection="right"
//                       duration={0.35}
//                       animationMode="evenodd"
//                       shuffleTimes={1}
//                       ease="power3.out"
//                       stagger={0.03}
//                       threshold={0.1}
//                       triggerOnce={true}
//                       triggerOnHover={true}
//                       respectReducedMotion={true}
//                     />
//                     <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mint-green transition-all duration-300 group-hover:w-full"></span>
//                   </Link>
//                 )
//               ))}
//             </div>

//             {/* Auth Buttons (Tablet) */}
//             <div className="ml-2">
//               {user ? (
//                 <div className="flex items-center space-x-2">
//                   <NavLink
//                     to="/dashboard"
//                     className="px-2 py-1 text-xs font-medium text-[#D0A96A] hover:text-[#B8945A] transition-all duration-300 hover:bg-gray-700/50 rounded-md"
//                   >
//                     Dashboard
//                   </NavLink>
//                   <button
//                     onClick={handleLogout}
//                     className="btn-elevated-hero text-sm px-3 py-1"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <NavLink
//                   to="/signup"
//                   className="btn-elevated-hero text-sm px-3 py-1"
//                 >
//                   Sign Up
//                 </NavLink>
//               )}
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-white hover:text-mint-green transition-colors duration-300 p-1 rounded-md hover:bg-white/10"
//             >
//               {isOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden absolute top-full left-0 right-0 bg-hero-bg border-t border-white/20 shadow-lg">
//             <div className="px-3 py-4 space-y-1">
//               {navItems.map((item) => (
//                 item.isExternal ? (
//                   <button
//                     key={item.name}
//                     onClick={() => handleNavClick(item.href, item.isExternal)}
//                     className="text-white hover:text-mint-green block px-3 py-3 w-full text-left transition-colors duration-300 rounded-md hover:bg-white/10"
//                   >
//                     <span className="text-sm font-medium">{item.name}</span>
//                   </button>
//                 ) : (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     onClick={() => handleNavClick(item.href, item.isExternal)}
//                     className={`text-white hover:text-mint-green block px-3 py-3 w-full text-left transition-colors duration-300 rounded-md hover:bg-white/10 ${
//                       location.pathname === item.href ? 'text-mint-green bg-white/5' : ''
//                     }`}
//                   >
//                     <span className="text-sm font-medium">{item.name}</span>
//                   </Link>
//                 )
//               ))}

//               {/* Auth Buttons (Mobile) */}
//               <div className="pt-3 border-t border-white/20 mt-3">
//                 {user ? (
//                   <div className="space-y-2">
//                     <NavLink
//                       to="/dashboard"
//                       onClick={() => setIsOpen(false)}
//                       className="px-3 py-3 text-sm font-medium text-[#D0A96A] hover:text-[#B8945A] hover:bg-gray-700/50 rounded-md block w-full text-left transition-colors duration-300"
//                     >
//                       Dashboard
//                     </NavLink>
//                     <button
//                       onClick={() => {
//                         handleLogout();
//                         setIsOpen(false);
//                       }}
//                       className="btn-elevated-hero w-full text-center block py-2 text-sm"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 ) : (
//                   <NavLink
//                     to="/signup"
//                     onClick={() => setIsOpen(false)}
//                     className="btn-elevated-hero w-full text-center block py-2 text-sm"
//                   >
//                     Sign Up
//                   </NavLink>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// test

import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  // ✅ Detect scroll for sticky shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Close dropdown when clicking outside
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

  // ✅ Navbar items
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Courses", to: "/courses" },
    {
      label: "About Us",
      dropdown: [
        { label: "BIRSTBD Profile", to: "/about/profile" },
        { label: "Our Mission", to: "/about/mission" },
        { label: "Our Vision", to: "/about/vision" },
        { label: "Our Team", to: "/about/team" },
      ],
    },
    { label: "Services", to: "/service" },
    {
      label: "Research & Publication",
      dropdown: [
        { label: "Research", to: "/researchAndPublication" },
        { label: "Publication", to: "/publication" },
        { label: "Knowledge Center", to: "/knowledge-center" },
      ],
    },
    { label: "News & Events", to: "/newsAndEvents" },
    {
      label: "Gallery",
      dropdown: [
        { label: "Photo Gallery", to: "/gallery" },
        { label: "Video Gallery", to: "/gallery/video" },
      ],
    },
    { label: "Contact Us", to: "/contact" },
  ];

  const handleLogout = () => {
    logOut().then(() => (window.location.href = "/"));
  };

  const linkClass = (isActive, isDropdown = false) =>
    `relative px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? "text-blue-700" : "text-gray-800 hover:text-blue-600"
    } ${isDropdown ? "flex items-center gap-1" : ""}`;

  const toggleDropdown = (label) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
          {/* === Logo === */}
          <Link to="/" className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm sm:text-base">
              B
            </div>
            <span className="hidden sm:inline text-base sm:text-lg font-bold text-gray-900">
              BIRSTBD
            </span>
          </Link>

          {/* === Desktop Nav === */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <div
                key={item.label}
                ref={(el) => (dropdownRefs.current[item.label] = el)}
                className="relative"
              >
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.label)}
                      className={linkClass(
                        location.pathname.startsWith(item.dropdown[0].to),
                        true
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeDropdown === item.label && (
                      <div className="absolute left-0 top-full mt-1 w-52 rounded-md bg-white shadow-lg ring-1 ring-gray-200 z-50 border-t-2 border-blue-600">
                        {item.dropdown.map((sub) => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            onClick={() => setActiveDropdown(null)}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm ${
                                isActive
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-800 hover:bg-gray-50 hover:text-blue-600"
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
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

            {/* === Auth Section === */}
            {user ? (
              <div className="ml-4 flex items-center gap-3">
                <NavLink
                  to="/dashboard"
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="ml-4 flex items-center gap-3">
                <NavLink
                  to="/login"
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>

          {/* === Mobile Toggle === */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-gray-700 touch-target"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={22} className="sm:w-6 sm:h-6" /> : <Menu size={22} className="sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* === Mobile Menu === */}
      {isMobileOpen && (
        <div className="lg:hidden bg-white shadow-md border-t border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex flex-col space-y-1 p-3 sm:p-4">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex w-full justify-between items-center py-2 text-gray-800 font-medium"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="ml-4 flex flex-col border-l border-gray-200 pl-3">
                        {item.dropdown.map((sub) => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            onClick={() => setIsMobileOpen(false)}
                            className={({ isActive }) =>
                              `py-1 text-sm ${
                                isActive
                                  ? "text-blue-700 font-semibold"
                                  : "text-gray-600 hover:text-blue-600"
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.to}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `py-2 text-sm font-medium ${
                        isActive
                          ? "text-blue-700 font-semibold"
                          : "text-gray-700 hover:text-blue-600"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}

            {/* Auth Section in Mobile */}
            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setIsMobileOpen(false)}
                  className="py-2 text-gray-700 font-medium hover:text-blue-600"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="py-2 text-gray-700 font-medium hover:text-blue-600 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileOpen(false)}
                  className="py-2 text-gray-700 font-medium hover:text-blue-600"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsMobileOpen(false)}
                  className="py-2 text-blue-600 font-medium hover:text-blue-700"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


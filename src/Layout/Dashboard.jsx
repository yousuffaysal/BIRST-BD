
import { useState, useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Users,
  Home,
  LogOut,
  Eye,
  Crown,
  Image,
  Calendar,
  GraduationCap,
  FileText,
  BookOpen,
  ChevronRight,
  DollarSign,
  History,
  BookMarked,
  Settings,
  Shield,
  LayoutDashboard
} from "lucide-react";
import Swal from "sweetalert2";

import useAdmin from "../hooks/useAdmin";
import Loading from "../components/Loading/Loading";
import { AuthContext } from "../Providers/AuthProvider";
import logo from "../assets/BIRST_LOGO.svg";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const profileImage = user?.photoURL || "/default-profile.png";

  useEffect(() => {
    if (location.pathname === "/dashboard" && !isAdminLoading && user) {
      const redirectPath = isAdmin
        ? "/dashboard/manage-users"
        : "/dashboard/profile";
      navigate(redirectPath);
    }
  }, [isAdmin, isAdminLoading, user, navigate, location.pathname]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Sign Out?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0B2340",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Yes, Sign Out",
      cancelButtonText: "Keep me In",
      background: "#FFFFFF",
      customClass: {
        title: "text-[#0B2340] font-bold font-unbounded text-xl",
        htmlContainer: "text-gray-600 font-jakarta",
        confirmButton: "rounded-xl font-bold font-jakarta",
        cancelButton: "rounded-xl font-bold font-jakarta",
        popup: "rounded-3xl"
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.error("Logout error:", error);
          });
      }
    });
  };

  const renderNavLink = (to, icon, label) => (
    <NavLink
      to={to}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `group flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 min-h-[48px] touch-target mb-1.5 font-jakarta ${isActive
          ? "bg-[#02bfff] text-white shadow-lg shadow-black/20"
          : "!text-white hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className={`flex-shrink-0 transition-transform duration-300 ${location.pathname === to ? "scale-110" : "group-hover:scale-110"} text-white`}>
          {icon}
        </span>
        <span className="text-sm font-bold truncate text-white">{label}</span>
      </div>
      <ChevronRight
        className={`h-4 w-4 flex-shrink-0 transition-all duration-300 ${location.pathname === to ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          }`}
      />
    </NavLink>
  );

  if (isAdminLoading) return <Loading />;

  const navItems = [
    { to: "/", icon: <Home className="h-5 w-5" />, label: "Home", show: true },
    {
      to: "/dashboard/profile",
      icon: <User className="h-5 w-5" />,
      label: "My Profile",
      show: user,
    },
    // Admin Routes
    {
      to: "/dashboard/manage-users",
      icon: <Users className="h-5 w-5" />,
      label: "Manage Users",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-team",
      icon: <Users className="h-5 w-5" />,
      label: "Team Members",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-blogs",
      icon: <FileText className="h-5 w-5" />,
      label: "Manage Blogs",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-hero",
      icon: <Settings className="h-5 w-5" />,
      label: "Hero Section",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/showContact",
      icon: <Eye className="h-5 w-5" />,
      label: "Contact Data",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/show-course-enrollments",
      icon: <GraduationCap className="h-5 w-5" />,
      label: "Course Enrollments",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/show-event-enrollments",
      icon: <Calendar className="h-5 w-5" />,
      label: "Event Enrollments",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/show-profile-data",
      icon: <Users className="h-5 w-5" />,
      label: "Student Profiles",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-gallery",
      icon: <Image className="h-5 w-5" />,
      label: "Photo Gallery",
      show: user && isAdmin,
    },

    // Content Management
    {
      to: "/dashboard/manage-events",
      icon: <Calendar className="h-5 w-5" />,
      label: "Manage Events",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-courses",
      icon: <GraduationCap className="h-5 w-5" />,
      label: "Manage Courses",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-publications",
      icon: <FileText className="h-5 w-5" />,
      label: "Publications",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-resources",
      icon: <BookOpen className="h-5 w-5" />,
      label: "Resources",
      show: user && isAdmin,
    },

    // Financials
    {
      to: "/dashboard/manage-payments",
      icon: <DollarSign className="h-5 w-5" />,
      label: "Manage Payments",
      show: user && isAdmin,
    },

    // Student Routes
    {
      to: "/dashboard/payment-history",
      icon: <History className="h-5 w-5" />,
      label: "Payment History",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/my-bookings",
      icon: <BookMarked className="h-5 w-5" />,
      label: "My Bookings",
      show: user && isAdmin,
    },
  ].filter((item) => item.show);

  return (
    <div className="fixed inset-0 flex flex-col lg:flex-row w-full h-full overflow-hidden bg-[#FAFAFA] font-jakarta">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0B2340] shadow-sm z-50 flex items-center justify-between px-4 border-b border-[#0B2340]">
        <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded-xl hover:bg-white/10 transition-all duration-200"
          aria-label="Toggle Sidebar"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#02bfff] rounded-lg flex items-center justify-center shadow-lg">
            <LayoutDashboard className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white font-unbounded">
            BIRSTBD
          </span>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Sidebar - Solid Dark Theme */}
      <aside
        className={`fixed lg:static h-full w-72 sm:w-80 lg:w-80 xl:w-96 bg-[#0B2340] shadow-2xl lg:shadow-none transition-transform duration-300 ease-in-out z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col justify-between overflow-hidden">
          {/* Top Section */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-5 lg:p-6">
              {/* Logo/Brand Section */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                <div className="relative group cursor-pointer" onClick={() => navigate('/')}>
                  <img src={logo} alt="BIRSTBD" className="h-10 w-auto relative z-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-white font-unbounded tracking-tight">
                    BIRSTBD
                  </h2>
                  <p className="text-[#02bfff] text-xs font-bold font-jakarta uppercase tracking-wider">
                    {isAdmin ? 'Administrator' : 'Student Panel'}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                <div className="px-4 mb-3">
                  <p className="text-xs font-bold text-white uppercase tracking-widest font-unbounded">Menu</p>
                </div>
                {navItems.map((item) => (
                  <div key={item.to}>{renderNavLink(item.to, item.icon, item.label)}</div>
                ))}
              </nav>
            </div>
          </div>

          {/* User Section - Fixed at Bottom */}
          <div className="border-t border-white/5 bg-[#081a2f] p-5 lg:p-6">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              {/* User Profile */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={profileImage}
                    alt={user?.displayName || "User"}
                    className="w-12 h-12 rounded-xl border-2 border-[#0B2340] shadow-md object-cover"
                    onError={(e) => (e.target.src = "/default-profile.png")}
                  />
                  {isAdmin && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#02bfff] rounded-full flex items-center justify-center shadow-sm border-2 border-[#0B2340]">
                      <Crown className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0B2340]"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-white truncate font-unbounded">
                    {user?.displayName?.split(' ')[0] || "User"}
                  </h3>
                  <p className="text-xs text-gray-400 truncate font-medium">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full bg-[#DA3A60] hover:bg-[#b02a4a] text-white py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-bold text-sm shadow-sm hover:shadow-lg group"
              >
                <LogOut className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative w-full h-full bg-[#FAFAFA] overflow-hidden">
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#0B2340]/80 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
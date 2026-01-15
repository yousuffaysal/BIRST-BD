
import { useState, useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Users,
  Home,
  LogOut,
  Shield,
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
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0A3D91",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      background: "#FBF8F3",
      customClass: {
        title: "text-[#0A3D91] text-xl",
        content: "text-[#6B7280]",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged Out",
              text: "You have successfully logged out.",
              showConfirmButton: false,
              timer: 2000,
              background: "#FBF8F3",
              customClass: {
                title: "text-[#0A3D91] text-xl",
                content: "text-[#6B7280]",
              },
            });
            navigate("/");
          })
          .catch((error) => {
            console.error("Logout error:", error);
            Swal.fire({
              icon: "error",
              title: "Logout Failed",
              text: "Something went wrong while logging out.",
              confirmButtonText: "Try Again",
              background: "#FBF8F3",
              customClass: {
                title: "text-[#0A3D91] text-xl",
                content: "text-[#6B7280]",
              },
            });
          });
      }
    });
  };

  const renderNavLink = (to, icon, label) => (
    <NavLink
      to={to}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `group flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-200 min-h-[44px] touch-target ${isActive
          ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/30"
          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md"
        }`
      }
    >
      <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
        <span className={`flex-shrink-0 ${location.pathname === to ? "scale-110" : "group-hover:scale-110"} transition-transform`}>
          {icon}
        </span>
        <span className="text-xs sm:text-sm font-semibold truncate">{label}</span>
      </div>
      <ChevronRight
        className={`h-4 w-4 flex-shrink-0 transition-transform ${location.pathname === to ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          }`}
      />
    </NavLink>
  );

  if (isAdminLoading) return <Loading />;

  const navItems = [
    { to: "/", icon: <Home className="h-4 w-4 sm:h-5 sm:w-5" />, label: "Home", show: true },
    {
      to: "/dashboard/profile",
      icon: <User className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Profile",
      show: user,
    },
    {
      to: "/dashboard/manage-users",
      icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Manage Users",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-team",
      icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Manage Team",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-blogs",
      icon: <FileText className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Manage Blogs",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-hero",
      icon: <Settings className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Manage Hero",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/showContact",
      icon: <Eye className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Contact Data",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/show-course-enrollments",
      icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Course Enrollments",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/show-event-enrollments",
      icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Event Enrollments",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/show-profile-data",
      icon: <Users className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Student Profiles",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-gallery",
      icon: <Image className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Gallery",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-events",
      icon: <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Events",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-courses",
      icon: <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Courses",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-publications",
      icon: <FileText className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Publications",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-resources",
      icon: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Resources",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/manage-payments",
      icon: <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Manage Payments",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/payment-history",
      icon: <History className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "Payment History",
      show: user && isAdmin,
    },
    {
      to: "/dashboard/my-bookings",
      icon: <BookMarked className="h-4 w-4 sm:h-5 sm:w-5" />,
      label: "My Bookings",
      show: user && isAdmin,
    },
  ].filter((item) => item.show);

  return (
    <div className="fixed inset-0 flex flex-col lg:flex-row w-full h-full overflow-hidden bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 sm:h-16 bg-white/95 backdrop-blur-md shadow-md z-50 flex items-center justify-between px-3 sm:px-4 border-b border-gray-200">
        <button
          onClick={toggleSidebar}
          className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 touch-target"
          aria-label="Toggle Sidebar"
        >
          {sidebarOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>
        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-center">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-wide">
            Dashboard
          </h2>
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static h-full w-72 sm:w-80 lg:w-80 xl:w-96 bg-white border-r border-gray-200 shadow-2xl transition-transform duration-300 ease-in-out z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col justify-between overflow-hidden">
          {/* Top Section */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-5 lg:p-6">
              {/* Logo/Brand Section */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-200">
                <img src={logo} alt="BIRSTBD" className="h-10 w-auto" />
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-wide truncate">
                    Dashboard
                  </h2>
                  <p className="text-indigo-600 text-xs sm:text-sm font-medium">
                    BIRSTBD Admin
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <div key={item.to}>{renderNavLink(item.to, item.icon, item.label)}</div>
                ))}
              </nav>
            </div>
          </div>

          {/* User Section - Fixed at Bottom */}
          <div className="border-t border-gray-200 bg-gray-50">
            <div className="p-4 sm:p-5 lg:p-6">
              {/* User Profile */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <div className="relative flex-shrink-0">
                  <img
                    src={profileImage}
                    alt={user?.displayName || "User"}
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl border-2 border-indigo-200 shadow-lg object-cover"
                    onError={(e) => (e.target.src = "/default-profile.png")}
                  />
                  {isAdmin && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                      <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 truncate mb-0.5">
                    {user?.displayName || "User"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 truncate font-medium mb-1.5">
                    {user?.email}
                  </p>
                  {isAdmin && (
                    <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold rounded-lg shadow-md">
                      <Crown className="h-3 w-3" />
                      <span>Admin</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-[#B91C1C] via-[#DC2626] to-[#991B1B] text-white py-2.5 sm:py-3 px-4 rounded-xl hover:from-[#991B1B] hover:via-[#B91C1C] hover:to-[#DC2626] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base min-h-[44px] touch-target group"
              >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative w-full h-full bg-transparent overflow-hidden">
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
          {/* Content Container */}
          <div className="min-h-full w-full p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 2xl:p-10">
            <div className="max-w-[1920px] mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
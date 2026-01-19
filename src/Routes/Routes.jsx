// import { createBrowserRouter } from "react-router-dom";


// import Home from "../pages/Home/Home";

// import Login from "../Login/Login";
// import SignUp from "../SignUp/SignUp";
// import PrivateRoute from "./PrivateRoute";
// import Dashboard from "../Layout/Dashboard";
// import ManageUsers from "../pages/Dashboard/ManageUsers";
// import useAdmin from "../hooks/useAdmin";
// import Loading from "../components/Loading/Loading";
// import Profile from "../pages/Dashboard/Profile";
// import NotFound from "../pages/NotFoumd";

// import AboutUs from "../pages/AboutUs";
// import ContactUs from "../pages/ContactUs";

// import Services from "../pages/Services";

// import ShowContactData from "../pages/Dashboard/ShowContactData";
// import Main from "../Layout/Main";
// import AiTools from "../pages/AiTools";
// import Coureses from "../pages/Coureses";
// import ResearchAndPublication from "../pages/ResearchAndPublication";
// import NewsAndEvents from "../pages/NewsAndEvents";
// import Gallery from "../pages/Gallery";



// // Custom wrapper to restrict routes to admins
// const AdminRoute = ({ children }) => {
//   const [isAdmin, isAdminLoading] = useAdmin();
//   if (isAdminLoading) return <div><Loading></Loading></div>;
//   if (!isAdmin) return <div className="text-center py-10 text-red-500">Access Denied: Admins Only</div>;
//   return children;
// };

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//     children: [


//      {
//         path: "/",
//         element: <Home></Home>,
//       },
//       {
//         path: "/about",
//         element: <AboutUs />,
//       },
//       {
//         path: "/contact",
//         element: <ContactUs />,
//       },




//       {
//         path: "/service",
//         element: <Services />,
//       },

//       {
//         path: "/aitools",
//         element: <AiTools></AiTools>,
//       },
//       {
//         path: "/courses",
//         element: <Coureses></Coureses>,
//       },
//       {
//         path: "/researchAndPublication",
//         element: <ResearchAndPublication></ResearchAndPublication>,
//       },
//       {
//         path: "/newsAndEvents",
//         element: <NewsAndEvents></NewsAndEvents>,
//       },
//       {
//         path: "/gallery",
//         element: <Gallery></Gallery>,
//       },

//       // end

//       {
//         path: "login",
//         element: <Login></Login>,
//       },
//      {
//         path: "signup",
//         element: <SignUp></SignUp>,
//       },


//     ],
//   },
//   {
//     path: "dashboard",
//     element: (
//       <PrivateRoute>
//         <Dashboard />
//       </PrivateRoute>
//     ),
//     children: [
//       // admin routes
//       {
//         path: "manage-users",
//         element: (
//          <AdminRoute>
//                <ManageUsers />
//          </AdminRoute>


//         ),
//       },


//       {
//         path: "showContact",
//         element: (
//          <AdminRoute>
//             <ShowContactData></ShowContactData>
//           </AdminRoute>


//         ),
//       },


//       // user routes
//       {
//         path: "Profile",
//         element: (
//           <Profile></Profile>

//         ),
//       },

//   {
//   path: "*",
//   element: <NotFound />,
// }

//     ],
//   },
// ]);


import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts - Keep static for immediate shell rendering
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard";

// Lightweight Loader for Route Transitions
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh] w-full">
    <div className="w-12 h-12 border-4 border-[#1FB6FF]/20 border-t-[#1FB6FF] rounded-full animate-spin"></div>
  </div>
);

// Lazy Load Helper
const Load = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

// Lazy Imports
const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../Login/Login"));
const SignUp = lazy(() => import("../SignUp/SignUp"));
const NotFound = lazy(() => import("../pages/NotFoumd"));

// Common Pages
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Services = lazy(() => import("../pages/Services"));
const AiTools = lazy(() => import("../pages/AiTools"));
const BotWorkspace = lazy(() => import("../pages/BotWorkspace"));
const Coureses = lazy(() => import("../pages/Coureses"));
const CourseDetails = lazy(() => import("../pages/CourseDetails"));
const CourseCheckout = lazy(() => import("../pages/CourseCheckout"));
const ResearchAndPublication = lazy(() => import("../pages/ResearchAndPublication"));
const Publication = lazy(() => import("../pages/Publication"));
const KnowledgeCenter = lazy(() => import("../pages/KnowledgeCenter"));
const NewsAndEvents = lazy(() => import("../pages/NewsAndEvents"));
const Gallery = lazy(() => import("../pages/Gallery"));

// Dashboard Pages
const ManageUsers = lazy(() => import("../pages/Dashboard/ManageUsers"));
const ShowContactData = lazy(() => import("../pages/Dashboard/ShowContactData"));
const Profile = lazy(() => import("../pages/Dashboard/Profile"));
const ManageGallery = lazy(() => import("../pages/Dashboard/ManageGallery"));
const ManageHero = lazy(() => import("../pages/Dashboard/ManageHero"));
const ManageEvents = lazy(() => import("../pages/Dashboard/ManageEvents"));
const ManageCourses = lazy(() => import("../pages/Dashboard/ManageCourses"));
const ManagePublications = lazy(() => import("../pages/Dashboard/ManagePublications"));
const ManageResearchResources = lazy(() => import("../pages/Dashboard/ManageResearchResources"));
const ManagePayments = lazy(() => import("../pages/Dashboard/ManagePayments"));
const PaymentHistory = lazy(() => import("../pages/Dashboard/PaymentHistory"));
const MyBookings = lazy(() => import("../pages/Dashboard/MyBookings"));
const ShowCourseEnrollment = lazy(() => import("../pages/Dashboard/ShowCourseEnrollment"));
const ShowEventEnrollment = lazy(() => import("../pages/Dashboard/ShowEventEnrollment"));
const ShowProfileData = lazy(() => import("../pages/Dashboard/ShowProfileData"));
const AddTeamMembers = lazy(() => import("../pages/Dashboard/AddTeamMembers"));
const AddBlog = lazy(() => import("../pages/Dashboard/AddBlog"));
const Blogs = lazy(() => import("../pages/Blogs"));
const BlogDetails = lazy(() => import("../pages/BlogDetails"));

// Custom Components
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const BIRSTBDProfile = lazy(() => import("../components/AboutUs/BIRSTBDProfile"));
const OurMission = lazy(() => import("../components/AboutUs/OurMission"));
const OurVision = lazy(() => import("../components/AboutUs/OurVision"));
const OurTeam = lazy(() => import("../components/AboutUs/OurTeam"));
const PhotoGallery = lazy(() => import("../components/Gallery/PhotoGallery"));
const VideoGallery = lazy(() => import("../components/Gallery/VideoGallery"));

// Import useAdmin and Loading for AdminRoute (Keep static or lazy? Hook must be static, Component inside can be lazy)
import useAdmin from "../hooks/useAdmin";
import Loading from "../components/Loading/Loading";

// ✅ AdminRoute Wrapper
const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  if (isAdminLoading) return <Loading />;
  if (!isAdmin)
    return (
      <div className="text-center py-10 text-red-500">
        Access Denied: Admins Only
      </div>
    );
  return children;
};

// ✅ Router Configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      // --------- Main Public Routes ----------
      {
        path: "/",
        element: Load(Home),
      },
      {
        path: "/about",
        element: Load(AboutUs),
      },
      {
        path: "/about/profile",
        element: Load(BIRSTBDProfile),
      },
      {
        path: "/about/mission",
        element: Load(OurMission),
      },
      {
        path: "/about/vision",
        element: Load(OurVision),
      },
      {
        path: "/about/team",
        element: Load(OurTeam),
      },

      {
        path: "/gallery",
        element: Load(Gallery),
      },
      {
        path: "/gallery/photo",
        element: <Navigate to="/gallery" replace />,
      },
      {
        path: "/gallery/photo/:id",
        element: Load(PhotoGallery),
      },
      {
        path: "/gallery/video",
        element: Load(VideoGallery),
      },

      {
        path: "/contact",
        element: Load(ContactUs),
      },
      {
        path: "/service",
        element: Load(Services),
      },
      {
        path: "/aitools",
        element: Load(AiTools),
      },
      {
        path: "/bot/:id",
        element: Load(BotWorkspace),
      },
      {
        path: "/courses",
        element: Load(Coureses),
      },
      {
        path: "/courses/checkout/:courseId",
        element: Load(CourseCheckout),
      },
      {
        path: "/course-details/:id",
        element: Load(CourseDetails),
      },
      {
        path: "/researchAndPublication",
        element: Load(ResearchAndPublication),
      },
      {
        path: "/publication",
        element: Load(Publication),
      },
      {
        path: "/knowledge-center",
        element: Load(KnowledgeCenter),
      },
      {
        path: "/newsAndEvents",
        element: Load(NewsAndEvents),
      },
      {
        path: "/blogs",
        element: Load(Blogs),
      },
      {
        path: "/blog/:id",
        element: Load(BlogDetails),
      },

      // --------- Auth Routes ----------
      {
        path: "/login",
        element: Load(Login),
      },
      {
        path: "/signup",
        element: Load(SignUp),
      },
    ],
  },

  // --------- Dashboard Routes ----------
  {
    path: "dashboard",
    element: (
      // PrivateRoute is lazy loaded too? Better keep PrivateRoute static if it contains logic? 
      // Actually it's fine.
      <Suspense fallback={<PageLoader />}>
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </Suspense>
    ),
    children: [
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            {Load(ManageUsers)}
          </AdminRoute>
        ),
      },
      {
        path: "showContact",
        element: (
          <AdminRoute>
            {Load(ShowContactData)}
          </AdminRoute>
        ),
      },
      {
        path: "show-course-enrollments",
        element: (
          <AdminRoute>
            {Load(ShowCourseEnrollment)}
          </AdminRoute>
        ),
      },
      {
        path: "show-event-enrollments",
        element: (
          <AdminRoute>
            {Load(ShowEventEnrollment)}
          </AdminRoute>
        ),
      },
      {
        path: "show-profile-data",
        element: (
          <AdminRoute>
            {Load(ShowProfileData)}
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: Load(Profile),
      },
      {
        path: "manage-gallery",
        element: (
          <AdminRoute>
            {Load(ManageGallery)}
          </AdminRoute>
        ),
      },
      {
        path: "manage-hero",
        element: (
          <AdminRoute>
            {Load(ManageHero)}
          </AdminRoute>
        ),
      },
      {
        path: "manage-events",
        element: (
          <AdminRoute>
            {Load(ManageEvents)}
          </AdminRoute>
        ),
      },
      {
        path: "manage-courses",
        element: (
          <AdminRoute>
            {Load(ManageCourses)}
          </AdminRoute>
        ),
      },
      {
        path: "manage-publications",
        element: (
          <AdminRoute>
            {Load(ManagePublications)}
          </AdminRoute>
        ),
      },
      {
        path: "manage-resources",
        element: (
          <AdminRoute>
            {Load(ManageResearchResources)}
          </AdminRoute>
        ),
      },
      {
        path: "manage-payments",
        element: (
          <AdminRoute>
            {Load(ManagePayments)}
          </AdminRoute>
        ),
      },
      {
        path: "manage-team",
        element: (
          <AdminRoute>
            {Load(AddTeamMembers)}
          </AdminRoute>
        ),
      },
      {
        path: "manage-blogs",
        element: (
          <AdminRoute>
            {Load(AddBlog)}
          </AdminRoute>
        ),
      },
      {
        path: "payment-history",
        element: Load(PaymentHistory),
      },
      {
        path: "my-bookings",
        element: Load(MyBookings),
      },
    ],
  },

  // --------- 404 Not Found ----------
  {
    path: "*",
    element: Load(NotFound),
  },
]);
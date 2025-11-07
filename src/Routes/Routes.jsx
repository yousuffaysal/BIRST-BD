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

// Layouts
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard";

// Pages
import Home from "../pages/Home/Home";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import NotFound from "../pages/NotFoumd";
import Loading from "../components/Loading/Loading";

// Common Pages
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Services from "../pages/Services";
import AiTools from "../pages/AiTools";
import Coureses from "../pages/Coureses";
import CourseCheckout from "../pages/CourseCheckout";
import ResearchAndPublication from "../pages/ResearchAndPublication";
import Publication from "../pages/Publication";
import KnowledgeCenter from "../pages/KnowledgeCenter";
import NewsAndEvents from "../pages/NewsAndEvents";
import Gallery from "../pages/Gallery";

// Dashboard Pages
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ShowContactData from "../pages/Dashboard/ShowContactData";
import Profile from "../pages/Dashboard/Profile";
import ManageGallery from "../pages/Dashboard/ManageGallery";
import ManageEvents from "../pages/Dashboard/ManageEvents";
import ManageCourses from "../pages/Dashboard/ManageCourses";
import ManagePublications from "../pages/Dashboard/ManagePublications";
import ManageResearchResources from "../pages/Dashboard/ManageResearchResources";
import ManagePayments from "../pages/Dashboard/ManagePayments";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import MyBookings from "../pages/Dashboard/MyBookings";

// Custom Routes
import PrivateRoute from "./PrivateRoute";
import useAdmin from "../hooks/useAdmin";
import BIRSTBDProfile from "../components/AboutUs/BIRSTBDProfile";
import OurMission from "../components/AboutUs/OurMission";
import OurVision from "../components/AboutUs/OurVision";
import OurTeam from "../components/AboutUs/OurTeam";
import PhotoGallery from "../components/Gallery/PhotoGallery";
import VideoGallery from "../components/Gallery/VideoGallery";



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
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/about/profile",
        element: <BIRSTBDProfile />,
      },
      {
        path: "/about/mission",
        element: <OurMission />,
      },
      {
        path: "/about/vision",
        element: <OurVision />,
      },
      {
        path: "/about/team",
        element: <OurTeam />,
      },

      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/gallery/photo",
        element: <Navigate to="/gallery" replace />,
      },
      {
        path: "/gallery/photo/:id",
        element: <PhotoGallery />,
      },
      {
        path: "/gallery/video",
        element: <VideoGallery />,
      },

      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/service",
        element: <Services />,
      },
      {
        path: "/aitools",
        element: <AiTools />,
      },
      {
        path: "/courses",
        element: <Coureses />,
      },
      {
        path: "/courses/checkout/:courseId",
        element: <CourseCheckout />,
      },
      {
        path: "/researchAndPublication",
        element: <ResearchAndPublication />,
      },
      {
        path: "/publication",
        element: <Publication />,
      },
      {
        path: "/knowledge-center",
        element: <KnowledgeCenter />,
      },
      {
        path: "/newsAndEvents",
        element: <NewsAndEvents />,
      },

      // --------- Auth Routes ----------
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  // --------- Dashboard Routes ----------
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
           </AdminRoute>
        ),
      },
      {
        path: "showContact",
        element: (
          <AdminRoute>
            <ShowContactData />
           </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "manage-gallery",
        element: (
          <AdminRoute>
            <ManageGallery />
          </AdminRoute>
        ),
      },
      {
        path: "manage-events",
        element: (
          <AdminRoute>
            <ManageEvents />
          </AdminRoute>
        ),
      },
      {
        path: "manage-courses",
        element: (
          <AdminRoute>
            <ManageCourses />
          </AdminRoute>
        ),
      },
      {
        path: "manage-publications",
        element: (
          <AdminRoute>
            <ManagePublications />
          </AdminRoute>
        ),
      },
      {
        path: "manage-resources",
        element: (
          <AdminRoute>
            <ManageResearchResources />
          </AdminRoute>
        ),
      },
      {
        path: "manage-payments",
        element: (
          <AdminRoute>
            <ManagePayments />
          </AdminRoute>
        ),
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
    ],
  },

  // --------- 404 Not Found ----------
  {
    path: "*",
    element: <NotFound />,
  },
]);

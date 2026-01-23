// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )



import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './Providers/AuthProvider';
import LoadingScreen from './components/Loading/LoadingScreen';
import SmoothCursor from './components/ui/SmoothCursor';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

import useKeepAlive from './hooks/useKeepAlive';

import BirstAiChatbot from './components/Chatbot/BirstAiChatbot';

const App = () => {
  useKeepAlive(); // Prevent backend sleep
  return (
    <HelmetProvider>
      <AuthProvider>
        <div>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ToastContainer position="top-center" autoClose={3000} />
            <BirstAiChatbot />
          </QueryClientProvider>
        </div>
      </AuthProvider>
    </HelmetProvider>
  );
};


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
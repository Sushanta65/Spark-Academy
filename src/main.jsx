import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './route/router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <HelmetProvider>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
    </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>,
)

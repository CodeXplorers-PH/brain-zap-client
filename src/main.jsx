import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Router'; // React Router Routes
import './style.css'; // Style
import AuthProvider from './provider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // query client, query client provider

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* React auth provider */}
    <AuthProvider>
      {/* React query */}
      <QueryClientProvider client={queryClient}>
        {/* Router Provider */}
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);

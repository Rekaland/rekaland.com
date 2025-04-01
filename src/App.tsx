
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from './hooks/useAuth';
import { Toaster } from './components/ui/toaster';
import router from './routes';

function App() {
  const queryClient = new QueryClient();

  return (
    <TooltipProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </TooltipProvider>
  );
}

export default App;

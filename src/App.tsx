
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from './hooks/useAuth';
import { Toaster } from './components/ui/toaster';
import { AiAssistant } from './components/customer-service/AiAssistant';
import router from './routes';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  return (
    <TooltipProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
          <AiAssistant />
        </QueryClientProvider>
      </AuthProvider>
    </TooltipProvider>
  );
}

export default App;

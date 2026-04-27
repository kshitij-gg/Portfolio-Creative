import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { IntroContext } from "./contexts/IntroContext";

const queryClient = new QueryClient();

const App = () => {

  useEffect(() => {
    // Prevent browser from restoring scroll position on refresh
    if (window.history && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Snap to the very beginning/top immediately
    window.scrollTo(0, 0);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* Intro animation has been removed. All components animate in immediately. */}
        <IntroContext.Provider value={true}>
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </IntroContext.Provider>

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

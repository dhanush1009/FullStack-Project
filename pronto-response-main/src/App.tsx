// App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import LanguageSwitcher from "./components/LanguageSwitcher";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import FindShelter from "./components/FindShelter";
import VolunteerMap from "./components/VolunteerMap";
import Volunteers from "./components/Volunteers";
import FamilyCheckIn from "./components/FamilyCheckIn";
import CallHelp from "./components/CallHelp";
import Radio from "./components/Radio";
import RadioPage from "./components/RadioPage";
import DisasterGuardHero from "./components/DisasterGuardHero";
import LearnMore from "./components/LearnMore";
import Getprepared from "./components/Getprepared";
import SOSButton from "./components/SOSButton";
import VolunteerList from "./components/VolunteerList";
import Resources from "./components/Resources";
import AfterDisasterPage from "./components/AfterDisasterPage";
import AdminDashboard from "./components/AdminDashboard";
import EmergencyAlert from "./components/EmergencyAlert";
import Volunterlogin from "./components/Volunterlogin";
import VolunteerTasks from "./components/VolunteerTasks";


const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    { path: "/", element: <Index /> },
    { path: "/index", element: <Index /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/find-shelter", element: <FindShelter /> },
    { path: "/volunteer-map", element: <VolunteerMap /> },
    { path: "/call-help", element: <CallHelp /> },
    { path: "/volunteers", element: <Volunteers /> },
    { path: "/family-checkin", element: <FamilyCheckIn /> },
    { path: "/radio", element: <Radio /> },
    { path: "/radio-page", element: <RadioPage /> },
    { path: "/disaster-guard-hero", element: <DisasterGuardHero /> },
    { path: "/learn-more", element: <LearnMore /> },
    { path: "/get-prepared", element: <Getprepared /> },
    { path: "/sos", element: <SOSButton /> },
    { path: "/volunteer-list", element: <VolunteerList /> },
    { path: "/resources", element: <Resources /> },
    { path: "/after-disaster", element: <AfterDisasterPage /> },
    { path: "/admin", element: <AdminDashboard /> },
    { path: "/volunteer-tasks", element: <VolunteerTasks /> },
    { path: "/emergency-alert", element: <EmergencyAlert /> },

    {
      path: "/volunteer-login",
      element: <Volunterlogin />
    },

  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  } as any
);

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>

          <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;

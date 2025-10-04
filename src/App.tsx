// App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useTranslation } from "react-i18next";
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
import Getprepared from "./components/GetPrepared";
import SOSButton from "./components/SOSButton";
import VolunteerList from "./components/VolunteerList";
import Resources from "./components/Resources";
import AfterDisasterPage from "./components/AfterDisasterPage";
import AdminDashboard from "./components/AdminDashboard";
import Volunterlogin from "./components/Volunterlogin";
import VolunteerTasks from "./components/VolunteerTasks";


const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    { path: "/index", element: <Index /> },
    { path: "/", element: <Login /> },
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
    { path: "*", element: <NotFound /> },
    { path: "/sos", element: <SOSButton /> },
    { path: "/volunteer-list", element: <VolunteerList /> },
    { path: "/resources", element: <Resources /> },
    { path: "/after-disaster", element: <AfterDisasterPage /> },
    { path: "/admin", element: <AdminDashboard /> },
    { path: "/volunteer-tasks", element: <VolunteerTasks /> },
   
    { 
      path: "/volunteer-login", 
      element: (
        <Volunterlogin 
          volunteers={[]} 
          fetchVolunteers={() => {}} 
          openAssignModal={() => {}} 
          deleteVolunteer={() => {}} 
        /> 
      ),
    },

  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

const App = () => {
  const { t } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />

       

        {/* Router */}
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

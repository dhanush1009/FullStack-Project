import { useState, useEffect } from "react";

import {

  Shield,
  Bell,
  User,
  Menu,
  LayoutDashboard,
  AlertCircle,
  Book,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // start closed

  // Close sidebar when ESC key pressed
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Toggle Button - only when closed */}
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-[60] bg-gray-300 text-sidebar-foreground shadow-md hover:bg-gray-400 p-2 rounded"
        >
          <Menu className="h-3 w-3" />
        </Button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar text-sidebar-foreground 
        border-r border-sidebar-border shadow-md z-50 font-poppins 
        transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo + Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Shield className="h-4 w-4 text-sidebar-primary" />
            <div>
              <h1 className="text-lg font-semibold tracking-wide">DisasterGuard</h1>
              <p className="text-xs text-muted-foreground">Smart Emergency Response</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-accent/40"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-6 px-4 gap-2 text-sm">
          <Link
            to="/index"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            to="/call-help"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition"
          >
            <AlertCircle className="h-4 w-4" />
            Alerts
          </Link>
          <Link
            to="/resources"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition"
          >
            <Book className="h-4 w-4" />
            Resources
          </Link>
          
          <Link
            to="/signup"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition"
          >
            <User className="h-4 w-4" />
            Signup
          </Link>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-0 w-full flex justify-between px-6">
          <Button variant="ghost" size="icon" className="hover:bg-accent/40">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-accent/40">
            <User className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-accent/40"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Welcome & Logout */}
        {localStorage.getItem("loggedIn") === "true" && (
          <div className="px-6 py-4 border-t border-sidebar-border text-xs text-muted-foreground">
            <h3>👋 Welcome,</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium text-sidebar-primary">
                {localStorage.getItem("username")}
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem("loggedIn");
                  localStorage.removeItem("username");
                  window.location.href = "/ ";
                }}
                className="text-red-500 text-xs ml-4 underline hover:text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        )}

      </aside>
    </>
  );
};

export default Sidebar;

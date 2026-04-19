import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EmergencyDashboard from "@/components/EmergencyDashboard";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <Hero />
        
        <EmergencyDashboard />
        
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

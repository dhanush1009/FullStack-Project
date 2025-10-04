import React from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  MapPin,
  Users,
  Radio,
  Shield,
  Smartphone,
  Satellite,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Bell,
    title: "Real-time Alerts",
    description:
      "Instant notifications about disasters, weather warnings, and emergency situations in your area.",
    color: "text-red-600",       // urgent alert color (red)
  },
  {
    icon: MapPin,
    title: "GPS Emergency Location",
    description:
      "Automatically share your exact location with rescue teams during emergency situations.",
    color: "text-yellow-600",    // location highlight color (yellow)
  },
  {
    icon: Users,
    title: "Community Network",
    description:
      "Connect with volunteers, check on family members, and coordinate community response efforts.",
    color: "text-blue-600",      // trust & community (blue)
  },
  {
    icon: Radio,
    title: "Emergency Communications",
    description:
      "Access critical information and communicate when traditional networks are down.",
    color: "text-orange-600",    // communication signal (orange)
  },
  {
    icon: Shield,
    title: "Safety Resources",
    description:
      "Find nearby shelters, hospitals, emergency supplies, and evacuation routes instantly.",
    color: "text-green-600",     // safety & protection (green)
  },
  {
    icon: Smartphone,
    title: "Mobile First Design",
    description:
      "Works seamlessly on all devices with offline capabilities for remote areas.",
    color: "text-indigo-600",    // tech & device (indigo)
  },
  {
    icon: Satellite,
    title: "Multi-Platform Alerts",
    description:
      "Receive alerts via SMS, email, push notifications, and emergency broadcast systems.",
    color: "text-purple-600",    // signals & alerts (purple)
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description:
      "Track rescue operations, resource allocation, and emergency response metrics live.",
    color: "text-teal-600",      // monitoring & activity (teal)
  },
];

const Features = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Comprehensive Emergency Features
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our platform provides essential tools for disaster preparedness,
          real-time response, and community coordination during critical
          situations.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, description, color }, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-smooth border-border/50 hover:border-border"
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center mb-4">
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Enhance Your Emergency Preparedness?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of communities using DisasterGuard to stay safe,
              connected, and prepared for any emergency situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/disaster-guard-hero" className="inline-flex">
                <button className="bg-gradient-hero text-primary-foreground hover:shadow-primary-glow font-semibold transition-smooth inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8">
                  Get Started Now
                </button>
              </Link>
              <Link to="/learn-more" className="inline-flex">
                <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-smooth inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8">
                  Learn More
                </button>
              </Link><br></br>
              <Link to="/after-disaster" className="inline-flex">
                <button className="bg-gradient-hero text-primary-foreground hover:shadow-primary-glow font-semibold transition-smooth inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8">
                  After Disaster
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

export default Features;

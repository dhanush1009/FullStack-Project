import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, MapPin, Users, Phone, Cloud, Thermometer } from "lucide-react";
import heroImage from "@/assets/hero-emergency.jpg";
import { useEffect, useState } from "react";

const Hero = () => {
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [weather, setWeather] = useState(null);
  const [activeAlerts, setActiveAlerts] = useState(0);

  // Replace with your city and OpenWeather API key
  const CITY = "Chennai";
  const API_KEY = "7bcac32a42154f37b97115321250908";

  useEffect(() => {
    // Volunteer count
    const storedVolunteers = localStorage.getItem("volunteers");
    if (storedVolunteers) {
      setVolunteerCount(JSON.parse(storedVolunteers).length);
    }

    // Set default weather (remove API call to avoid errors)
    setWeather({
      temp: 28,
      condition: "Clear",
    });

    // Mock Active Alerts (later replace with backend/API)
    setActiveAlerts(3); // Example: 3 active disasters
  }, []);

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Emergency Management Control Center"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-3">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-foreground mb-2 leading-tight">
        Smart Disaster
          </h1>
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-foreground mb-2 leading-tight">
        <span className="bg-gradient-hero bg-clip-text text-transparent inline">
          Management
        </span>
          </h1>   
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-foreground mb-2   leading-tight">
        System
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            Empowering communities with real-time alerts, emergency coordination, and life-saving resources.
            Connect with rescue services, find safe shelters, and help others during critical situations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/sos" className="w-full sm:w-auto">
              <Button variant="hero" size="lg" className="text-lg w-full sm:w-auto">
                Get Emergency Help
              </Button>
            </Link>
            <Link to="/Radio" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="text-lg w-full sm:w-auto">
                Weather
              </Button>
            </Link>

            <Link to="/resources" className="w-full sm:w-auto">
              <Button variant="hero" size="lg" className="text-lg w-full sm:w-auto">
              Resources
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-card/80 backdrop-blur border-border/50">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">0</p>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                </div>
              </div>
            </Card>
        
            <Card className="p-4 bg-card/80 backdrop-blur border-border/50">
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-foreground">25</p>
                  <p className="text-sm text-muted-foreground">Safe Zones</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-card/80 backdrop-blur border-border/50">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{volunteerCount}</p>
                  <p className="text-sm text-muted-foreground">Volunteers</p>
                </div>
              </div>
            </Card>

            {/* Weather Card */}
            <Card className="p-4 bg-card/80 backdrop-blur border-border/50">
              <div className="flex items-center gap-3">
                <Thermometer className="h-8 w-8 text-destructive" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {weather ? `${weather.temp}°C` : "--"}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Cloud className="h-4 w-4" />
                    {weather ? weather.condition : "Weather unavailable"}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

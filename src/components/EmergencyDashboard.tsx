import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

import { 
  AlertTriangle, 
  MapPin, 
  Phone, 
  Shield, 
  Users, 
  Heart,
  Navigation,
  Radio,
  Zap
} from "lucide-react";
import sosIcon from "@/assets/sos-icon.jpg";

const EmergencyDashboard = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Emergency Response Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools for citizens, volunteers, and emergency agencies to respond effectively to disasters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* SOS Emergency Button */}
          <Card className="lg:col-span-1 bg-gradient-to-br from-emergency/10 to-primary/10 border-emergency/20">
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <img 
                  src={sosIcon} 
                  alt="SOS Emergency Button" 
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 rounded-full animate-pulse bg-emergency/20"></div>
              </div>
              <CardTitle className="text-2xl text-emergency">Emergency SOS</CardTitle>
              <CardDescription>Instant help with GPS location sharing</CardDescription>
            </CardHeader>
            <Link to="/call-help">
              <CardContent className="text-center">
                <Button variant="emergency" size="lg" className="w-full mb-4 text-xl py-6">
                  <Phone className="mr-2 h-6 w-6" />
                  Send SOS Alert
                </Button>
              </CardContent>
            </Link>
            <p className="text-sm text-muted-foreground">
              Automatically shares your location with emergency services
            </p>
          </Card>

          {/* Real-time Alerts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Active Alerts
              </CardTitle>
              <CardDescription>Real-time disaster alerts in your area</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                <Zap className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">Severe Weather Warning</p>
                    <Badge variant="outline" className="text-warning border-warning">High</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Heavy rainfall expected in downtown area. Avoid flood-prone zones.</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago • Updates every 30 min</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
                <Shield className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">Evacuation Route Clear</p>
                    <Badge variant="outline" className="text-accent border-accent">Safe</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Highway 101 South is clear for evacuation. Shelter available at Community Center.</p>
                  <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <Card className="hover:shadow-lg transition-smooth cursor-pointer">
    <Link to="/find-shelter">
      <CardContent className="p-6 text-center hover:bg-accent cursor-pointer transition-all rounded-xl">
        <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="font-semibold text-foreground mb-2">Find Shelter</h3>
        <p className="text-sm text-muted-foreground">Locate nearby emergency shelters and safe zones</p>
      </CardContent>
    </Link>
  </Card>

  <Card className="hover:shadow-lg transition-smooth cursor-pointer">
    <Link to="/radio-page">
      <CardContent className="p-6 text-center hover:bg-accent cursor-pointer transition-all rounded-xl">
        <Radio className="h-12 w-12 text-warning mx-auto mb-4" />
        <h3 className="font-semibold text-foreground mb-2">Emergency Radio</h3>
        <p className="text-sm text-muted-foreground">Access live emergency broadcasts</p>
      </CardContent>
    </Link>
 
  </Card>
</div>

        {/* Response Metrics */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Rescues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">23</div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">15 completed today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">People Marked Safe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">1,247</div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">+89 in last hour</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">4.2 min</div>
              <Progress value={90} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Target: &lt; 5 minutes</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EmergencyDashboard;
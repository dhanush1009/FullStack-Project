import { Shield, Phone, Mail, MapPin, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/5 border-t border-border/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-xl font-bold text-foreground">DisasterGuard</h3>
                <p className="text-xs text-muted-foreground">Smart Emergency Response</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering communities with advanced disaster management technology 
              for faster response times and better outcomes during emergencies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Access</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#dashboard" className="text-muted-foreground hover:text-primary transition-smooth">Emergency Dashboard</a></li>
              <li><a href="#alerts" className="text-muted-foreground hover:text-primary transition-smooth">Active Alerts</a></li>
              <li><a href="find-shelter" className="text-muted-foreground hover:text-primary transition-smooth">Find Shelters</a></li>
              <li><a href="#volunteers" className="text-muted-foreground hover:text-primary transition-smooth">Volunteer Portal</a></li>
              <li><a href="#resources" className="text-muted-foreground hover:text-primary transition-smooth">Emergency Resources</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support & Help</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#help" className="text-muted-foreground hover:text-primary transition-smooth">Help Center</a></li>
              <li><a href="#training" className="text-muted-foreground hover:text-primary transition-smooth">Emergency Training</a></li>
              <li><a href="#preparedness" className="text-muted-foreground hover:text-primary transition-smooth">Preparedness Guide</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-smooth">Contact Support</a></li>
              <li><a href="#feedback" className="text-muted-foreground hover:text-primary transition-smooth">Report Issue</a></li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Emergency Contacts</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emergency" />
                <span className="text-muted-foreground">911 - Emergency Services</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">311 - Non-Emergency</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" />
                <span className="text-muted-foreground">support@disasterguard.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-muted-foreground">Emergency Operations Center</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 DisasterGuard. Built for community safety and emergency response.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
              Privacy Policy
            </a>
            <a href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
              Terms of Service
            </a>
            <a href="#api" className="text-sm text-muted-foreground hover:text-primary transition-smooth flex items-center gap-1">
              API Access <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
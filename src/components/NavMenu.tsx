
import React from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  PhoneCall, 
  Info, 
  MapPin, 
  Users, 
  Settings, 
  FileText, 
  AlertTriangle 
} from "lucide-react";

const NavMenu = () => {
  const menuItems = [
    { name: "Home", icon: <Home className="h-5 w-5" />, path: "/" },
    { name: "Emergency Contacts", icon: <PhoneCall className="h-5 w-5" />, path: "/contacts" },
    { name: "Emergency Guide", icon: <Info className="h-5 w-5" />, path: "/guide" },
    { name: "My Location", icon: <MapPin className="h-5 w-5" />, path: "/location" },
    { name: "Emergency Profile", icon: <Users className="h-5 w-5" />, path: "/profile" },
    { name: "Emergency Reports", icon: <FileText className="h-5 w-5" />, path: "/reports" },
    { name: "Disaster Alerts", icon: <AlertTriangle className="h-5 w-5" />, path: "/alerts" },
    { name: "Settings", icon: <Settings className="h-5 w-5" />, path: "/settings" },
  ];

  return (
    <div className="py-4">
      <div className="font-bold text-xl mb-6 px-4">Swift Aid</div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted rounded-md transition-colors"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default NavMenu;

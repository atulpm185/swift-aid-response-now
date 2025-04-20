
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-emergency" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The emergency page you are looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <Button 
            variant="default"
            className="bg-emergency hover:bg-emergency-hover"
            asChild
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Safety
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

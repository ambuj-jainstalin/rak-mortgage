import { ArrowLeft, Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  showBack?: boolean;
  title?: string;
}

const Header = ({ showBack = false, title }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isLandingPage = location.pathname === "/";
  
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 max-w-md">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-3">
            {showBack && !isLandingPage && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-primary/10"
              >
                <ArrowLeft className="h-4 w-4 text-foreground" />
              </Button>
            )}
            
            {/* Bank Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">🏦</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground leading-none">
                  UAE Bank
                </span>
                <span className="text-xs text-muted-foreground leading-none">
                  Digital Mortgage
                </span>
              </div>
            </div>
          </div>

          {/* Center - Title (if provided) */}
          {title && (
            <div className="flex-1 text-center">
              <h1 className="text-sm font-semibold text-foreground truncate max-w-[120px]">
                {title}
              </h1>
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {!isLandingPage && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-2 hover:bg-primary/10 relative"
                >
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  {/* Notification dot */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></div>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-2 hover:bg-primary/10"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                </Button>
              </>
            )}
            
            {isLandingPage && (
              <Button 
                variant="ghost" 
                size="sm"
                className="p-2 hover:bg-primary/10"
              >
                <Menu className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, User, Calendar } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData] = useState({
    name: "Ahmed Al Mansouri",
    dob: "15/03/1985"
  });

  const handleUAEPassLogin = () => {
    // Simulate UAE Pass login
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Secure Login
          </h1>
          <p className="text-muted-foreground">
            Login with your UAE Pass for instant verification
          </p>
        </div>

        <Card className="p-6 shadow-sm border-border">
          {!isLoggedIn ? (
            <div className="space-y-6">
              <Button 
                onClick={handleUAEPassLogin}
                size="lg" 
                className="w-full h-14 text-lg font-semibold"
              >
                <Shield className="mr-3 h-6 w-6" />
                Login with UAE Pass
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Secure & Fast
                  </span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Instant identity verification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Auto-fill personal details</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Bank-grade security</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Welcome back!</h3>
                <p className="text-muted-foreground text-sm">UAE Pass login successful</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-foreground font-medium">Full Name</Label>
                  <Input 
                    value={userData.name}
                    disabled
                    className="mt-1 bg-muted text-foreground"
                  />
                </div>
                
                <div>
                  <Label className="text-foreground font-medium">Date of Birth</Label>
                  <Input 
                    value={userData.dob}
                    disabled
                    className="mt-1 bg-muted text-foreground"
                  />
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full h-12 font-semibold"
                onClick={() => navigate("/application")}
              >
                Continue Application
              </Button>
            </div>
          )}
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
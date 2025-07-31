import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, User, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import uaePassImage from "/UAEPASS_Continue with_Btn_Outline_Pill_White_Pressed.svg";
import Header from "@/components/Header";
import { useApplicationContext } from "@/contexts/ApplicationContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateApplicationData } = useApplicationContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "Ahmed Al Mansouri",
    email: "user@example.com",
    mobile: "+971501234567"
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Backend API configuration
  const BACKEND_URL = "http://localhost:3001";

  // Handle callback from backend
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const auth = urlParams.get('auth');
    const token = urlParams.get('token');
    const message = urlParams.get('message');
    
    if (auth === 'success' && token) {
      // Store token securely
      localStorage.setItem('uae_pass_token', token);
      setIsLoggedIn(true);
      
      // Fetch user information
      fetchUserInfo(token);
      
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (auth === 'error') {
      alert(`Authentication failed: ${message || 'Unknown error'}`);
    }
  }, [location]);

  const handleUAEPassLogin = async () => {
    try {
      setIsLoading(true);
      
      // Get authorization URL from backend
      const response = await fetch(`${BACKEND_URL}/auth/uae-pass/url`, {
        headers: {
          'Origin': window.location.origin,
          'Referer': window.location.href
        }
      });
      const data = await response.json();
      
      if (data.success) {
        // Redirect to UAE Pass authorization
        window.location.href = data.auth_url;
      } else {
        alert('Failed to generate authorization URL');
      }
    } catch (error) {
      console.error('Error getting auth URL:', error);
      alert('Failed to start authentication process');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserInfo = async (token: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/user-info`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success && data.user) {
        // Update user data with real information from UAE Pass
        setUserData({
          name: data.user.firstnameEN || data.user.fullnameEN || 'User',
          email: data.user.email || 'N/A',
          mobile: data.user.mobile || 'N/A'
        });
        
        // Save UAE Pass data to application context
        updateApplicationData({
          firstName: data.user.firstnameEN || '',
          lastName: data.user.lastnameEN || '',
          email: data.user.email || '',
          mobile: data.user.mobile || '',
          nationality: data.user.nationalityEN || 'UAE'
        });
        
        console.log('User info fetched and saved to context:', data.user);
      } else {
        console.error('Failed to fetch user info:', data.error);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header showBack={true} title="Login" />
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Login Content */}
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
              <button 
                onClick={handleUAEPassLogin}
                disabled={isLoading || !acceptedTerms}
                className="w-full transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center w-full h-14 bg-primary text-primary-foreground rounded-lg">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  <img 
                    src={uaePassImage} 
                    alt="Login with UAE Pass" 
                    className="w-full h-auto"
                  />
                )}
              </button>
              
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
                  <Label className="text-foreground font-medium">Email</Label>
                  <Input 
                    value={userData.email}
                    disabled
                    className="mt-1 bg-muted text-foreground"
                  />
                </div>

                <div>
                  <Label className="text-foreground font-medium">Mobile</Label>
                  <Input 
                    value={userData.mobile}
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

        <div className="mt-6 space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox 
              id="terms" 
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              className="mt-0.5"
            />
            <div className="text-xs text-muted-foreground leading-relaxed">
              <label htmlFor="terms" className="cursor-pointer">
                By continuing, you agree to our{" "}
                <a 
                  href="/terms-of-service" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a 
                  href="/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
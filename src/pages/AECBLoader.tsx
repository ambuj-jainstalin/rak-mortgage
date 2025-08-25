import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";
import Header from "@/components/Header";

const AECBLoader = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/application");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header showBack={false} title="AECB Report" />
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Card className="p-8 shadow-sm border-border text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Fetching AECB Report
            </h1>
            
            <p className="text-muted-foreground mb-6">
              We are securely retrieving your credit report from Al Etihad Credit Bureau.
              This process takes a few moments.
            </p>
            
            <div className="flex items-center justify-center mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
              <span className="text-sm text-muted-foreground">
                Please wait... {timeLeft}s remaining
              </span>
            </div>
            
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Verifying your identity</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Retrieving credit history</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Analyzing credit score</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AECBLoader;


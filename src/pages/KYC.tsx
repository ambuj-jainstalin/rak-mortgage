import { Button } from "@/components/ui/button";
import { Camera, Upload, CheckCircle, User, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import EnhancedCard from "@/components/EnhancedCard";

const KYC = () => {
  const navigate = useNavigate();
  const [uploadedID, setUploadedID] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  
  // Page progress tracking
  const currentPageStep = 3;
  const totalSteps = 6;
  const steps = ["Login", "Application", "KYC", "Property", "Calculator", "Offer"];

  const handleIDUpload = () => {
    setUploadedID(true);
  };

  const handleFaceVerification = () => {
    setFaceVerified(true);
  };

  return (
    <PageLayout 
      currentStep={currentPageStep} 
      totalSteps={totalSteps} 
      steps={steps}
    >
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-primary/20">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
          Identity Verification
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Secure your application with bank-grade identity verification
        </p>
      </div>

      <div className="space-y-6">
        {/* Emirates ID Upload */}
        <EnhancedCard variant="glass" className="p-6">
          <div className="text-center">
            <div className="mb-6">
              {uploadedID ? (
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-success/20 to-success/10 rounded-full flex items-center justify-center mx-auto border border-success/30">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-success/10 animate-ping"></div>
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto border border-primary/30 hover:border-primary/50 transition-colors duration-300">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Emirates ID
            </h3>
            
            {uploadedID ? (
              <div className="animate-fade-in">
                <div className="inline-flex items-center space-x-2 bg-success/10 px-3 py-1 rounded-full mb-4">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-success text-sm font-medium">Document verified</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Your Emirates ID has been successfully verified
                </p>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Upload a clear photo of both sides of your Emirates ID
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={handleIDUpload}
                    variant="outline" 
                    className="h-12 group hover:border-primary/50 transition-all duration-300"
                  >
                    <Camera className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    Camera
                  </Button>
                  <Button 
                    onClick={handleIDUpload}
                    variant="outline" 
                    className="h-12 group hover:border-primary/50 transition-all duration-300"
                  >
                    <Upload className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    Upload
                  </Button>
                </div>
              </div>
            )}
          </div>
        </EnhancedCard>

        {/* Face Verification */}
        <EnhancedCard variant="glass" className="p-6">
          <div className="text-center">
            <div className="mb-6">
              {faceVerified ? (
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-success/20 to-success/10 rounded-full flex items-center justify-center mx-auto border border-success/30">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-success/10 animate-ping"></div>
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto border border-primary/30 hover:border-primary/50 transition-colors duration-300">
                  <User className="h-8 w-8 text-primary" />
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Face Verification
            </h3>
            
            {faceVerified ? (
              <div className="animate-fade-in">
                <div className="inline-flex items-center space-x-2 bg-success/10 px-3 py-1 rounded-full mb-4">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-success text-sm font-medium">Face verification successful</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Your identity has been confirmed and secured
                </p>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  Position your face in the circle and hold still for verification
                </p>
                
                {/* Face verification circle */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="w-full h-full border-4 border-dashed border-primary/30 rounded-full flex items-center justify-center hover:border-primary/50 transition-colors duration-300">
                    <User className="h-12 w-12 text-primary/70" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-primary/20 to-accent/20 bg-clip-border animate-pulse"></div>
                </div>
                
                <Button 
                  onClick={handleFaceVerification}
                  className="w-full h-12 font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Verification
                </Button>
              </div>
            )}
          </div>
        </EnhancedCard>

        {/* Continue Button */}
        {uploadedID && faceVerified && (
          <div className="animate-scale-in">
            <Button 
              size="lg" 
              className="w-full h-14 font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => navigate("/property-selection")}
            >
              Continue to Property Selection
            </Button>
          </div>
        )}
      </div>

      {/* Security Notice */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-full backdrop-blur-sm">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Bank-grade encryption • Data never stored
          </span>
        </div>
      </div>
    </PageLayout>
  );
};

export default KYC;
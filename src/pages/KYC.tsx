import { Button } from "@/components/ui/button";
import { Camera, Upload, CheckCircle, User, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import EnhancedCard from "@/components/EnhancedCard";
import CameraCapture from "@/components/CameraCapture";

const KYC = () => {
  const navigate = useNavigate();
  const [uploadedID, setUploadedID] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);
  const [showIDCamera, setShowIDCamera] = useState(false);
  const [showFaceCamera, setShowFaceCamera] = useState(false);
  const [idImageData, setIdImageData] = useState<string | null>(null);
  const [faceImageData, setFaceImageData] = useState<string | null>(null);
  
  // Page progress tracking
  const currentPageStep = 3;
  const totalSteps = 6;
  const steps = ["Login", "Application", "KYC", "Property", "Calculator", "Offer"];

  const handleIDCapture = (imageData: string | { front: string; back: string }) => {
    if (typeof imageData === 'string') {
      // Single image (fallback or file upload)
      setIdImageData(imageData);
      setUploadedID(true);
    } else {
      // Front-back capture mode
      setIdImageData(imageData.front); // Store front image as primary
      // You can also store the back image if needed
      console.log('Front image captured:', imageData.front);
      console.log('Back image captured:', imageData.back);
      setUploadedID(true);
    }
  };

  const handleFaceCapture = (imageData: string) => {
    setFaceImageData(imageData);
    setFaceVerified(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleIDCapture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <PageLayout 
      currentStep={currentPageStep} 
      totalSteps={totalSteps} 
      steps={steps}
      showBack={true}
    >
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-primary/20">
          <Shield className="h-6 w-6 text-primary" />
        </div>
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
                  Capture both front and back sides of your Emirates ID
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => setShowIDCamera(true)}
                    variant="outline" 
                    className="h-12 group hover:border-primary/50 transition-all duration-300"
                  >
                    <Camera className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    Camera
                  </Button>
                  <label className="cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden"
                    />
                    <div className="h-12 group hover:border-primary/50 transition-all duration-300 border border-input rounded-md flex items-center justify-center bg-background hover:bg-accent">
                      <Upload className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium">Upload</span>
                    </div>
                  </label>
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
                  onClick={() => setShowFaceCamera(true)}
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

      {/* Camera Capture Modals */}
      <CameraCapture
        isOpen={showIDCamera}
        onClose={() => setShowIDCamera(false)}
        onCapture={handleIDCapture}
        title="Capture Emirates ID"
        type="id"
        captureMode="front-back"
      />

      <CameraCapture
        isOpen={showFaceCamera}
        onClose={() => setShowFaceCamera(false)}
        onCapture={handleFaceCapture}
        title="Face Verification"
        type="face"
      />
    </PageLayout>
  );
};

export default KYC;
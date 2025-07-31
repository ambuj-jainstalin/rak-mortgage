import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, CheckCircle, User } from "lucide-react";
import { useState } from "react";

const KYC = () => {
  const [uploadedID, setUploadedID] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);

  const handleIDUpload = () => {
    // Simulate ID upload
    setUploadedID(true);
  };

  const handleFaceVerification = () => {
    // Simulate face verification
    setFaceVerified(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Identity Verification
          </h1>
          <p className="text-muted-foreground">
            Complete KYC to proceed with your application
          </p>
        </div>

        <div className="space-y-6">
          {/* Emirates ID Upload */}
          <Card className="p-6 shadow-sm border-border">
            <div className="text-center">
              <div className="mb-4">
                {uploadedID ? (
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Emirates ID
              </h3>
              
              {uploadedID ? (
                <div>
                  <p className="text-success text-sm mb-4">✓ Document uploaded successfully</p>
                  <p className="text-muted-foreground text-sm">
                    Your Emirates ID has been verified
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Upload a clear photo of your Emirates ID
                  </p>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleIDUpload}
                      variant="outline" 
                      className="flex-1 h-12"
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Camera
                    </Button>
                    <Button 
                      onClick={handleIDUpload}
                      variant="outline" 
                      className="flex-1 h-12"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Face Verification */}
          <Card className="p-6 shadow-sm border-border">
            <div className="text-center">
              <div className="mb-4">
                {faceVerified ? (
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Face Verification
              </h3>
              
              {faceVerified ? (
                <div>
                  <p className="text-success text-sm mb-4">✓ Face verification successful</p>
                  <p className="text-muted-foreground text-sm">
                    Your identity has been confirmed
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Position your face in the circle and hold still
                  </p>
                  
                  {/* Face verification circle */}
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="w-full h-full border-4 border-primary border-dashed rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleFaceVerification}
                    className="w-full h-12 font-semibold"
                  >
                    Start Verification
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Continue Button */}
          {uploadedID && faceVerified && (
            <Button size="lg" className="w-full h-14 font-semibold">
              Continue to Property Selection
            </Button>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Your data is encrypted and secure. We never store your biometric data.</p>
        </div>
      </div>
    </div>
  );
};

export default KYC;
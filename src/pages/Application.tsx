import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProgressBar from "@/components/ProgressBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Application = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const steps = ["Personal Info", "Income Details", "Liabilities", "Address"];

  const [formData, setFormData] = useState({
    monthlyIncome: "",
    employmentType: "",
    companyName: "",
    existingLoans: "",
    creditCards: "",
    currentAddress: "",
    residenceType: ""
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to KYC when all steps are complete
      navigate("/kyc");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-foreground font-medium">Monthly Income (AED)</Label>
                <Input 
                  type="number"
                  placeholder="25,000"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                  className="mt-1 h-12"
                />
              </div>
              <div>
                <Label className="text-foreground font-medium">Employment Type</Label>
                <Select value={formData.employmentType} onValueChange={(value) => setFormData({...formData, employmentType: value})}>
                  <SelectTrigger className="mt-1 h-12">
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self-employed">Self Employed</SelectItem>
                    <SelectItem value="business-owner">Business Owner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground font-medium">Company Name</Label>
                <Input 
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  className="mt-1 h-12"
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Income Details</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-foreground font-medium">Basic Salary (AED)</Label>
                <Input 
                  type="number"
                  placeholder="20,000"
                  className="mt-1 h-12"
                />
              </div>
              <div>
                <Label className="text-foreground font-medium">Allowances (AED)</Label>
                <Input 
                  type="number"
                  placeholder="5,000"
                  className="mt-1 h-12"
                />
              </div>
              <div>
                <Label className="text-foreground font-medium">Other Income (AED)</Label>
                <Input 
                  type="number"
                  placeholder="0"
                  className="mt-1 h-12"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Existing Liabilities</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-foreground font-medium">Existing Loans (AED/month)</Label>
                <Input 
                  type="number"
                  placeholder="0"
                  value={formData.existingLoans}
                  onChange={(e) => setFormData({...formData, existingLoans: e.target.value})}
                  className="mt-1 h-12"
                />
              </div>
              <div>
                <Label className="text-foreground font-medium">Credit Card Limits (AED)</Label>
                <Input 
                  type="number"
                  placeholder="0"
                  value={formData.creditCards}
                  onChange={(e) => setFormData({...formData, creditCards: e.target.value})}
                  className="mt-1 h-12"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Current Address</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-foreground font-medium">Current Address</Label>
                <Input 
                  placeholder="Enter your current address"
                  value={formData.currentAddress}
                  onChange={(e) => setFormData({...formData, currentAddress: e.target.value})}
                  className="mt-1 h-12"
                />
              </div>
              <div>
                <Label className="text-foreground font-medium">Residence Type</Label>
                <Select value={formData.residenceType} onValueChange={(value) => setFormData({...formData, residenceType: value})}>
                  <SelectTrigger className="mt-1 h-12">
                    <SelectValue placeholder="Select residence type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="own">Own</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="company">Company Provided</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <ProgressBar 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          steps={steps}
        />

        <Card className="p-6 shadow-sm border-border">
          {renderStepContent()}
        </Card>

        <div className="flex gap-3 mt-6">
          {currentStep > 1 ? (
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              className="flex-1 h-12 font-medium"
            >
              Previous
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => navigate("/login")}
              className="flex-1 h-12 font-medium"
            >
              Back to Login
            </Button>
          )}
          <Button 
            onClick={handleNext}
            className="flex-1 h-12 font-semibold"
          >
            {currentStep === totalSteps ? 'Continue to KYC' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Application;
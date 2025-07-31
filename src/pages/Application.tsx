import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Combobox } from "@/components/ui/combobox";
import ProgressBar from "@/components/ProgressBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Application = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const currentPageStep = 2; // Application is step 2 in the overall flow
  const totalSteps = 6; // Total main pages in the flow
  const steps = ["Login", "Application", "KYC", "Property", "Calculator", "Offer"];

  // Predefined company list
  const companyOptions = [
    { value: "emirates", label: "Emirates" },
    { value: "etisalat", label: "Etisalat" },
    { value: "du", label: "du" },
    { value: "adnoc", label: "ADNOC" },
    { value: "emirates-nbd", label: "Emirates NBD" },
    { value: "adcb", label: "Abu Dhabi Commercial Bank" },
    { value: "mashreq", label: "Mashreq Bank" },
    { value: "damac", label: "DAMAC Properties" },
    { value: "emaar", label: "Emaar Properties" },
    { value: "dnata", label: "dnata" },
    { value: "flydubai", label: "flydubai" },
    { value: "rak-bank", label: "RAK Bank" },
    { value: "ajman-bank", label: "Ajman Bank" },
    { value: "sharjah-islamic", label: "Sharjah Islamic Bank" },
    { value: "uae-exchange", label: "UAE Exchange" },
  ];

  const [formData, setFormData] = useState({
    monthlyIncome: "",
    employmentType: "",
    companyName: "",
    existingLoans: "",
    creditCards: "",
    apartmentVilla: "",
    buildingName: "",
    streetLocation: "",
    emirate: "",
    residenceType: ""
  });

  const handleNext = () => {
    if (currentStep < 4) { // 4 internal form steps
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to KYC when all form steps are complete
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
                <Combobox
                  options={companyOptions}
                  value={formData.companyName}
                  onValueChange={(value) => setFormData({...formData, companyName: value})}
                  placeholder="Type company name (min 3 characters)"
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
                <Label className="text-foreground font-medium">Apartment/Villa No</Label>
                <Input 
                  placeholder="Apartment/Villa number"
                  value={formData.apartmentVilla}
                  onChange={(e) => setFormData({...formData, apartmentVilla: e.target.value})}
                  className="mt-1 h-12"
                />
              </div>
              <div>
                <Label className="text-foreground font-medium">Building Name/Villa Name</Label>
                <Input 
                  placeholder="Building or Villa name"
                  value={formData.buildingName}
                  onChange={(e) => setFormData({...formData, buildingName: e.target.value})}
                  className="mt-1 h-12"
                />
              </div>
              <div>
                <Label className="text-foreground font-medium">Street/Location</Label>
                <Select value={formData.streetLocation} onValueChange={(value) => setFormData({...formData, streetLocation: value})}>
                  <SelectTrigger className="mt-1 h-12">
                    <SelectValue placeholder="Select street/location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sheikh-zayed-road">Sheikh Zayed Road</SelectItem>
                    <SelectItem value="jumeirah-beach-road">Jumeirah Beach Road</SelectItem>
                    <SelectItem value="al-wasl-road">Al Wasl Road</SelectItem>
                    <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
                    <SelectItem value="dubai-marina">Dubai Marina</SelectItem>
                    <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                    <SelectItem value="business-bay">Business Bay</SelectItem>
                    <SelectItem value="deira">Deira</SelectItem>
                    <SelectItem value="bur-dubai">Bur Dubai</SelectItem>
                    <SelectItem value="jumeirah-lake-towers">Jumeirah Lake Towers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground font-medium">Emirate</Label>
                <Select value={formData.emirate} onValueChange={(value) => setFormData({...formData, emirate: value})}>
                  <SelectTrigger className="mt-1 h-12">
                    <SelectValue placeholder="Select emirate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dubai">Dubai</SelectItem>
                    <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="sharjah">Sharjah</SelectItem>
                    <SelectItem value="ajman">Ajman</SelectItem>
                    <SelectItem value="ras-al-khaimah">Ras Al Khaimah</SelectItem>
                    <SelectItem value="fujairah">Fujairah</SelectItem>
                    <SelectItem value="umm-al-quwain">Umm Al Quwain</SelectItem>
                  </SelectContent>
                </Select>
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
          currentStep={currentPageStep} 
          totalSteps={totalSteps} 
          steps={steps}
        />

        <Card className="p-6 shadow-sm border-border">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-foreground mb-2">Application Form</h2>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Section {currentStep} of 4
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round((currentStep / 4) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-secondary h-1 rounded-none mb-4">
              <div 
                className="bg-accent h-1 rounded-none transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
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
            {currentStep === 4 ? 'Continue to KYC' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Application;
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Combobox } from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";
import PageLayout from "@/components/PageLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApplicationContext } from "@/contexts/ApplicationContext";
import { Edit2, Check, X } from "lucide-react";

const Application = () => {
  const navigate = useNavigate();
  const { applicationData, updateApplicationData } = useApplicationContext();
  const [currentStep, setCurrentStep] = useState(1);
  const currentPageStep = 2; // Application is step 2 in the overall flow
  const totalSteps = 6; // Total main pages in the flow
  const steps = ["Login", "Application", "KYC", "Property", "Loan", "Offer"];

  // Predefined company list
  const companyOptions = [
    { value: "emirates", label: "Emirates" },
    { value: "etisalat", label: "Etisalat" },
    { value: "perfios", label: "Perfios Software Solutions" },
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
    monthlyIncome: "40000",
    employmentType: "salaried",
    companyName: "Perfios Software Solutions",
    existingLoans: "2500",
    creditCards: "15000",
    apartmentVilla: "",
    buildingName: "",
    streetLocation: "",
    emirate: "",
    residenceType: ""
  });

  // Pre-filled existing liabilities data
  const [existingLiabilities, setExistingLiabilities] = useState({
    personalLoan: {
      loanAmount: "50000",
      outstanding: "35000",
      emi: "2500"
    },
    creditCard: {
      limit: "15000"
    }
  });

  // State for liability selections
  const [liabilitySelections, setLiabilitySelections] = useState({
    personalLoan: true,
    creditCard: true
  });

  // State for editing credit limit
  const [isEditingCreditLimit, setIsEditingCreditLimit] = useState(false);
  const [editingCreditLimit, setEditingCreditLimit] = useState("15000");

  const handleNext = () => {
    if (currentStep < 4) { // 4 internal form steps
      setCurrentStep(currentStep + 1);
    } else {
      // Log current form data
      console.log('Form data being saved:', formData);
      
      // Save final form data to context before navigating
      const dataToSave = {
        income: formData.monthlyIncome,
        employer: formData.companyName,
        occupationType: formData.employmentType,
        propertyLocation: formData.emirate, // Save emirate as property location
        // Add other relevant fields as needed
      };
      
      console.log('Data being saved to context:', dataToSave);
      updateApplicationData(dataToSave);
      
      // Navigate to KYC when all form steps are complete
      navigate("/kyc");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEditCreditLimit = () => {
    setIsEditingCreditLimit(true);
    setEditingCreditLimit(existingLiabilities.creditCard.limit);
  };

  const handleSaveCreditLimit = () => {
    setExistingLiabilities(prev => ({
      ...prev,
      creditCard: {
        ...prev.creditCard,
        limit: editingCreditLimit
      }
    }));
    setIsEditingCreditLimit(false);
  };

  const handleCancelCreditLimit = () => {
    setIsEditingCreditLimit(false);
    setEditingCreditLimit(existingLiabilities.creditCard.limit);
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
                  // placeholder="25,000"
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
                    <SelectItem value="salaried">Salaried</SelectItem>
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
                  placeholder="0"
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
            <div className="space-y-6">
              {/* Personal Loan Section */}
              <Card className={`p-4 border-border transition-all duration-200 ${!liabilitySelections.personalLoan ? 'opacity-50 bg-muted/30' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="personalLoan"
                      checked={liabilitySelections.personalLoan}
                      onCheckedChange={(checked) => setLiabilitySelections({
                        ...liabilitySelections,
                        personalLoan: checked as boolean
                      })}
                    />
                    <h3 className="text-lg font-semibold text-foreground">Personal Loan - ADCB</h3>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${liabilitySelections.personalLoan ? 'bg-primary' : 'bg-muted'}`}></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Loan Amount</Label>
                    <div className="text-lg font-medium text-foreground">AED {parseInt(existingLiabilities.personalLoan.loanAmount).toLocaleString()}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Outstanding</Label>
                    <div className="text-lg font-medium text-foreground">AED {parseInt(existingLiabilities.personalLoan.outstanding).toLocaleString()}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Monthly EMI</Label>
                    <div className="text-lg font-medium text-foreground">AED {parseInt(existingLiabilities.personalLoan.emi).toLocaleString()}</div>
                  </div>
                </div>
              </Card>

              {/* Credit Card Section */}
              <Card className={`p-4 border-border transition-all duration-200 ${!liabilitySelections.creditCard ? 'opacity-50 bg-muted/30' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="creditCard"
                      checked={liabilitySelections.creditCard}
                      onCheckedChange={(checked) => setLiabilitySelections({
                        ...liabilitySelections,
                        creditCard: checked as boolean
                      })}
                    />
                    <h3 className="text-lg font-semibold text-foreground">Credit Card - CBD</h3>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${liabilitySelections.creditCard ? 'bg-primary' : 'bg-muted'}`}></div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label className="text-sm text-muted-foreground">Credit Limit</Label>
                      {isEditingCreditLimit ? (
                        <div className="flex items-center space-x-2 mt-1">
                          <Input
                            type="number"
                            value={editingCreditLimit}
                            onChange={(e) => setEditingCreditLimit(e.target.value)}
                            className="w-32"
                            placeholder="Enter amount"
                          />
                          <Button
                            size="sm"
                            onClick={handleSaveCreditLimit}
                            className="h-8 w-8 p-0"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelCreditLimit}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-lg font-medium text-foreground mt-1">
                          AED {parseInt(existingLiabilities.creditCard.limit).toLocaleString()}
                        </div>
                      )}
                    </div>
                    {!isEditingCreditLimit && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleEditCreditLimit}
                        className="h-8 w-8 p-0 ml-4"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              {/* Summary Section */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-foreground mb-3">Summary (Selected Liabilities)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Monthly EMI:</span>
                    <span className="text-lg font-semibold text-foreground">
                      AED {liabilitySelections.personalLoan ? parseInt(existingLiabilities.personalLoan.emi).toLocaleString() : '0'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Credit Limit:</span>
                    <span className="text-lg font-semibold text-foreground">
                      AED {liabilitySelections.creditCard ? parseInt(existingLiabilities.creditCard.limit).toLocaleString() : '0'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Outstanding:</span>
                    <span className="text-lg font-semibold text-foreground">
                      AED {(
                        liabilitySelections.personalLoan ? parseInt(existingLiabilities.personalLoan.outstanding) : 0
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
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
    <PageLayout
      currentStep={currentPageStep}
      totalSteps={totalSteps}
      steps={steps}
      showBack={true}
      title="Application"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Mortgage Application
        </h1>
        <p className="text-muted-foreground">
          Please fill in your personal and financial details
        </p>
      </div>

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
    </PageLayout>
  );
};

export default Application;
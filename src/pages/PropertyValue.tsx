import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LoanSlider from "@/components/LoanSlider";
import { Calculator, TrendingUp, Shield, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useApplicationContext } from "@/contexts/ApplicationContext";
import { submitLeadToExternalAPI, createLeadDataFromApplication } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const PropertyValue = () => {
  const navigate = useNavigate();
  const { updateApplicationData, applicationData } = useApplicationContext();
  const { toast } = useToast();
  const [propertyValue, setPropertyValue] = useState(2000000);
  const [loanAmount, setLoanAmount] = useState(1600000); // 80% of 2000000
  const [relationshipType, setRelationshipType] = useState("personal");
  const [rateType, setRateType] = useState("fixed");
  const [firstMortgage, setFirstMortgage] = useState("yes");
  const [productType, setProductType] = useState("standard");
  const [loanType, setLoanType] = useState("conventional");
  const [tenure, setTenure] = useState(25); // Default 25 years
  const [isGeneratingOffer, setIsGeneratingOffer] = useState(false);
  
  // Page progress tracking
  const currentPageStep = 5;
  const totalSteps = 6;
  const steps = ["Login", "Application", "KYC", "Property", "Loan", "Offer"];

  const formatCurrency = (value: number) => {
    return `${(value / 1000000).toFixed(1)}M AED`;
  };

  // Calculate LTV based on first mortgage selection
  const maxLTV = firstMortgage === "yes" ? 0.8 : 0.6; // 80% for first mortgage, 60% for subsequent
  const ltv = ((loanAmount / propertyValue) * 100).toFixed(1);
  const downPayment = propertyValue - loanAmount;
  
  // Calculate interest rate based on loan type and rate type
  let baseRate = loanType === "islamic" ? 3.99 : 3.49;
  let interestRate = baseRate;
  
  if (rateType === "floating") {
    // Floating rates are typically lower than fixed rates
    interestRate = baseRate - 0.5; // 0.5% lower for floating
  }
  
  // Adjust rate based on relationship type
  if (relationshipType === "elite") {
    interestRate -= 0.25; // 0.25% discount for elite
  } else if (relationshipType === "private") {
    interestRate -= 0.5; // 0.5% discount for private
  }
  
  // Adjust rate based on product type
  if (productType === "home-in-one") {
    interestRate += 0.25; // 0.25% premium for Home in One product
  }
  
  // Calculate monthly payment using loan formula: M = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = tenure * 12;
  const monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  // Ensure loan doesn't exceed max LTV based on first mortgage selection
  const handleLoanChange = (value: number) => {
    setLoanAmount(Math.min(value, propertyValue * maxLTV)); // Max LTV based on first mortgage
  };

  const handlePropertyChange = (value: number) => {
    setPropertyValue(value);
    // Automatically maintain max LTV when property value changes
    setLoanAmount(value * maxLTV);
  };

  const handleFirstMortgageChange = (value: string) => {
    setFirstMortgage(value);
    // Recalculate loan amount based on new LTV when first mortgage selection changes
    const newMaxLTV = value === "yes" ? 0.8 : 0.6;
    setLoanAmount(propertyValue * newMaxLTV);
  };

  return (
    <PageLayout
      currentStep={currentPageStep}
      totalSteps={totalSteps}
      steps={steps}
      showBack={true}
      title="Calculator"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Loan Eligibility
        </h1>
        <p className="text-muted-foreground">
          Adjust the values to see your loan details
        </p>
      </div>

        <div className="space-y-6">
          {/* Relationship Type Selection */}
          <Card className="p-4 shadow-sm border-border">
            <Label className="text-foreground font-medium mb-4 block">Relationship Type</Label>
            <RadioGroup value={relationshipType} onValueChange={setRelationshipType} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal" className="font-normal cursor-pointer">Personal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="elite" id="elite" />
                <Label htmlFor="elite" className="font-normal cursor-pointer">Elite</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="font-normal cursor-pointer">Private</Label>
              </div>
            </RadioGroup>
          </Card>

          {/* Product Type Selection */}
          <Card className="p-4 shadow-sm border-border">
            <Label className="text-foreground font-medium mb-4 block">Product Type</Label>
            <RadioGroup value={productType} onValueChange={setProductType} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="font-normal cursor-pointer">Standard</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home-in-one" id="home-in-one" />
                <Label htmlFor="home-in-one" className="font-normal cursor-pointer">Home in One</Label>
              </div>
            </RadioGroup>
            <div className="mt-3 text-sm text-muted-foreground">
              {productType === "standard" ? (
                <span>Standard mortgage product with competitive rates</span>
              ) : (
                <span>Home in One: Combined mortgage and current account (0.25% rate premium)</span>
              )}
            </div>
          </Card>

          {/* Loan Type Selection */}
          <Card className="p-4 shadow-sm border-border">
            <Label className="text-foreground font-medium mb-4 block">Loan Type</Label>
            <RadioGroup value={loanType} onValueChange={setLoanType} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conventional" id="conventional" />
                <Label htmlFor="conventional" className="font-normal cursor-pointer">Conventional</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="islamic" id="islamic" />
                <Label htmlFor="islamic" className="font-normal cursor-pointer">Islamic</Label>
              </div>
            </RadioGroup>
          </Card>

          {/* Rate Type Selection */}
          <Card className="p-4 shadow-sm border-border">
            <Label className="text-foreground font-medium mb-4 block">Rate Type</Label>
            <RadioGroup value={rateType} onValueChange={setRateType} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixed" id="fixed" />
                <Label htmlFor="fixed" className="font-normal cursor-pointer">Fixed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="floating" id="floating" />
                <Label htmlFor="floating" className="font-normal cursor-pointer">Floating</Label>
              </div>
            </RadioGroup>
            <div className="mt-3 text-sm text-muted-foreground">
              {rateType === "fixed" ? (
                <span>Fixed rate: {interestRate.toFixed(2)}% APR</span>
              ) : (
                <span>Floating rate: {interestRate.toFixed(2)}% APR (0.5% lower than fixed)</span>
              )}
            </div>
          </Card>

          {/* First Mortgage Selection */}
          <Card className="p-4 shadow-sm border-border">
            <Label className="text-foreground font-medium mb-4 block">First Mortgage?</Label>
            <RadioGroup value={firstMortgage} onValueChange={handleFirstMortgageChange} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="first-mortgage-yes" />
                <Label htmlFor="first-mortgage-yes" className="font-normal cursor-pointer">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="first-mortgage-no" />
                <Label htmlFor="first-mortgage-no" className="font-normal cursor-pointer">No</Label>
              </div>
            </RadioGroup>
          </Card>

          {/* Property Value Slider */}
          <Card className="p-6 shadow-sm border-border">
            <LoanSlider
              label="Property Value"
              value={propertyValue}
              min={500000}
              max={10000000}
              step={50000}
              onChange={handlePropertyChange}
              format={formatCurrency}
            />
          </Card>

          {/* Loan Amount Slider */}
          <Card className="p-6 shadow-sm border-border">
            <LoanSlider
              label="Requested Loan Amount"
              value={loanAmount}
              min={100000}
              max={Math.min(8000000, propertyValue * maxLTV)}
              step={25000}
              onChange={handleLoanChange}
              format={formatCurrency}
            />
          </Card>

          {/* Tenure Slider */}
          <Card className="p-6 shadow-sm border-border">
            <LoanSlider
              label="Loan Tenure"
              value={tenure}
              min={3}
              max={25}
              step={1}
              onChange={setTenure}
              format={(value) => `${value} years`}
            />
          </Card>

          {/* Loan Summary */}
          <Card className="p-6 shadow-sm border-border">
            <div className="flex items-center mb-4">
              <Calculator className="h-5 w-5 text-primary mr-2" />
              <h3 className="font-semibold text-foreground">Loan Summary</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Loan-to-Value (LTV)</span>
                <span className={`font-bold ${parseFloat(ltv) <= (maxLTV * 100) ? 'text-success' : 'text-destructive'}`}>
                  {ltv}%
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Down Payment</span>
                <span className="font-bold text-foreground">
                  {formatCurrency(downPayment)}
                </span>
              </div>
              
              
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Tenure</span>
                <span className="font-bold text-foreground">{tenure} years</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Interest Rate</span>
                <span className="font-bold text-primary">{interestRate}% APR</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Est. Monthly Payment</span>
                <span className="font-bold text-foreground text-lg">
                  {Math.round(monthlyPayment).toLocaleString()} AED
                </span>
              </div>
            </div>
          </Card>

          {/* Benefits */}
          <Card className="p-6 shadow-sm border-border">
            <h3 className="font-semibold text-foreground mb-4">Why Choose Our Mortgage?</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">Competitive rates from 3.49% APR</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">No processing fees or hidden charges</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calculator className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">Flexible repayment terms up to 25 years</span>
              </div>
            </div>
          </Card>

          <Button 
            size="lg" 
            className="w-full h-14 font-semibold"
            disabled={parseFloat(ltv) > (maxLTV * 100) || isGeneratingOffer}
            onClick={async () => {
                              if (parseFloat(ltv) <= (maxLTV * 100)) {
                setIsGeneratingOffer(true);
                try {
                  // Save property and loan data to context
                  updateApplicationData({
                    propertyValue: propertyValue.toString(),
                    loanAmount: loanAmount.toString(),
                    relationshipType: relationshipType,
                    rateType: rateType,
                    productType: productType,
                    loanType: "resale", // Hardcoded as per requirements
                  });

                  // Submit lead data to external API
                  const leadData = createLeadDataFromApplication({
                    ...applicationData,
                    propertyValue: propertyValue.toString(),
                    loanAmount: loanAmount.toString(),
                    relationshipType: relationshipType,
                    rateType: rateType,
                    productType: productType,
                    loanType: "resale",
                  });

                  const response = await submitLeadToExternalAPI(leadData);
                  
                  // Store the leadId from the response for later use
                  if (response && response.data && response.data.leadId) {
                    localStorage.setItem('leadId', response.data.leadId);
                    console.log('Lead ID stored:', response.data.leadId);
                  }
                  
                  toast({
                    title: "Offer Generated!",
                    description: "Your lead has been submitted and offer is ready.",
                    variant: "default",
                  });

                  // Navigate to offer page
                  navigate("/offer");
                } catch (error) {
                  console.error('Error generating offer:', error);
                  toast({
                    title: "Error",
                    description: "Failed to generate offer. Please try again.",
                    variant: "destructive",
                  });
                } finally {
                  setIsGeneratingOffer(false);
                }
              }
            }}
          >
            {isGeneratingOffer ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Offer...
              </>
            ) : parseFloat(ltv) > 80 ? (
              'Reduce Loan Amount (Max 80% LTV)'
            ) : (
              'Get Real-Time Offer'
            )}
          </Button>
        </div>
    </PageLayout>
  );
};

export default PropertyValue;
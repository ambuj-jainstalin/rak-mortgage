import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LoanSlider from "@/components/LoanSlider";
import { Calculator, TrendingUp, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/ProgressBar";

const PropertyValue = () => {
  const navigate = useNavigate();
  const [propertyValue, setPropertyValue] = useState(2000000);
  const [loanAmount, setLoanAmount] = useState(1600000); // 80% of 2000000
  const [loanType, setLoanType] = useState("conventional");
  
  // Page progress tracking
  const currentPageStep = 5;
  const totalSteps = 6;
  const steps = ["Login", "Application", "KYC", "Property", "Calculator", "Offer"];

  const formatCurrency = (value: number) => {
    return `${(value / 1000000).toFixed(1)}M AED`;
  };

  const ltv = ((loanAmount / propertyValue) * 100).toFixed(1);
  const downPayment = propertyValue - loanAmount;
  const monthlyPayment = (loanAmount * 0.004).toFixed(0); // Rough calculation
  const interestRate = 3.49;

  // Ensure loan doesn't exceed 80% LTV
  const handleLoanChange = (value: number) => {
    setLoanAmount(Math.min(value, propertyValue * 0.8)); // Max 80% LTV
  };

  const handlePropertyChange = (value: number) => {
    setPropertyValue(value);
    // Automatically maintain 80% LTV when property value changes
    setLoanAmount(value * 0.8);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <ProgressBar 
          currentStep={currentPageStep} 
          totalSteps={totalSteps} 
          steps={steps}
        />
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Loan Calculator
          </h1>
          <p className="text-muted-foreground">
            Adjust the values to see your loan details
          </p>
        </div>

        <div className="space-y-6">
          {/* Loan Type Selection */}
          <Card className="p-6 shadow-sm border-border">
            <Label className="text-foreground font-medium mb-4 block">Loan Type</Label>
            <RadioGroup value={loanType} onValueChange={setLoanType} className="flex space-x-6">
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
              max={Math.min(8000000, propertyValue * 0.8)}
              step={25000}
              onChange={handleLoanChange}
              format={formatCurrency}
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
                <span className={`font-bold ${parseFloat(ltv) <= 80 ? 'text-success' : 'text-destructive'}`}>
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
                <span className="text-muted-foreground">Interest Rate</span>
                <span className="font-bold text-primary">{interestRate}% APR</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Est. Monthly Payment</span>
                <span className="font-bold text-foreground text-lg">
                  {parseInt(monthlyPayment).toLocaleString()} AED
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
            disabled={parseFloat(ltv) > 80}
            onClick={() => parseFloat(ltv) <= 80 ? navigate("/submit") : null}
          >
            {parseFloat(ltv) > 80 ? 'Reduce Loan Amount (Max 80% LTV)' : 'Submit Application'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyValue;
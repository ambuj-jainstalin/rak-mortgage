import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Phone, Calendar, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/ProgressBar";

const Offer = () => {
  const navigate = useNavigate();
  
  // Page progress tracking
  const currentPageStep = 6;
  const totalSteps = 6;
  const steps = ["Login", "Application", "KYC", "Property", "Calculator", "Offer"];
  
  const offerDetails = {
    loanAmount: "1,500,000",
    interestRate: "3.49",
    tenure: "25",
    monthlyPayment: "7,542",
    processingFee: "0",
    totalInterest: "763,600",
    validUntil: "15 Feb 2024"
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <ProgressBar 
          currentStep={currentPageStep} 
          totalSteps={totalSteps} 
          steps={steps}
        />
        <div className="text-center mb-8 pt-8">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Congratulations!
          </h1>
          <p className="text-muted-foreground">
            Your mortgage has been approved
          </p>
          
          <Badge className="mt-3 bg-success text-success-foreground">
            PRE-APPROVED
          </Badge>
        </div>

        {/* Loan Offer Details */}
        <Card className="p-6 shadow-sm border-border mb-6">
          <h3 className="font-semibold text-foreground mb-4">Your Mortgage Offer</h3>
          
          <div className="space-y-4">
            <div className="text-center py-4 bg-primary/5 border border-primary/20">
              <p className="text-muted-foreground text-sm">Loan Amount</p>
              <p className="text-3xl font-bold text-primary">{offerDetails.loanAmount} AED</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/50">
                <p className="text-muted-foreground text-sm">Interest Rate</p>
                <p className="text-xl font-bold text-foreground">{offerDetails.interestRate}%</p>
                <p className="text-xs text-muted-foreground">per annum</p>
              </div>
              
              <div className="text-center p-3 bg-muted/50">
                <p className="text-muted-foreground text-sm">Tenure</p>
                <p className="text-xl font-bold text-foreground">{offerDetails.tenure}</p>
                <p className="text-xs text-muted-foreground">years</p>
              </div>
            </div>
            
            <div className="text-center py-4 bg-accent/5 border border-accent/20">
              <p className="text-muted-foreground text-sm">Monthly Payment</p>
              <p className="text-2xl font-bold text-foreground">{offerDetails.monthlyPayment} AED</p>
            </div>
          </div>
        </Card>

        {/* Additional Details */}
        <Card className="p-6 shadow-sm border-border mb-6">
          <h3 className="font-semibold text-foreground mb-4">Offer Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Processing Fee</span>
              <span className="font-medium text-success">{offerDetails.processingFee} AED</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Interest</span>
              <span className="font-medium text-foreground">{offerDetails.totalInterest} AED</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Offer Valid Until</span>
              <span className="font-medium text-destructive">{offerDetails.validUntil}</span>
            </div>
          </div>
        </Card>

        {/* Benefits */}
        <Card className="p-6 shadow-sm border-border mb-8">
          <h3 className="font-semibold text-foreground mb-4">Your Benefits</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">No processing fees</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">Free property valuation</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">Flexible repayment options</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">24/7 customer support</span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            size="lg" 
            className="w-full h-14 font-semibold"
            onClick={() => {
              alert("Congratulations! Your mortgage application has been accepted. You will be contacted by our team within 24 hours.");
              navigate("/");
            }}
          >
            Accept Offer
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              size="lg" 
              className="h-12 font-medium"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="h-12 font-medium"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Us
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p className="flex items-center justify-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>Offer expires on {offerDetails.validUntil}</span>
          </p>
        </div>
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full h-12 font-medium"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
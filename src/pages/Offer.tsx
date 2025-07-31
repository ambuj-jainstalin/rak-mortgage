import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Phone, Calendar, Home, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { useApplicationContext } from "@/contexts/ApplicationContext";
import { updateLeadStatus } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Offer = () => {
  const navigate = useNavigate();
  const { applicationData } = useApplicationContext();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  
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

  const handleAcceptOffer = async () => {
    setIsAccepting(true);
    try {
      // Get the leadId from localStorage
      const leadId = localStorage.getItem('leadId');
      
      if (!leadId) {
        toast({
          title: "Error",
          description: "Lead ID not found. Please try generating the offer again.",
          variant: "destructive",
        });
        return;
      }

      // Update lead status to PRE_APPROVED
      await updateLeadStatus(leadId);
      
      toast({
        title: "Offer Accepted!",
        description: "Your offer has been accepted and status updated.",
        variant: "default",
      });

      // Navigate to success page
      navigate("/submit");
    } catch (error) {
      console.error('Error accepting offer:', error);
      toast({
        title: "Error",
        description: "Failed to accept offer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAccepting(false);
    }
  };

  useEffect(() => {
    // Simulate offer generation delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout
      currentStep={currentPageStep}
      totalSteps={totalSteps}
      steps={steps}
      showBack={true}
      title="Offer"
    >
      {isLoading ? (
        // Loading State
        <div className="text-center pt-16">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Generating Your Offer
            </h1>
            <p className="text-muted-foreground mb-8">
              Our AI is analyzing your profile and calculating the best rates...
            </p>
            
            <Card className="p-6 shadow-sm border-border mb-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-muted-foreground">Checking credit profile...</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <span className="text-muted-foreground">Analyzing property value...</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  <span className="text-muted-foreground">Calculating best rates...</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                  <span className="text-muted-foreground">Preparing your offer...</span>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          // Actual Offer Content (with fade-in animation)
          <div className="animate-fade-in">{/* ... keep existing code */}
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
            onClick={handleAcceptOffer}
            disabled={isAccepting}
          >
            {isAccepting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Accepting Offer...
              </>
            ) : (
              "Accept Offer"
            )}
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
        )}
    </PageLayout>
  );
};

export default Offer;
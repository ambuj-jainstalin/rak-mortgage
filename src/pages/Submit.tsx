import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, FileText, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const Submit = () => {
  const navigate = useNavigate();
  return (
    <PageLayout
      currentStep={6}
      totalSteps={6}
      steps={["Login", "Application", "KYC", "Property", "Loan", "Offer"]}
      showBack={false}
      title="Success"
    >
      <div className="text-center mb-8 pt-8">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-10 w-10 text-success" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Application Submitted!
        </h1>
        <p className="text-muted-foreground">
          Your mortgage offer has been accepted successfully
        </p>
      </div>

        <Card className="p-6 shadow-sm border-border mb-6">
          <h3 className="font-semibold text-foreground mb-4">Application Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Application ID</span>
              <span className="font-mono text-foreground">#UAE2024001234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Submission Date</span>
              <span className="text-foreground">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <span className="text-success font-medium">Offer Accepted</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-sm border-border mb-6">
          <h3 className="font-semibold text-foreground mb-4">What Happens Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Offer Accepted</h4>
                <p className="text-muted-foreground text-sm">
                  Your mortgage offer has been successfully accepted
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Documentation</h4>
                <p className="text-muted-foreground text-sm">
                  We'll prepare all documents and agreements
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Loan Disbursement</h4>
                <p className="text-muted-foreground text-sm">
                  Your mortgage will be disbursed, and cheques prepared for property transfer.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-sm border-border mb-8">
          <h3 className="font-semibold text-foreground mb-4">Expected Timeline</h3>
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-foreground font-medium">5-7 Business Days</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Our relationship manager will contact you within 24 hours to begin the documentation process
          </p>
        </Card>

        <div className="space-y-3">
          <Button 
            size="lg" 
            className="w-full h-14 font-semibold"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full h-14 font-semibold"
          >
            <Phone className="mr-2 h-5 w-5" />
            Contact Support
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Need help? Call us at <span className="text-primary font-medium">800-RAKBANK</span></p>
          <p>Or email: <span className="text-primary font-medium">support@rakbank.ae</span></p>
        </div>
    </PageLayout>
  );
};

export default Submit;
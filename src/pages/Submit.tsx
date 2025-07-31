import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, FileText, Phone } from "lucide-react";

const Submit = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="text-center mb-8 pt-8">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Application Submitted!
          </h1>
          <p className="text-muted-foreground">
            Thank you for choosing our mortgage service
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
              <span className="text-success font-medium">Under Review</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-sm border-border mb-6">
          <h3 className="font-semibold text-foreground mb-4">What Happens Next?</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Document Review</h4>
                <p className="text-muted-foreground text-sm">
                  Our team will review your documents within 24 hours
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Credit Assessment</h4>
                <p className="text-muted-foreground text-sm">
                  We'll conduct a comprehensive credit evaluation
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Final Offer</h4>
                <p className="text-muted-foreground text-sm">
                  You'll receive your personalized mortgage offer
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-sm border-border mb-8">
          <h3 className="font-semibold text-foreground mb-4">Expected Timeline</h3>
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-foreground font-medium">2-3 Business Days</span>
          </div>
          <p className="text-muted-foreground text-sm">
            You'll receive an email and SMS notification once your application is approved
          </p>
        </Card>

        <div className="space-y-3">
          <Button size="lg" className="w-full h-14 font-semibold">
            <FileText className="mr-2 h-5 w-5" />
            Download Application Summary
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
          <p>Need help? Call us at <span className="text-primary font-medium">800-MORTGAGE</span></p>
          <p>Or email: <span className="text-primary font-medium">support@uaemortgage.ae</span></p>
        </div>
      </div>
    </div>
  );
};

export default Submit;
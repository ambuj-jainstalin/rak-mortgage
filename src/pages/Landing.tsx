import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Clock, DollarSign, ArrowRight } from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: DollarSign,
      title: "Low Rates",
      description: "Competitive rates starting from 3.49% APR"
    },
    {
      icon: Clock,
      title: "Fast Approval", 
      description: "Get pre-approved in under 10 minutes"
    },
    {
      icon: Shield,
      title: "Zero Fees",
      description: "No processing fees or hidden charges"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Hero Section */}
        <div className="text-center mb-12 pt-16">
          <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight">
            Get Your Dream Home<br />
            <span className="text-primary">in Minutes</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Fast, secure mortgage applications with UAE Pass integration
          </p>
          <Button 
            size="lg" 
            className="w-full h-14 text-lg font-semibold"
          >
            Apply Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 shadow-sm border-border">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-none">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">🏛️ Licensed by UAE Central Bank</p>
          <p>🔐 Secured with UAE Pass Authentication</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
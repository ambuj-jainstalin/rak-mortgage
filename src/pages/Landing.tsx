import { Button } from "@/components/ui/button";
import { Shield, Clock, DollarSign, ArrowRight, Star, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EnhancedCard from "@/components/EnhancedCard";
import Header from "@/components/Header";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: DollarSign,
      title: "Competitive Rates",
      description: "Starting from 3.49% APR with zero hidden fees",
      highlight: "Best Rate"
    },
    {
      icon: Clock,
      title: "Instant Approval", 
      description: "Get pre-approved in under 10 minutes",
      highlight: "AI-Powered"
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Bank-grade security with UAE Pass integration",
      highlight: "CBUAE Licensed"
    }
  ];

  const benefits = [
    "No processing fees or hidden charges",
    "Free property valuation included", 
    "Flexible repayment terms up to 25 years",
    "Dedicated relationship manager"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Hero Section */}
        <div className="text-center mb-10 animate-fade-in">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6 border border-primary/20">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-primary text-sm font-medium">UAE's #1 Digital Mortgage</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight tracking-tight">
            Your Dream Home<br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              in Minutes
            </span>
          </h1>
          
          <p className="text-muted-foreground text-base mb-8 leading-relaxed max-w-sm mx-auto">
            Fast, secure mortgage applications with instant pre-approval
          </p>
          
          <Button 
            size="lg" 
            variant="gradient"
            className="w-full h-14 text-base font-bold group"
            onClick={() => navigate("/login")}
          >
            Start Your Application
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
          
          <p className="text-xs text-muted-foreground mt-4">
            ✓ No commitment required • Takes only 2 minutes
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-4 mb-10">
          {features.map((feature, index) => (
            <EnhancedCard 
              key={index} 
              variant="glass" 
              className="p-6 group"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-3 rounded-xl border border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-foreground">
                      {feature.title}
                    </h3>
                    <span className="bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full font-medium">
                      {feature.highlight}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </EnhancedCard>
          ))}
        </div>

        {/* Benefits Section */}
        <EnhancedCard variant="gradient" className="p-5 mb-10">
          <h3 className="font-bold text-foreground mb-4 text-center">
            Why Choose Our Mortgage?
          </h3>
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                <span className="text-foreground text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </EnhancedCard>

        {/* Trust Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-6 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-primary text-xs font-bold">🏛️</span>
              </div>
              <span className="text-sm">CBUAE Licensed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-primary text-xs font-bold">🔐</span>
              </div>
              <span className="text-sm">UAE Pass Secured</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p>🌟 4.9/5 rating from 10,000+ customers</p>
            <p>⚡ Average approval time: 8 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
import { ReactNode } from "react";
import ProgressBar from "./ProgressBar";

interface PageLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  steps: string[];
  showProgress?: boolean;
}

const PageLayout = ({ 
  children, 
  currentStep, 
  totalSteps, 
  steps, 
  showProgress = true 
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 max-w-md">
        {showProgress && (
          <ProgressBar 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
            steps={steps}
          />
        )}
        
        <div className="animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
import { ReactNode } from "react";
import ProgressBar from "./ProgressBar";
import Header from "./Header";

interface PageLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  steps: string[];
  showProgress?: boolean;
  showBack?: boolean;
  title?: string;
}

const PageLayout = ({ 
  children, 
  currentStep, 
  totalSteps, 
  steps, 
  showProgress = true,
  showBack = false,
  title
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Header showBack={showBack} title={title} />
      
      <div className="container mx-auto px-4 max-w-md">
        {showProgress && (
          <ProgressBar 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
            steps={steps}
          />
        )}
        
        <div className="animate-fade-in pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
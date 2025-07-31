interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const ProgressBar = ({ currentStep, totalSteps, steps }: ProgressBarProps) => {
  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 pb-6 mb-8">
      <div className="pt-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              {steps[currentStep - 1]}
            </h2>
            <p className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {Math.round((currentStep / totalSteps) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Complete
            </p>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="relative">
          {/* Background line */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-border"></div>
          
          {/* Progress line */}
          <div 
            className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out"
            style={{ 
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` 
            }}
          ></div>
          
          {/* Step circles */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              const isUpcoming = stepNumber > currentStep;
              
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center"
                >
                  {/* Circle */}
                  <div className={`
                    relative w-8 h-8 rounded-full border-2 flex items-center justify-center
                    transition-all duration-300 ease-out
                    ${isCompleted 
                      ? 'bg-primary border-primary shadow-md scale-100' 
                      : isCurrent 
                        ? 'bg-primary border-primary shadow-lg scale-105' 
                        : 'bg-background border-border hover:border-primary/30'
                    }
                  `}>
                    {isCompleted ? (
                      <svg 
                        className="w-3.5 h-3.5 text-primary-foreground" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2.5} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                    ) : (
                      <span className={`
                        text-xs font-bold
                        ${isCurrent 
                          ? 'text-primary-foreground' 
                          : 'text-muted-foreground'
                        }
                      `}>
                        {stepNumber}
                      </span>
                    )}
                    
                    {/* Pulse animation for current step */}
                    {isCurrent && (
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                    )}
                  </div>
                  
                  {/* Step label */}
                  <div className="mt-2 text-center max-w-[60px]">
                    <p className={`
                      text-xs font-medium leading-tight
                      ${isCurrent 
                        ? 'text-primary' 
                        : isCompleted 
                          ? 'text-foreground' 
                          : 'text-muted-foreground'
                      }
                    `}>
                      {step}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
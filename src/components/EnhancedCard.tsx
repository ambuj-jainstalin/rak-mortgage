import { ReactNode } from "react";
import { Card as BaseCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EnhancedCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "elevated" | "gradient";
  animation?: boolean;
}

const EnhancedCard = ({ 
  children, 
  className, 
  variant = "default",
  animation = true 
}: EnhancedCardProps) => {
  const variants = {
    default: "bg-card border-border shadow-soft rounded-lg",
    glass: "bg-card/80 backdrop-blur-sm border-border/50 shadow-glass rounded-lg",
    elevated: "bg-card border-border shadow-elevated hover:shadow-lg transition-shadow duration-300 rounded-lg",
    gradient: "bg-gradient-to-br from-card via-card to-card/95 border-border shadow-elevated rounded-lg"
  };

  return (
    <BaseCard 
      className={cn(
        "transition-all duration-300 ease-out",
        variants[variant],
        animation && "hover:scale-[1.01] hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </BaseCard>
  );
};

export default EnhancedCard;
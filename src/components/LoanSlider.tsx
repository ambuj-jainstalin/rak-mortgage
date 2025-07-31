import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface LoanSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
}

const LoanSlider = ({ label, value, min, max, step, onChange, format }: LoanSliderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-foreground font-medium">{label}</Label>
        <span className="text-xl font-bold text-primary">{format(value)}</span>
      </div>
      
      <div className="px-3">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={min}
          max={max}
          step={step}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
};

export default LoanSlider;
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Building, Home } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const PropertySelection = () => {
  const navigate = useNavigate();
  const [selectedBuilder, setSelectedBuilder] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [purchaseType, setPurchaseType] = useState("resale");
  
  // Page progress tracking
  const currentPageStep = 4;
  const totalSteps = 6;
  const steps = ["Login", "Application", "KYC", "Property", "Loan", "Offer"];

  const builders = [
    "Emaar Properties",
    "Dubai Properties",
    "Nakheel",
    "Damac Properties",
    "Meraas",
    "Sobha Realty"
  ];

  const properties = selectedBuilder ? [
    "Downtown Dubai",
    "Dubai Marina", 
    "Business Bay",
    "Jumeirah Beach Residence",
    "Dubai Hills Estate",
    "City Walk"
  ] : [];

  const propertyTypes = ["Apartment", "Villa"];

  return (
    <PageLayout
      currentStep={currentPageStep}
      totalSteps={totalSteps}
      steps={steps}
      showBack={true}
      title="Property"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Property Selection
        </h1>
        <p className="text-muted-foreground">
          Choose your dream property details
        </p>
      </div>

        <Card className="p-6 shadow-sm border-border mb-6">
          <div className="space-y-6">
            {/* Purchase Type Toggle */}
            <div>
              <Label className="text-foreground font-medium mb-3 block">Purchase Type</Label>
              <div className="grid grid-cols-3 border border-border rounded-none overflow-hidden">
                <button
                  onClick={() => setPurchaseType("resale")}
                  className={`py-3 px-4 text-center font-medium transition-colors ${
                    purchaseType === "resale" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  Resale
                </button>
                <button
                  onClick={() => setPurchaseType("fresh")}
                  className={`py-3 px-4 text-center font-medium transition-colors ${
                    purchaseType === "new" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  New Sale
                </button>
                <button
                  onClick={() => setPurchaseType("offplan")}
                  className={`py-3 px-4 text-center font-medium transition-colors ${
                    purchaseType === "offplan" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  Offplan
                </button>
              </div>
            </div>

            {/* Builder Selection */}
            <div>
              <Label className="text-foreground font-medium">Developer/Builder</Label>
              <Select value={selectedBuilder} onValueChange={setSelectedBuilder}>
                <SelectTrigger className="mt-1 h-12">
                  <SelectValue placeholder="Select developer" />
                </SelectTrigger>
                <SelectContent>
                  {builders.map((builder) => (
                    <SelectItem key={builder} value={builder}>
                      {builder}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Property/Location Selection */}
            <div>
              <Label className="text-foreground font-medium">Property/Location</Label>
              <Select 
                value={selectedProperty} 
                onValueChange={setSelectedProperty}
                disabled={!selectedBuilder}
              >
                <SelectTrigger className="mt-1 h-12">
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem key={property} value={property}>
                      {property}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Property Type */}
            <div>
              <Label className="text-foreground font-medium mb-3 block">Property Type</Label>
              <div className="grid grid-cols-2 gap-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`p-4 border border-border text-center transition-colors ${
                      selectedType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      {type === "Villa" || type === "Townhouse" ? (
                        <Home className="h-6 w-6" />
                      ) : (
                        <Building className="h-6 w-6" />
                      )}
                      <span className="text-sm font-medium">{type}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Selection Summary */}
        {(selectedBuilder || selectedProperty || selectedType) && (
          <Card className="p-4 shadow-sm border-border mb-6">
            <h3 className="font-semibold text-foreground mb-3">Selection Summary</h3>
            <div className="space-y-2">
              {selectedBuilder && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Developer:</span>
                  <Badge variant="outline">{selectedBuilder}</Badge>
                </div>
              )}
              {selectedProperty && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Location:</span>
                  <Badge variant="outline">{selectedProperty}</Badge>
                </div>
              )}
              {selectedType && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">Type:</span>
                  <Badge variant="outline">{selectedType}</Badge>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Purchase:</span>
                <Badge variant="outline">{purchaseType}</Badge>
              </div>
            </div>
          </Card>
        )}

        <Button 
          size="lg" 
          className="w-full h-14 font-semibold"
          disabled={!selectedBuilder || !selectedProperty || !selectedType}
          onClick={() => navigate("/property-value")}
        >
          Continue to Loan Calculator
        </Button>
    </PageLayout>
  );
};

export default PropertySelection;
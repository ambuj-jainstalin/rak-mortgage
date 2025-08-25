import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ApplicationData {
  title: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dob: string;
  employer: string;
  nationality: string;
  occupationType: string;
  residentStatus: string;
  income: string;
  aecbScore: string;
  propertyValue: string;
  previousMortgage: string;
  propertyLocation: string;
  propertyType: string;
  relationshipType: string;
  rateType: string;
  productType: string;
  loanType: string;
  loanAmount: string;
  outstandingAmount: string;
  equityAmount: string;
}

interface ApplicationContextType {
  applicationData: ApplicationData;
  updateApplicationData: (data: Partial<ApplicationData>) => void;
  resetApplicationData: () => void;
}

const defaultApplicationData: ApplicationData = {
  title: "Mr",
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  dob: "",
  employer: "",
  nationality: "UAE",
  occupationType: "salaried",
  residentStatus: "resident",
  income: "",
  aecbScore: "750",
  propertyValue: "",
  previousMortgage: "no",
  propertyLocation: "Dubai",
  propertyType: "apartment",
  relationshipType: "personal",
  rateType: "fixed",
  productType: "standard",
  loanType: "purchase",
  loanAmount: "",
  outstandingAmount: "0",
  equityAmount: ""
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplicationContext must be used within an ApplicationProvider');
  }
  return context;
};

interface ApplicationProviderProps {
  children: ReactNode;
}

export const ApplicationProvider: React.FC<ApplicationProviderProps> = ({ children }) => {
  const [applicationData, setApplicationData] = useState<ApplicationData>(defaultApplicationData);

  const updateApplicationData = (data: Partial<ApplicationData>) => {
    setApplicationData(prev => ({ ...prev, ...data }));
  };

  const resetApplicationData = () => {
    setApplicationData(defaultApplicationData);
  };

  return (
    <ApplicationContext.Provider value={{
      applicationData,
      updateApplicationData,
      resetApplicationData
    }}>
      {children}
    </ApplicationContext.Provider>
  );
}; 
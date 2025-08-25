// API service for external integrations

export interface LeadData {
  Broker_Name: string;
  Partner_Name: string;
  Partner_RM: string;
  Client_RM: string;
  Product_RM: string;
  Source_Type: string;
  Source_Category: string;
  Type_Of_Information: string;
  Details: string;
  Title: string;
  First_Name: string;
  Last_Name: string;
  Mobile_No: string;
  Email_Id: string;
  Select_Input_Type: string;
  DOB: string;
  Employer: string;
  Nationality: string;
  Occupation_Type: string;
  Resident_Status: string;
  Income: string;
  Document_Type: string;
  AECB_Score: string;
  Property_Value: string;
  Previous_Mortgage: string;
  Property_Location: string;
  Property_Type: string;
  Type_Of_Loan: string;
  Loan_Amount: string;
  Outstanding_Amount: string;
  Equity_Amount: string;
  Comment: string;
}

export const submitLeadToExternalAPI = async (leadData: LeadData): Promise<any> => {
  try {
    // Call our backend endpoint instead of external API directly
    const response = await fetch('http://localhost:3001/api/submit-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([leadData]),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting lead to external API:', error);
    throw error;
  }
};

// Helper function to create lead data from application form data
export const createLeadDataFromApplication = (applicationData: any): LeadData => {
  console.log('Creating lead data from application data:', applicationData);
  
  const leadData = {
    Broker_Name: "RAK Bank UAE",
    Partner_Name: "rakBankDiy",
    Partner_RM: "rakbankdiy@perfios.com",
    Client_RM: "rakrm@perfios.com",
    Product_RM: "",
    Source_Type: "referralPartner",
    Source_Category: "company",
    Type_Of_Information: "email",
    Details: "some details",
    Title: "Mr", // Hardcoded as per requirements
    First_Name: applicationData.firstName || "url test", // From UAE Pass
    Last_Name: "", // Blank as per requirements
    Mobile_No: applicationData.mobile ? applicationData.mobile.replace(/(\d{3})(\d+)/, '$1-$2') : "973-999999999", // From UAE Pass with hyphen
    Email_Id: applicationData.email || "", // From UAE Pass
    Select_Input_Type: "mobileNumber",
    DOB: "20/09/1991", // Hardcoded as per requirements
    Employer: applicationData.employer || "test & test",
    Nationality: applicationData.nationality || "UAE", // From UAE Pass
    Occupation_Type: applicationData.occupationType || "salaried",
    Resident_Status: "resident", // Hardcoded as per requirements
    Income: applicationData.income || "125",
    Document_Type: "",
    AECB_Score: "750", // Hardcoded as per requirements
    Property_Value: applicationData.propertyValue || "100000",
    Previous_Mortgage: "", // Blank as per requirements
    Property_Location: applicationData.propertyLocation || "dubai",
    Property_Type: applicationData.propertyType || "villa",
    Type_Of_Loan: "offplan", // Hardcoded as per requirements
    Loan_Amount: applicationData.loanAmount || "5000000",
    Outstanding_Amount: "", // Blank as per requirements
    Equity_Amount: "", // Blank as per requirements
    Comment: "Pre Approval Loan"
  };
  
  console.log('Generated lead data:', leadData);
  return leadData;
};

export const updateLeadStatus = async (leadId: string): Promise<any> => {
  try {
    // Call our backend endpoint for status update with leadId in URL
    const response = await fetch(`http://localhost:3001/api/update-lead-status/${leadId}/update-lead-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scheduleNextAction: false,
        statusToUpdate: "PRE_APPROVED",
        stageToUpdate: "PRE_APPROVAL",
        ownerToUpdate: "RM",
        eventCreateRequest: {},
        leadsAddCommentRequest: {
          commentDetails: {
            comment: "Update check",
            userName: "rakrm@perfios.com",
            userType: "broker",
            organisation: "rakBankUae",
            documentIds: {}
          }
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating lead status:', error);
    throw error;
  }
}; 
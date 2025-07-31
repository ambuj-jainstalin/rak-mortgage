# API Integration Documentation

## Overview
This document describes the integration of the external lead submission API into the RAK Mortgage application.

## API Endpoint
- **URL**: `https://switch-uat.perfios.com/dashboardsdk/api/pcg/dashboard/v1/teqnai/broker/rakBankUae/external/leads/add`
- **Method**: POST
- **Content-Type**: application/json

## Headers
- `X-Client-ID`: switch_mobile_app
- `X-Signature`: pYSfB1yzRQN3JFpq3RcEf4tEKTDtl5ER
- `X-Timestamp`: Current timestamp in milliseconds
- `Content-Type`: application/json

## Implementation Details

### Files Modified/Created

1. **`src/lib/api.ts`** - API service functions
   - `submitLeadToExternalAPI()` - Main function to submit lead data
   - `createLeadDataFromApplication()` - Helper to format application data
   - `LeadData` interface - TypeScript interface for lead data structure

2. **`src/contexts/ApplicationContext.tsx`** - Application state management
   - Manages application data across the entire app
   - Provides context for sharing data between components

3. **`src/pages/Offer.tsx`** - Integration point
   - Added API call when user accepts the offer
   - Added loading states and error handling
   - Added toast notifications for user feedback

4. **`src/App.tsx`** - Added ApplicationProvider wrapper

5. **`src/pages/Application.tsx`** - Updated to use context
   - Form data is now saved to the application context

### Flow
1. User fills out application form
2. Data is stored in ApplicationContext
3. User reaches offer page and reviews terms
4. When user clicks "Accept Offer":
   - Application data is validated
   - Data is formatted for the external API
   - API call is made with proper headers
   - Success/error feedback is shown to user
   - User is redirected to success page

### Error Handling
- Network errors are caught and displayed to user
- Missing required fields are validated before API call
- Loading states prevent multiple submissions
- Toast notifications provide user feedback

### Data Mapping
The application form data is mapped to the external API format:
- Personal information (name, contact, etc.)
- Financial information (income, employment)
- Property information (value, location, type)
- Loan details (amount, type, etc.)

## Testing
To test the integration:
1. Fill out the application form
2. Navigate through the flow to the offer page
3. Click "Accept Offer"
4. Check browser console for API response
5. Verify toast notifications appear

## Security Notes
- API credentials are currently hardcoded (should be moved to environment variables in production)
- Timestamp is generated client-side (should be validated server-side in production)
- Consider implementing rate limiting and additional validation

## Future Improvements
- Move API credentials to environment variables
- Add server-side validation
- Implement retry logic for failed requests
- Add more comprehensive error handling
- Consider implementing webhook callbacks for status updates 
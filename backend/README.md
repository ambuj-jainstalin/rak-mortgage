# UAE Pass OAuth Backend

A Flask-based backend service to handle UAE Pass OAuth authentication flow.

## Features

- UAE Pass OAuth 2.0 authorization code flow
- Token exchange endpoint
- Callback handling
- User information retrieval
- CORS support for frontend integration

## Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment variables (optional):**
   Create a `.env` file in the backend directory:
   ```env
   FLASK_ENV=development
   PORT=5000
   ```

3. **Run the backend:**
   ```bash
   python app.py
   ```

The server will start on `http://localhost:3001`

## API Endpoints

### 1. Home
- **GET** `/`
- Returns server status

### 2. Generate Auth URL
- **GET** `/auth/uae-pass/url`
- Generates UAE Pass authorization URL
- Response: `{"auth_url": "...", "success": true}`

### 3. OAuth Callback
- **GET** `/callback`
- Handles OAuth callback from UAE Pass
- Redirects to frontend with success/error status

### 4. Token Exchange
- **POST** `/auth/token`
- Exchanges authorization code for access token
- Body: `{"code": "authorization_code"}`
- Response: `{"access_token": "...", "success": true}`

### 5. User Information
- **GET** `/auth/user-info`
- Gets user information using access token
- Headers: `Authorization: Bearer <access_token>`
- Response: `{"user": {...}, "success": true}`

## OAuth Flow

1. Frontend calls `/auth/uae-pass/url` to get authorization URL
2. User is redirected to UAE Pass for authentication
3. UAE Pass redirects back to `/callback` with authorization code
4. Backend exchanges code for access token
5. Backend redirects to frontend with token or error
6. Frontend can use token to call `/auth/user-info`

## Configuration

The UAE Pass OAuth configuration is defined in the `UAE_PASS_CONFIG` object:

```python
UAE_PASS_CONFIG = {
    "auth_url": "https://stg-id.uaepass.ae/idshub/authorize",
    "token_url": "https://stg-id.uaepass.ae/idshub/token",
    "client_id": "sandbox_stage",
    "client_secret": "sandbox_stage",
    "redirect_uri": "http://localhost:3001/callback",
    "scope": "urn:uae:digitalid:profile:general",
    "state": "test123",
    "acr_values": "urn:safelayer:tws:policies:authentication:level:low"
}
```

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative frontend port)

## Error Handling

All endpoints include proper error handling and logging. Errors are returned in the format:
```json
{
    "error": "Error message",
    "success": false
}
```

## Security Notes

- State parameter validation prevents CSRF attacks
- All sensitive operations are logged
- Token exchange uses proper content-type headers
- CORS is configured for specific origins only 
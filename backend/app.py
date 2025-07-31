from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:8080","http://192.168.1.104:8080"])  # Allow frontend origins

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# UAE Pass OAuth Configuration
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

@app.route('/')
def home():
    """Home endpoint"""
    return jsonify({"message": "UAE Pass OAuth Backend", "status": "running"})

@app.route('/auth/uae-pass/url', methods=['GET'])
def get_auth_url():
    """Generate UAE Pass authorization URL"""
    try:
        auth_url = UAE_PASS_CONFIG["auth_url"]
        params = {
            'response_type': 'code',
            'client_id': UAE_PASS_CONFIG["client_id"],
            'redirect_uri': UAE_PASS_CONFIG["redirect_uri"],
            'scope': UAE_PASS_CONFIG["scope"],
            'state': UAE_PASS_CONFIG["state"],
            'acr_values': UAE_PASS_CONFIG["acr_values"]
        }
        
        # Build URL with parameters
        from urllib.parse import urlencode
        full_url = f"{auth_url}?{urlencode(params)}"
        
        logger.info(f"Generated auth URL: {full_url}")
        return jsonify({
            "auth_url": full_url,
            "success": True
        })
    except Exception as e:
        logger.error(f"Error generating auth URL: {str(e)}")
        return jsonify({
            "error": "Failed to generate authorization URL",
            "success": False
        }), 500

@app.route('/callback')
def oauth_callback():
    """Handle OAuth callback from UAE Pass"""
    try:
        # Get authorization code and state from URL parameters
        code = request.args.get('code')
        state = request.args.get('state')
        
        logger.info(f"Received callback - Code: {code[:10]}..., State: {state}")
        
        # Validate state parameter
        if state != UAE_PASS_CONFIG["state"]:
            logger.error(f"Invalid state parameter: {state}")
            return jsonify({
                "error": "Invalid state parameter",
                "success": False
            }), 400
        
        if not code:
            logger.error("No authorization code received")
            return jsonify({
                "error": "No authorization code received",
                "success": False
            }), 400
        
        # Exchange code for token
        token_data = exchange_code_for_token(code)
        
        if token_data.get("success"):
            # Redirect to frontend with success
            frontend_url = "http://localhost:8080/login?auth=success&token=" + token_data.get("access_token", "")
            return redirect(frontend_url)
        else:
            # Redirect to frontend with error
            frontend_url = f"http://localhost:8080/login?auth=error&message={token_data.get('error', 'Authentication failed')}"
            return redirect(frontend_url)
            
    except Exception as e:
        logger.error(f"Error in callback: {str(e)}")
        frontend_url = f"http://localhost:8080/login?auth=error&message=Callback processing failed"
        return redirect(frontend_url)

@app.route('/auth/token', methods=['POST'])
def exchange_token():
    """Exchange authorization code for access token"""
    try:
        data = request.get_json()
        code = data.get('code')
        
        if not code:
            return jsonify({
                "error": "Authorization code is required",
                "success": False
            }), 400
        
        token_data = exchange_code_for_token(code)
        return jsonify(token_data)
        
    except Exception as e:
        logger.error(f"Error exchanging token: {str(e)}")
        return jsonify({
            "error": "Token exchange failed",
            "success": False
        }), 500

def exchange_code_for_token(code):
    """Exchange authorization code for access token"""
    try:
        logger.info(f"Exchanging code for token: {code[:10]}...")
        
        # Prepare token exchange request
        token_data = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': UAE_PASS_CONFIG["redirect_uri"],
            'client_id': UAE_PASS_CONFIG["client_id"],
            'client_secret': UAE_PASS_CONFIG["client_secret"]
        }
        
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        
        # Make token exchange request
        response = requests.post(
            UAE_PASS_CONFIG["token_url"],
            data=token_data,
            headers=headers,
            timeout=30
        )
        
        logger.info(f"Token exchange response status: {response.status_code}")
        
        if response.status_code == 200:
            token_response = response.json()
            logger.info("Token exchange successful")
            
            return {
                "success": True,
                "access_token": token_response.get("access_token"),
                "token_type": token_response.get("token_type"),
                "expires_in": token_response.get("expires_in"),
                "refresh_token": token_response.get("refresh_token"),
                "scope": token_response.get("scope")
            }
        else:
            logger.error(f"Token exchange failed: {response.status_code} - {response.text}")
            return {
                "success": False,
                "error": f"Token exchange failed: {response.status_code}",
                "details": response.text
            }
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error during token exchange: {str(e)}")
        return {
            "success": False,
            "error": "Network error during token exchange"
        }
    except Exception as e:
        logger.error(f"Unexpected error during token exchange: {str(e)}")
        return {
            "success": False,
            "error": "Unexpected error during token exchange"
        }

@app.route('/auth/user-info', methods=['GET'])
def get_user_info():
    """Get user information using access token from UAE Pass"""
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({
                "error": "Authorization header required",
                "success": False
            }), 401
        
        access_token = auth_header.split(' ')[1]
        
        # Call UAE Pass userinfo endpoint
        userinfo_url = "https://stg-id.uaepass.ae/idshub/userinfo"
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
        
        logger.info(f"Fetching user info from UAE Pass with token: {access_token[:10]}...")
        
        response = requests.get(
            userinfo_url,
            headers=headers,
            timeout=30
        )
        
        logger.info(f"UAE Pass userinfo response status: {response.status_code}")
        
        if response.status_code == 200:
            user_data = response.json()
            logger.info("Successfully fetched user info from UAE Pass")
            
            return jsonify({
                "success": True,
                "user": user_data
            })
        else:
            logger.error(f"UAE Pass userinfo failed: {response.status_code} - {response.text}")
            return jsonify({
                "error": f"Failed to fetch user info from UAE Pass: {response.status_code}",
                "details": response.text,
                "success": False
            }), response.status_code
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error getting user info: {str(e)}")
        return jsonify({
            "error": "Network error while fetching user information",
            "success": False
        }), 500
    except Exception as e:
        logger.error(f"Error getting user info: {str(e)}")
        return jsonify({
            "error": "Failed to get user information",
            "success": False
        }), 500


@app.route('/api/submit-lead', methods=['POST'])
def submit_lead():
    """Submit lead data to external API"""
    try:
        import time
        
        # Get lead data from request
        lead_data = request.json
        
        if not lead_data:
            return jsonify({
                "error": "No lead data provided",
                "success": False
            }), 400
        
        # Prepare headers for external API
        timestamp = str(int(time.time() * 1000))  # Current timestamp in milliseconds
        
        headers = {
            'X-Client-ID': 'switch_mobile_app',
            'X-Signature': 'pYSfB1yzRQN3JFpq3RcEf4tEKTDtl5ER',
            'X-Timestamp': timestamp,
            'Content-Type': 'application/json',
        }
        
        # Make request to external API
        external_api_url = 'https://switch-uat.perfios.com/dashboardsdk/api/pcg/dashboard/v1/teqnai/broker/rakBankUae/external/leads/add'
        
        logger.info(f"Submitting lead to external API: {external_api_url}")
        logger.info(f"Lead data: {lead_data}")
        
        response = requests.post(
            external_api_url,
            json=lead_data,
            headers=headers,
            timeout=30
        )
        
        logger.info(f"External API response status: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            logger.info("Successfully submitted lead to external API")
            return jsonify({
                "success": True,
                "data": response_data
            })
        else:
            logger.error(f"External API error: {response.status_code} - {response.text}")
            return jsonify({
                "error": f"External API error: {response.status_code}",
                "details": response.text,
                "success": False
            }), response.status_code
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error submitting lead: {str(e)}")
        return jsonify({
            "error": "Network error while submitting lead",
            "success": False
        }), 500
    except Exception as e:
        logger.error(f"Unexpected error submitting lead: {str(e)}")
        return jsonify({
            "error": "Unexpected error while submitting lead",
            "success": False
        }), 500

@app.route('/api/update-lead-status/<lead_id>/update-lead-status', methods=['POST'])
def update_lead_status(lead_id):
    """Update lead status in external API"""
    try:
        # Get request data
        request_data = request.json
        
        if not request_data:
            return jsonify({
                "error": "Request data is required",
                "success": False
            }), 400
        
        # Prepare headers for external API
        headers = {
            'Content-Type': 'application/json',
        }
        
        # Make request to external API with leadId in URL
        external_api_url = f'https://switch-uat.perfios.com/dashboardsdk/api/pcg/dashboard/v1/teqnai/leads/{lead_id}/external/nextActionDate/status/update'
        
        logger.info(f"Updating lead status: {external_api_url}")
        logger.info(f"Request data: {request_data}")
        
        response = requests.post(
            external_api_url,
            json=request_data,
            headers=headers,
            timeout=30
        )
        
        logger.info(f"External API response status: {response.status_code}")
        
        if response.status_code == 200:
            response_data = response.json()
            logger.info("Successfully updated lead status")
            return jsonify({
                "success": True,
                "data": response_data
            })
        else:
            logger.error(f"External API error: {response.status_code} - {response.text}")
            return jsonify({
                "error": f"External API error: {response.status_code}",
                "details": response.text,
                "success": False
            }), response.status_code
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error updating lead status: {str(e)}")
        return jsonify({
            "error": "Network error while updating lead status",
            "success": False
        }), 500
    except Exception as e:
        logger.error(f"Unexpected error updating lead status: {str(e)}")
        return jsonify({
            "error": "Unexpected error while updating lead status",
            "success": False
        }), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3001))  # Changed default port to 3001
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    logger.info(f"Starting UAE Pass OAuth Backend on port {port}")
    app.run(host='0.0.0.0', port=port, debug=debug) 
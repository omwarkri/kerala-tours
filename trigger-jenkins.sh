#!/bin/bash
# Jenkins Pipeline Trigger Script

JENKINS_URL="http://localhost:8080"
JOB_NAME="kerala-tours"

echo "🚀 Triggering Jenkins pipeline for: $JOB_NAME"

# Get CSRF token (crumb)
CRUMB=$(curl -s "$JENKINS_URL/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)")

if [ -z "$CRUMB" ]; then
    echo "❌ Failed to get Jenkins CSRF token"
    echo "Trying alternative method..."
    
    # Try direct trigger without crumb
    curl -X POST "$JENKINS_URL/job/$JOB_NAME/build" \
        -H "Content-Type: application/json" \
        -v 2>&1 | head -20
else
    echo "✅ CSRF Token obtained: $CRUMB"
    
    # Trigger build with crumb
    curl -X POST "$JENKINS_URL/job/$JOB_NAME/build" \
        -H "$CRUMB" \
        -v 2>&1 | head -20
fi

echo ""
echo "Build trigger request sent!"
echo "View status at: $JENKINS_URL/job/$JOB_NAME"

#!/bin/bash

echo "🚀 Travels Toors Application Deployment Script"
echo "=============================================="

# Check if Node exists
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js found: $(node --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm ci

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed successfully"

# Build application
echo ""
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build application"
    exit 1
fi

echo "✓ Application built successfully"
echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 To run the application:"
echo "   npm start              # Development mode on port 3000"
echo "   npm run serve          # Production mode on port 3000"
echo ""
echo "Build output is in: ./build/"
  --image-ids imageTag="$IMAGE_TAG" \
  --region "$AWS_REGION" > /dev/null

# Step 3: Check if task definition exists
if aws ecs describe-task-definition \
    --task-definition "$TASK_DEFINITION_NAME" \
    --region "$AWS_REGION" > /dev/null 2>&1; then

  echo "✅ Task exists → creating new revision"

  TASK_JSON=$(aws ecs describe-task-definition \
    --task-definition "$TASK_DEFINITION_NAME" \
    --region "$AWS_REGION")

  NEW_TASK_DEF=$(echo "$TASK_JSON" | python3 -c "
import json,sys
task=json.load(sys.stdin)['taskDefinition']
for c in task['containerDefinitions']:
    if c['name']=='$CONTAINER_NAME':
        c['image']='$FULL_IMAGE_NAME'
for k in ['taskDefinitionArn','revision','status','requiresAttributes','compatibilities','registeredAt','registeredBy']:
    task.pop(k,None)
print(json.dumps(task))
")

  TASK_ARN=$(aws ecs register-task-definition \
    --cli-input-json "$NEW_TASK_DEF" \
    --region "$AWS_REGION" \
    --query 'taskDefinition.taskDefinitionArn' \
    --output text)

else
  echo "⚠️ Task not found → creating new"

  cat <<EOF > task-def.json
{
  "family": "${TASK_DEFINITION_NAME}",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "${EXECUTION_ROLE_ARN}",
  "containerDefinitions": [
    {
      "name": "${CONTAINER_NAME}",
      "image": "${FULL_IMAGE_NAME}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ]
    }
  ]
}
EOF

  TASK_ARN=$(aws ecs register-task-definition \
    --region "$AWS_REGION" \
    --cli-input-json file://task-def.json \
    --query 'taskDefinition.taskDefinitionArn' \
    --output text)
fi

echo "📦 Task ARN: $TASK_ARN"

# Step 4: Update service
aws ecs update-service \
  --cluster "$ECS_CLUSTER_NAME" \
  --service "$ECS_SERVICE_NAME" \
  --task-definition "$TASK_ARN" \
  --region "$AWS_REGION" \
  --force-new-deployment > /dev/null

# Step 5: Wait for deployment
aws ecs wait services-stable \
  --cluster "$ECS_CLUSTER_NAME" \
  --services "$ECS_SERVICE_NAME" \
  --region "$AWS_REGION"

echo "🎉 Deployment successful"
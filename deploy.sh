#!/bin/bash

set -euo pipefail

AWS_REGION="ap-south-1"
AWS_ACCOUNT_ID="782696281574"
ECR_REPO_NAME="kerala-toors"
IMAGE_TAG="${BUILD_NUMBER:-latest}"

ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
FULL_IMAGE_NAME="${ECR_REGISTRY}/${ECR_REPO_NAME}:${IMAGE_TAG}"

ECS_CLUSTER_NAME="kerala-toors-cluster"
ECS_SERVICE_NAME="kerala-toors-service"
TASK_DEFINITION_NAME="kerala-toors"
CONTAINER_NAME="kerala-toors"

# ✅ REQUIRED (fixes your error)
EXECUTION_ROLE_ARN="arn:aws:iam::782696281574:role/ecsTaskExecutionRole"

echo "🚀 Starting deployment"
echo "Image: ${FULL_IMAGE_NAME}"

# Step 1: ECR Login
aws ecr get-login-password --region "$AWS_REGION" \
| docker login --username AWS --password-stdin "$ECR_REGISTRY"

# Step 2: Verify image exists
aws ecr describe-images \
  --repository-name "$ECR_REPO_NAME" \
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
#!/bin/bash

# Exit on any error
set -e

# ─── Configuration ───────────────────────────────────────────
AWS_REGION="ap-south-1"
AWS_ACCOUNT_ID="782696281574"
ECR_REPO_NAME="kerala-toors"
IMAGE_TAG="${BUILD_NUMBER}"
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
FULL_IMAGE_NAME="${ECR_REGISTRY}/${ECR_REPO_NAME}:${IMAGE_TAG}"

# ─── These you need to set to your actual ECS names ──────────
ECS_CLUSTER_NAME="kerala-toors-cluster"       # ← your ECS cluster name
ECS_SERVICE_NAME="kerala-toors-service"       # ← your ECS service name
TASK_DEFINITION_NAME="kerala-toors-task"      # ← your task definition name
CONTAINER_NAME="kerala-toors"                 # ← container name inside task definition

# ─────────────────────────────────────────────────────────────

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Starting Deployment"
echo "   Image : $FULL_IMAGE_NAME"
echo "   Cluster: $ECS_CLUSTER_NAME"
echo "   Service: $ECS_SERVICE_NAME"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ─── Step 1: ECR Login ────────────────────────────────────────
echo ""
echo "🔐 Step 1: Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | \
    docker login --username AWS --password-stdin $ECR_REGISTRY
echo "✅ ECR login successful"

# ─── Step 2: Verify Image Exists in ECR ──────────────────────
echo ""
echo "🔍 Step 2: Verifying image exists in ECR..."
aws ecr describe-images \
    --repository-name $ECR_REPO_NAME \
    --image-ids imageTag=$IMAGE_TAG \
    --region $AWS_REGION > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Image found: $FULL_IMAGE_NAME"
else
    echo "❌ Image not found in ECR! Build stage may have failed."
    exit 1
fi

# ─── Step 3: Get Current Task Definition ─────────────────────
echo ""
echo "📋 Step 3: Fetching current task definition..."
TASK_DEFINITION=$(aws ecs describe-task-definition \
    --task-definition $TASK_DEFINITION_NAME \
    --region $AWS_REGION)

echo "✅ Task definition fetched"

# ─── Step 4: Create New Task Definition With Updated Image ───
echo ""
echo "📝 Step 4: Creating new task definition revision..."
NEW_TASK_DEFINITION=$(echo $TASK_DEFINITION | python3 -c "
import json, sys

task = json.load(sys.stdin)['taskDefinition']

# Update container image
for container in task['containerDefinitions']:
    if container['name'] == '${CONTAINER_NAME}':
        container['image'] = '${FULL_IMAGE_NAME}'
        print(f'  → Updated container: {container[\"name\"]}', flush=True)

# Remove fields that cannot be reregistered
for field in ['taskDefinitionArn','revision','status','requiresAttributes',
              'compatibilities','registeredAt','registeredBy']:
    task.pop(field, None)

print(json.dumps(task))
" 2>/dev/null | tail -1)

# Register the new task definition
NEW_TASK_ARN=$(aws ecs register-task-definition \
    --region $AWS_REGION \
    --cli-input-json "$NEW_TASK_DEFINITION" \
    --query 'taskDefinition.taskDefinitionArn' \
    --output text)

echo "✅ New task definition: $NEW_TASK_ARN"

# ─── Step 5: Update ECS Service ──────────────────────────────
echo ""
echo "🔄 Step 5: Updating ECS service with new task definition..."
aws ecs update-service \
    --cluster $ECS_CLUSTER_NAME \
    --service $ECS_SERVICE_NAME \
    --task-definition $NEW_TASK_ARN \
    --region $AWS_REGION \
    --force-new-deployment > /dev/null

echo "✅ ECS service update triggered"

# ─── Step 6: Wait For Deployment To Complete ─────────────────
echo ""
echo "⏳ Step 6: Waiting for service to stabilize (max 5 mins)..."
aws ecs wait services-stable \
    --cluster $ECS_CLUSTER_NAME \
    --services $ECS_SERVICE_NAME \
    --region $AWS_REGION

echo "✅ Service is stable!"

# ─── Step 7: Verify Deployment ───────────────────────────────
echo ""
echo "🔍 Step 7: Verifying deployment..."
RUNNING_COUNT=$(aws ecs describe-services \
    --cluster $ECS_CLUSTER_NAME \
    --services $ECS_SERVICE_NAME \
    --region $AWS_REGION \
    --query 'services[0].runningCount' \
    --output text)

DESIRED_COUNT=$(aws ecs describe-services \
    --cluster $ECS_CLUSTER_NAME \
    --services $ECS_SERVICE_NAME \
    --region $AWS_REGION \
    --query 'services[0].desiredCount' \
    --output text)

echo "   Running tasks : $RUNNING_COUNT"
echo "   Desired tasks : $DESIRED_COUNT"

if [ "$RUNNING_COUNT" == "$DESIRED_COUNT" ]; then
    echo "✅ Deployment verified successfully!"
else
    echo "⚠️  Warning: Running count doesn't match desired count"
fi

# ─── Done ─────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deployment Complete!"
echo "   Image deployed : $FULL_IMAGE_NAME"
echo "   Cluster        : $ECS_CLUSTER_NAME"
echo "   Service        : $ECS_SERVICE_NAME"
echo "   Task ARN       : $NEW_TASK_ARN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

---

## ⚠️ You Must Update These 4 Values

At the top of the file, change these to match your actual AWS setup:

| Variable | What to put |
|----------|-------------|
| `ECS_CLUSTER_NAME` | Your ECS cluster name from AWS Console |
| `ECS_SERVICE_NAME` | Your ECS service name |
| `TASK_DEFINITION_NAME` | Your task definition name |
| `CONTAINER_NAME` | Container name inside your task definition |

---

## Find Your Values in AWS Console
```
AWS Console → ECS → Clusters → your cluster
                             → Services → your service name
                             → Task Definitions → your task name
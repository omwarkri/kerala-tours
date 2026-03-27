#!/bin/bash

set -euo pipefail

AWS_REGION="${AWS_REGION:-ap-south-1}"
AWS_ACCOUNT_ID="${AWS_ACCOUNT_ID:-782696281574}"
ECR_REPO_NAME="${ECR_REPO_NAME:-kerala-toors}"
IMAGE_TAG="${IMAGE_TAG:-${BUILD_NUMBER:-latest}}"
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
FULL_IMAGE_NAME="${ECR_REGISTRY}/${ECR_REPO_NAME}:${IMAGE_TAG}"

ECS_CLUSTER_NAME="${ECS_CLUSTER_NAME:-kerala-toors-cluster}"
ECS_SERVICE_NAME="${ECS_SERVICE_NAME:-kerala-toors-service}"
TASK_DEFINITION_NAME="${TASK_DEFINITION_NAME:-kerala-toors}"
CONTAINER_NAME="${CONTAINER_NAME:-kerala-toors}"

echo "Starting deployment"
echo "Image: ${FULL_IMAGE_NAME}"
echo "Cluster: ${ECS_CLUSTER_NAME}"
echo "Service: ${ECS_SERVICE_NAME}"

echo "Step 1: ECR login"
aws ecr get-login-password --region "${AWS_REGION}" |
    docker login --username AWS --password-stdin "${ECR_REGISTRY}"

echo "Step 2: Verify image exists"
aws ecr describe-images \
    --repository-name "${ECR_REPO_NAME}" \
    --image-ids "imageTag=${IMAGE_TAG}" \
    --region "${AWS_REGION}" > /dev/null

echo "Step 3: Read current task definition"
TASK_DEFINITION=$(aws ecs describe-task-definition \
    --task-definition "${TASK_DEFINITION_NAME}" \
    --region "${AWS_REGION}")

echo "Step 4: Create new task definition revision"
NEW_TASK_DEFINITION=$(echo "${TASK_DEFINITION}" | python3 -c "
import json,sys
task = json.load(sys.stdin)['taskDefinition']
for container in task['containerDefinitions']:
        if container['name'] == '${CONTAINER_NAME}':
                container['image'] = '${FULL_IMAGE_NAME}'
for field in ['taskDefinitionArn','revision','status','requiresAttributes','compatibilities','registeredAt','registeredBy']:
        task.pop(field, None)
print(json.dumps(task))
")

NEW_TASK_ARN=$(aws ecs register-task-definition \
    --region "${AWS_REGION}" \
    --cli-input-json "${NEW_TASK_DEFINITION}" \
    --query 'taskDefinition.taskDefinitionArn' \
    --output text)

echo "Step 5: Update ECS service"
aws ecs update-service \
    --cluster "${ECS_CLUSTER_NAME}" \
    --service "${ECS_SERVICE_NAME}" \
    --task-definition "${NEW_TASK_ARN}" \
    --region "${AWS_REGION}" \
    --force-new-deployment > /dev/null

echo "Step 6: Wait for stabilization"
aws ecs wait services-stable \
    --cluster "${ECS_CLUSTER_NAME}" \
    --services "${ECS_SERVICE_NAME}" \
    --region "${AWS_REGION}"

RUNNING_COUNT=$(aws ecs describe-services \
    --cluster "${ECS_CLUSTER_NAME}" \
    --services "${ECS_SERVICE_NAME}" \
    --region "${AWS_REGION}" \
    --query 'services[0].runningCount' \
    --output text)

DESIRED_COUNT=$(aws ecs describe-services \
    --cluster "${ECS_CLUSTER_NAME}" \
    --services "${ECS_SERVICE_NAME}" \
    --region "${AWS_REGION}" \
    --query 'services[0].desiredCount' \
    --output text)

echo "Running: ${RUNNING_COUNT}, Desired: ${DESIRED_COUNT}"
echo "Deployment complete"
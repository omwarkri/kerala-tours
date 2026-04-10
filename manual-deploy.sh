#!/bin/bash
# Manual Deployment Script for Kerala Tours
# This replicates the Jenkins pipeline steps

set -e

echo "🚀 Kerala Tours Manual Deployment"
echo "=================================="

# Set environment variables
export AWS_DEFAULT_REGION=ap-south-1
DOMAIN_NAME="kerala-tours.co.in"
WWW_DOMAIN="www.kerala-tours.co.in"
IMAGE_TAG="${BUILD_NUMBER:-manual-$(date +%s)}"
ECR_REPO="kerala-tours"
IMAGE="782696281574.dkr.ecr.ap-south-1.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}"

echo "📋 Configuration:"
echo "  Region: $AWS_DEFAULT_REGION"
echo "  Domain: $DOMAIN_NAME"
echo "  Image: $IMAGE"
echo ""

# Step 1: Build Docker image
echo "📦 Step 1: Building Docker image..."
if ! command -v docker >/dev/null 2>&1; then
    echo "❌ Docker not found. Please install Docker."
    exit 1
fi

cd /home/om/travels-Toors
docker build -t travels-toors:latest .

echo "✅ Docker image built successfully"

# Step 2: Tag and push to ECR
echo "🔄 Step 2: Pushing to ECR..."
aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin 782696281574.dkr.ecr.ap-south-1.amazonaws.com

docker tag travels-toors:latest "$IMAGE"
docker push "$IMAGE"

echo "✅ Image pushed to ECR: $IMAGE"

# Step 3: Update Terraform with new image
echo "🔧 Step 3: Updating Terraform configuration..."
cd terraform/files

# Update the ECS task definition with new image
sed -i "s|image.*kerala-tours:.*|image = \"$IMAGE\"|" ecs.tf

echo "✅ ECS task definition updated"

# Step 4: Import existing resources
echo "📥 Step 4: Importing existing resources..."
bash ./import-existing-resources.sh

# Step 5: Apply Terraform changes
echo "🚀 Step 5: Applying Terraform changes..."
terraform plan -out=tfplan
terraform apply tfplan

echo ""
echo "🎉 Deployment completed successfully!"
echo "🌐 Website should be available at: https://$DOMAIN_NAME"
echo "🔗 ALB DNS: $(terraform output -raw alb_dns_name 2>/dev/null || echo 'Check terraform output')"
echo ""
echo "📊 To check deployment status:"
echo "  aws ecs describe-services --cluster kerala-tours-cluster-v2 --services kerala-tours-service-v2 --region $AWS_DEFAULT_REGION"
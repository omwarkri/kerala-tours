#!/bin/bash

# Environment setup script for ECS deployment

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}Kerala Tours - Environment Setup${NC}\n"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${YELLOW}Installing AWS CLI...${NC}"
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
    rm -rf awscliv2.zip aws/
fi

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    echo -e "${YELLOW}Installing Terraform...${NC}"
    wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
    unzip terraform_1.6.0_linux_amd64.zip
    sudo mv terraform /usr/local/bin/
    rm terraform_1.6.0_linux_amd64.zip
fi

# Check if Ansible is installed
if ! command -v ansible &> /dev/null; then
    echo -e "${YELLOW}Installing Ansible...${NC}"
    sudo apt-get update
    sudo apt-get install -y python3-pip
    pip3 install ansible boto3 botocore
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Installing Docker...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

echo -e "${GREEN}✓ All tools installed successfully!${NC}\n"

# Configure AWS credentials
echo -e "${BLUE}Configuring AWS credentials...${NC}"
read -p "Enter AWS Access Key ID: " aws_access_key
read -sp "Enter AWS Secret Access Key: " aws_secret_key
echo ""
read -p "Enter AWS Default Region (ap-south-1): " aws_region
aws_region=${aws_region:-ap-south-1}

# Create AWS config
mkdir -p ~/.aws
cat > ~/.aws/credentials << EOF
[default]
aws_access_key_id = $aws_access_key
aws_secret_access_key = $aws_secret_key
EOF

cat > ~/.aws/config << EOF
[default]
region = $aws_region
output = json
EOF

chmod 600 ~/.aws/credentials
chmod 600 ~/.aws/config

echo -e "${GREEN}✓ AWS credentials configured!${NC}\n"

# Test AWS connection
echo -e "${BLUE}Testing AWS connection...${NC}"
if aws sts get-caller-identity &> /dev/null; then
    echo -e "${GREEN}✓ AWS connection successful!${NC}\n"
else
    echo -e "${YELLOW}⚠ AWS connection failed. Check your credentials.${NC}\n"
fi

# Verify all tools
echo -e "${BLUE}Verifying tools...${NC}"
echo "AWS CLI: $(aws --version)"
echo "Terraform: $(terraform version | head -1)"
echo "Ansible: $(ansible --version | head -1)"
echo "Docker: $(docker --version)"

echo -e "\n${GREEN}✓ Environment setup complete!${NC}"
echo -e "${BLUE}You can now run: ./deploy.sh${NC}"

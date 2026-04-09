#!/bin/bash

# Jenkins Agent Setup Script for Kerala Tours CI/CD
# This script installs all required tools for the Jenkins pipeline

set -e

echo "🚀 Setting up Jenkins agent for Kerala Tours CI/CD..."

# Update package list
echo "📦 Updating package list..."
sudo apt-get update

# Install base dependencies
echo "📦 Installing required packages..."
sudo apt-get install -y curl unzip gnupg lsb-release ca-certificates

# Install Node.js 18+ and npm
echo "📦 Installing Node.js 18+ and npm..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Docker
echo "🐳 Installing Docker..."
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker jenkins || sudo usermod -aG docker $USER

# Install AWS CLI v2
echo "☁️ Installing AWS CLI v2..."
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
rm -rf awscliv2.zip aws/

# Install Terraform
echo "🔧 Installing Terraform..."
TERRAFORM_VERSION="1.6.8"
curl -fsSL "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip" -o "terraform.zip"
unzip terraform.zip
sudo mv terraform /usr/local/bin/terraform
sudo ln -sf /usr/local/bin/terraform /usr/bin/terraform
rm -f terraform.zip

# Install kubectl
echo "☸️ Installing kubectl..."
KUBECTL_VERSION="v1.28.0"
curl -LO "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
sudo ln -sf /usr/local/bin/kubectl /usr/bin/kubectl
rm -f kubectl

# Install eksctl
echo "☸️ Installing eksctl..."
EKSCTL_VERSION="0.156.0"
curl -sL "https://github.com/weaveworks/eksctl/releases/download/${EKSCTL_VERSION}/eksctl_Linux_amd64.tar.gz" | tar xz
sudo install -o root -g root -m 0755 eksctl /usr/local/bin/eksctl
sudo ln -sf /usr/local/bin/eksctl /usr/bin/eksctl
rm -f eksctl

# Verify installations
echo "✅ Verifying installations..."
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "Docker: $(docker --version)"
echo "AWS CLI: $(aws --version)"
echo "Terraform: $(terraform --version)"
echo "kubectl: $(kubectl version --client --short)"
echo "eksctl: $(eksctl version)"

echo "🎉 Setup complete! Please restart the Jenkins agent for Docker group changes to take effect."
echo ""
echo "Next steps:"
echo "1. Restart Jenkins agent: sudo systemctl restart jenkins"
echo "2. Re-run the Jenkins pipeline"
echo ""
echo "Domain: kerala-tours.co.in"
echo "Region: ap-south-1"
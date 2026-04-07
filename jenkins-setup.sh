#!/bin/bash

# Jenkins Agent Setup Script for Kerala Tours CI/CD
# This script installs all required tools for the Jenkins pipeline

set -e

echo "🚀 Setting up Jenkins agent for Kerala Tours CI/CD..."

# Update package list
echo "📦 Updating package list..."
sudo apt-get update

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

# Install unzip (if not already installed)
sudo apt-get install -y unzip

# Verify installations
echo "✅ Verifying installations..."
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "Docker: $(docker --version)"
echo "AWS CLI: $(aws --version)"
echo "Terraform: $(terraform --version)"

echo "🎉 Setup complete! Please restart the Jenkins agent for Docker group changes to take effect."
echo ""
echo "Next steps:"
echo "1. Restart Jenkins agent: sudo systemctl restart jenkins"
echo "2. Re-run the Jenkins pipeline"
echo ""
echo "Domain: kerala-tours.co.in"
echo "Region: ap-south-1"
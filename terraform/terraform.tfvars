# terraform.tfvars - Configuration file for Terraform

# AWS Configuration
aws_region = "ap-south-1"

# Application Configuration
app_name    = "kerala-toors"
environment = "production"

# Container Configuration
container_port   = 80
container_cpu    = 256  # 0.25 vCPU (valid: 256, 512, 1024, 2048, 4096)
container_memory = 512  # 512 MB (must be compatible with CPU)

# Scaling Configuration
desired_count = 2  # Number of tasks to run (will scale between 2-4)

# Docker Image
docker_image_url = "782696281574.dkr.ecr.ap-south-1.amazonaws.com/kerala-toors:latest"

# Domain Configuration (Update these)
domain_name = "kerala-toors.com"  # Change to your domain

# Common Tags
tags = {
  Project     = "Kerala-Toors"
  Environment = "production"
  ManagedBy   = "Terraform"
  Owner       = "DevOps"
}

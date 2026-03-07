variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "kerala-toors"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "container_port" {
  description = "Container port"
  type        = number
  default     = 80
}

variable "container_cpu" {
  description = "Container CPU units"
  type        = number
  default     = 256
}

variable "container_memory" {
  description = "Container memory in MB"
  type        = number
  default     = 512
}

variable "desired_count" {
  description = "Desired number of tasks"
  type        = number
  default     = 2
}

variable "docker_image_url" {
  description = "Docker image URL"
  type        = string
  default     = "omwarkri123/react-app:latest"
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "kerala-toors.com"
}

variable "certificate_arn" {
  description = "ACM Certificate ARN for HTTPS"
  type        = string
  default     = ""
}

variable "tags" {
  description = "Common tags for all resources"
  type        = map(string)
  default = {
    Project     = "Kerala-Toors"
    Environment = "production"
    ManagedBy   = "Terraform"
  }
}

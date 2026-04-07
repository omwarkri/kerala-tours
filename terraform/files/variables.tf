variable "domain_name" {
  description = "Primary domain name"
  type        = string
  default     = "kerala-tours.co.in"
}

variable "www_domain_name" {
  description = "WWW subdomain"
  type        = string
  default     = "www.kerala-tours.co.in"
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "ecr_image_url" {
  description = "ECR image URL for the Kerala Tours container"
  type        = string
  default     = "782696281574.dkr.ecr.ap-south-1.amazonaws.com/kerala-tours:latest"
}

variable "container_port" {
  description = "Port the container listens on"
  type        = number
  default     = 80
}

variable "task_cpu" {
  description = "ECS task CPU units"
  type        = string
  default     = "256"
}

variable "task_memory" {
  description = "ECS task memory in MB"
  type        = string
  default     = "512"
}

variable "key_pair_name" {
  description = "EC2 Key Pair name for Jenkins SSH access"
  type        = string
  default     = "share-task1"
}

variable "my_ip" {
  description = "Your public IP for SSH access"
  type        = string
}
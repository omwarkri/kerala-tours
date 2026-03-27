variable "aws_region" {
  description = "The AWS region to deploy the resources"
  type        = string
  default     = "ap-south-1"
}

variable "key_name" {
  description = "The name of the AWS key pair to use for SSH access"
  type        = string
}

variable "instance_type" {
  description = "The type of EC2 instance to create"
  type        = string
  default     = "t3.medium"
}

variable "environment" {
  description = "The environment for the deployment (e.g., production, staging)"
  type        = string
  default     = "production"
}
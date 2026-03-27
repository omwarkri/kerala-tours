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

variable "create_ecr_repository" {
  description = "Create ECR repository for the app"
  type        = bool
  default     = true
}

variable "ecr_repository_name" {
  description = "ECR repository name"
  type        = string
  default     = "kerala-toors"
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "kerala-toors.com"
}

variable "create_route53_records" {
  description = "Create Route53 hosted zone and ALB DNS records"
  type        = bool
  default     = false
}

variable "alert_email" {
  description = "Email address for CloudWatch alerts"
  type        = string
  default     = ""
}

variable "create_jenkins_server" {
  description = "Create Jenkins EC2 instance"
  type        = bool
  default     = true
}

variable "jenkins_instance_type" {
  description = "EC2 instance type for Jenkins server"
  type        = string
  default     = "t3.medium"
}

variable "jenkins_key_name" {
  description = "Existing EC2 key pair name for Jenkins instance"
  type        = string
  default     = null
}

variable "jenkins_allowed_ssh_cidrs" {
  description = "CIDR list allowed to SSH into Jenkins"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "jenkins_allowed_ui_cidrs" {
  description = "CIDR list allowed to access Jenkins UI"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

variable "jenkins_admin_username" {
  description = "Bootstrap Jenkins admin username"
  type        = string
  default     = "admin"
}

variable "jenkins_admin_password" {
  description = "Bootstrap Jenkins admin password"
  type        = string
  sensitive   = true
  default     = "ChangeMeNow123!"
}

variable "project_git_url" {
  description = "Project Git URL used by Jenkins"
  type        = string
  default     = "https://github.com/your-org/your-repo.git"
}

variable "project_git_branch" {
  description = "Project Git branch used by Jenkins"
  type        = string
  default     = "main"
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

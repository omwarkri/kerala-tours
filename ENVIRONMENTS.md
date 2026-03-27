# Terraform Environment Configuration Examples

## Production Environment

```hcl
# terraform.tfvars - Production
aws_region       = "ap-south-1"
app_name         = "kerala-toors-prod"
environment      = "production"
container_cpu    = 512      # 0.5 vCPU
container_memory = 1024     # 1 GB
desired_count    = 3
docker_image_url = "YOUR_ACCOUNT.dkr.ecr.ap-south-1.amazonaws.com/kerala-toors:latest"
domain_name      = "kerala-toors.com"

tags = {
  Project     = "Kerala-Toors"
  Environment = "production"
  ManagedBy   = "Terraform"
  CostCenter  = "Engineering"
}
```

## Staging Environment

```hcl
# terraform.tfvars - Staging
aws_region       = "ap-south-1"
app_name         = "kerala-toors-staging"
environment      = "staging"
container_cpu    = 256
container_memory = 512
desired_count    = 1
docker_image_url = "YOUR_ACCOUNT.dkr.ecr.ap-south-1.amazonaws.com/kerala-toors:staging"
domain_name      = "staging.kerala-toors.com"

tags = {
  Project     = "Kerala-Toors"
  Environment = "staging"
  ManagedBy   = "Terraform"
  CostCenter  = "Engineering"
}
```

## Development Environment

```hcl
# terraform.tfvars - Development
aws_region       = "ap-south-1"
app_name         = "kerala-toors-dev"
environment      = "development"
container_cpu    = 256
container_memory = 256
desired_count    = 1
docker_image_url = "YOUR_ACCOUNT.dkr.ecr.ap-south-1.amazonaws.com/kerala-toors:dev"
domain_name      = "dev.kerala-toors.com"

tags = {
  Project     = "Kerala-Toors"
  Environment = "development"
  ManagedBy   = "Terraform"
  CostCenter  = "Engineering"
}
```

## Terraform Workspaces (Alternative approach)

```bash
# Create workspaces for different environments
terraform workspace new production
terraform workspace new staging
terraform workspace new development

# Use specific workspace
terraform workspace select production
terraform plan

# List workspaces
terraform workspace list
```

## Environment-Specific Variables

Create separate variable files:

```bash
# Production
terraform plan -var-file="environments/prod.tfvars"
terraform apply -var-file="environments/prod.tfvars"

# Staging
terraform plan -var-file="environments/staging.tfvars"
terraform apply -var-file="environments/staging.tfvars"

# Development
terraform plan -var-file="environments/dev.tfvars"
terraform apply -var-file="environments/dev.tfvars"
```

## Cost Optimization Tips

### Development Environment
- Use `t2.micro` instances
- 1 task for development
- CloudWatch retention: 1 day

### Staging Environment
- Use `t2.small` instances
- 2 tasks for staging
- CloudWatch retention: 7 days

### Production Environment
- Use `t2.medium` or above instances
- 3+ tasks with auto-scaling
- CloudWatch retention: 30 days
- Enable backup and disaster recovery

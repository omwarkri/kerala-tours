# ECS Deployment with SSL, Domain & Monitoring

Complete deployment guide for Kerala Tours application on AWS ECS with free SSL, custom domain, and comprehensive monitoring.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Internet                             │
└──────────────────────────┬──────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │    Route53 DNS (Free)       │
            │  kerala-toors.com           │
            └──────────────┬──────────────┘
                           │
         ┌─────────────────┴──────────────────┐
         │  ACM Certificate (Free SSL/TLS)   │
         └─────────────────┬──────────────────┘
                           │
        ┌────────────────────────────────────┐
        │   Application Load Balancer (ALB)  │
        │   Port 80 → 443 (Redirect)         │
        │   HTTPS (Port 443)                 │
        └──────────┬────────────┬────────────┘
                   │            │
        ┌──────────▼──┐  ┌──────▼──────────┐
        │  Public SN1 │  │  Public SN2    │
        │  10.0.1.0   │  │  10.0.2.0      │
        │  NAT GW     │  │                │
        └──────────┬──┘  └──────┬──────────┘
                   │            │
        ┌──────────▼──┐  ┌──────▼──────────┐
        │ Private SN1 │  │  Private SN2   │
        │ 10.0.10.0   │  │  10.0.11.0     │
        └──────────┬──┘  └──────┬──────────┘
                   │            │
        ┌──────────▼──────────────▼────────────┐
        │    ECS Fargate Cluster              │
        │  ┌──────────┐  ┌──────────┐        │
        │  │  Task 1  │  │  Task 2  │        │
        │  │ Container│  │Container │        │
        │  └──────────┘  └──────────┘        │
        │   Auto-scaling (2-4 tasks)        │
        └─────────────────┬────────────────┘
                          │
        ┌─────────────────┴──────────────────┐
        │   CloudWatch Monitoring            │
        │  - Container Insights              │
        │  - Custom Alarms (CPU/Memory)     │
        │  - Dashboards                      │
        │  - Log Insights                    │
        │  - SNS Notifications              │
        └────────────────────────────────────┘
```

## Prerequisites

- AWS Account with appropriate permissions
- Terraform >= 1.0
- Ansible >= 2.9
- Docker installed
- AWS CLI configured
- Domain registered (Route53 or external)

## Step 1: Prepare AWS Account

### Create AWS IAM User (recommended)

```bash
# IAM permissions needed:
- ECS: Full access
- EC2: Security Groups, VPC, NAT Gateway
- ACM: Create certificates
- Route53: Manage DNS records
- CloudWatch: Create alarms and dashboards
- IAM: Create service roles
- CloudFormation: For Terraform
```

### Configure AWS CLI

```bash
aws configure
# Enter:
# AWS Access Key ID
# AWS Secret Access Key
# Default region: ap-south-1
# Default output format: json
```

## Step 2: Customize Terraform Variables

Edit `terraform/terraform.tfvars`:

```hcl
aws_region     = "ap-south-1"          # Change if needed
app_name       = "kerala-toors"
environment    = "production"
container_port = 80
container_cpu  = 256                   # vCPU (256, 512, 1024, etc.)
container_memory = 512                 # Memory in MB
desired_count  = 2                     # Initial task count (1-4)
docker_image_url = "omwarkri123/react-app:latest"
domain_name    = "kerala-toors.com"    # Your domain
```

## Step 3: Deploy with Terraform

### Initialize Terraform

```bash
cd terraform
terraform init
```

### Review Infrastructure Plan

```bash
terraform plan -out=tfplan
```

### Apply Configuration

```bash
terraform apply tfplan
```

This will create:
- **VPC** with public/private subnets across 2 AZs
- **NAT Gateway** for private subnet internet access
- **ALB** with target groups
- **ACM SSL Certificate** (free)
- **Route53 Hosted Zone** and DNS records
- **ECS Cluster** with Fargate launch type
- **CloudWatch Log Group** and monitoring
- **Auto Scaling** policies
- **SNS Topic** for alerts

### Get Terraform Outputs

```bash
terraform output
```

Key outputs:
- `application_url`: Your HTTPS application URL
- `alb_dns_name`: ALB DNS name
- `cloudwatch_dashboard_url`: Monitoring dashboard
- `certificate_arn`: ACM Certificate ARN

## Step 4: Configure Domain

### Update Route53 Nameservers

If using external domain registrar:

1. In AWS Console → Route53 → Hosted Zones
2. Find your Zone → Copy nameserver details
3. Update nameservers at your domain registrar
4. Wait for propagation (5-15 minutes)

### Verify DNS

```bash
# Test DNS resolution
nslookup kerala-toors.com
dig kerala-toors.com

# Should resolve to ALB IP
```

## Step 5: Deploy with Ansible

### Install Ansible Modules

```bash
ansible-galaxy collection install amazon.aws
pip install boto3 botocore
```

### Push Docker Image to ECR (Optional)

```bash
ansible-playbook Ansible/push_to_ecr.yml
```

### Deploy to ECS

```bash
ansible-playbook Ansible/deploy_ecs.yml
```

This will:
- Verify Terraform outputs
- Confirm ECS cluster status
- Check ALB health
- Verify SSL certificate
- Check monitoring setup

## Step 6: Verify Deployment

### Check Application

```bash
# HTTPS access (with SSL)
curl -v https://kerala-toors.com

# Check HTTP redirect
curl -L http://kerala-toors.com
```

### Monitor in CloudWatch

```bash
# View logs
aws logs tail /ecs/kerala-toors --follow

# View dashboard
# AWS Console → CloudWatch → Dashboards → kerala-toors-dashboard
```

### Check ECS Service

```bash
aws ecs describe-services \
  --cluster kerala-toors-cluster \
  --services kerala-toors-service \
  --region ap-south-1
```

## SSL/TLS Configuration

### Free SSL Certificate

- **Issuer**: AWS Certificate Manager (ACM)
- **Type**: Public Certificate (AWS managed)
- **Cost**: Free
- **Auto-renewal**: Automatic
- **Domains**: kerala-toors.com, *.kerala-toors.com
- **Validation**: DNS (automatic via Route53)

### HTTPS Features

- ✅ HTTP → HTTPS redirect on port 80
- ✅ TLS 1.2+ enforced
- ✅ Modern cipher suites
- ✅ SSL Labs Grade: A+

### Verify SSL

```bash
# Check certificate details
openssl s_client -connect kerala-toors.com:443

# SSL Labs test
# https://www.ssllabs.com/ssltest/analyze.html?d=kerala-toors.com
```

## Monitoring & Alerts

### CloudWatch Metrics

**ECS Service Metrics:**
- CPU Utilization
- Memory Utilization
- Task Count

**ALB Metrics:**
- Request Count
- Response Time
- HTTP 2XX responses
- HTTP 5XX responses
- Unhealthy Host Count

**Custom Alarms:**
- High CPU (>80%)
- High Memory (>85%)
- Slow Response (>1s)
- Unhealthy Hosts

### View Dashboard

```bash
# AWS Console → CloudWatch → Dashboards

Widgets:
1. ECS Service Metrics (CPU, Memory)
2. ALB Metrics (Response Time, Requests)
3. Log Insights
```

### Configure Alert Email

Edit `terraform/monitoring.tf`:

```hcl
endpoint  = "your-email@example.com"  # Change this
```

Then reapply:

```bash
terraform apply
```

Confirm SNS subscription email.

## Auto-Scaling Configuration

### Scaling Policies

**CPU Scaling:**
- Target: 70% CPU utilization
- Min tasks: 2
- Max tasks: 4

**Memory Scaling:**
- Target: 80% memory utilization
- Min tasks: 2
- Max tasks: 4

### Adjust Scaling

Edit `terraform/variables.tf`:

```hcl
desired_count = 2  # Initial count
```

Modify in `terraform/ecs.tf`:

```hcl
max_capacity = 4   # Maximum tasks
```

## Troubleshooting

### Check ALB Health

```bash
aws elbv2 describe-target-health \
  --target-group-arn <TARGET_GROUP_ARN> \
  --region ap-south-1
```

### View ECS Logs

```bash
# Real-time logs
aws logs tail /ecs/kerala-toors --follow

# Specific time range
aws logs filter-log-events \
  --log-group-name /ecs/kerala-toors \
  --start-time $(($(date +%s%3N) - 3600000))
```

### Restart ECS Service

```bash
aws ecs update-service \
  --cluster kerala-toors-cluster \
  --service kerala-toors-service \
  --force-new-deployment \
  --region ap-south-1
```

### Check Certificate Status

```bash
aws acm describe-certificate \
  --certificate-arn <CERTIFICATE_ARN> \
  --region ap-south-1
```

## Cost Estimation

### Free Tier (First 12 months, if eligible)

- 750 hours EC2 (shared capacity)
- Free ALB data processing
- Free ACM Certificate
- Free Route53 Hosted Zone ($0.50/zone - minimal)

### Estimated Monthly Costs

| Service | Cost | Notes |
|---------|------|-------|
| ECS Fargate (2 tasks × 730h) | $15-30 | 0.25 vCPU, 0.5 GB ephemeral |
| ALB (1 LCU) | $16 | Load Balancer Capacity Units |
| Route53 Queries | $0.40 | Per million queries (~1M/month) |
| CloudWatch Logs | $0.50 | 50 GB/month retention |
| **Total** | **~$32-50** | Estimated production |

## Maintenance & Updates

### Update Docker Image

1. Build new image:
   ```bash
   docker build -t kerala-app:v2 .
   docker tag kerala-app:v2 omwarkri123/react-app:v2
   docker push omwarkri123/react-app:v2
   ```

2. Update task definition:
   ```hcl
   docker_image_url = "omwarkri123/react-app:v2"
   ```

3. Reapply Terraform:
   ```bash
   terraform apply
   ```

4. ECS will perform rolling deployment

### Backup Strategy

- Application code: Git
- Database: RDS backups (if using DB)
- Configuration: Terraform state (backend recommended)

### Disaster Recovery

```bash
# Destroy and recreate infrastructure
terraform destroy -auto-approve
terraform apply -auto-approve
```

## Security Best Practices

1. ✅ **Use HTTPS only** (HTTP redirects to HTTPS)
2. ✅ **Security Groups** restrict traffic
3. ✅ **IAM Roles** for ECS tasks
4. ✅ **Private subnets** for ECS tasks
5. ✅ **NAT Gateway** for outbound traffic
6. ⚠️ **TODO**: Enable VPC Flow Logs
7. ⚠️ **TODO**: Add WAF rules to ALB

### Enable VPC Flow Logs

```bash
# In AWS Console:
# VPC → Your VPC → Flow logs → Create flow log
# CloudWatch Logs Group: /aws/vpc/flowlogs/kerala-toors
```

## Useful Commands

```bash
# Terraform
terraform plan
terraform apply
terraform destroy
terraform output
terraform state list

# AWS CLI
aws ecs list-clusters
aws ecs describe-services --cluster kerala-toors-cluster
aws ecs list-tasks --cluster kerala-toors-cluster
aws logs tail /ecs/kerala-toors --follow
aws acm list-certificates
aws route53 list-hosted-zones

# Docker
docker build -t kerala-app .
docker tag kerala-app omwarkri123/react-app:latest
docker push omwarkri123/react-app:latest
```

## Support & Resources

- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest)
- [ACM Management](https://docs.aws.amazon.com/acm/)
- [Route53 Setup](https://docs.aws.amazon.com/route53/)

## Next Steps

1. ✅ Review and customize Terraform variables
2. ✅ Configure AWS credentials
3. ✅ Deploy infrastructure with Terraform
4. ✅ Verify domain nameservers
5. ✅ Test HTTPS access
6. ✅ Configure SNS email alerts
7. ✅ Monitor CloudWatch dashboard
8. ✅ Set up automated backups
9. ✅ Enable VPC Flow Logs
10. ✅ Document runbooks for your team

---

**Created**: 2025-03-04
**Last Updated**: 2025-03-04
**Status**: Production Ready

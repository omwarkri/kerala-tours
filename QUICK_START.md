# Quick Start Guide - ECS Deployment

## One-Command Deployment

```bash
chmod +x deploy.sh
./deploy.sh
```

This deploys:
- ✅ **ECS Fargate Cluster** with auto-scaling
- ✅ **Free SSL Certificate** (ACM)
- ✅ **Custom Domain** with Route53
- ✅ **Application Load Balancer** with HTTPS
- ✅ **CloudWatch Monitoring** with alarms
- ✅ **Auto-Scaling Policies** (CPU/Memory)

---

## Pre-Requisites

```bash
# Install required tools
brew install terraform aws-cli ansible  # macOS
sudo apt-get install terraform awscli ansible  # Ubuntu/Debian

# Verify installations
terraform version
aws --version
ansible --version

# Configure AWS credentials
aws configure
```

---

## Step 1: Configure Variables (2 minutes)

Edit `terraform/terraform.tfvars`:

```hcl
# Change these values
domain_name      = "your-domain.com"        # Your actual domain
docker_image_url = "your-docker/image:tag"  # Your Docker image
aws_region       = "ap-south-1"             # Your AWS region
```

---

## Step 2: Deploy Infrastructure (10-15 minutes)

```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

The script will:
1. Check for required tools
2. Validate Terraform configuration
3. Create infrastructure
4. Deploy ECS services
5. Verify deployment
6. Output application URL

---

## Step 3: Configure Domain (5 minutes)

After deployment, you'll get Route53 nameservers:

```bash
# View nameservers
aws route53 list-hosted-zones
```

**Update your domain registrar** with these nameservers.

---

## Step 4: Verify Deployment (5 minutes)

Check certificate status:
```bash
aws acm list-certificates --region ap-south-1
```

Test HTTPS access:
```bash
curl -v https://your-domain.com
```

View CloudWatch logs:
```bash
aws logs tail /ecs/kerala-toors --follow
```

---

## Daily Operations

### View Logs
```bash
aws logs tail /ecs/kerala-toors --follow
```

### Check Service Status
```bash
aws ecs describe-services \
  --cluster kerala-toors-cluster \
  --services kerala-toors-service \
  --region ap-south-1
```

### View Metrics
Go to: **AWS Console → CloudWatch → Dashboards → kerala-toors-dashboard**

### Scale Service
```bash
aws ecs update-service \
  --cluster kerala-toors-cluster \
  --service kerala-toors-service \
  --desired-count 4 \
  --region ap-south-1
```

### Deploy New Version
```bash
# Update docker image in variables
# docker_image_url = "your-docker/image:new-tag"

terraform apply -var-file="terraform/terraform.tfvars"
```

---

## Costs

| Item | Cost |
|------|------|
| ECS Fargate (2 tasks) | $15-20/month |
| ALB | $16/month |
| Route53 | $0.50/month |
| CloudWatch Logs | $0.50/month |
| **Total** | **~$32-37/month** |

SSL Certificate: **FREE** (AWS ACM)

---

## Troubleshooting

### Application not accessible
```bash
# Check ALB health
aws elbv2 describe-target-health \
  --target-group-arn <ARN> \
  --region ap-south-1

# Check Security Groups
aws ec2 describe-security-groups \
  --filters "Name=tag:Name,Values=kerala-toors*" \
  --region ap-south-1
```

### ECS Tasks not starting
```bash
# Check task logs
aws ecs describe-tasks \
  --cluster kerala-toors-cluster \
  --tasks <TASK_ARN> \
  --region ap-south-1

# View task definition
aws ecs describe-task-definition \
  --task-definition kerala-toors \
  --region ap-south-1
```

### SSL Certificate not validating
```bash
# Check certificate status
aws acm describe-certificate \
  --certificate-arn <ARN> \
  --region ap-south-1

# Verify Route53 records
aws route53 list-resource-record-sets \
  --hosted-zone-id <ZONE_ID>
```

---

## Advanced: Configure Monitoring

Update email for alerts in `terraform/monitoring.tf`:

```hcl
endpoint = "your-email@example.com"
```

Then redeploy:
```bash
terraform apply -var-file="terraform/terraform.tfvars"
```

---

## Advanced: Enable Remote State

Create S3 backend (optional):

```bash
# Create S3 bucket
aws s3 mb s3://my-terraform-state --region ap-south-1

# Create DynamoDB table for locks
aws dynamodb create-table \
  --table-name terraform-locks \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region ap-south-1
```

Uncomment in `terraform/backend.tf` and run `terraform init`.

---

## Cleanup

```bash
# Destroy all resources
chmod +x destroy.sh
./destroy.sh
```

⚠️ **Warning**: This deletes everything!

---

## Support & Resources

- [ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest)
- [ACM Certificates](https://docs.aws.amazon.com/acm/)
- [CloudWatch Monitoring](https://docs.aws.amazon.com/cloudwatch/)

---

**Deployment Time**: ~15 minutes
**Setup Time**: ~30 minutes (including domain configuration)
**Total Time to Production**: ~1 hour

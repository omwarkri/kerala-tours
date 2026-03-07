# ✅ DEPLOYMENT CHECKLIST & VERIFICATION

## Pre-Deployment Requirements

### AWS Account Setup
- [ ] AWS account created
- [ ] Billing information added
- [ ] Region selection: ap-south-1
- [ ] IAM user created (if team setup)
- [ ] Appropriate permissions assigned

### Local Environment
- [ ] Terraform installed (`terraform version`)
- [ ] AWS CLI installed (`aws --version`)
- [ ] Ansible installed (`ansible --version`)
- [ ] Docker installed (`docker --version`)
- [ ] Git installed (`git --version`)

### AWS CLI Configuration
- [ ] Run `aws configure`
- [ ] AWS Access Key ID entered
- [ ] AWS Secret Access Key entered
- [ ] Default region: ap-south-1
- [ ] Output format: json
- [ ] Verify: `aws sts get-caller-identity`

### Domain Registration
- [ ] Domain registered (any registrar)
- [ ] Domain registrar account access available
- [ ] Registrar supports nameserver updates

### Documentation
- [ ] Read 00_START_HERE.md
- [ ] Read QUICK_START.md
- [ ] Understood basic architecture
- [ ] Aware of cost implications

---

## Configuration Phase

### Terraform Configuration
- [ ] Navigate to terraform directory: `cd terraform`
- [ ] Open terraform.tfvars: `nano terraform.tfvars`
- [ ] Update `domain_name` with your domain
- [ ] Update `docker_image_url` with your image
- [ ] Verify `aws_region` is correct
- [ ] Save and exit (`Ctrl+X`, `Y`, `Enter`)

### Optional: Monitoring Email
- [ ] Open terraform/monitoring.tf: `nano terraform/monitoring.tf`
- [ ] Find SNS topic subscription
- [ ] Change email address to yours
- [ ] Save file

### File Verification
- [ ] terraform/terraform.tfvars exists and edited
- [ ] terraform/provider.tf exists
- [ ] terraform/vpc.tf exists
- [ ] All terraform files readable
- [ ] deploy.sh is executable
- [ ] Documentation files readable

---

## Pre-Deployment Validation

### Script Permissions
```bash
chmod +x deploy.sh destroy.sh setup-environment.sh
```
- [ ] deploy.sh is executable
- [ ] destroy.sh is executable
- [ ] setup-environment.sh is executable

### AWS Connectivity Test
```bash
aws sts get-caller-identity
```
- [ ] Command runs without errors
- [ ] Shows your AWS account ID
- [ ] Login remains valid

### Terraform Validation
```bash
cd terraform
terraform init
terraform validate
```
- [ ] terraform init completes successfully
- [ ] terraform validate shows no errors
- [ ] All plugins downloaded
- [ ] Configuration is valid

---

## Pre-Deployment Checklist

### System Checks
- [ ] Internet connection stable
- [ ] AWS CLI authenticated
- [ ] Terraform initialized
- [ ] Ansible installed
- [ ] Docker daemon running (if needed)
- [ ] Terminal session active

### Configuration Checks
- [ ] terraform.tfvars edited correctly
- [ ] domain_name is your actual domain
- [ ] docker_image_url is valid
- [ ] aws_region is correct (ap-south-1)
- [ ] No syntax errors in config files

### Final Confirmation
- [ ] Reviewed estimated monthly cost ($32-37)
- [ ] Understood that SSL is free
- [ ] Domain registrar nameservers will be updated
- [ ] Ready to proceed with deployment
- [ ] Backup current state (git commit)

---

## Deployment Execution

### Start Deployment
```bash
./deploy.sh
```

### During Deployment Monitor
- [ ] Script starts without errors
- [ ] Pre-flight checks pass
- [ ] Terraform initialization succeeds
- [ ] Terraform validation passes
- [ ] Terraform plan displays resources
- [ ] Confirm deployment when prompted
- [ ] Terraform apply progresses
- [ ] No error messages appear
- [ ] All resources created successfully

### Watch for Key Milestones
- [ ] VPC creation: ~2-3 minutes
- [ ] ALB creation: ~3-5 minutes
- [ ] SSL certificate request: ~1 minute
- [ ] ECS cluster setup: ~5 minutes
- [ ] Task deployment: ~5 minutes
- [ ] Service health check: ~2 minutes
- [ ] Total deployment: ~15-20 minutes

### Capture Outputs
- [ ] Note ALB DNS name
- [ ] Note application URL
- [ ] Note CloudWatch dashboard URL
- [ ] Note Route53 zone ID
- [ ] Note nameserver details
- [ ] Save all outputs to file

---

## Post-Deployment Configuration

### Get Terraform Outputs
```bash
terraform output -json
```
- [ ] Outputs displayed successfully
- [ ] application_url shows HTTPS domain
- [ ] alb_dns_name recorded
- [ ] cloudwatch_dashboard_url saved
- [ ] route53_zone_id noted

### Domain Nameserver Configuration
- [ ] Access domain registrar account
- [ ] Navigate to DNS/Nameserver settings
- [ ] Note current nameservers (for backup)
- [ ] Get nameservers from Terraform output
- [ ] Update nameservers at registrar:
  - [ ] NS1: ...
  - [ ] NS2: ...
  - [ ] NS3: ...
  - [ ] NS4: ...
- [ ] Confirm nameserver changes
- [ ] Wait 15-30 minutes for propagation

### DNS Propagation Verification
```bash
nslookup kerala-toors.com
dig kerala-toors.com
```
- [ ] DNS resolves to ALB
- [ ] Both nameserver checks pass
- [ ] TTL is reasonable
- [ ] No errors in DNS response

---

## Post-Deployment Verification

### SSL Certificate Status
```bash
aws acm describe-certificate \
  --certificate-arn <ARN> \
  --region ap-south-1
```
- [ ] Certificate status: ISSUED
- [ ] Validation status: SUCCESS
- [ ] Domain in Certificate: kerala-toors.com
- [ ] Wildcard present: *.kerala-toors.com
- [ ] Auto-renewal enabled

### Application Accessibility
```bash
# Test HTTP redirect
curl -i http://your-domain.com

# Test HTTPS access
curl -v https://your-domain.com

# Check SSL certificate
openssl s_client -connect your-domain.com:443
```
- [ ] HTTP returns 301 redirect
- [ ] HTTPS returns 200 OK
- [ ] SSL certificate valid
- [ ] Certificate matches domain
- [ ] No SSL warnings
- [ ] Page loads successfully

### CloudWatch Verification
```bash
aws logs describe-log-groups \
  --log-group-name-prefix /ecs/
```
- [ ] Log group exists: /ecs/kerala-toors
- [ ] Logs are being written
- [ ] Newest logs show recent entries
- [ ] No large numbers of ERROR entries

### ECS Service Status
```bash
aws ecs describe-services \
  --cluster kerala-toors-cluster \
  --services kerala-toors-service \
  --region ap-south-1
```
- [ ] Service status: ACTIVE
- [ ] Desired count: 2
- [ ] Running count: 2
- [ ] Pending count: 0
- [ ] Deployment status: COMPLETED
- [ ] No errors in service

### ALB Health Status
```bash
aws elbv2 describe-target-health \
  --target-group-arn <ARN>
```
- [ ] All targets: HEALTHY
- [ ] State: InService
- [ ] Description: Healthy
- [ ] No unhealthy targets

---

## SNS Email Alert Verification

### Subscription Confirmation
- [ ] Check email inbox for SNS subscription
- [ ] Check spam/junk folder if not found
- [ ] Click confirmation link in email
- [ ] Return to AWS Console to verify subscription
- [ ] Subscription status: Confirmed
- [ ] Endpoint: your-email@example.com

### Alert Testing (Optional)
```bash
aws sns publish \
  --topic-arn <SNS_TOPIC_ARN> \
  --message "Test alert"
```
- [ ] Receive test email within 1 minute
- [ ] Email shows SNS message
- [ ] Verify SNS is functional

---

## CloudWatch Dashboard Verification

### Dashboard Access
1. Go to AWS Console
2. Navigate to CloudWatch
3. Select Dashboards
4. Open kerala-toors-dashboard

### Dashboard Components Check
- [ ] ECS Service Metrics widget visible
- [ ] CPU Utilization trend displayed
- [ ] Memory Utilization trend displayed
- [ ] ALB Metrics widget visible
- [ ] Request count graph shown
- [ ] Response time graph shown
- [ ] Logs widget displays recent entries
- [ ] No error messages in dashboard

---

## Application Testing

### Functionality Tests
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Links are functional
- [ ] Forms submit (if any)
- [ ] API endpoints respond
- [ ] Images load correctly
- [ ] Styling is correct
- [ ] No console errors

### Performance Tests
```bash
# Quick load time test
curl -o /dev/null -s -w "%{time_total}\n" https://your-domain.com
```
- [ ] Page loads in <3 seconds
- [ ] No timeout errors
- [ ] No 502/503 errors
- [ ] Response time reasonable

### Security Checks
- [ ] SSL Labs score A or better (optional)
- [ ] Security headers present
- [ ] No mixed content warnings
- [ ] HTTPS icon shows in browser

---

## Monitoring Setup

### CloudWatch Alarms
```bash
aws cloudwatch describe-alarms \
  --alarm-names kerala-toors-high-cpu
```
- [ ] 5 alarms exist
- [ ] All alarms have actions
- [ ] Alarm states: OK or ALARM
- [ ] SNS topic specified
- [ ] Email-confirmed for alerts

### Log Insights Queries
- [ ] Can access CloudWatch Logs Insights
- [ ] Can write and execute queries
- [ ] Recent logs appear from past 30 minutes
- [ ] No permission errors
- [ ] Query results return data

---

## Scaling Test (Optional)

### Manual Scale Test
```bash
# Scale to 4 tasks
aws ecs update-service \
  --cluster kerala-toors-cluster \
  --service kerala-toors-service \
  --desired-count 4
```
- [ ] Service accepts scale command
- [ ] Desired count updated to 4
- [ ] New tasks start launching
- [ ] Monitor logs for startup
- [ ] All 4 tasks become healthy
- [ ] Dashboard shows 4 running tasks

### Scale Down
```bash
# Scale back to 2 tasks
aws ecs update-service \
  --cluster kerala-toors-cluster \
  --service kerala-toors-service \
  --desired-count 2
```
- [ ] Service accepts scale down
- [ ] Excess tasks terminate
- [ ] Service remains healthy
- [ ] No errors during scale down

---

## Documentation Review

### Essential Guides Read
- [ ] 00_START_HERE.md
- [ ] QUICK_START.md
- [ ] DEPLOYMENT_GUIDE.md sections relevant to you
- [ ] MONITORING_GUIDE.md

### Optional Documentation
- [ ] INFRASTRUCTURE_SUMMARY.md (for deep understanding)
- [ ] ENVIRONMENTS.md (if planning staging/dev)
- [ ] FINAL_SUMMARY.md (for reference)

---

## Team Handoff

If handing off to team:

### Documentation Prepared
- [ ] All guides printed/saved
- [ ] Architecture diagram explained
- [ ] Cost breakdown reviewed
- [ ] Monitoring setup documented

### Access Granted
- [ ] AWS Console access provided
- [ ] Terraform state access configured
- [ ] CloudWatch dashboard shared
- [ ] SNS alerts forwarded to team email

### Runbook Created
- [ ] Deployment procedure documented
- [ ] Scaling instructions provided
- [ ] Troubleshooting guide shared
- [ ] Support contact information given

---

## Post-Deployment Maintenance

### Day 1
- [ ] Monitor application performance
- [ ] Check CloudWatch dashboard frequently
- [ ] Verify logging is working
- [ ] Test alert notification system

### Week 1
- [ ] Monitor costs in AWS Billing
- [ ] Review logs for errors
- [ ] Test manual scaling
- [ ] Verify auto-scaling works
- [ ] Document any issues found

### Ongoing
- [ ] Monitor monthly costs
- [ ] Review CloudWatch metrics
- [ ] Update Terraform as needed
- [ ] Plan capacity for growth
- [ ] Test disaster recovery
- [ ] Review security practices

---

## Troubleshooting Checklist

If deployment fails:

### Step 1: Check AWS Credentials
```bash
aws sts get-caller-identity
```
- [ ] Command succeeds without error
- [ ] Shows correct AWS account
- [ ] Credentials valid

### Step 2: Check Terraform
```bash
cd terraform
terraform validate
terraform plan
```
- [ ] Validation passes
- [ ] Plan shows expected resources
- [ ] No syntax errors

### Step 3: Review Logs
```bash
terraform show
terraform state list
```
- [ ] Check what resources were created
- [ ] Identify which step failed
- [ ] Note error messages

### Step 4: Check Configuration
- [ ] terraform.tfvars is valid
- [ ] All required variables set
- [ ] No typos in domain name
- [ ] AWS region correct

### Step 5: Additional Debugging
```bash
export TF_LOG=DEBUG
./deploy.sh
```
- [ ] Capture detailed logs
- [ ] Review for error messages
- [ ] Check AWS API responses

---

## Success Criteria

✅ **Your deployment is successful when:**

- ✅ Application accessible via HTTPS
- ✅ SSL certificate shows as valid
- ✅ Domain resolves correctly
- ✅ ALB shows all targets healthy
- ✅ ECS tasks running (desired count met)
- ✅ CloudWatch logs appearing
- ✅ Dashboard shows metrics
- ✅ Alarms configured for email
- ✅ SNS subscription email received
- ✅ Application functions normally
- ✅ Response times acceptable
- ✅ No error messages in logs
- ✅ Auto-scaling responsive
- ✅ Monitoring working correctly

---

## Common Issues & Solutions

| Issue | Solution | Checklist |
|-------|----------|-----------|
| Terraform init fails | Check AWS credentials | `aws sts get-caller-identity` |
| Plan shows many changes | Review terraform.tfvars | Check domain and image URL |
| Deployment times out | Check internet connection | Increase timeout in deploy.sh |
| ALB shows unhealthy | Check security groups | Verify port 80 ingress rule |
| Logs not appearing | Check task logs | `aws ecs describe-tasks` |
| DNS not resolving | Wait longer for propagation | Test after 30 minutes |
| SSL certificate pending | Check Route53 records | Verify DNS CNAME records |
| Alerts not working | Check SNS subscription | Confirm email verification |

---

## Contingency Plans

### If Application is Down
1. [ ] Check CloudWatch logs
2. [ ] Scale up manually
3. [ ] Check ALB health
4. [ ] Restart service
5. [ ] Review recent changes

### If Performance Degraded
1. [ ] Check CPU/Memory usage
2. [ ] Review response times
3. [ ] Scale up if needed
4. [ ] Check for errors in logs
5. [ ] Review Nginx config

### If Monitoring Alerts Not Working
1. [ ] Check SNS topic
2. [ ] Verify subscription
3. [ ] Check email spam folder
4. [ ] Re-subscribe to topic
5. [ ] Test with manual message

---

## Final Sign-Off

When all checks are complete:

- [ ] Production infrastructure deployed
- [ ] Application accessible and functional
- [ ] Monitoring operational
- [ ] Alerts working
- [ ] Team trained
- [ ] Documentation complete
- [ ] Ready for production traffic

**Date Completed**: _______________
**Deployed By**: _______________
**Reviewed By**: _______________

---

## Next Steps

1. Monitor application daily for first week
2. Review monthly costs
3. Plan for growth/scaling
4. Consider disaster recovery backup
5. Schedule security review
6. Document any customizations
7. Train team on operations
8. Set up automated backups (if using DB)

---

**Congratulations! Your production infrastructure is deployed and operational.** 🎉

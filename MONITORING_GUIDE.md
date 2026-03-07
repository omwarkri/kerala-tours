# Monitoring & Alerting Configuration Guide

## CloudWatch Alarms Setup

### Email Alerts Configuration

1. **Update email address** in `terraform/monitoring.tf`:

```hcl
resource "aws_sns_topic_subscription" "alerts_email" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = "your-email@example.com"  # ← Change this
}
```

2. **Apply changes**:
```bash
terraform apply -var-file="terraform/terraform.tfvars"
```

3. **Confirm subscription** in your email inbox

### Custom Metrics

Add custom CloudWatch metrics in `terraform/monitoring.tf`:

```hcl
resource "aws_cloudwatch_metric_alarm" "custom_metric" {
  alarm_name          = "custom-app-metric"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "YourCustomMetric"
  namespace           = "CustomApp"
  period              = "60"
  statistic           = "Average"
  threshold           = "80"
  alarm_actions       = [aws_sns_topic.alerts.arn]
}
```

## Log Insights Queries

Access CloudWatch Logs Insights in AWS Console.

### Popular Queries

**Find errors:**
```
fields @timestamp, @message, @logStream
| filter @message like /ERROR/
| stats count() by @logStream
```

**Performance analysis:**
```
fields @timestamp, @duration
| stats avg(@duration), max(@duration), pct(@duration, 99) by bin(5m)
```

**Status codes:**
```
fields @timestamp, @status
| stats count() as requests by @status
```

**Top IPs:**
```
fields @timestamp, @remoteAddr
| stats count() as requests by @remoteAddr
| sort requests desc
| limit 10
```

## Dashboards

### Create Custom Dashboard

Go to AWS Console → CloudWatch → Dashboards

**Add Widgets:**

1. **Service Metrics**
   - ECS CPU Utilization
   - ECS Memory Utilization
   - Task Count

2. **ALB Metrics**
   - Request Count
   - Response Time
   - HTTP 2XX/5XX Counts

3. **Logs**
   - Recent errors
   - Request rate
   - Response times

4. **Alarms**
   - Alarm status
   - Triggered alarms history

## Scaling Adjustment

### Increase Scaling Limits

Edit `terraform/ecs.tf`:

```hcl
# Current: max_capacity = 4
resource "aws_appautoscaling_target" "ecs_target" {
  max_capacity = 8  # Increase to 8 tasks
  min_capacity = 2
  # ...
}

# Adjust targets
resource "aws_appautoscaling_policy" "ecs_policy_cpu" {
  target_tracking_scaling_policy_configuration {
    target_value = 60.0  # Lower = scale earlier
  }
}
```

Then apply:
```bash
terraform apply
```

## Manual Scaling

```bash
# Scale to 5 tasks
aws ecs update-service \
  --cluster kerala-toors-cluster \
  --service kerala-toors-service \
  --desired-count 5 \
  --region ap-south-1

# Check scaling activity
aws ecs describe-services \
  --cluster kerala-toors-cluster \
  --services kerala-toors-service \
  --region ap-south-1 \
  | jq '.services[0].desiredCount, .services[0].runningCount'
```

## Alarm Thresholds

### Recommended Values

| Metric | Threshold | Action |
|--------|-----------|--------|
| CPU | >70-80% | Scale up |
| Memory | >80-85% | Scale up |
| Response Time | >1-2s | Investigate |
| Error Rate | >1% | Alert |
| Unhealthy Hosts | ≥1 | Alert |

### Modify Thresholds

Edit in `terraform/monitoring.tf`:

```hcl
resource "aws_cloudwatch_metric_alarm" "ecs_cpu" {
  threshold = "90"  # Changed from 80
}
```

Reapply:
```bash
terraform apply
```

## Health Checks

### ALB Health Check

Currently configured:
- Interval: 30 seconds
- Timeout: 3 seconds
- Healthy threshold: 2
- Unhealthy threshold: 2
- Path: /
- Matcher: 200

### Modify Health Check

Edit `terraform/alb.tf`:

```hcl
health_check {
  healthy_threshold   = 2
  unhealthy_threshold = 2
  timeout             = 5        # Increase timeout
  interval            = 15       # Check more frequently
  path                = "/health"  # Custom health endpoint
  matcher             = "200-299"   # Accept any 2XX
}
```

Reapply:
```bash
terraform apply
```

## Logging Best Practices

1. **Log Retention**: Currently 7 days, change in `terraform/ecs.tf`:
```hcl
retention_in_days = 30  # Store for 30 days
```

2. **Log Filtering**: Use CloudWatch Insights to find issues

3. **Log Export**: Export logs to S3 for long-term storage

4. **Log Insights**: Create saved queries for recurring analysis

## Disaster Recovery

### Automated Backup

Enable automated backups (if using RDS):
```bash
aws rds modify-db-instance \
  --db-instance-identifier kerala-toors-db \
  --backup-retention-period 7 \
  --apply-immediately
```

### Infrastructure Backup

Terraform state is your backup. Store remotely:
```bash
# Enable S3 backend (see terraform/backend.tf)
terraform init
```

### Runbook

1. **Monitor dashboard** - https://console.aws.amazon.com/cloudwatch
2. **Receive alerts** - Check SNS email
3. **View logs** - `aws logs tail /ecs/kerala-toors --follow`
4. **Scale if needed** - See "Manual Scaling" above
5. **Investigate** - Use CloudWatch Logs Insights
6. **Fix and deploy** - Push new image and redeploy

## Contact & Support

**Questions?** Check comprehensive guide at `DEPLOYMENT_GUIDE.md`

**Emergency?** Scale manually while investigating:
```bash
# Temporarily scale to max
aws ecs update-service \
  --cluster kerala-toors-cluster \
  --service kerala-toors-service \
  --desired-count 4
```

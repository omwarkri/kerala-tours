output "alb_dns_name" {
  description = "DNS name of the load balancer"
  value       = aws_lb.main.dns_name
}

output "alb_arn" {
  description = "ARN of the load balancer"
  value       = aws_lb.main.arn
}

output "ecs_cluster_name" {
  description = "Name of ECS cluster"
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "Name of ECS service"
  value       = aws_ecs_service.main.name
}

output "cloudwatch_log_group_name" {
  description = "Name of CloudWatch log group"
  value       = aws_cloudwatch_log_group.ecs.name
}

output "route53_zone_id" {
  description = "Route53 Hosted Zone ID"
  value       = var.create_route53_records ? aws_route53_zone.main[0].zone_id : null
}

output "domain_name" {
  description = "Application domain name"
  value       = var.domain_name
}

# output "certificate_arn" {
#   description = "ACM Certificate ARN"
#   value       = aws_acm_certificate.main.arn
# }

output "cloudwatch_dashboard_url" {
  description = "CloudWatch Dashboard URL"
  value       = "https://console.aws.amazon.com/cloudwatch/home?region=${var.aws_region}#dashboards:name=${aws_cloudwatch_dashboard.main.dashboard_name}"
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "application_url" {
  description = "Application URL"
  value       = "http://${aws_lb.main.dns_name}"
}

output "ecr_repository_url" {
  description = "ECR repository URL"
  value       = var.create_ecr_repository ? aws_ecr_repository.app[0].repository_url : null
}

output "jenkins_public_ip" {
  description = "Jenkins EC2 public IP"
  value       = var.create_jenkins_server ? aws_instance.jenkins[0].public_ip : null
}

output "jenkins_url" {
  description = "Jenkins URL"
  value       = var.create_jenkins_server ? "http://${aws_instance.jenkins[0].public_ip}:8080" : null
}

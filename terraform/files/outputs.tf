output "name_servers" {
  description = "Route 53 name servers — add these to your domain registrar"
  value       = aws_route53_zone.main.name_servers
}

output "certificate_arn" {
  description = "ACM Certificate ARN"
  value       = aws_acm_certificate.cert.arn
}

output "hosted_zone_id" {
  description = "Route 53 Hosted Zone ID"
  value       = aws_route53_zone.main.zone_id
}

output "alb_dns_name" {
  description = "ALB DNS name"
  value       = aws_lb.alb.dns_name
}

output "ecs_cluster_name" {
  description = "ECS Cluster name"
  value       = aws_ecs_cluster.main.name
}

output "website_url" {
  description = "Website URL"
  value       = "https://${var.domain_name}"
}

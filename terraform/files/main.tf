# Route 53 Hosted Zone
resource "aws_route53_zone" "main" {
  name = var.domain_name

  tags = {
    Name        = "kerala-tours-zone"
    Environment = var.environment
  }
}

# ACM Certificate — us-east-1 (for CloudFront only)
resource "aws_acm_certificate" "cert" {
  provider                  = aws.us_east_1
  domain_name               = var.domain_name
  subject_alternative_names = [var.www_domain_name]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name        = "kerala-tours-cert-cloudfront"
    Environment = var.environment
  }
}

locals {
  validation_domains = [var.domain_name, var.www_domain_name]
}

# DNS Validation Records (shared by both certs — same domain)
resource "aws_route53_record" "cert_validation" {
  for_each = { for domain in local.validation_domains : domain => {} }

  zone_id = aws_route53_zone.main.zone_id
  name    = [for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.resource_record_name if dvo.domain_name == each.key][0]
  type    = [for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.resource_record_type if dvo.domain_name == each.key][0]
  ttl     = 300
  records = [[for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.resource_record_value if dvo.domain_name == each.key][0]]
}

# Certificate Validation — us-east-1
resource "aws_acm_certificate_validation" "cert" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

# -------------------------------------------------------
# ACM Certificate — ap-south-1 (for ALB)
# -------------------------------------------------------
resource "aws_acm_certificate" "cert_alb" {
  domain_name               = var.domain_name
  subject_alternative_names = [var.www_domain_name]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name        = "kerala-tours-cert-alb"
    Environment = var.environment
  }
}

# Reuse existing CNAME records — no new records needed
resource "aws_acm_certificate_validation" "cert_alb" {
  certificate_arn         = aws_acm_certificate.cert_alb.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

# -------------------------------------------------------
# Route 53 Records
# -------------------------------------------------------

# Root domain → ALB
resource "aws_route53_record" "root" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_lb.alb.dns_name
    zone_id                = aws_lb.alb.zone_id
    evaluate_target_health = true
  }
}

# www → ALB
resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.www_domain_name
  type    = "A"

  alias {
    name                   = aws_lb.alb.dns_name
    zone_id                = aws_lb.alb.zone_id
    evaluate_target_health = true
  }
}
# Request SSL Certificate from AWS Certificate Manager (Free)
# resource "aws_acm_certificate" "main" {
#   domain_name       = var.domain_name
#   validation_method = "DNS"

#   subject_alternative_names = [
#     "*.${var.domain_name}"
#   ]

#   lifecycle {
#     create_before_destroy = true
#   }

#   tags = {
#     Name = "${var.app_name}-certificate"
#   }

#   depends_on = [aws_route53_zone.main]
# }

# Validate ACM Certificate using Route53
# resource "aws_route53_record" "acm_validation" {
#   for_each = {
#     for dvo in aws_acm_certificate.main.domain_validation_options : dvo.domain_name => {
#       name   = dvo.resource_record_name
#       record = dvo.resource_record_value
#       type   = dvo.resource_record_type
#     }
#   }

#   allow_overwrite = true
#   name            = each.value.name
#   records         = [each.value.record]
#   ttl             = 60
#   type            = each.value.type
#   zone_id         = aws_route53_zone.main.zone_id
# }

# resource "aws_acm_certificate_validation" "main" {
#   certificate_arn           = aws_acm_certificate.main.arn
#   timeouts {
#     create = "5m"
#   }

#   depends_on = [aws_route53_record.acm_validation]
# }

# Route53 Hosted Zone
resource "aws_route53_zone" "main" {
  name = var.domain_name

  tags = {
    Name = "${var.app_name}-zone"
  }
}

# Route53 DNS Record pointing to ALB
resource "aws_route53_record" "alb" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

# Route53 DNS Record for www subdomain
resource "aws_route53_record" "alb_www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

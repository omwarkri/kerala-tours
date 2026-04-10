# ==============================
# ALB
# ==============================
resource "aws_lb" "alb" {
  name               = "kerala-alb-v2"
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [local.subnet1_id, local.subnet2_id]

  tags = {
    Name        = "kerala-alb-v2"
    Environment = var.environment
  }
}

# ==============================
# BLUE TARGET GROUP
# ==============================
resource "aws_lb_target_group" "blue" {
  name        = "kerala-blue-tg"
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    path                = "/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  tags = {
    Name        = "kerala-blue"
    Environment = var.environment
  }
}

# ==============================
# GREEN TARGET GROUP
# ==============================
resource "aws_lb_target_group" "green" {
  name        = "kerala-green-tg"
  port        = var.container_port
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    path                = "/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }

  tags = {
    Name        = "kerala-green"
    Environment = var.environment
  }
}

# ==============================
# HTTP → HTTPS REDIRECT
# ==============================
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# ==============================
# HTTPS LISTENER (MAIN TRAFFIC)
# ==============================
resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate_validation.cert_alb.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.blue.arn
  }
}

# ==============================
# HTTPS TEST LISTENER (CODEDEPLOY B/G SWITCH)
# ==============================
resource "aws_lb_listener" "https_test" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 8443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate_validation.cert_alb.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.green.arn
  }
}
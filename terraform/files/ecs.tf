# ==============================
# IMPORT EXISTING RESOURCES
# (Safe to keep permanently — Terraform ignores after first apply)
# ==============================
import {
  to = aws_iam_role.ecs_task_execution
  id = "kerala-ecs-task-execution-role-v2"
}

import {
  to = aws_cloudwatch_log_group.ecs
  id = "/ecs/kerala-tours-v2"
}

# ==============================
# ECS CLUSTER
# ==============================
resource "aws_ecs_cluster" "main" {
  name = "kerala-tours-cluster-v2"

  tags = {
    Name        = "kerala-tours-cluster-v2"
    Environment = var.environment
  }
}

# ==============================
# ECS TASK EXECUTION ROLE
# ==============================
resource "aws_iam_role" "ecs_task_execution" {
  name = "kerala-ecs-task-execution-role-v2"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# ==============================
# CLOUDWATCH LOG GROUP
# ==============================
resource "aws_cloudwatch_log_group" "ecs" {
  name              = "/ecs/kerala-tours-v2"
  retention_in_days = 30
}

# ==============================
# ECS TASK DEFINITION
# ==============================
locals {
  ecr_image_url_validated = var.ecr_image_url != "" ? var.ecr_image_url : "782696281574.dkr.ecr.ap-south-1.amazonaws.com/kerala-tours:latest-fresh"
}

resource "aws_ecs_task_definition" "task" {
  family                   = "kerala-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.task_cpu
  memory                   = var.task_memory
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn

  container_definitions = jsonencode([
    {
      name  = "kerala-container"
      image = local.ecr_image_url_validated

      portMappings = [
        {
          containerPort = var.container_port
          protocol      = "tcp"
        }
      ]

      healthCheck = {
        command     = ["CMD-SHELL", "wget --quiet --tries=1 --spider http://localhost:${var.container_port}/health || exit 1"]
        interval    = 10
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs.name
          "awslogs-region"        = var.region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  tags = {
    Name        = "kerala-task"
    Environment = var.environment
  }
}

# ==============================
# ECS SERVICE (CODEDEPLOY MODE)
# ==============================
resource "aws_ecs_service" "service" {
  name            = "kerala-tours-service-v2"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  health_check_grace_period_seconds = 60

  deployment_controller {
    type = "CODE_DEPLOY"
  }

  network_configuration {
    subnets          = [local.subnet1_id, local.subnet2_id]
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.blue.arn
    container_name   = "kerala-container"
    container_port   = var.container_port
  }

  lifecycle {
    ignore_changes = [task_definition, load_balancer]
  }

  depends_on = [
    aws_lb_listener.https,
    aws_iam_role_policy_attachment.ecs_task_execution
  ]

  tags = {
    Name        = "kerala-tours-service"
    Environment = var.environment
  }
}
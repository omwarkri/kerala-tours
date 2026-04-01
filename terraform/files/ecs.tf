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
      image = var.ecr_image_url

      portMappings = [
        {
          containerPort = var.container_port
          protocol      = "tcp"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.ecs.name
          awslogs-region        = var.region
          awslogs-stream-prefix = "ecs"
        }
      }
    }
  ])
}

# ==============================
# ECS SERVICE (CODEDEPLOY MODE)
# ==============================
resource "aws_ecs_service" "service" {
  name            = "kerala-tours-service-v2"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.task.arn  # ✅ THIS WAS MISSING
  desired_count   = 1
  launch_type     = "FARGATE"

  deployment_controller {
    type = "CODE_DEPLOY"
  }

  network_configuration {
    subnets          = [aws_subnet.subnet1.id, aws_subnet.subnet2.id]
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.blue.arn
    container_name   = "kerala-container"
    container_port   = var.container_port
  }

  # ✅ Ignore changes CodeDeploy manages after first deploy
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
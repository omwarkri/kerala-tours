# ==============================
# CODEDEPLOY APP
# ==============================
resource "aws_codedeploy_app" "app" {
  name             = "kerala-tours-app"
  compute_platform = "ECS"
}

# ==============================
# CODEDEPLOY IAM ROLE
# ==============================
resource "aws_iam_role" "codedeploy_role" {
  name = "kerala-codedeploy-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "codedeploy.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "codedeploy_policy" {
  role       = aws_iam_role.codedeploy_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCodeDeployRoleForECS"
}

# ==============================
# CODEDEPLOY DEPLOYMENT GROUP
# ==============================
resource "aws_codedeploy_deployment_group" "dg" {
  app_name               = aws_codedeploy_app.app.name
  deployment_group_name  = "kerala-deploy-group"
  service_role_arn       = aws_iam_role.codedeploy_role.arn
  deployment_config_name = "CodeDeployDefault.ECSAllAtOnce"

  # ✅ REQUIRED FOR ECS
  blue_green_deployment_config {
    deployment_ready_option {
      action_on_timeout = "CONTINUE_DEPLOYMENT"  # auto cutover, no manual approval
    }

    terminate_blue_instances_on_deployment_success {
      action                           = "TERMINATE"
      termination_wait_time_in_minutes = 5  # wait 5 min before killing old tasks
    }
  }

  # ✅ REQUIRED FOR ECS
  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "BLUE_GREEN"
  }

  # ✅ REQUIRED FOR ECS
  ecs_service {
    cluster_name = aws_ecs_cluster.main.name
    service_name = aws_ecs_service.service.name
  }

  # ✅ BOTH LISTENERS + BOTH TARGET GROUPS
  load_balancer_info {
    target_group_pair_info {
      prod_traffic_route {
        listener_arns = [aws_lb_listener.https.arn]
      }

      test_traffic_route {
        listener_arns = [aws_lb_listener.https_test.arn]
      }

      target_group {
        name = aws_lb_target_group.blue.name
      }

      target_group {
        name = aws_lb_target_group.green.name
      }
    }
  }

  depends_on = [
    aws_iam_role_policy_attachment.codedeploy_policy
  ]
}
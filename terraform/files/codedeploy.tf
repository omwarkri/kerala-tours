# ==============================
# CODEDEPLOY - REFERENCE EXISTING RESOURCES
# ==============================

# Reference existing IAM role for CodeDeploy (since aws_codedeploy_app data source doesn't exist)
data "aws_iam_role" "codedeploy_role" {
  name = "kerala-codedeploy-role"
}

# Create local references for existing resources
locals {
  codedeploy_app_name      = "kerala-tours-app"
  codedeploy_role_arn      = data.aws_iam_role.codedeploy_role.arn
  codedeploy_role_name     = data.aws_iam_role.codedeploy_role.name
}

# ==============================
# CODEDEPLOY DEPLOYMENT GROUP
# ==============================
resource "aws_codedeploy_deployment_group" "dg" {
  app_name               = local.codedeploy_app_name
  deployment_group_name  = "kerala-deploy-group"
  service_role_arn       = local.codedeploy_role_arn
  deployment_config_name = "CodeDeployDefault.ECSAllAtOnce"

  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "BLUE_GREEN"
  }

  blue_green_deployment_config {
    deployment_ready_option {
      action_on_timeout = "CONTINUE_DEPLOYMENT"
    }

    terminate_blue_instances_on_deployment_success {
      action                           = "TERMINATE"
      termination_wait_time_in_minutes = 5
    }
  }

  ecs_service {
    cluster_name = aws_ecs_cluster.main.name
    service_name = aws_ecs_service.service.name
  }

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
    aws_ecs_service.service
  ]
}
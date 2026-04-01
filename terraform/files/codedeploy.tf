# ==============================
# CODEDEPLOY APPLICATION
# ==============================
resource "aws_codedeploy_app" "app" {
  name             = "kerala-codedeploy-app"
  compute_platform = "ECS"
}

# ==============================
# CODEDEPLOY DEPLOYMENT GROUP
# ==============================
resource "aws_codedeploy_deployment_group" "dg" {
  app_name              = aws_codedeploy_app.app.name
  deployment_group_name = "kerala-deploy-group"
  service_role_arn      = aws_iam_role.codedeploy_role.arn

  deployment_config_name = "CodeDeployDefault.ECSAllAtOnce"

  deployment_style {
    deployment_type = "BLUE_GREEN"
  }

  ecs_service {
    cluster_name = aws_ecs_cluster.main.name
    service_name = aws_ecs_service.service.name
  }

  load_balancer_info {
    target_group_pair_info {

      # BLUE
      target_group {
        name = aws_lb_target_group.blue.name
      }

      # GREEN
      target_group {
        name = aws_lb_target_group.green.name
      }

      # TRAFFIC ROUTE
      prod_traffic_route {
        listener_arns = [aws_lb_listener.https.arn]
      }
    }
  }

  depends_on = [
    aws_ecs_service.service
  ]
}
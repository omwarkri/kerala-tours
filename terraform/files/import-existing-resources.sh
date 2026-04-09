#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if ! command -v aws >/dev/null 2>&1; then
  echo "ERROR: aws CLI is required"
  exit 1
fi
if ! command -v terraform >/dev/null 2>&1; then
  echo "ERROR: terraform is required"
  exit 1
fi

DOMAIN_NAME="${DOMAIN_NAME:-kerala-tours.co.in}"
WWW_DOMAIN="${WWW_DOMAIN:-www.kerala-tours.co.in}"
AWS_REGION="${AWS_REGION:-ap-south-1}"
export AWS_DEFAULT_REGION="$AWS_REGION"

function state_has() {
  terraform state list 2>/dev/null | grep -xF "$1" >/dev/null 2>&1
}

function import_resource() {
  local target="$1"
  local id="$2"

  if [ -z "$id" ] || [ "$id" = "None" ] || [ "$id" = "null" ]; then
    echo "⚠️  Skipping import $target: no ID found"
    return
  fi

  if state_has "$target"; then
    echo "✅ Already imported: $target"
    return
  fi

  echo "⛓ Importing $target => $id"
  terraform import "$target" "$id"
}

function query() {
  aws "$@" --query "$2" --output text 2>/dev/null || true
}

# Initialize Terraform if needed.
if [ ! -d ".terraform" ]; then
  terraform init -input=false
fi

# Identify existing resources and import them into state if present.

CODEDEPLOY_APP_ID=$(query deploy get-application --application-name kerala-tours-app application.applicationName)
import_resource aws_codedeploy_app.app "$CODEDEPLOY_APP_ID"

CODEDEPLOY_ROLE_ID=$(query iam get-role --role-name kerala-codedeploy-role Role.RoleName)
import_resource aws_iam_role.codedeploy_role "$CODEDEPLOY_ROLE_ID"

if state_has aws_iam_role.codedeploy_role; then
  import_resource aws_iam_role_policy_attachment.codedeploy_policy "kerala-codedeploy-role/arn:aws:iam::aws:policy/service-role/AWSCodeDeployRoleForECS"
fi

VPC_ID=$(aws ec2 describe-vpcs --filters "Name=tag:Name,Values=kerala-tours-vpc" --query 'Vpcs[0].VpcId' --output text 2>/dev/null || true)
import_resource aws_vpc.main "$VPC_ID"

SUBNET1_ID=$(aws ec2 describe-subnets --filters "Name=tag:Name,Values=kerala-tours-subnet-1" --query 'Subnets[0].SubnetId' --output text 2>/dev/null || true)
import_resource aws_subnet.subnet1 "$SUBNET1_ID"

SUBNET2_ID=$(aws ec2 describe-subnets --filters "Name=tag:Name,Values=kerala-tours-subnet-2" --query 'Subnets[0].SubnetId' --output text 2>/dev/null || true)
import_resource aws_subnet.subnet2 "$SUBNET2_ID"

if [ -n "$VPC_ID" ]; then
  IGW_ID=$(aws ec2 describe-internet-gateways --filters "Name=attachment.vpc-id,Values=${VPC_ID}" --query 'InternetGateways[0].InternetGatewayId' --output text 2>/dev/null || true)
  import_resource aws_internet_gateway.igw "$IGW_ID"
fi

ROUTE_TABLE_ID=$(aws ec2 describe-route-tables --filters "Name=tag:Name,Values=kerala-tours-rt" --query 'RouteTables[0].RouteTableId' --output text 2>/dev/null || true)
import_resource aws_route_table.public "$ROUTE_TABLE_ID"

if [ -n "$ROUTE_TABLE_ID" ] && [ -n "$SUBNET1_ID" ]; then
  import_resource aws_route_table_association.subnet1 "${SUBNET1_ID}/${ROUTE_TABLE_ID}"
fi

if [ -n "$ROUTE_TABLE_ID" ] && [ -n "$SUBNET2_ID" ]; then
  import_resource aws_route_table_association.subnet2 "${SUBNET2_ID}/${ROUTE_TABLE_ID}"
fi

SG_ALB_ID=$(aws ec2 describe-security-groups --filters "Name=group-name,Values=kerala-alb-sg" --query 'SecurityGroups[0].GroupId' --output text 2>/dev/null || true)
import_resource aws_security_group.alb_sg "$SG_ALB_ID"

SG_ECS_ID=$(aws ec2 describe-security-groups --filters "Name=group-name,Values=kerala-ecs-sg" --query 'SecurityGroups[0].GroupId' --output text 2>/dev/null || true)
import_resource aws_security_group.ecs_sg "$SG_ECS_ID"

ALB_ARN=$(aws elbv2 describe-load-balancers --names kerala-alb-v2 --query 'LoadBalancers[0].LoadBalancerArn' --output text 2>/dev/null || true)
import_resource aws_lb.alb "$ALB_ARN"

BLUE_TG_ARN=$(aws elbv2 describe-target-groups --names kerala-blue-tg --query 'TargetGroups[0].TargetGroupArn' --output text 2>/dev/null || true)
import_resource aws_lb_target_group.blue "$BLUE_TG_ARN"

GREEN_TG_ARN=$(aws elbv2 describe-target-groups --names kerala-green-tg --query 'TargetGroups[0].TargetGroupArn' --output text 2>/dev/null || true)
import_resource aws_lb_target_group.green "$GREEN_TG_ARN"

if [ -n "$ALB_ARN" ]; then
  HTTP_LISTENER_ARN=$(aws elbv2 describe-listeners --load-balancer-arn "$ALB_ARN" --query 'Listeners[?Port==`80`].ListenerArn | [0]' --output text 2>/dev/null || true)
  import_resource aws_lb_listener.http "$HTTP_LISTENER_ARN"

  HTTPS_LISTENER_ARN=$(aws elbv2 describe-listeners --load-balancer-arn "$ALB_ARN" --query 'Listeners[?Port==`443`].ListenerArn | [0]' --output text 2>/dev/null || true)
  import_resource aws_lb_listener.https "$HTTPS_LISTENER_ARN"

  HTTPS_TEST_LISTENER_ARN=$(aws elbv2 describe-listeners --load-balancer-arn "$ALB_ARN" --query 'Listeners[?Port==`8443`].ListenerArn | [0]' --output text 2>/dev/null || true)
  import_resource aws_lb_listener.https_test "$HTTPS_TEST_LISTENER_ARN"
fi

import_resource aws_ecs_cluster.main "kerala-tours-cluster-v2"

ECS_ROLE_ID=$(query iam get-role --role-name kerala-ecs-task-execution-role-v2 Role.RoleName)
import_resource aws_iam_role.ecs_task_execution "$ECS_ROLE_ID"

if state_has aws_iam_role.ecs_task_execution; then
  import_resource aws_iam_role_policy_attachment.ecs_task_execution "kerala-ecs-task-execution-role-v2/arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
fi

import_resource aws_cloudwatch_log_group.ecs "/ecs/kerala-tours-v2"

ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name "$DOMAIN_NAME" --query 'HostedZones[0].Id' --output text 2>/dev/null || true)
if [ -n "$ZONE_ID" ] && [[ "$ZONE_ID" == /hostedzone/* ]]; then
  ZONE_ID="${ZONE_ID#/hostedzone/}"
fi
import_resource aws_route53_zone.main "$ZONE_ID"

if [ -n "$ZONE_ID" ]; then
  import_resource aws_route53_record.root "${ZONE_ID}_${DOMAIN_NAME}_A"
  import_resource aws_route53_record.www "${ZONE_ID}_${WWW_DOMAIN}_A"
fi

echo "✅ Import helper finished. Review any warnings above and then proceed with terraform apply."

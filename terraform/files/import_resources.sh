#!/bin/bash
set -e

echo "Importing existing subnets..."
terraform import aws_subnet.subnet1 subnet-0739ab30adce3b0d6 < /dev/null 2>&1 || echo "Subnet1 import message passed"
terraform import aws_subnet.subnet2 subnet-0ff769d125ddbe5b9 < /dev/null 2>&1 || echo "Subnet2 import message passed"

echo "Importing existing CodeDeploy and IAM resources..."
terraform import aws_codedeploy_app.app kerala-tours-app < /dev/null 2>&1 || echo "CodeDeploy app import attempted"
terraform import aws_iam_role.codedeploy_role kerala-codedeploy-role < /dev/null 2>&1 || echo "CodeDeploy role import attempted"

echo "Import process completed!"
terraform state list | head -30

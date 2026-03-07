#!/bin/bash

# Enhanced Terraform deployment script with monitoring and validation

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TERRAFORM_DIR="$SCRIPT_DIR/terraform"
LOG_FILE="$SCRIPT_DIR/deployment.log"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

# Print banner
print_banner() {
    echo -e "${BLUE}"
    echo "╔═══════════════════════════════════════════════════════════╗"
    echo "║         KERALA TOURS - ECS DEPLOYMENT SCRIPT             ║"
    echo "║                  Terraform + Ansible                     ║"
    echo "╚═══════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Pre-flight checks
preflight_checks() {
    info "Running pre-flight checks..."
    
    # Check for required tools
    local required_tools=("terraform" "aws" "ansible" "docker")
    for tool in "${required_tools[@]}"; do
        if ! command -v "$tool" &> /dev/null; then
            error "$tool is not installed"
            exit 1
        fi
    done
    
    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        error "AWS credentials not configured"
        exit 1
    fi
    
    # Check Terraform files
    if [ ! -d "$TERRAFORM_DIR" ]; then
        error "Terraform directory not found at $TERRAFORM_DIR"
        exit 1
    fi
    
    success "All pre-flight checks passed!"
}

# Initialize Terraform
init_terraform() {
    info "Initializing Terraform..."
    cd "$TERRAFORM_DIR"
    
    terraform init
    
    success "Terraform initialization completed!"
}

# Validate Terraform configuration
validate_terraform() {
    info "Validating Terraform configuration..."
    cd "$TERRAFORM_DIR"
    
    terraform validate
    
    success "Terraform configuration is valid!"
}

# Plan Terraform deployment
plan_terraform() {
    info "Planning Terraform deployment..."
    cd "$TERRAFORM_DIR"
    
    local plan_file="terraform_${TIMESTAMP}.tfplan"
    terraform plan -out="$plan_file" -var-file="terraform.tfvars"
    
    info "Plan file saved: $plan_file"
}

# Apply Terraform configuration
apply_terraform() {
    info "Applying Terraform configuration..."
    cd "$TERRAFORM_DIR"
    
    # Ask for confirmation
    read -p "Do you want to apply these changes? (yes/no): " confirm
    if [ "$confirm" != "yes" ]; then
        warning "Deployment cancelled"
        exit 0
    fi
    
    terraform apply -auto-approve -var-file="terraform.tfvars"
    
    success "Terraform apply completed!"
}

# Get Terraform outputs
get_terraform_outputs() {
    info "Retrieving Terraform outputs..."
    cd "$TERRAFORM_DIR"
    
    echo ""
    echo "=== TERRAFORM OUTPUTS ==="
    terraform output -json | jq '.' | tee -a "$LOG_FILE"
    echo ""
}

# Deploy with Ansible
deploy_with_ansible() {
    info "Running Ansible deployment playbook..."
    
    cd "$SCRIPT_DIR"
    
    ansible-playbook \
        -i "localhost," \
        -c local \
        "Ansible/deploy_ecs.yml" \
        -v
    
    success "Ansible deployment completed!"
}

# Verify deployment
verify_deployment() {
    info "Verifying deployment..."
    
    local app_name="kerala-toors"
    local region="ap-south-1"
    
    # Check ECS cluster
    info "Checking ECS cluster status..."
    local ecs_status=$(aws ecs describe-clusters \
        --clusters "$app_name-cluster" \
        --region "$region" \
        --query 'clusters[0].status' \
        --output text)
    
    if [ "$ecs_status" = "ACTIVE" ]; then
        success "ECS cluster is ACTIVE"
    else
        error "ECS cluster status: $ecs_status"
        return 1
    fi
    
    # Check ECS service
    info "Checking ECS service status..."
    local service_status=$(aws ecs describe-services \
        --cluster "$app_name-cluster" \
        --services "$app_name-service" \
        --region "$region" \
        --query 'services[0].status' \
        --output text)
    
    if [ "$service_status" = "ACTIVE" ]; then
        success "ECS service is ACTIVE"
    else
        error "ECS service status: $service_status"
        return 1
    fi
    
    # Check ALB
    info "Checking ALB status..."
    local alb_state=$(aws elbv2 describe-load-balancers \
        --region "$region" \
        --query 'LoadBalancers[0].State.Code' \
        --output text)
    
    if [ "$alb_state" = "active" ]; then
        success "Load Balancer is ACTIVE"
    else
        error "Load Balancer state: $alb_state"
        return 1
    fi
    
    # Get Application URL
    local app_url=$(cd "$TERRAFORM_DIR" && terraform output -raw application_url)
    echo ""
    success "Application is accessible at: $app_url"
    echo ""
}

# Cleanup function
cleanup() {
    info "Deployment process finished"
    log "Full deployment log available at: $LOG_FILE"
}

# Main execution
main() {
    trap cleanup EXIT
    
    print_banner
    
    log "Starting deployment at $(date)"
    
    preflight_checks
    init_terraform
    validate_terraform
    plan_terraform
    apply_terraform
    get_terraform_outputs
    deploy_with_ansible
    verify_deployment
    
    success "✓ Deployment completed successfully!"
    echo ""
    warning "Next Steps:"
    echo "1. Update SNS email in monitoring.tf"
    echo "2. Configure Route53 nameservers with your domain registrar"
    echo "3. Wait 24-48 hours for DNS propagation"
    echo "4. Monitor CloudWatch dashboard"
}

# Run main function
main "$@"

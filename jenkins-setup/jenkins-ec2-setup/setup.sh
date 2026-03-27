#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Master Script: Launch EC2 with Terraform + Configure with Ansible
# ═══════════════════════════════════════════════════════════════
set -e

# ── Colors ─────────────────────────────────────────────────────
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ── Configuration ───────────────────────────────────────────────
AWS_REGION="ap-south-1"
KEY_NAME="your-key-name"          # ← Change this to your AWS key pair name
KEY_PATH="~/.ssh/${KEY_NAME}.pem" # ← Path to your .pem file

echo -e "${BLUE}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Jenkins Setup: Terraform + Ansible"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${NC}"

# ── Check Requirements ──────────────────────────────────────────
echo -e "${YELLOW}🔍 Checking requirements...${NC}"

check_tool() {
  if ! command -v $1 &> /dev/null; then
    echo -e "${RED}❌ $1 is not installed. Please install it first.${NC}"
    exit 1
  else
    echo -e "${GREEN}✅ $1 found${NC}"
  fi
}

check_tool terraform
check_tool ansible
check_tool aws

# ── Check AWS credentials ───────────────────────────────────────
echo -e "\n${YELLOW}🔐 Checking AWS credentials...${NC}"
aws sts get-caller-identity > /dev/null 2>&1 && \
  echo -e "${GREEN}✅ AWS credentials valid${NC}" || \
  { echo -e "${RED}❌ AWS credentials not configured. Run: aws configure${NC}"; exit 1; }

# ══════════════════════════════════════════════════════════════
# PHASE 1: TERRAFORM — Create EC2 Infrastructure
# ══════════════════════════════════════════════════════════════
echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  PHASE 1: Terraform - Creating EC2"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

cd terraform/

# Create terraform.tfvars if not exists
if [ ! -f terraform.tfvars ]; then
  cat > terraform.tfvars <<EOF
aws_region    = "${AWS_REGION}"
key_name      = "${KEY_NAME}"
instance_type = "t3.medium"
environment   = "production"
EOF
  echo -e "${GREEN}✅ Created terraform.tfvars${NC}"
fi

echo -e "${YELLOW}⚙️  Initializing Terraform...${NC}"
terraform init

echo -e "\n${YELLOW}📋 Planning infrastructure...${NC}"
terraform plan

echo -e "\n${YELLOW}🚀 Applying Terraform...${NC}"
terraform apply -auto-approve

# Get outputs
JENKINS_IP=$(terraform output -raw jenkins_public_ip)
JENKINS_URL=$(terraform output -raw jenkins_url)
SSH_CMD=$(terraform output -raw ssh_command)

echo -e "\n${GREEN}✅ EC2 Created!"
echo "   IP  : $JENKINS_IP"
echo -e "   URL : $JENKINS_URL${NC}"

cd ..

# ══════════════════════════════════════════════════════════════
# PHASE 2: Wait for EC2 to be Ready
# ══════════════════════════════════════════════════════════════
echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  PHASE 2: Waiting for EC2 to boot"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "${YELLOW}⏳ Waiting 60 seconds for EC2 to fully boot...${NC}"
for i in $(seq 1 60); do
  echo -ne "\r   Progress: $i/60 seconds"
  sleep 1
done
echo ""

# Wait for SSH to be available
echo -e "\n${YELLOW}⏳ Waiting for SSH to be available...${NC}"
until ssh -i ${KEY_PATH} -o StrictHostKeyChecking=no \
  -o ConnectTimeout=5 ubuntu@${JENKINS_IP} "echo ready" 2>/dev/null; do
  echo "   SSH not ready yet, retrying in 10s..."
  sleep 10
done
echo -e "${GREEN}✅ SSH is ready!${NC}"

# ══════════════════════════════════════════════════════════════
# PHASE 3: ANSIBLE — Install Jenkins and Tools
# ══════════════════════════════════════════════════════════════
echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  PHASE 3: Ansible - Installing Jenkins"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

cd ansible/

echo -e "${YELLOW}🔧 Running Ansible playbook...${NC}"
ansible-playbook \
  -i inventory.ini \
  playbook.yml \
  --private-key ${KEY_PATH} \
  -v

cd ..

# ══════════════════════════════════════════════════════════════
# DONE
# ══════════════════════════════════════════════════════════════
echo -e "\n${GREEN}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ Jenkins Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🌐 Jenkins URL : $JENKINS_URL"
echo "  🖥️  SSH Command : $SSH_CMD"
echo ""
echo "  Next Steps:"
echo "  1. Open $JENKINS_URL in browser"
echo "  2. Use the password shown above"
echo "  3. Install suggested plugins"
echo "  4. Create your pipeline job"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${NC}"
#!/bin/bash

# Destroy Terraform resources (with confirmation)

set -e

TERRAFORM_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/terraform" && pwd)"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${RED}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║     WARNING: THIS WILL DESTROY ALL ECS RESOURCES         ║"
echo "║                  Kerala Tours Application                ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo ""
read -p "Type 'destroy' to confirm: " confirm

if [ "$confirm" != "destroy" ]; then
    echo -e "${GREEN}Destruction cancelled${NC}"
    exit 0
fi

read -p "Are you absolutely sure? Type 'yes': " confirm2

if [ "$confirm2" != "yes" ]; then
    echo -e "${GREEN}Destruction cancelled${NC}"
    exit 0
fi

echo -e "${YELLOW}Destroying all resources...${NC}"

cd "$TERRAFORM_DIR"
terraform destroy -auto-approve

echo -e "${GREEN}✓ All resources have been destroyed${NC}"

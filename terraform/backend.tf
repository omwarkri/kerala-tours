# Terraform Backend Configuration (optional but recommended)
# Uncomment and configure to store state remotely

# terraform {
#   backend "s3" {
#     bucket         = "kerala-toors-terraform-state"
#     key            = "prod/terraform.tfstate"
#     region         = "ap-south-1"
#     encrypt        = true
#     dynamodb_table = "terraform-locks"
#   }
# }

# To use S3 backend:
# 1. Create S3 bucket: aws s3 mb s3://kerala-toors-terraform-state --region ap-south-1
# 2. Enable versioning: aws s3api put-bucket-versioning --bucket kerala-toors-terraform-state --versioning-configuration Status=Enabled
# 3. Create DynamoDB table: aws dynamodb create-table --table-name terraform-locks --attribute-definitions AttributeName=LockID,AttributeType=S --key-schema AttributeName=LockID,KeyType=HASH --billing-mode PAY_PER_REQUEST --region ap-south-1
# 4. Uncomment above configuration
# 5. Run: terraform init

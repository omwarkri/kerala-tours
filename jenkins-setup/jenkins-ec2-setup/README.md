# Jenkins EC2 Setup

This project provides a complete setup for deploying Jenkins on an AWS EC2 instance using Terraform for infrastructure provisioning and Ansible for configuration management.

## Project Structure

```
jenkins-ec2-setup
├── terraform
│   ├── main.tf            # Main Terraform configuration for AWS resources
│   ├── variables.tf       # Variables used in Terraform configuration
│   ├── outputs.tf         # Outputs from Terraform configuration
│   └── terraform.tfvars    # Variable values for customization
├── ansible
│   ├── inventory.ini      # Ansible inventory file for managing hosts
│   ├── playbook.yml       # Main Ansible playbook for Jenkins installation
│   └── roles
│       └── jenkins
│           ├── tasks
│           │   └── main.yml        # Tasks for installing Jenkins and dependencies
│           ├── handlers
│           │   └── main.yml        # Handlers for service management
│           └── templates
│               └── jenkins.service.j2 # Jinja2 template for Jenkins service configuration
├── setup.sh               # Master script for automating the setup process
└── README.md              # Project documentation
```

## Prerequisites

Before running the setup, ensure you have the following installed:

- [Terraform](https://www.terraform.io/downloads.html)
- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
- [AWS CLI](https://aws.amazon.com/cli/)

## Configuration

1. **AWS Credentials**: Make sure your AWS credentials are configured. You can set them up using the command:
   ```
   aws configure
   ```

2. **Key Pair**: Update the `KEY_NAME` in `terraform/terraform.tfvars` with your AWS key pair name.

## Deployment Instructions

1. **Run the Setup Script**: Execute the `setup.sh` script to provision the EC2 instance and install Jenkins.
   ```
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Access Jenkins**: Once the setup is complete, you will see the Jenkins URL in the output. Open it in your web browser.

3. **Initial Setup**: Follow the on-screen instructions to complete the Jenkins setup, including installing suggested plugins and creating your first pipeline job.

## Notes

- Ensure that your security group allows inbound traffic on the necessary ports (e.g., 8080 for Jenkins).
- Modify the Terraform and Ansible configurations as needed to suit your requirements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
# Jenkins Setup Project

This project automates the setup of a Jenkins application on an AWS EC2 instance using Terraform and Ansible.

## Project Structure

```
jenkins-setup
├── terraform
│   ├── main.tf          # Main Terraform configuration file
│   ├── variables.tf     # Input variables for Terraform
│   ├── outputs.tf       # Outputs from Terraform
│   └── terraform.tfvars  # Variable values for Terraform
├── ansible
│   ├── inventory.ini    # Ansible inventory file
│   ├── playbook.yml     # Ansible playbook for Jenkins installation
│   └── roles
│       └── jenkins
│           ├── tasks
│           │   └── main.yml  # Tasks for Jenkins role
│           ├── handlers
│           │   └── main.yml  # Handlers for Jenkins role
│           └── templates
│               └── jenkins_config.j2  # Jinja2 template for Jenkins config
├── setup.sh             # Shell script to automate the setup process
└── README.md            # Documentation for the project
```

## Prerequisites

Before running the setup, ensure you have the following installed:

- [Terraform](https://www.terraform.io/downloads.html)
- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
- [AWS CLI](https://aws.amazon.com/cli/)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd jenkins-setup
   ```

2. **Configure AWS CLI**:
   Run the following command to configure your AWS credentials:
   ```bash
   aws configure
   ```

3. **Modify the setup script**:
   Edit `setup.sh` to set your AWS key pair name in the `KEY_NAME` variable.

4. **Run the setup script**:
   Execute the setup script to create the EC2 instance and install Jenkins:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

5. **Access Jenkins**:
   After the setup is complete, open the Jenkins URL provided in the output of the setup script in your web browser.

## Next Steps

- Follow the on-screen instructions in Jenkins to set up your first job.
- Explore Jenkins plugins to enhance your CI/CD pipeline.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
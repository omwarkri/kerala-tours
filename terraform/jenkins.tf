data "aws_ami" "amazon_linux_2023" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-x86_64"]
  }
}

resource "aws_security_group" "jenkins" {
  count       = var.create_jenkins_server ? 1 : 0
  name        = "${var.app_name}-jenkins-sg"
  description = "Security group for Jenkins EC2"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.jenkins_allowed_ssh_cidrs
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = var.jenkins_allowed_ui_cidrs
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.app_name}-jenkins-sg"
  }
}

resource "aws_iam_role" "jenkins" {
  count = var.create_jenkins_server ? 1 : 0
  name  = "${var.app_name}-jenkins-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "jenkins_ssm" {
  count      = var.create_jenkins_server ? 1 : 0
  role       = aws_iam_role.jenkins[0].name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_role_policy_attachment" "jenkins_ecr" {
  count      = var.create_jenkins_server ? 1 : 0
  role       = aws_iam_role.jenkins[0].name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser"
}

resource "aws_iam_role_policy_attachment" "jenkins_ecs" {
  count      = var.create_jenkins_server ? 1 : 0
  role       = aws_iam_role.jenkins[0].name
  policy_arn = "arn:aws:iam::aws:policy/AmazonECS_FullAccess"
}

resource "aws_iam_role_policy" "jenkins_passrole" {
  count = var.create_jenkins_server ? 1 : 0
  name  = "${var.app_name}-jenkins-passrole"
  role  = aws_iam_role.jenkins[0].id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = ["iam:PassRole"]
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_instance_profile" "jenkins" {
  count = var.create_jenkins_server ? 1 : 0
  name  = "${var.app_name}-jenkins-instance-profile"
  role  = aws_iam_role.jenkins[0].name
}

resource "aws_instance" "jenkins" {
  count                       = var.create_jenkins_server ? 1 : 0
  ami                         = data.aws_ami.amazon_linux_2023.id
  instance_type               = var.jenkins_instance_type
  subnet_id                   = aws_subnet.public_1.id
  vpc_security_group_ids      = [aws_security_group.jenkins[0].id]
  key_name                    = var.jenkins_key_name
  iam_instance_profile        = aws_iam_instance_profile.jenkins[0].name
  associate_public_ip_address = true

  user_data = templatefile("${path.module}/jenkins_user_data.sh.tftpl", {
    jenkins_admin_username = var.jenkins_admin_username
    jenkins_admin_password = var.jenkins_admin_password
    project_git_url        = var.project_git_url
    project_git_branch     = var.project_git_branch
  })

  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }

  tags = {
    Name = "${var.app_name}-jenkins"
  }
}

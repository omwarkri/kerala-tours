provider "aws" {
  region = var.aws_region
}

resource "aws_key_pair" "deployed_key" {
  key_name   = var.key_name
  public_key = file("~/.ssh/${var.key_name}.pub")
}

resource "aws_instance" "jenkins" {
  ami           = "ami-0c55b159cbfafe1f0" # Replace with the desired AMI ID
  instance_type = var.instance_type
  key_name      = aws_key_pair.deployed_key.key_name

  tags = {
    Name = "Jenkins-Instance"
  }

  provisioner "remote-exec" {
    inline = [
      "echo 'Provisioning Jenkins instance...'",
      "sudo apt-get update",
      "sudo apt-get install -y openjdk-11-jdk",
      "sudo apt-get install -y wget",
      "wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -",
      "echo deb http://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list",
      "sudo apt-get update",
      "sudo apt-get install -y jenkins"
    ]
  }
}

output "jenkins_public_ip" {
  value = aws_instance.jenkins.public_ip
}

output "jenkins_url" {
  value = "http://${aws_instance.jenkins.public_ip}:8080"
}

output "ssh_command" {
  value = "ssh -i ${var.key_name}.pem ubuntu@${aws_instance.jenkins.public_ip}"
}
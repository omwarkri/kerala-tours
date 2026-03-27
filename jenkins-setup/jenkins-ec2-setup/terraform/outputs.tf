output "jenkins_public_ip" {
  description = "The public IP address of the Jenkins EC2 instance"
  value       = aws_instance.jenkins_instance.public_ip
}

output "jenkins_url" {
  description = "The URL to access Jenkins"
  value       = "http://${aws_instance.jenkins_instance.public_ip}:8080"
}

output "ssh_command" {
  description = "SSH command to connect to the Jenkins EC2 instance"
  value       = "ssh -i ${var.key_name}.pem ubuntu@${aws_instance.jenkins_instance.public_ip}"
}
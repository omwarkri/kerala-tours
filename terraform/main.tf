provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "react_server" {
  ami           = "ami-xxxxxxxx"
  instance_type = "t2.micro"
  key_name      = "my-key"

  tags = {
    Name = "React-Server"
  }
}

output "public_ip" {
  value = aws_instance.react_server.public_ip
}
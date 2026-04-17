# DevOps Interview Preparation For This Project

## 1. How To Use This File

This file is written in simple language for interview preparation.

It contains:

1. Important DevOps interview questions
2. Scenario-based questions
3. Easy and detailed answers
4. Project-based answers you can speak in interviews

## 2. Project Introduction Answer For Interview

### Q1. Explain your project.

Answer:

I worked on a Kerala tourism website project. The frontend was built using React. I containerized the application using Docker and served it through Nginx. For CI/CD, I used Jenkins to automate code checkout, dependency installation, frontend build, Docker image build, image push to Amazon ECR, and Terraform deployment. The application was deployed on AWS ECS Fargate behind an Application Load Balancer. I used Route 53 for domain mapping, ACM for SSL certificates, and CloudWatch for logging and monitoring. The domain for the application is `kerala-tours.co.in`.

## 3. Important DevOps Interview Questions And Answers

### Q2. What is DevOps?

Answer:

DevOps is a way of working where development and operations teams collaborate to build, test, release, and maintain software faster and more reliably. It focuses on automation, continuous integration, continuous delivery, monitoring, and fast feedback.

### Q3. What is CI/CD?

Answer:

CI means Continuous Integration. Developers frequently merge code changes into a central repository, and automated checks or builds are run.

CD can mean Continuous Delivery or Continuous Deployment.

- Continuous Delivery means code is always ready for release.
- Continuous Deployment means code is automatically deployed to production after passing checks.

In this project, Jenkins pipeline performs CI/CD steps like build, Docker image creation, push to ECR, and Terraform deployment.

### Q4. Why did you use Docker?

Answer:

I used Docker to package the application and its runtime dependencies into a standard container image. This helps because the application runs in the same way in local, testing, and production environments.

Benefits:

1. Consistent environment
2. Easy deployment
3. Better portability
4. Good integration with ECS

### Q5. What is a Docker image and container?

Answer:

A Docker image is a packaged template that includes application code, dependencies, and instructions to run the app.

A container is the running instance of that image.

Simple example:

- Image is like a class template
- Container is like the running object

### Q6. What is the use of Nginx in your project?

Answer:

Nginx is used as the web server inside the container to serve the React production build. It also handles SPA routing, static file caching, security headers, and health check endpoint.

### Q7. Why did you use ECS Fargate?

Answer:

I used ECS Fargate because I wanted to run containers without managing EC2 servers directly.

Advantages:

1. No server management
2. Easy scaling
3. Better focus on application and deployment
4. AWS-managed runtime for containers

### Q8. What is Amazon ECR?

Answer:

Amazon ECR is a container image registry service. It stores Docker images securely and integrates well with ECS.

In this project, Jenkins pushes the application image to ECR, and ECS pulls the image from ECR to run the application.

### Q9. What is Terraform?

Answer:

Terraform is an Infrastructure as Code tool. It allows us to define cloud infrastructure in code files and then create or update resources automatically.

In this project, Terraform manages ECS, ALB, Route 53, ACM, security groups, IAM roles, and related resources.

### Q10. Why is Infrastructure as Code important?

Answer:

Infrastructure as Code is important because:

1. Infrastructure becomes version controlled
2. Environment creation becomes repeatable
3. Human error is reduced
4. Changes can be reviewed before apply
5. Disaster recovery becomes easier

### Q11. What is Jenkins?

Answer:

Jenkins is an automation server used for CI/CD. It automates repetitive tasks like pulling code, building applications, running scripts, building Docker images, and deploying infrastructure.

In this project, Jenkins automates the end-to-end release flow.

### Q12. What is an Application Load Balancer?

Answer:

An Application Load Balancer distributes incoming traffic across healthy targets. It can also terminate HTTPS and route traffic to different target groups.

In this project, ALB receives traffic from the domain and forwards it to ECS tasks.

### Q13. What is Route 53?

Answer:

Route 53 is AWS DNS service. It maps a domain name to AWS resources.

In this project, Route 53 points `kerala-tours.co.in` to the Application Load Balancer.

### Q14. What is ACM?

Answer:

ACM means AWS Certificate Manager. It is used to create and manage SSL/TLS certificates.

In this project, ACM provides the certificate for HTTPS on the domain.

### Q15. What is a health check in ECS and ALB?

Answer:

A health check is used to verify whether an application is running properly.

In this project:

1. Nginx exposes `/health`
2. ECS container health check uses localhost
3. ALB health check calls `/health`

If the app is unhealthy, traffic is not sent to that task.

### Q16. What is blue-green deployment?

Answer:

Blue-green deployment is a release strategy where two environments are kept:

- Blue = current live version
- Green = new version

Traffic is shifted from blue to green after validation.

In this project, blue and green target groups are configured with CodeDeploy style deployment setup.

## 4. Scenario-Based Interview Questions And Answers

### Q17. Your website is showing 503. What will you check?

Answer:

I will check step by step:

1. Check whether ALB target group has healthy targets.
2. Check ECS service running, pending, and desired task counts.
3. Check ECS task stopped reasons.
4. Check CloudWatch logs for container errors.
5. Check whether the correct Docker image was deployed.
6. Check health check path and application port.
7. Check security groups and listener rules if needed.

In this project, the 503 happened because the application container crashed, so ALB had no healthy target.

### Q18. Tell me about a production issue you solved.

Answer:

In my project, the domain started showing 503 Service Temporarily Unavailable. I investigated ECS service status, target group health, and CloudWatch logs. I found that the ECS service was pulling the `latest` image tag from ECR, but that tag was pointing to an older broken image. Inside the container, Nginx failed with a permission denied error while binding to port 80. Because the container kept crashing, ALB had no healthy targets and returned 503. I identified a working image tag, retagged it as `latest`, pushed it to ECR, and verified that ECS tasks became healthy again. I also updated the Jenkins pipeline to always push both build-number and `latest` tags so this issue would not happen again.

### Q19. If a Docker container is restarting continuously, what will you do?

Answer:

I will follow this process:

1. Check container logs
2. Check application startup errors
3. Check port conflicts
4. Check entrypoint and command
5. Check file permissions
6. Check environment variables
7. Check health check configuration

If the app is in ECS, I will also check CloudWatch logs and ECS task stopped reason.

### Q20. What will you do if ECS tasks are failing health checks?

Answer:

I will verify:

1. Correct application port
2. Correct health check path
3. App startup timing
4. Security group rules
5. Whether the application is listening on the expected interface and port
6. Whether the app returns 200 for health check

If startup is slow, I may increase health check grace period or start period.

### Q21. If Jenkins build fails, how do you troubleshoot?

Answer:

I check:

1. Jenkins console output
2. Failed stage name
3. Tool availability like node, npm, docker, aws, terraform
4. Credentials configuration
5. Network access to GitHub, ECR, and AWS
6. Script syntax or command failure

Then I fix the failed step and rerun the pipeline.

### Q22. What if Terraform apply fails because a resource already exists?

Answer:

I check whether the resource was manually created earlier. If yes, I should not blindly recreate it. I can:

1. Import the existing resource into Terraform state
2. Use data sources if the resource should only be referenced
3. Adjust configuration to avoid duplicate creation

This project already contains import handling for some existing AWS resources.

### Q23. What if a new deployment works locally but fails in production?

Answer:

I compare both environments:

1. Image version
2. Environment variables
3. Ports
4. Permissions
5. Health checks
6. Networking
7. Container user
8. Logs

In production, small issues like permissions or port binding can break the deployment even when local testing succeeds.

### Q24. How do you roll back a bad deployment?

Answer:

Rollback depends on the deployment method.

Possible rollback ways:

1. Redeploy previous working Docker image tag
2. Update ECS service or deployment pipeline to use old image
3. Use blue-green setup to shift traffic back
4. Revert code and trigger pipeline again

In this project, using a known-good ECR image tag helped recover the service quickly.

### Q25. What if domain is not opening but ECS task is running?

Answer:

I will check:

1. ALB listener configuration
2. Target group health
3. Route 53 DNS records
4. ACM certificate validation
5. Security groups
6. Whether traffic is reaching the target group

Running task alone does not mean the application is reachable.

## 5. Real Project-Based Questions You May Face

### Q26. What services did you use in AWS in this project?

Answer:

I used:

1. ECS Fargate
2. ECR
3. ALB
4. Route 53
5. ACM
6. IAM
7. CloudWatch
8. VPC-related networking

### Q27. Why did you use both ECS and ALB?

Answer:

ECS runs the application containers. ALB receives user traffic and forwards it to healthy ECS tasks. ALB also helps with HTTPS, health checks, and load balancing.

### Q28. Why did you not deploy directly on EC2?

Answer:

ECS Fargate reduces server management work. I did not need to maintain EC2 instances for application hosting. This makes deployment simpler and more cloud-native.

### Q29. What improvements can you add in the future?

Answer:

Future improvements:

1. Add automated tests in Jenkins pipeline
2. Add image scanning for security
3. Add separate dev, staging, and production environments
4. Add rollback automation
5. Add CloudWatch dashboards
6. Add WAF for web security
7. Use GitHub webhook to trigger Jenkins automatically

## 6. Simple One-Line Answers For Quick Revision

### Q30. What is Docker?

Answer:

Docker is a platform used to package and run applications inside containers.

### Q31. What is Terraform?

Answer:

Terraform is an Infrastructure as Code tool used to create and manage infrastructure through code.

### Q32. What is Jenkins?

Answer:

Jenkins is a CI/CD automation tool used to build, test, and deploy applications.

### Q33. What is ECR?

Answer:

ECR is AWS container registry used to store Docker images.

### Q34. What is ECS?

Answer:

ECS is AWS container orchestration service used to run and manage containers.

### Q35. What is ALB?

Answer:

ALB is a load balancer that routes incoming application traffic to healthy backend targets.

### Q36. What is Route 53?

Answer:

Route 53 is AWS DNS service used to map domain names to infrastructure.

### Q37. What is ACM?

Answer:

ACM is AWS service used to create and manage SSL certificates.

## 7. Interview Tips For This Project

When you explain this project in an interview:

1. Start with the business purpose of the app.
2. Explain the frontend stack briefly.
3. Explain Docker and Nginx setup.
4. Explain Jenkins pipeline stage by stage.
5. Explain Terraform and AWS services used.
6. Mention the 503 production issue and how you solved it.
7. Explain what you learned from that incident.

## 8. Best Production Incident Answer Format

Use this format in interviews:

1. Problem
2. Impact
3. Investigation
4. Root cause
5. Fix
6. Prevention

Example from this project:

1. Problem: Website returned 503.
2. Impact: Users could not open the website.
3. Investigation: Checked ECS, target group, logs, and image tags.
4. Root cause: Broken `latest` image caused Nginx port binding failure.
5. Fix: Retagged good image and restored healthy ECS tasks.
6. Prevention: Updated Jenkins to always push both build tag and `latest`.

## 9. Final Summary Answer

If the interviewer asks for a summary, you can say:

I built a React-based tourism website and handled its complete DevOps lifecycle. I containerized the app with Docker, served it with Nginx, automated deployment using Jenkins, stored images in ECR, deployed containers on ECS Fargate, managed infrastructure using Terraform, mapped the custom domain using Route 53, enabled HTTPS with ACM, and monitored the system using CloudWatch. I also solved a real production 503 issue by tracing the problem from ALB to ECS logs and fixing the image tagging process.

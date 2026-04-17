# Travels Toors Project Documentation

## 1. Project Overview

This project is a tourism website for Kerala. The purpose of the project is to show destinations, tour packages, travel experiences, and contact information in a modern web application.

This project is not only a frontend application. It also includes complete deployment and DevOps work:

- React frontend for the website
- Docker for containerization
- Nginx for serving the production build
- Jenkins for CI/CD pipeline
- Amazon ECR for storing Docker images
- Amazon ECS Fargate for running containers
- Application Load Balancer for traffic routing
- Route 53 for domain mapping
- ACM for SSL certificate
- Terraform for infrastructure as code
- CloudWatch for logs and monitoring

Domain used in this project:

- `https://kerala-tours.co.in`

## 2. What I Built In This Project

I built a complete end-to-end cloud deployment project for a React application.

Main work done in this project:

1. Created the frontend tourism website using React.
2. Organized pages, reusable components, and data files.
3. Built the production-ready React app.
4. Created a Docker image for the application.
5. Configured Nginx to serve the React build and support SPA routing.
6. Wrote a Jenkins pipeline for automatic build and deployment.
7. Stored Docker images in Amazon ECR.
8. Created AWS infrastructure using Terraform.
9. Deployed the app on ECS Fargate.
10. Configured ALB, HTTPS, Route 53, and ACM.
11. Added health checks and CloudWatch logging.
12. Diagnosed and fixed a production 503 issue.

## 3. Project Structure Summary

Important folders and files:

- `src/` - React application source code
- `public/` - Static public files
- `build/` - Production build output
- `Dockerfile` - Docker image build instructions
- `default.conf` - Nginx configuration for serving the app
- `Jenkinsfile` - CI/CD pipeline definition
- `deploy.sh` - Local build and Docker helper script
- `manual-deploy.sh` - Manual deployment script
- `trigger-jenkins.sh` - Script to trigger Jenkins job
- `terraform/files/` - Infrastructure as code files

## 4. Step By Step Work Done In This Project

### Step 1: Created the frontend application

The frontend was built using React.

Technology used:

- React 19
- React Router
- Tailwind CSS
- Lucide React icons

Frontend tasks completed:

1. Created pages for home, packages, places, contact, and about.
2. Added reusable components such as navigation, footer, FAQ, hero section, and cards.
3. Added static data for tour packages and places.
4. Structured the application in a clean folder-based format.
5. Built responsive UI for users.

### Step 2: Configured local development and build

The application uses npm scripts.

Commands used:

```bash
npm ci
npm start
npm run build
npm run serve
```

Purpose:

- `npm ci` installs dependencies
- `npm start` runs the app in development mode
- `npm run build` creates the optimized production build
- `npm run serve` serves the build locally

### Step 3: Containerized the application using Docker

I used a multi-stage Docker build.

How it works:

1. First stage uses `node:20-alpine`.
2. Dependencies are installed.
3. React app is built.
4. Second stage uses `nginx:alpine`.
5. Build files are copied to `/usr/share/nginx/html`.
6. Custom Nginx config is copied.

Important file:

- `Dockerfile`

Purpose of Docker:

- Same environment everywhere
- Easy deployment
- Easier integration with ECS and ECR

### Step 4: Configured Nginx for production

The React app is served by Nginx.

Important file:

- `default.conf`

What this config does:

1. Listens on port 80.
2. Serves static files from `/usr/share/nginx/html`.
3. Supports React SPA routing using `try_files $uri /index.html`.
4. Adds browser security headers.
5. Adds caching for static assets.
6. Exposes `/health` endpoint for Docker and ECS health checks.

### Step 5: Built helper deployment scripts

I created helper scripts to make work easier.

Files used:

- `deploy.sh`
- `manual-deploy.sh`
- `trigger-jenkins.sh`

What each script does:

`deploy.sh`

- Builds the React app
- Builds the Docker image locally

`manual-deploy.sh`

- Builds Docker image
- Pushes image to ECR
- Imports Terraform resources
- Runs Terraform plan and apply

`trigger-jenkins.sh`

- Calls Jenkins build API
- Triggers the CI/CD pipeline job

### Step 6: Created Jenkins CI/CD pipeline

Important file:

- `Jenkinsfile`

Pipeline stages:

1. Checkout source code from GitHub
2. Verify required tools
3. Install dependencies
4. Build React application
5. Build Docker image
6. Push image to ECR
7. Run Terraform init
8. Run Terraform apply
9. Cleanup Docker resources

What Jenkins achieves:

- Reduces manual work
- Standardizes deployment steps
- Makes releases repeatable
- Integrates app build and infra deployment together

### Step 7: Stored images in Amazon ECR

Amazon ECR is used as the Docker image registry.

What happens:

1. Jenkins logs in to ECR.
2. Docker image is tagged using build number.
3. Docker image is also tagged as `latest`.
4. Both tags are pushed to ECR.

Why this matters:

- Build tag helps trace a release
- `latest` helps fallback or default deployments
- Proper tagging prevents stale image issues

### Step 8: Provisioned AWS infrastructure using Terraform

Important folder:

- `terraform/files/`

Infrastructure created or referenced:

1. VPC and networking references
2. ECS Cluster
3. ECS Task Definition
4. ECS Service
5. IAM role for ECS task execution
6. CloudWatch log group
7. Application Load Balancer
8. Blue and Green target groups
9. HTTPS listeners
10. Route 53 hosted zone and DNS records
11. ACM certificates
12. CodeDeploy deployment group
13. CloudWatch monitoring and alarms

Why Terraform was used:

- Infrastructure is version controlled
- Easy to reproduce environment
- Easy to modify and track changes

### Step 9: Deployed application on ECS Fargate

The app runs in ECS Fargate.

How it works:

1. ECS task definition points to the Docker image in ECR.
2. ECS service runs the desired number of tasks.
3. Tasks use `awsvpc` networking.
4. ALB forwards traffic to ECS tasks.
5. Health checks make sure only healthy tasks receive traffic.

Why Fargate was chosen:

- No server management needed
- Easy scaling
- Good fit for containerized applications

### Step 10: Configured domain and HTTPS

Files involved:

- `terraform/files/main.tf`
- `terraform/files/alb.tf`

What was configured:

1. Route 53 hosted zone for domain
2. DNS records for root and www
3. ACM certificates for SSL
4. ALB HTTPS listener on port 443
5. HTTP to HTTPS redirect on port 80

Result:

- Website is accessible securely at `https://kerala-tours.co.in`

### Step 11: Added logging and monitoring

Monitoring setup includes:

1. ECS container logs in CloudWatch
2. ALB health checks
3. ECS container health checks
4. CloudWatch alarms from monitoring Terraform file

Benefits:

- Faster debugging
- Better visibility into app state
- Easier incident handling

## 5. Production Issue That Happened And How I Fixed It

### Problem

The domain started showing:

- `503 Service Temporarily Unavailable`

### Symptoms

1. Application was not opening from the domain.
2. ECS service had unstable tasks.
3. ALB target group did not have healthy targets.

### Investigation done

I checked:

1. ECS service status
2. ECS task definition
3. ALB target group health
4. CloudWatch logs
5. ECR image tags

### Root cause

The ECS service was using the `latest` image tag.

But `latest` was pointing to an older image where the container ran with the `nginx` user and Nginx failed to bind on port 80.

Error found in logs:

```text
bind() to 0.0.0.0:80 failed (13: Permission denied)
```

Because the container crashed, ECS tasks kept failing and ALB returned 503.

### Fix applied

1. Verified a good image existed in ECR under tag `8`.
2. Retagged that working image as `latest`.
3. Pushed the corrected `latest` tag.
4. Waited for ECS replacement tasks to become healthy.
5. Confirmed the domain returned HTTP 200.

### Prevention added

I updated the Jenkins pipeline so every deployment pushes:

1. Build-number tag
2. `latest` tag

This prevents `latest` from pointing to an outdated or broken image.

## 6. End-To-End Deployment Flow

This is the full project flow in simple terms:

1. Developer writes code in React project.
2. Code is pushed to GitHub.
3. Jenkins pipeline pulls the code.
4. Jenkins installs dependencies.
5. Jenkins builds the React project.
6. Jenkins builds Docker image.
7. Jenkins pushes image to ECR.
8. Jenkins runs Terraform.
9. Terraform updates ECS task definition and infrastructure if needed.
10. ECS runs the new container.
11. ALB health checks the app.
12. Route 53 points domain traffic to ALB.
13. Users access the app through the domain.

## 7. Commands I Used In This Project

### Local frontend

```bash
npm ci
npm start
npm run build
npm run serve
```

### Docker

```bash
docker build -t travels-toors:latest .
docker run -d -p 3000:80 --name travels-toors travels-toors:latest
```

### Terraform

```bash
cd terraform/files
terraform init -input=false
terraform plan
terraform apply -auto-approve
```

### AWS checks

```bash
aws ecs describe-services --cluster kerala-tours-cluster-v2 --services kerala-tours-service-v2 --region ap-south-1
aws ecs describe-task-definition --task-definition kerala-task --region ap-south-1
aws elbv2 describe-target-health --target-group-arn <target-group-arn> --region ap-south-1
aws logs tail /ecs/kerala-tours-v2 --since 2h --region ap-south-1
```

## 8. Key Learning From This Project

Important things learned from this project:

1. Building a frontend app is only one part of a real project.
2. Deployment and infrastructure are equally important.
3. Health checks are critical in ECS and ALB.
4. Wrong image tagging can break production.
5. CloudWatch logs are very important for debugging.
6. Terraform helps manage AWS infrastructure safely.
7. Jenkins makes deployments consistent and repeatable.
8. Domain, SSL, and load balancing are essential in production.

## 9. Short Resume Description For This Project

You can use this in your resume:

Built and deployed a production-ready Kerala tourism web application using React, Docker, Jenkins, Terraform, AWS ECS Fargate, ECR, ALB, Route 53, ACM, and CloudWatch. Implemented CI/CD pipeline, containerized deployment, HTTPS domain routing, infrastructure as code, monitoring, and production troubleshooting for ECS-based workloads.

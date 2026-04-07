# Travels Toors - Kerala Tourism Application

A modern React-based web application for exploring Kerala's beautiful destinations and tour packages.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker (optional, for containerized deployment)

### Installation & Development

```bash
# 1. Install dependencies
npm ci

# 2. Start development server
npm start
```

The application will open at `http://localhost:3000`

## 📦 Scripts

```bash
npm start       # Start development server (port 3000)
npm run build   # Create production build
npm run serve   # Serve production build locally (port 3000)
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t travels-tours:latest .
```

### Run Container

```bash
# Run the app locally on port 3000
docker run -d -p 3000:80 --name travels-toors travels-tours:latest
```

Access at `http://localhost:3000`

If you want to use the local helper script:

```bash
./deploy.sh build   # build the React app
./deploy.sh docker  # build the Docker image
```

## ☁️ AWS ECS Deployment

This repository includes AWS infrastructure under `terraform/files` and a Jenkins pipeline that builds the Docker image, publishes it to Amazon ECR, and deploys ECS + ALB + Route 53 via Terraform.

The application is configured for the custom domain `kerala-tours.co.in` with `www.kerala-tours.co.in` as a secondary alias.

### Jenkins Agent Setup

Before running the pipeline, your Jenkins container or agent must have these tools installed.

#### Option 1: Build a custom Jenkins Docker image

```bash
docker build -t jenkins-kerala -f jenkins.Dockerfile .
```

Run Jenkins with persistent storage and host Docker socket access:

```bash
docker run -d \
  --name jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins-kerala
```

This ensures:
- Jenkins job history and configuration persist in `jenkins_home`
- The Jenkins container can use the host Docker daemon for `docker build`/`docker push`

#### Option 2: Install tools on the host or agent machine

```bash
./jenkins-setup.sh
```

**Required tools:**
- **Node.js 18+** and npm (for React app build)
- **Docker CLI** and access to the Docker daemon
- **AWS CLI v2** (for ECR and Terraform operations)
- **Terraform 1.5+** (for infrastructure deployment)

Required setup:
- AWS CLI credentials configured in Jenkins (`aws-acces-key-id` and `aws-secrete-key-id`)
- Route 53 delegated name servers configured at `kerala-tours.co.in` registrar if the hosted zone is created

### Deploy with Terraform

From the repo root:

```bash
cd terraform/files
terraform init -input=false
terraform apply -auto-approve \
  -var='domain_name=kerala-tours.co.in' \
  -var='www_domain_name=www.kerala-tours.co.in' \
  -var='region=ap-south-1' \
  -var='ecr_image_url=782696281574.dkr.ecr.ap-south-1.amazonaws.com/kerala-toors:latest'
```

The `monitoring.tf` file creates CloudWatch alarms for ECS CPU usage, ALB 5xx errors, and unhealthy targets.

## 🔧 Jenkins Pipeline

The application includes a Jenkins pipeline for automated deployment to AWS using Terraform.

```
Stages:
1. Checkout      - Clone repository
2. Install       - npm ci
3. Build         - npm run build
4. Docker Build  - Build Docker image
5. Publish to ECR - Push image to Amazon ECR
6. Terraform Deploy - Apply infrastructure and ECS deployment
```

### Run Locally

```bash
./deploy.sh build
./deploy.sh docker
```

## 📱 Contact Information

**Phone Numbers:**
- 📞 +91 7620290632
- 📞 +91 8080864204

**WhatsApp:** Available on the same numbers (24/7)

## 📁 Project Structure

```
src/
├── components/
│   ├── common/        # Reusable components
│   ├── HomePage/      # Home page components
│   └── places/        # Place-related components
├── pages/            # Page components
├── data/             # Static data
├── services/         # Service utilities
└── App.js            # Main app component

public/
├── index.html        # HTML entry point
├── manifest.json     # PWA manifest
└── robots.txt        # SEO robots file
```

## 🎨 Technologies

- **Frontend:** React 19, React Router 7, Tailwind CSS 3
- **Icons:** Lucide React
- **Build:** React Scripts 5
- **Server:** Nginx (production)

## 📝 Environment Variables

Create `.env` file (optional):
```env
REACT_APP_API_URL=https://your-api.com
```

## 🚢 Production Deployment

### Using Docker
```bash
docker build -t travels-tours:latest .
# Run with host port 3000 mapped to container port 80
docker run -d -p 3000:80 travels-tours:latest
```

If you want the app to be available on host port 80, use:
```bash
docker run -d -p 80:80 travels-tours:latest
```

### Using Node
```bash
npm run build
npm run serve
```

## 🔐 Security

- `.env` files are not committed
- Sensitive data kept locally
- Uses secure WhatsApp/Call integration

## 📊 Performance

- Optimized production builds
- SEO-friendly structure
- Responsive design for all devices

## 📞 Support

For issues or questions:
- **Call:** +91 7620290632 or +91 8080864204
- **WhatsApp:** Same numbers available 24/7

## 📄 License

This project is maintained by Travels Toors

pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION  = 'ap-south-1'
        AWS_ACCOUNT_ID      = 'YOUR_AWS_ACCOUNT_ID'   // ← change this
        ECR_REPO_NAME       = 'kerala-toors'
        IMAGE_TAG           = "${env.BUILD_NUMBER}"
        ECR_REGISTRY        = "${AWS_ACCOUNT_ID}.dkr.ecr.ap-south-1.amazonaws.com"
        FULL_IMAGE_NAME     = "${ECR_REGISTRY}/${ECR_REPO_NAME}:${IMAGE_TAG}"
    }

    triggers {
        githubPush()
    }

    stages {

        // STEP 1 - Pull latest code from GitHub
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // STEP 2 - Build Docker image from your Dockerfile
        stage('Docker Build') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        echo "Building Docker image..."
                        docker build -t ${ECR_REPO_NAME}:${IMAGE_TAG} .
                    """
                }
            }
        }

        // STEP 3 - Push Docker image to AWS ECR
        stage('Push to ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        echo "Logging into ECR..."
                        aws ecr get-login-password --region ap-south-1 | \
                        docker login --username AWS --password-stdin ${ECR_REGISTRY}

                        echo "Tagging image..."
                        docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${FULL_IMAGE_NAME}

                        echo "Pushing image to ECR..."
                        docker push ${FULL_IMAGE_NAME}

                        echo "Image pushed: ${FULL_IMAGE_NAME}"
                    """
                }
            }
        }

        // STEP 4 - Run Terraform + Ansible to deploy to ECS
        stage('Deploy to ECS') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        export IMAGE_TAG=${IMAGE_TAG}
                        export ECR_IMAGE=${FULL_IMAGE_NAME}
                        chmod +x ./deploy.sh
                        CI=true ./deploy.sh
                    """
                }
            }
        }

    }

    post {
        success {
            echo '✅ App deployed! Check your ALB URL.'
        }
        failure {
            echo '❌ Deployment failed! Check Console Output above.'
        }
    }
}
```

---

## What each stage does now:
```
Stage 1 - Checkout      → pulls code from GitHub
        ↓
Stage 2 - Docker Build  → builds image from your Dockerfile
        ↓
Stage 3 - Push to ECR   → uploads image to AWS ECR
        ↓
Stage 4 - Deploy to ECS → Terraform + Ansible → ECS pulls image → App runs
        ↓
ALB URL → Your React App opens ✅
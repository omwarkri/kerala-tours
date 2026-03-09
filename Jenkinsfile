pipeline {
    agent any
    environment {
        AWS_REGION            = "ap-south-1"
        AWS_ACCOUNT_ID        = "782696281574"
        ECR_REPO              = "react-app"
        IMAGE_TAG             = "latest"
        IMAGE_URI             = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}"
        REPO_DIR              = "kerala-tours"
        // ✅ These pull from Jenkins credentials store
        AWS_ACCESS_KEY_ID     = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
    }
    stages {
        stage('Verify Tools') {
            steps {
                sh '''
                    echo "=== Docker ===" && docker --version
                    echo "=== AWS CLI ===" && aws --version
                    echo "=== Terraform ===" && terraform --version
                    echo "=== AWS Identity ===" && aws sts get-caller-identity
                '''
            }
        }
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Clone Repository') {
            steps {
                sh """
                    git clone --depth 1 \
                        --config http.postBuffer=524288000 \
                        --config http.lowSpeedLimit=0 \
                        --config http.lowSpeedTime=999999 \
                        https://github.com/omwarkri/kerala-tours.git
                """
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${ECR_REPO}:${IMAGE_TAG} ${REPO_DIR}/"
            }
        }
        stage('AWS ECR Login') {
            steps {
                sh """
                    aws ecr get-login-password --region ${AWS_REGION} \
                    | docker login --username AWS --password-stdin \
                      ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                """
            }
        }
        stage('Tag Docker Image') {
            steps {
                sh "docker tag ${ECR_REPO}:${IMAGE_TAG} ${IMAGE_URI}"
            }
        }
        stage('Push Image to ECR') {
            steps {
                sh "docker push ${IMAGE_URI}"
            }
        }
        stage('Terraform Init') {
            steps {
                dir("${REPO_DIR}/terraform") {
                    sh "terraform init"
                }
            }
        }
        stage('Terraform Plan') {
            steps {
                dir("${REPO_DIR}/terraform") {
                    sh "terraform plan"
                }
            }
        }
        stage('Terraform Apply') {
            steps {
                dir("${REPO_DIR}/terraform") {
                    sh "terraform apply -auto-approve"
                }
            }
        }
        stage('Deploy to ECS') {
            steps {
                echo "🚀 Application deployed to ECS via Terraform"
            }
        }
    }
    post {
        success { echo "✅ Pipeline Completed Successfully" }
        failure { echo "❌ Pipeline Failed" }
        always  { cleanWs() }
    }
}
```

---

## How it works
```
Jenkins Credentials Store
        │
        │  credentials('AWS_ACCESS_KEY_ID')
        ▼
  Environment Variable          AWS CLI reads these
  AWS_ACCESS_KEY_ID      ──►    automatically
  AWS_SECRET_ACCESS_KEY  ──►    no extra config needed
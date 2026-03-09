pipeline {
    agent any
    environment {
        AWS_REGION      = "ap-south-1"
        AWS_ACCOUNT_ID  = "782696281574"
        ECR_REPO        = "react-app"
        IMAGE_TAG       = "latest"
        IMAGE_URI       = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:${IMAGE_TAG}"
        REPO_DIR        = "kerala-tours"
    }
    stages {
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
                // ✅ FIX: build context must point to the cloned repo dir
                sh """
                    docker build -t ${ECR_REPO}:${IMAGE_TAG} ${REPO_DIR}/
                """
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
                sh """
                    docker tag ${ECR_REPO}:${IMAGE_TAG} ${IMAGE_URI}
                """
            }
        }

        stage('Push Image to ECR') {
            steps {
                sh """
                    docker push ${IMAGE_URI}
                """
            }
        }

        stage('Terraform Init') {
            steps {
                // ✅ FIX: terraform dir is inside the cloned repo
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
        success {
            echo "✅ CI/CD Pipeline Completed Successfully"
        }
        failure {
            echo "❌ Pipeline Failed"
        }
        always {
            // ✅ FIX: cleanWs() is safe here — we're still inside agent any
            cleanWs()
        }
    }
}
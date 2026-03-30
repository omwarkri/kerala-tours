pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION  = 'ap-south-1'
        AWS_ACCOUNT_ID      = '782696281574'
        ECR_REPO_NAME       = 'kerala-toors'
        IMAGE_TAG           = "${env.BUILD_NUMBER}"
        ECR_REGISTRY        = "782696281574.dkr.ecr.ap-south-1.amazonaws.com"
        FULL_IMAGE_NAME     = "782696281574.dkr.ecr.ap-south-1.amazonaws.com/kerala-toors:${env.BUILD_NUMBER}"
        ECS_CLUSTER         = "kerala-tours-cluster-v2"
        ECS_SERVICE         = "kerala-tours-service"
    }

    triggers {
        githubPush()
    }

    stages {

        stage('Clean Workspace') {
            steps {
                echo '🧹 Cleaning workspace...'
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                echo '📦 Checking out source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing Node.js dependencies...'
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running tests...'
                sh 'npm test --if-present'
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: '**/test-results/*.xml'
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo '🐳 Building Docker image...'
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        docker build -t ${ECR_REPO_NAME}:${IMAGE_TAG} .
                        docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${ECR_REGISTRY}/${ECR_REPO_NAME}:${IMAGE_TAG}
                        docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${ECR_REGISTRY}/${ECR_REPO_NAME}:latest
                    """
                }
            }
        }

        stage('Push to ECR') {
            steps {
                echo '🚀 Pushing image to ECR...'
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | \
                            docker login --username AWS --password-stdin ${ECR_REGISTRY}

                        docker push ${ECR_REGISTRY}/${ECR_REPO_NAME}:${IMAGE_TAG}
                        docker push ${ECR_REGISTRY}/${ECR_REPO_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy to ECS') {
            steps {
                echo '⚙️ Deploying to ECS Fargate...'
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        aws ecs update-service \
                            --cluster ${ECS_CLUSTER} \
                            --service ${ECS_SERVICE} \
                            --force-new-deployment \
                            --region ${AWS_DEFAULT_REGION}
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                echo '✅ Waiting for ECS to stabilize...'
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        aws ecs wait services-stable \
                            --cluster ${ECS_CLUSTER} \
                            --services ${ECS_SERVICE} \
                            --region ${AWS_DEFAULT_REGION}
                    """
                }
            }
        }

    }

    post {
        success {
            echo '✅ Pipeline SUCCESS — Build is live at https://kerala-tours.co.in'
        }
        failure {
            echo '❌ Pipeline FAILED — Check Console Output above.'
        }
        always {
            echo '🧹 Cleaning Docker images...'
            sh 'docker image prune -f'
        }
    }
}
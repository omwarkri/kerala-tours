pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION  = 'ap-south-1'
        AWS_ACCOUNT_ID      = '782696281574'
        ECR_REPO_NAME       = 'kerala-tours'
        IMAGE_TAG           = "${env.BUILD_NUMBER}"
        ECR_REGISTRY        = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
        FULL_IMAGE_NAME     = "${ECR_REGISTRY}/${ECR_REPO_NAME}:${IMAGE_TAG}"
        ECS_CLUSTER         = "kerala-tours-cluster"
        ECS_SERVICE         = "kerala-tours-service"
        GIT_REPO            = "https://github.com/omwarkri/kerala-tours.git"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                echo '🧹 Cleaning workspace...'
                deleteDir() // deletes all files from previous builds
            }
        }

        stage('Clone Repository') {
            steps {
                echo '📦 Cloning Git repository...'
                sh "git clone ${GIT_REPO} ."
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
                sh """
                    docker build -t ${ECR_REPO_NAME}:${IMAGE_TAG} .
                    docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${ECR_REGISTRY}/${ECR_REPO_NAME}:${IMAGE_TAG}
                    docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${ECR_REGISTRY}/${ECR_REPO_NAME}:latest
                """
            }
        }

        stage('Push to ECR') {
            steps {
                echo '🚀 Pushing Docker image to ECR...'
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
                echo '✅ Waiting for ECS service to stabilize...'
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
            echo '✅ Pipeline SUCCESS — App deployed successfully!'
        }
        failure {
            echo '❌ Pipeline FAILED — Check console output above.'
        }
        always {
            echo '🧹 Cleaning Docker images...'
            sh 'docker image prune -f'
        }
    }
}
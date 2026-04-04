pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        AWS_DEFAULT_REGION = 'ap-south-1'
        ECR_REPO_NAME      = 'kerala-tours'
        IMAGE_TAG          = "${BUILD_NUMBER}"
        TASK_FAMILY        = 'kerala-task'
        ECS_CLUSTER        = 'kerala-cluster'
        ECS_SERVICE        = 'kerala-service'
    }

    stages {

        // ─────────────────────────────────────────
        // INIT — resolve AWS account ID dynamically
        // ─────────────────────────────────────────
        stage('Init') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    script {
                        env.AWS_ACCOUNT_ID  = sh(
                            script: 'aws sts get-caller-identity --query Account --output text',
                            returnStdout: true
                        ).trim()

                        env.ECR_REGISTRY    = "${env.AWS_ACCOUNT_ID}.dkr.ecr.${env.AWS_DEFAULT_REGION}.amazonaws.com"
                        env.FULL_IMAGE_NAME = "${env.ECR_REGISTRY}/${env.ECR_REPO_NAME}:${env.IMAGE_TAG}"

                        echo "✓ AWS Account  : ${env.AWS_ACCOUNT_ID}"
                        echo "✓ ECR Registry : ${env.ECR_REGISTRY}"
                        echo "✓ Image        : ${env.FULL_IMAGE_NAME}"
                    }
                }
            }
        }

        // ─────────────────────────────────────────
        // SOURCE
        // ─────────────────────────────────────────
        stage('Checkout') {
            steps {
                checkout scm
                echo '✓ Code checked out'
            }
        }

        // ─────────────────────────────────────────
        // BUILD
        // ─────────────────────────────────────────
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                echo '✓ Dependencies installed'
            }
        }

        stage('Test & Lint') {
            parallel {
                stage('Tests') {
                    steps {
                        sh 'CI=true npm test --if-present -- --watchAll=false'
                    }
                }
                stage('Lint') {
                    steps {
                        sh 'npm run lint --if-present'
                    }
                }
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
                echo '✓ Application built'
            }
        }

        // ─────────────────────────────────────────
        // DOCKER
        // ─────────────────────────────────────────
        stage('Docker Build') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    sh """
                        aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | \
                          docker login --username AWS --password-stdin ${ECR_REGISTRY}

                        docker pull ${ECR_REGISTRY}/${ECR_REPO_NAME}:latest || true

                        docker build \
                          --cache-from ${ECR_REGISTRY}/${ECR_REPO_NAME}:latest \
                          -t ${ECR_REPO_NAME}:${IMAGE_TAG} .

                        docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${FULL_IMAGE_NAME}
                    """
                }
            }
        }

        stage('Image Scan') {
            steps {
                sh """
                    docker run --rm \
                      -v /var/run/docker.sock:/var/run/docker.sock \
                      aquasec/trivy image --exit-code 0 --severity HIGH,CRITICAL \
                      ${ECR_REPO_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Push to ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    sh """
                        docker push ${FULL_IMAGE_NAME}

                        docker tag  ${FULL_IMAGE_NAME} ${ECR_REGISTRY}/${ECR_REPO_NAME}:latest
                        docker push ${ECR_REGISTRY}/${ECR_REPO_NAME}:latest
                    """
                }
            }
        }

        // ─────────────────────────────────────────
        // ECS DEPLOY
        // ─────────────────────────────────────────
        stage('Register Task Definition') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    sh """
                        aws ecs register-task-definition \
                          --family ${TASK_FAMILY} \
                          --network-mode awsvpc \
                          --requires-compatibilities FARGATE \
                          --cpu "256" \
                          --memory "512" \
                          --execution-role-arn arn:aws:iam::${AWS_ACCOUNT_ID}:role/ecsTaskExecutionRole \
                          --container-definitions '[{
                            "name":  "kerala-container",
                            "image": "${FULL_IMAGE_NAME}",
                            "portMappings": [{
                              "containerPort": 80,
                              "hostPort": 80,
                              "protocol": "tcp"
                            }]
                          }]'
                    """
                }
            }
        }

        stage('Deploy to ECS') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    script {
                        def taskRevision = sh(
                            script: """
                                aws ecs describe-task-definition \
                                  --task-definition ${TASK_FAMILY} \
                                  --query 'taskDefinition.revision' \
                                  --output text
                            """,
                            returnStdout: true
                        ).trim()

                        echo "✓ Deploying task revision: ${taskRevision}"

                        sh """
                            aws ecs update-service \
                              --cluster ${ECS_CLUSTER} \
                              --service ${ECS_SERVICE} \
                              --task-definition ${TASK_FAMILY}:${taskRevision} \
                              --force-new-deployment
                        """
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    sh """
                        aws ecs wait services-stable \
                          --cluster ${ECS_CLUSTER} \
                          --services ${ECS_SERVICE}
                    """
                    echo '✓ Service is stable'
                }
            }
        }
    }

    post {
        success {
            echo "✅ SUCCESS — ${env.FULL_IMAGE_NAME} deployed to ECS"
        }
        failure {
            echo '❌ FAILED — Check logs above'
        }
        always {
            sh 'docker image prune -f'
            cleanWs()
        }
    }
}
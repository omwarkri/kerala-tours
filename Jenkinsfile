pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo '✓ Code checked out successfully'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                echo '✓ Dependencies installed'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
                echo '✓ Application built successfully'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                        docker build -t travels-tours:${BUILD_NUMBER} .
                        docker tag travels-tours:${BUILD_NUMBER} travels-tours:latest
                        echo "✓ Docker image built: travels-tours:${BUILD_NUMBER}"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✓ Pipeline completed successfully!'
            echo "Build artifact at: /home/om/travels-Toors/build/"
        }
        failure {
            echo '✗ Pipeline failed. Check logs above.'
        }
    }
}

        stage('Test & Lint (Parallel)') {
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

        // ==============================
        // DOCKER BUILD
        // ==============================
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
                          --cache-from=${ECR_REGISTRY}/${ECR_REPO_NAME}:latest \
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
                      aquasec/trivy image ${ECR_REPO_NAME}:${IMAGE_TAG}
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
                        docker tag ${FULL_IMAGE_NAME} ${ECR_REGISTRY}/${ECR_REPO_NAME}:latest
                        docker push ${ECR_REGISTRY}/${ECR_REPO_NAME}:latest
                    """
                }
            }
        }

        // ==============================
        // ECS DEPLOY
        // ==============================
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
                          --container-definitions '[{"name":"kerala-container","image":"${FULL_IMAGE_NAME}","portMappings":[{"containerPort":80,"hostPort":80}]}]'
                    """
                }
            }
        }

        stage('Fetch Task Revision') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    script {
                        env.TASK_REVISION = sh(
                            script: """
                                aws ecs describe-task-definition \
                                  --task-definition ${TASK_FAMILY} \
                                  --query 'taskDefinition.revision' \
                                  --output text
                            """,
                            returnStdout: true
                        ).trim()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    sh """
                        aws ecs update-service \
                          --cluster ${ECS_CLUSTER} \
                          --service ${ECS_SERVICE} \
                          --task-definition ${TASK_FAMILY}:${TASK_REVISION} \
                          --force-new-deployment
                    """
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
                }
            }
        }
    }

    post {
        success {
            echo '✅ SUCCESS — Deployment Completed'
        }
        failure {
            echo '❌ FAILED — Check logs'
        }
        always {
            sh 'docker image prune -f'
            cleanWs()
        }
    }
}
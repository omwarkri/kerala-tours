pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION  = 'ap-south-1'
        AWS_ACCOUNT_ID      = '782696281574'
        ECR_REPO_NAME       = 'kerala-toors'
        IMAGE_TAG           = "${env.BUILD_NUMBER}"
        ECR_REGISTRY        = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
        FULL_IMAGE_NAME     = "${ECR_REGISTRY}/${ECR_REPO_NAME}:${IMAGE_TAG}"

        ECS_CLUSTER         = "kerala-tours-cluster-v2"
        ECS_SERVICE         = "kerala-tours-service"
        TASK_FAMILY         = "kerala-tours-task"
        TERRAFORM_DIR       = "terraform/files"
    }

    triggers {
        githubPush()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ==============================
        // TERRAFORM (FIXED)
        // ==============================
        stage('Terraform Init') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    dir("${TERRAFORM_DIR}") {
                        sh 'terraform init -input=false'
                    }
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    dir("${TERRAFORM_DIR}") {
                        sh '''
                        terraform plan \
                          -input=false \
                          -out=tfplan
                        '''
                    }
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    dir("${TERRAFORM_DIR}") {
                        sh '''
                        terraform apply \
                          -input=false \
                          -auto-approve tfplan
                        '''
                    }
                }
            }
        }

        // ==============================
        // APP PIPELINE
        // ==============================
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test & Lint (Parallel)') {
            parallel {
                stage('Tests') {
                    steps {
                        sh 'npm test --if-present'
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
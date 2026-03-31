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

        TERRAFORM_DIR       = "infra"   // your terraform folder
    }

    triggers {
        githubPush()
    }

    stages {

        // ==============================
        // TERRAFORM (INFRASTRUCTURE)
        // ==============================
        stage('Terraform Init') {
            steps {
                dir("${TERRAFORM_DIR}") {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                dir("${TERRAFORM_DIR}") {
                    sh 'terraform plan'
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir("${TERRAFORM_DIR}") {
                    sh 'terraform apply -auto-approve'
                }
            }
        }

        // ==============================
        // APP PIPELINE
        // ==============================
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

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
        // DOCKER BUILD WITH CACHE
        // ==============================
        stage('Docker Build') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        docker pull ${ECR_REGISTRY}/${ECR_REPO_NAME}:latest || true

                        docker build \
                          --cache-from=${ECR_REGISTRY}/${ECR_REPO_NAME}:latest \
                          -t ${ECR_REPO_NAME}:${IMAGE_TAG} .

                        docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} ${FULL_IMAGE_NAME}
                    """
                }
            }
        }

        // ==============================
        // SECURITY SCAN (TRIVY)
        // ==============================
        stage('Image Scan') {
            steps {
                sh """
                docker run --rm \
                -v /var/run/docker.sock:/var/run/docker.sock \
                aquasec/trivy image ${ECR_REPO_NAME}:${IMAGE_TAG}
                """
            }
        }

        // ==============================
        // PUSH TO ECR
        // ==============================
        stage('Push to ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | \
                        docker login --username AWS --password-stdin ${ECR_REGISTRY}

                        docker push ${FULL_IMAGE_NAME}
                    """
                }
            }
        }

        // ==============================
        // IMMUTABLE TASK DEFINITION
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
                      --container-definitions '[
                        {
                          "name": "kerala-container",
                          "image": "${FULL_IMAGE_NAME}",
                          "portMappings": [{"containerPort": 80,"hostPort": 80}]
                        }
                      ]'
                    """
                }
            }
        }

        // ==============================
        // GET LATEST REVISION
        // ==============================
        stage('Fetch Task Revision') {
            steps {
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

        // ==============================
        // BLUE GREEN DEPLOYMENT (CODEDEPLOY)
        // ==============================
        stage('Blue/Green Deploy') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    sh """
                    aws deploy create-deployment \
                      --application-name kerala-codedeploy-app \
                      --deployment-group-name kerala-deploy-group \
                      --revision revisionType=AppSpecContent,appSpecContent={
                        content='{
                          "version": 1,
                          "Resources": [{
                            "TargetService": {
                              "Type": "AWS::ECS::Service",
                              "Properties": {
                                "TaskDefinition": "${TASK_FAMILY}:${TASK_REVISION}",
                                "LoadBalancerInfo": {
                                  "ContainerName": "kerala-container",
                                  "ContainerPort": 80
                                }
                              }
                            }
                          }]
                        }'
                      }
                    """
                }
            }
        }

        // ==============================
        // VERIFY DEPLOYMENT
        // ==============================
        stage('Verify Deployment') {
            steps {
                sh """
                aws ecs wait services-stable \
                  --cluster ${ECS_CLUSTER} \
                  --services ${ECS_SERVICE} \
                  --region ${AWS_DEFAULT_REGION}
                """
            }
        }
    }

    post {
        success {
            echo '✅ SUCCESS — Blue/Green Deployment Completed'
        }
        failure {
            echo '❌ FAILED — Rolling back...'

            sh """
            aws ecs update-service \
              --cluster ${ECS_CLUSTER} \
              --service ${ECS_SERVICE} \
              --force-new-deployment
            """
        }
        always {
            sh 'docker image prune -f'
        }
    }
}
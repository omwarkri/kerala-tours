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

        // Single checkout at the top — used by both Terraform and App stages
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ==============================
        // TERRAFORM (INFRASTRUCTURE)
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
                        sh 'terraform init'
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
                        sh 'terraform plan'
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
                        sh 'terraform apply -auto-approve'
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
                        docker push ${FULL_IMAGE_NAME}
                        docker tag ${FULL_IMAGE_NAME} ${ECR_REGISTRY}/${ECR_REPO_NAME}:latest
                        docker push ${ECR_REGISTRY}/${ECR_REPO_NAME}:latest
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
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
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

        // ==============================
        // GET LATEST REVISION
        // ==============================
        stage('Fetch Task Revision') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
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

        // ==============================
        // BLUE/GREEN DEPLOY (CODEDEPLOY)
        // ==============================
        stage('Blue/Green Deploy') {
    steps {
        withCredentials([[
            $class: 'AmazonWebServicesCredentialsBinding',
            credentialsId: 'aws-credentials',
            accessKeyVariable: 'AWS_ACCESS_KEY_ID',
            secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
        ]]) {
            script {
                def appSpec = """{
  "version": 1,
  "Resources": [{
    "TargetService": {
      "Type": "AWS::ECS::Service",
      "Properties": {
        "TaskDefinition": "${env.TASK_FAMILY}:${env.TASK_REVISION}",
        "LoadBalancerInfo": {
          "ContainerName": "kerala-container",
          "ContainerPort": 80
        }
      }
    }
  }]
}"""
                writeFile file: 'appspec-content.json', text: appSpec

                def revision = """revisionType=AppSpecContent,appSpecContent={"content":${groovy.json.JsonOutput.toJson(appSpec)}}"""
                writeFile file: 'revision.txt', text: revision

                sh '''
                    aws deploy create-deployment \
                      --application-name kerala-codedeploy-app \
                      --deployment-group-name kerala-deploy-group \
                      --revision "$(cat revision.txt)"
                '''
            }
        }
    }
}
        // ==============================
        // VERIFY DEPLOYMENT
        // ==============================
        stage('Verify Deployment') {
            steps {
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
            echo '✅ SUCCESS — Blue/Green Deployment Completed'
        }
        failure {
            echo '❌ FAILED — Forcing new deployment as fallback...'
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
        always {
            sh 'docker image prune -f'
            cleanWs()
        }
    }
}
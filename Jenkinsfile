pipeline {
    agent any

    environment {
        AWS_REGION   = 'ap-south-1'
        ECR_REPO     = 'kerala-tours'
        IMAGE_TAG    = "${BUILD_NUMBER}"
        CLUSTER      = 'kerala-cluster'
        SERVICE      = 'kerala-service'
        TASK_FAMILY  = 'kerala-task'
    }

    stages {

        stage('Init') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials'
                ]]) {
                    script {
                        env.AWS_ACCOUNT_ID = sh(
                            script: "aws sts get-caller-identity --query Account --output text",
                            returnStdout: true
                        ).trim()

                        env.ECR = "${env.AWS_ACCOUNT_ID}.dkr.ecr.${env.AWS_REGION}.amazonaws.com"
                        env.IMAGE = "${env.ECR}/${env.ECR_REPO}:${env.IMAGE_TAG}"

                        echo "ECR: ${env.ECR}"
                        echo "Image: ${env.IMAGE}"
                    }
                }
            }
        }

        stage('Checkout') {
            steps {
                git url: 'https://github.com/omwarkri/ShareTask-App.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t ${ECR_REPO}:${IMAGE_TAG} .
                    docker tag ${ECR_REPO}:${IMAGE_TAG} ${IMAGE}
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
                        aws ecr get-login-password --region ${AWS_REGION} | \
                        docker login --username AWS --password-stdin ${ECR}

                        docker push ${IMAGE}
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

                        def revision = sh(
                            script: """
                                aws ecs register-task-definition \
                                --family ${TASK_FAMILY} \
                                --network-mode awsvpc \
                                --requires-compatibilities FARGATE \
                                --cpu 256 \
                                --memory 512 \
                                --execution-role-arn arn:aws:iam::${AWS_ACCOUNT_ID}:role/ecsTaskExecutionRole \
                                --container-definitions '[{
                                  "name":"app",
                                  "image":"${IMAGE}",
                                  "portMappings":[{"containerPort":80}]
                                }]' \
                                --query 'taskDefinition.revision' \
                                --output text
                            """,
                            returnStdout: true
                        ).trim()

                        sh """
                            aws ecs update-service \
                            --cluster ${CLUSTER} \
                            --service ${SERVICE} \
                            --task-definition ${TASK_FAMILY}:${revision} \
                            --force-new-deployment
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f || true'
        }
    }
}
pipeline {
    agent any

    environment {
        AWS_DEFAULT_REGION  = 'ap-south-1'
        AWS_ACCOUNT_ID      = '782696281574'
        ECR_REPO_NAME       = 'kerala-toors'
        IMAGE_TAG           = "${env.BUILD_NUMBER}"
        ECR_REGISTRY        = "782696281574.dkr.ecr.ap-south-1.amazonaws.com"
        FULL_IMAGE_NAME     = "782696281574.dkr.ecr.ap-south-1.amazonaws.com/kerala-toors:${env.BUILD_NUMBER}"
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

        stage('Docker Build') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh "docker build -t kerala-toors:${env.BUILD_NUMBER} ."
                }
            }
        }

        stage('Push to ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 782696281574.dkr.ecr.ap-south-1.amazonaws.com
                        docker tag kerala-toors:${env.BUILD_NUMBER} 782696281574.dkr.ecr.ap-south-1.amazonaws.com/kerala-toors:${env.BUILD_NUMBER}
                        docker push 782696281574.dkr.ecr.ap-south-1.amazonaws.com/kerala-toors:${env.BUILD_NUMBER}
                    """
                }
            }
        }

        stage('Deploy to ECS') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        chmod +x ./deploy.sh
                        CI=true ./deploy.sh
                    """
                }
            }
        }

    }

    post {
        success { echo '✅ App is live! Check your ALB URL.' }
        failure  { echo '❌ Failed! Check Console Output above.' }
    }
}
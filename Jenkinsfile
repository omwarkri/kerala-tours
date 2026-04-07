pipeline {
    agent {
        docker {
            image 'hashicorp/terraform:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock --privileged'
        }
    }

    environment {
        AWS_REGION    = 'ap-south-1'
        IMAGE_TAG     = "${BUILD_NUMBER}"
        ECR_REPO      = 'kerala-tours'
        DOMAIN_NAME   = 'kerala-tours.co.in'
        WWW_DOMAIN    = 'www.kerala-tours.co.in'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Node.js') {
            steps {
                sh '''
                    apk add --no-cache nodejs npm
                '''
            }
        }

        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${ECR_REPO}:${IMAGE_TAG} ."
            }
        }

        stage('Publish to ECR') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-acces-key-id', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secrete-key-id', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh '''
                        apk add --no-cache aws-cli

                        export AWS_REGION=${AWS_REGION}
                        export AWS_DEFAULT_REGION=${AWS_REGION}

                        AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
                        ECR_REGISTRY=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                        IMAGE=${ECR_REGISTRY}/${ECR_REPO}:${IMAGE_TAG}

                        aws ecr describe-repositories --repository-names "${ECR_REPO}" >/dev/null 2>&1 || \
                          aws ecr create-repository --repository-name "${ECR_REPO}"

                        aws ecr get-login-password --region ${AWS_REGION} | \
                          docker login --username AWS --password-stdin ${ECR_REGISTRY}

                        docker tag ${ECR_REPO}:${IMAGE_TAG} ${IMAGE}
                        docker push ${IMAGE}
                        echo "IMAGE=${IMAGE}" > image-info.txt
                    '''
                }
            }
        }

        stage('Terraform Init') {
            steps {
                dir('terraform/files') {
                    sh 'terraform init -input=false'
                }
            }
        }

        stage('Terraform Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-acces-key-id', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secrete-key-id', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    dir('terraform/files') {
                        sh '''
                            apk add --no-cache aws-cli

                            IMAGE=$(grep '^IMAGE=' ../image-info.txt | cut -d'=' -f2-)

                            terraform apply -auto-approve \
                                -var="domain_name=${DOMAIN_NAME}" \
                                -var="www_domain_name=${WWW_DOMAIN}" \
                                -var="region=${AWS_REGION}" \
                                -var="ecr_image_url=${IMAGE}"
                        '''
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

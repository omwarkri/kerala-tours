pipeline {
    agent any

    options {
        timeout(time: 1, unit: 'HOURS')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
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
                retry(3) {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        userRemoteConfigs: [[
                            url: 'https://github.com/omwarkri/kerala-tours.git',
                            credentialsId: 'github-cred'
                        ]],
                        extensions: [
                            [$class: 'CloneOption', timeout: 300, noTags: false, reference: '', shallow: false],
                            [$class: 'CheckoutOption', timeout: 300]
                        ]
                    ])
                }
            }
        }

        stage('Verify Tools') {
            steps {
                sh '''
                    echo "Verifying required tools..."
                    node --version || echo "Node.js not found - please install Node.js 18+"
                    npm --version || echo "npm not found - please install npm"
                    docker --version || echo "Docker not found - please install Docker"
                    aws --version || echo "AWS CLI not found - please install AWS CLI"
                    terraform --version || echo "Terraform not found - please install Terraform"
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

        stage('Cleanup') {
            steps {
                sh '''
                    echo "Cleaning up Docker resources..."
                    docker system prune -f || true
                    echo "Cleanup complete"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        unstable {
            echo '⚠️ Pipeline completed with warnings'
        }
        failure {
            echo '❌ Pipeline failed'
        }
    }
}

pipeline {
    agent any

    environment {
        IMAGE_NAME = "react-app:v1"
        CONTAINER_NAME = "react-container"
        DOCKER_REPO = "omwarkri/react-app"   // change if needed
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/omwarkri/travels-Toors.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-cred',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    """
                }
            }
        }

        stage('Tag Image') {
            steps {
                sh "docker tag ${IMAGE_NAME} ${DOCKER_REPO}:latest"
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh "docker push ${DOCKER_REPO}:latest"
            }
        }

        stage('Stop Old Container') {
            steps {
                sh "docker rm -f ${CONTAINER_NAME} || true"
            }
        }

        stage('Run New Container') {
            steps {
                sh "docker run -d -p 3000:80 --name ${CONTAINER_NAME} ${DOCKER_REPO}:latest"
            }
        }
    }

    post {
        success {
            echo "Deployment Successful 🚀"
        }
        failure {
            echo "Deployment Failed ❌"
        }
    }
}

pipeline {
    agent any

    stages {

        stage('Checkout Backend Source Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/lakshanmenaka/pos-system-backend.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                        -t pos-system-backend:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKERHUB_PASS" | docker login \
                            -u "$DOCKERHUB_USER" \
                            --password-stdin

                        docker tag \
                            pos-system-backend:${BUILD_NUMBER} \
                            menakalakshan23/pos-system-backend:${BUILD_NUMBER}

                        docker push \
                            menakalakshan23/pos-system-backend:${BUILD_NUMBER}

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy Backend to EC2') {
            steps {
                withCredentials([
                    file(
                        credentialsId: 'back-end-env',
                        variable: 'ENV_FILE'
                    )
                ]) {
                    sshagent(credentials: ['backend-ssh-key']) {
                        sh '''
                            echo "Copying environment file..."

                            scp -o StrictHostKeyChecking=accept-new \
                                "$ENV_FILE" \
                                ubuntu@172.31.3.90:/home/ubuntu/backend.env

                            echo "Deploying backend container..."

                            ssh -o StrictHostKeyChecking=accept-new \
                                ubuntu@172.31.3.90 "
                                    set -e

                                    chmod 600 /home/ubuntu/backend.env

                                    sudo docker pull \
                                        menakalakshan23/pos-system-backend:${BUILD_NUMBER}

                                    sudo docker rm -f pos-system-backend || true

                                    sudo docker run -d \
                                        --name pos-system-backend \
                                        --restart unless-stopped \
                                        --env-file /home/ubuntu/backend.env \
                                        -p 3000:3000 \
                                        menakalakshan23/pos-system-backend:${BUILD_NUMBER}

                                    echo 'Backend deployment completed'
                                "
                        '''
                    }
                }
            }
        }
    }
}

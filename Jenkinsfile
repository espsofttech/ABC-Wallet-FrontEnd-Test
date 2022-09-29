pipeline {
    agent {
        docker {
            image 'node:6-apline'
            args '-p 3000:6017'
        }
    }
    enviroment {
        CI = 'true'
    }
    stage {
        stage('Build') {
            sh 'npm install'
        }
    }
    stage('Test') {
        steps {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Deliver') {
            steps {
                sh './jenkins/scripts/deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './jenkins/scripts/kill.sh' 
            }
        }
    }
}
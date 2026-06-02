pipeline {
    agent any

    stages {
        stage('Checkout du projet') {
            steps {
                checkout scm
            }
        }

        stage('Vérifier Node.js') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Installer les dépendances') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Installer les navigateurs Playwright') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Exécuter les tests Playwright') {
            steps {
                bat 'npx playwright test e2e/Scenario3.spec.ts'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}
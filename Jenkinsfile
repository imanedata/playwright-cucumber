pipeline {
   
    agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.49.1-noble'
                    args '-u root:root'
                }
    }

    parameters {
        string(name: 'String_TAG', defaultValue: '', description: 'Tag de test')
        choice(name: 'CHOICE_TAG', choices: ['@postive', '@negative'], description: 'Sélectionne un tag de test')
    }
    stages {
        stage('install') {
            
            steps {
                script {
                    sh 'npm ci'
                }
            }

        }
        stage('test') {
            steps {
                script {
                    // sh "npm run only '${params.CHOICE_TAG}'"
                    sh "npm run test"
                }
            }

        }
    }
post {
    always {
        cucumber buildStatus: 'UNSTABLE',
                failedFeaturesNumber: 1,
                failedScenariosNumber: 1,
                skippedStepsNumber: 1,
                failedStepsNumber: 1,
                classifications: [
                        [key: 'Commit', value: '<a href="${GERRIT_CHANGE_URL}">${GERRIT_PATCHSET_REVISION}</a>'],
                        [key: 'Submitter', value: '${GERRIT_PATCHSET_UPLOADER_NAME}']
                ],
                reportTitle: 'My report',
                fileIncludePattern: 'reports/cucumber-report.json',
                sortingMethod: 'ALPHABETICAL',
                trendsLimit: 100
    }
}
}
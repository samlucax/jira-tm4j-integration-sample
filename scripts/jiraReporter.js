//imports
const decrypt = require('./decryptor.js')
const fetch = require('node-fetch')

//env vars
const jiraHost = process.env.JIRA_HOST
const jiraUser = process.env.JIRA_USERNAME
const jiraPass = decrypt(process.env.JIRA_PASSWORD)
const jiraProjectKey = process.env.PROJECT_KEY

class TestExecutionCreator {
    constructor(jiraSettings, executionResults, projectKey) {
        this._jiraSettings = jiraSettings;
        this._executionResults = executionResults;
        this._projectKey = projectKey;
        this._authString = 'Basic ' + Buffer.from(this._jiraSettings.user + ':' + this._jiraSettings.password).toString('base64');
    }

    async createExecutions() {
        const request = this._buildRequest({
            name: 'Execução automatizada',
            projectKey: this._projectKey,
            items: this._executionResults
        });

        const url = encodeURI(this._jiraSettings.url + '/jira/rest/atm/1.0/testrun');
        const response = await fetch(url, request);
        console.log(response)

        if(response.status !== 201) throw 'Erro ao criar um novo ciclo de testes.';
        const jsonResponse = await response.json();
        console.log('Ciclo de testes criado: ' + jsonResponse.key)
    }

    _buildRequest(body){
        return {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this_authString
            }
        };
    }
}

module.exports = async function sendResultsToJira(jsonReport){
    //filter and convert jsonReport infos to a jiraResults formatted payload
    jiraResultsPayload = buildJiraResultsPayload(jsonReport)

    //settings for jira configuration
    const settings = {
        'url': jiraHost,
        'user': jiraUser,
        'password': jiraPass
    };

    const projectKey = jiraProjectKey
    const executionResults = jiraResultsPayload

    await new TestExecutionCreator(settings, executionResults, projectKey).createExecutions();
}

function buildJiraResultsPayload(jsonReport) {
    var jiraResultsPayload = []

    //iterate jsonReport and get each test result
    jsonReport.results.forEach(testResult => {
        //iterate testResults and get each suite
        testResult.suites.forEach(testSuite => {
            //iterate testSuite's and get each test. Please use pattern <testKey> : <testName>
            testSuite.tests.forEach(test => {
                jiraResultsPayload.push(
                    {
                       'testCaseKey': test.title.split(":")[0],
                       'status': test.state 
                    }
                )
            })
        })
    });
    return jiraResultsPayload
}
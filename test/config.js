exports.config = {
    seleniumAddress: 'http://localhost:8910',
    specs: ['Main-test.js','T00-Employments.js','T00-Expenditures.js','T00-Unemployments.js'],
    capabilities: {
        'browserName': 'phantomjs'
    },
     params:{
        host: 'localhost',
        port: '4444'
    }

};
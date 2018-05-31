exports.config = {
    seleniumAddress: 'http://localhost:8910',
    specs: ['T00-Employments.js','T00-Expenditures.js','T00-Unemployments.js','Main-test.js'],
    capabilities: {
        'browserName': 'phantomjs'
    },
     params:{
        host: 'localhost',
        port: '4444'
    }

};
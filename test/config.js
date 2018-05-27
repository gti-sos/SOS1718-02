exports.config = {
    seleniumAddress: 'http://localhost:8910',
    specs: ['T00-Employments.js','T00-Employments.js'],
    capabilities: {
        'browserName': 'phantomjs'
    },
     params:{
        host: 'localhost',
        port: '8080'
    }

};

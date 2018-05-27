exports.config = {
    seleniumAddress: 'http://localhost:8910',
    specs: ['Main-test.js','T00-Employments.js'],
    capabilities: {
        'browserName': 'phantomjs'
    }

};

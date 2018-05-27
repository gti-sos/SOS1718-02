exports.config = {
    seleniumAddress: 'http://localhost:8910',
    specs: ['T00-Employments.js','Main-test.js'],
    capabilities: {
        'browserName': 'phantomjs'
    }

};

exports.config = {
    seleniumAddress: 'http://localhost:8910',
    specs: ['Main-test.js'],
    capabilities: {
        'browserName': 'phantomjs'
    }

}

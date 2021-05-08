exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'https://zitation.herokuapp.com/',
    //baseUrl: 'http://localhost:3000',
    specs: ['../e2e/*.js'],
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },
    onPrepare: async () => {
        await browser.waitForAngularEnabled(false);
        browser.ignoreSynchronization = true;

    },
};
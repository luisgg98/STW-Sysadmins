exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:3001',
    //specs: ['../e2e/registerCompany.js'],
    specs: ['../e2e/*.js'],
    multiCapabilities: [{
        browserName: 'firefox'
    }, {
        browserName: 'chrome'
    }],
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },
    onPrepare: async () => {
        await browser.waitForAngularEnabled(false);
        browser.ignoreSynchronization = true;
        var Faker = require('faker');
        browser.params.randomName = Faker.name.findName(); // Rowan Nikolaus
        browser.params.randomEmail = Faker.internet.email();
        browser.params.randomPhone = Faker.phone.phoneNumber();
        browser.params.companyName= 'Centro Deportivo Municipal La Granja';
        browser.params.streetNumber=45;
        browser.params.street='Camino Cabaldós';
        browser.params.zipcode=50013;
        browser.params.nif = 123456789;
        browser.params.password = Faker.internet.password();
    },
};
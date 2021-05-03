
describe('Company Registration test', function() {
    var formNif = by.id('formSUNumber');
    var formEmail = by.id('formBasicEmail');
    var formCompany = by.id('formSUFName');
    var password = by.id('formBasicPassword');
    var confpassword = by.id('formSUConfPassword');
    var street = by.id('formSUCalle');
    var streetnumber = by.id('streetnumber');
    var zipcode = by.id('zipcode');
    var button = by.className('btn btn-primary');

    var category = by.id('formSUCat');

    var EC = protractor.ExpectedConditions;

    afterEach(function () {
        browser.sleep(1000);
    })


    it('Registering a company', function() {

        browser.get('/registrarNegocio');

        element(formNif).click();
        element(formNif).sendKeys(browser.params.nif);

        element(formEmail).click();
        element(formEmail).sendKeys(browser.params.randomEmail);

        element(formCompany).click();
        element(formCompany).sendKeys(browser.params.companyName);

        element(password).click();
        element(password).sendKeys(browser.params.password);

        element(confpassword).click();
        element(confpassword).sendKeys(browser.params.password);

        element(street).click();
        element(street).sendKeys(browser.params.street);

        element(streetnumber).click();
        element(streetnumber).sendKeys(browser.params.streetNumber);

        element(zipcode).click();
        element(zipcode).sendKeys(browser.params.zipcode);

        element(category)
            .all(by.tagName('option'))
            .get(1)
            .click();

        element(button).click();

        browser.wait(EC.urlContains('login'), 5000).then(function(result) {
            expect(result).toEqual(true);
        });

    });

    it('Login After company registration',function () {
        browser.get('/login');

    })
});
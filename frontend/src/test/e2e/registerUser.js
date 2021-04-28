
describe('User Registration test', function() {
    var formName = by.id('formSUFName');
    var formSurname = by.id('formSULName');
    var formEmail = by.id('formBasicEmail');
    var password = by.id('formBasicPassword');
    var confpassword = by.id('formSUConfPassword');
    var button = by.className('btn btn-primary');
    var EC = protractor.ExpectedConditions;

    afterEach(function () {
        browser.sleep(1000);
    })


    it('Registering a user', function() {

        browser.get('/registro');

        element(formName).click();
        element(formName).sendKeys(browser.params.randomName);

        element(formSurname).click();
        element(formSurname).sendKeys(browser.params.randomSurName);

        element(formEmail).click();
        element(formEmail).sendKeys(browser.params.randomEmail);


        element(password).click();
        element(password).sendKeys(browser.params.password);

        element(confpassword).click();
        element(confpassword).sendKeys(browser.params.password);

        element(button).click();

        browser.wait(EC.urlContains('login'), 5000).then(function(result) {
            expect(result).toEqual(true);
        });

    });

    it('Login After user registration',function () {
        browser.get('/login');

    })
});
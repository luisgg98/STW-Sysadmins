
describe('User logging test', function() {
    const email = 'fede31@unizar.es';
    const pass = 'fede1234';
    const loading = 4000;
    const timeout = 3000;
    const Username='Test User';
    var EC = protractor.ExpectedConditions;

    /**
     *
     */
    function logginUser() {
        var formEmail = by.id('formBasicEmail');
        var password = by.id('formBasicPassword');
        var button = by.className('btn btn-primary');

        browser.get('/login');

        element(formEmail).click();
        element(formEmail).sendKeys(email);

        element(password).click();
        element(password).sendKeys(pass);
        element(button).click();

        browser.wait(EC.urlContains('home'), loading).then(function(result) {
            expect(result).toEqual(true);
        });
    }

    /**
     *
     * @constructor
     */
    function AccessAccount() {
        var account =by.css('a[href*="/cuenta"]');
        element(account).click();
        browser.wait(EC.urlContains('cuenta'), loading).then(function(result) {
            expect(result).toEqual(true);
        });
    }

    /**
     *
     * @constructor
     */
    function Logout() {
        var logout =by.buttonText('Cerrar sesión');
        element(logout).click();
        browser.wait(EC.urlContains('home'), loading).then(function(result) {
            expect(result).toEqual(true);
        });

    }

    /**
     *
     */
    function editData() {
        var edit =by.buttonText('Editar datos');
        element(edit).click();

        var name = by.id('formSUFName');
        element(name).click();
        element(name).sendKeys(Username);

        var confirm =by.buttonText('Confirmar');
        element(confirm).click();

        browser.wait(EC.urlContains('login'), loading).then(function(result) {
            expect(result).toEqual(true);
        });

    }


   it('Access to your User account',function () {
       logginUser();
       browser.sleep(timeout);
       AccessAccount();
       browser.sleep(timeout);
       editData();
       browser.sleep(timeout);
       logginUser();
       browser.sleep(timeout);
       AccessAccount();
       browser.sleep(timeout);
       Logout();

   });


});
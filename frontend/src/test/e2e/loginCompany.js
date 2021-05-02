
describe('Company logging test', function() {
    const email = 'ramonpeluqueria93@gmail.com';
    const pass = 'ramon1234';
    const loading = 4000;
    const timeout = 3000;
    const CompanyName='Peluqueria Test';
    var EC = protractor.ExpectedConditions;

    /**
     *
     */
    function loggingCompany() {

        browser.get('/login');
        var formEmail = by.id('formBasicEmail');
        var password = by.id('formBasicPassword');
        var button = by.className('btn btn-primary');

        element(formEmail).click();
        element(formEmail).sendKeys(email);

        element(password).click();
        element(password).sendKeys(pass);

        var clicked = by.id('formBasicCheckbox');
        element(clicked).click();
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
        element(name).sendKeys(CompanyName);

        var confirm =by.buttonText('Confirmar');
        element(confirm).click();

        browser.wait(EC.urlContains('login'), loading).then(function(result) {
            expect(result).toEqual(true);
        });

    }

    /**
     *
     */
    function addService() {
        var service =by.buttonText('To services');
        element(service).click();

        var new_service =by.buttonText('Añade tu primer servicio');
        element(new_service).click();

        var description = by.id('formDescription');
        element(description).sendKeys('Servicio Maravilloso no vamos' +
            ' a mentir que lo estamos' +
            ' probando a ver si funciona todo' +
            ' porque hay un minimo de 100 caracteres' +
            'es una prueba del minimo de caracteres' +
            ' con un minimo a ver si funciona ya.');

        var description = by.id('formCapacity');
        element(description).sendKeys('10');

        var description = by.id('precio');
        element(description).sendKeys('10');

        var button =by.buttonText('Registrar servicio');
        element(button).click();

        browser.wait(EC.urlContains('services'), loading).then(function(result) {
            expect(result).toEqual(true);
        });
    }

    /**
     *
     */
    it('Access to your Company account',function () {
        loggingCompany();
        browser.sleep(timeout);
        AccessAccount();
        browser.sleep(timeout);
        editData();
        browser.sleep(timeout);
        loggingCompany();
        browser.sleep(timeout);
        AccessAccount();
        browser.sleep(timeout);
        Logout();

    });

    /**
     *
     */
  it('Add Service to a Company',function () {
        loggingCompany();
        browser.sleep(timeout);
        AccessAccount();
        browser.sleep(timeout);
        addService();
        browser.sleep(timeout);
        browser.get('/');
        AccessAccount();
        browser.sleep(timeout);
        Logout();
    });

});

describe('Company logging test', function() {
    let company = {'nif': 'V12345678', 'name': 'Centro Cívico Delicias', 'email': 'civico1234@gmail.com', 'password': 'deportivo1234', 'street':'Av. Navarra', 'streetnumber': '54', 'zipcode': '50010', 'category': 'Administración pública'}
    const loading = 4000;
    const timeout = 3000;
    let companyUpdate = {
        'description':'Centro Civico Delicias un lugar para pasar el dia y hacer actividades.',
        'service_duration':'10',
    }
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
        element(formEmail).sendKeys(company.email);

        element(password).click();
        element(password).sendKeys(company.password);

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
        var edit =by.buttonText('Editar datos de la empresa');
        element(edit).click();

        browser.wait(EC.urlContains('editInfo'), loading).then(function(result) {
            expect(result).toEqual(true);
        });

        var description = by.id('formDescription');
        element(description).click();
        element(description).sendKeys(companyUpdate.description);

        var name = by.id('formCapacity');
        element(name).click();
        element(name).sendKeys(companyUpdate.service_duration);

        var pass = by.id('formBasicPassword');
        element(pass).click();
        element(pass).sendKeys(company.password);

        var confirm =by.buttonText('Registrar servicio');
        element(confirm).click();


       // browser.wait(EC.urlContains('login'), loading).then(function(result) {
        //expect(result).toEqual(true);
        //});

    }

    /**
     *
     */
    function addService() {
        var service =by.buttonText('Añade otro servicio');
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
     * @constructor
     */
    function DeleteService() {
        var delete_service =by.buttonText('Borrar Servicio');
        element(delete_service).click();

        browser.wait(EC.urlContains('cuenta'), loading).then(function(result) {
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
        browser.get('/');
        browser.sleep(timeout);
        AccessAccount();
        browser.sleep(timeout);
        Logout();

    });

    /**
     *
     */
  it('Add and remove Service to a Company',function () {
        loggingCompany();
        browser.sleep(timeout);
        AccessAccount();
        browser.sleep(timeout);
        addService();
        browser.sleep(timeout);
        browser.get('/');
        AccessAccount();
        DeleteService();
        browser.sleep(timeout);
        Logout();
    });

});

/**
 *  var category = by.id('formSUCat');
 *       element(category)
 .all(by.tagName('option'))
 .get(1)
 .click();

 element(button).click();
 */
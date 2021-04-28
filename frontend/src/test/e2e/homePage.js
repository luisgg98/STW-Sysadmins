
//https://www.protractortest.org/#/tutorial
describe('Home page testing', function() {
    var health = 'health';
    var deporte = 'deporte';
    var comercio = 'comercio';
    var adminPublica ='adminPublica';
    var ocio ='ocio';
    var EC = protractor.ExpectedConditions;
    beforeEach(function() {
        browser.get('');
    });

    afterEach(function () {
        browser.sleep(1000);
    })


    it('Testing Search Bar', function() {
        //browser.wait(500);
        element(by.id('barraBusqueda')).click();
        element(by.id('barraBusqueda')).sendKeys('Deportivo');
        //browser.actions().sendKeys(protractor.Key.ENTER).perform();
        element(by.id('barraBusqueda')).sendKeys(protractor.Key.ENTER);
        var e = element(by.className('card-title h5'));
        browser.wait(EC.presenceOf(e), 10000);
        expect(e.isPresent()).toBeTruthy();

    });

    it('Testing Map button',function () {
        element(by.id('mapButton')).click();

        browser.wait(EC.urlContains('mapa'), 5000).then(function(result) {
            expect(result).toEqual(true);
        });

    });

    it('Testing category Belleza button',function () {
        var belleza =by.css('a[href*="companies/'+ health +'"]');
        element(belleza).click();
        browser.wait(EC.urlContains(health), 6000).then(function(result) {
            expect(result).toEqual(true);
        });

    });

    it('Testing category Deporte button',function () {
        var sport =by.css('a[href*="companies/'+ deporte +'"]');
        element(sport).click();
        browser.wait(EC.urlContains(deporte), 6000).then(function(result) {
            expect(result).toEqual(true);
        });
        }
    );

    it('Testing category Ocio button',function () {
        var fun =by.css('a[href*="companies/'+ocio+'"]');
        element(fun).click();
        browser.wait(EC.urlContains(ocio), 6000).then(function(result) {
            expect(result).toEqual(true);
        });
        }
    );
    it('Testing category Admin Publico button',function () {
        var admin =by.css('a[href*="companies/'+adminPublica+'"]');
        element(admin).click();
        browser.wait(EC.urlContains(adminPublica), 6000).then(function(result) {
            expect(result).toEqual(true);
        });
        }
    );
    it('Testing category Comercio button',function () {
        var comerce =by.css('a[href*="companies/'+comercio+'"]');
        element(comerce).click();
        browser.wait(EC.urlContains(comercio), 6000).then(function(result) {
            expect(result).toEqual(true);
        });
        }
    );

});


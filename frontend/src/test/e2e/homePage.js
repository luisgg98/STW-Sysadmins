
//https://www.protractortest.org/#/tutorial
describe('Home page testing', function() {

    it('Testing Search Bar', function() {
        var EC = protractor.ExpectedConditions;
        browser.get('');
        //browser.wait(500);
        element(by.id('barraBusqueda')).click();
        element(by.id('barraBusqueda')).sendKeys('Deportivo');
        //browser.actions().sendKeys(protractor.Key.ENTER).perform();
        element(by.id('barraBusqueda')).sendKeys(protractor.Key.ENTER);
        var e = element(by.className('card-title h5'));
        browser.wait(EC.presenceOf(e), 10000);
        expect(e.isPresent()).toBeTruthy();
        browser.sleep(6000);

    });
});


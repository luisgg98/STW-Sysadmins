
//https://www.protractortest.org/#/tutorial
describe('Home page testing', function() {
    it('Testing Search Bar', function() {
        browser.get('');
        //browser.wait(500);
        element(by.id('barraBusqueda')).click();
        element(by.id('barraBusqueda')).sendKeys('Deportivo');
        element(by.id('barraBusqueda')).sendKeys(protractor.Key.ENTER);

    });
});


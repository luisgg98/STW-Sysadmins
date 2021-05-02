///admin
describe('Dashboard Admin Page testing', function() {
    /**
     *
     */
    beforeAll(function() {
        browser.get('admin');
    });

    /**
     *
     */
    afterAll(function () {
        browser.get('/');
    });

    /**
     *
     */
    it('Testing Admin Statistics', function() {
        var  stats =by.cssContainingText('.nav-item.nav-link', 'Estadisticas');
        element(stats).click();
    });

    /**
     *
     */
    it('Testing Admin User',function () {
        var  user =by.cssContainingText('.nav-item.nav-link', 'Usuarios');
        element(user).click();
    });

    /**
     *
     */
    it('Testing Admin Company',function () {
        var  compa =by.cssContainingText('.nav-item.nav-link', 'Compañias');
        element(compa).click();
    });
});

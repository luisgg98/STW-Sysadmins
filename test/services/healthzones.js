//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const loadDistrict =require('../../scripts/loadDistrict');
let ta = require('../../services/transparency_aragon');
const hz = require('../../services/healthzone')
const Healthzone = require('../../models/healthzone')

TestHZ={
    name:'Delicias Sur -LA PRUEBA',
    newcases:50,
    radius:50,
    date:'Prueba1',
    coordinates: [ 41.6454753, -0.9040533]
}

describe('Testing Health Zones ',function () {

    before(function (done) {
        loadDistrict.loadCouncilInfo();
        done();
            })

    after( function (done) {
        Healthzone.deleteOne({name: TestHZ.name });
        done();

    })


    it('It should update the health zones database',function (done) {
        ta.getCasesFile().then(() => {
            done();
        }).catch((error) => {
            throw error;
        });

    })

    it('It should save one health zone database',function (done) {
        hz.saveHealthzone(TestHZ.name,TestHZ.coordinates).then( () => {
            done();
        }).catch((error) => {
            throw error;
        });

    })
    it('It should update one health zone database', function (done) {
        hz.updateCovidHealthzone(TestHZ.name,TestHZ.newcases,TestHZ.radius,TestHZ.date).then(() => {
            done();
        }).catch((error) => {
            throw error;
        });

    });

})
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const loadDistrict =require('../../scripts/loadDistrict');
let ta = require('../../services/transparency_aragon')




describe('Testing Health Zones ',function () {

    before(function (done) {
        loadDistrict.loadCouncilInfo();
        done();
            }
        )


    it('It should update the health zones database',function (done) {
        ta.getCasesFile().then(r => {
            done();
        }).catch((error) => {
            throw error;
        });

    })

})
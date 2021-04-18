//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
const Company = require('../../models/company')
chai.use(chaiHttp);
describe('Company model tests',function () {
    it('Testing application endpoint', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
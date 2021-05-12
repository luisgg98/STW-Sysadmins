//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
chai.use(chaiHttp);

describe('Integration test', function () {
    it('Testing application endpoint', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(418);
                done();
            });
    });
});
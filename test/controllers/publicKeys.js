//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
chai.use(chaiHttp);

describe('Testing Public key API', () => {
    it('Getting captcha Key ', function (done) {
        const url = '/api/captcha/';
        chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

})
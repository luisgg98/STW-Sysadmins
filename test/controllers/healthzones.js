//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
chai.use(chaiHttp);

const url = '/api/healthzone/'
describe('Testing Health ZOne API', () => {

    it('Get petition to Endpoint', function (done) {
        chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });

    })

})
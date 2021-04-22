//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
const Service = require('../../models/service')
chai.use(chaiHttp);

let service = {  "nif": "string",
    "company": "string",
    "description": "string",
    "capacity": 3,
    "price":2};

const url = '/api/companies/'

describe('Testing service API', () => {
    beforeEach((done) => { //Before each test we empty the database
        Service.remove({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */

    it('it should GET all the services', (done) => {
        chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });

    it('it should create a new service using POST',(done => {
        chai.request(server)
            .post(url)
            .send(service)
            .end((err, res) => {
                if(err) throw err;
                res.should.have.status(200);
                done();
            })

    }))

});
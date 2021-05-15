//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
const {upDateStats} = require("../../services/stats");
let should = chai.should();
chai.use(chaiHttp);

describe('Testing Stats API', () => {

    it('Updatind stats', function (done) {
        upDateStats();
        done();
    })

    it('Getting Booking Stats ', function (done) {
        const url = '/api/statsBookings/';
        chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Getting Companies Stats ', function (done) {
        const url = '/api/statsCompanies/';
        chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });


    it('Getting Categories Stats ', function (done) {
        const url = '/api/statsCategories/';
        chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
})
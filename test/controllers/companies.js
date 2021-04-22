//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
const Company = require('../../models/company')
chai.use(chaiHttp);


let company = {  "nif": "string",
    "name": "Cafetería Lamarula",
    "email": "user@example.com",
    "password": "string",
    "street":"Calle Francisco de Vitoria",
    "streetnumber":30,
    "zipcode":50008,
    "category": "Ocio"};

const url = '/api/companies/'

describe('Testing Company API', () => {
    beforeEach((done) => { //Before each test we empty the database
        Company.remove({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */

    it('it should GET all the companies', (done) => {
        chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
                });
        });

    it('it should create a new company using POST',(done => {
        chai.request(server)
            .post(url)
            .send(company)
            .end((err, res) => {
                if(err) throw err;
                res.should.have.status(200);
                done();
            })

    }))


    it('It should delete a new company using DELETE',(done => {

        chai.request(server)
            .post(url)
            .send(company)
            .end((err, res) => {
                if(err) throw err;
                res.should.have.status(200);

                chai.request(server)
                    .post(url + 'login/')
                    .send({"email": "user@example.com","password": "string"})
                    .end((err,res)=>{
                        if(err) throw err;
                        res.should.have.status(200);
                        let bearer = res.body.token;
                        let id = res.body.company.id;
                        chai.request(server)
                            .delete(url + id )
                            .set({ "Authorization": `${bearer}` })
                            .end((err,res)=>{
                                if(err) throw err;
                                res.should.have.status(204);
                                done();
                            })


                    })

            })

    }))

    it('It should update a new company using PATCH',(done => {

        chai.request(server)
            .post(url)
            .send(company)
            .end((err, res) => {
                if(err) throw err;
                res.should.have.status(200);
                chai.request(server)
                    .post(url + 'login/')
                    .send({"email": "user@example.com","password": "string"})
                    .end((err,res)=>{
                        if(err) throw err;
                        res.should.have.status(200);
                        let bearer = res.body.token;
                        let id = res.body.company.id;
                        chai.request(server)
                            .patch(url + id )
                            .send({"name": "This is a test"})
                            .set({ "Authorization": `${bearer}` })
                            .end((err,res)=>{
                                if(err) throw err;
                                res.should.have.status(200);
                                done();
                            })
                    })

            })

    }))

});
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
const User = require('../../models/user')
chai.use(chaiHttp);

let user = {
    "first_name": "string",
    "last_name":"string",
    "email": "user@example.com",
    "password": "string",
    "phone": 123456789};

const url = '/api/users/'
//Our parent block
describe('Testing User API', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */

    it('it should GET all the users', (done) => {
        chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
                });
        });

    it('it should create a new user using POST',(done => {
        chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                if(err) throw err;
                res.should.have.status(200);
                done();
            })

    }))


    it('It should delete a new user using DELETE',(done => {

        chai.request(server)
            .post(url)
            .send(user)
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
                        let id = res.body.user.id;
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

    it('It should update a new user using PATCH',(done => {

        chai.request(server)
            .post(url)
            .send(user)
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
                        let id = res.body.user.id;
                        chai.request(server)
                            .patch(url + id )
                            .send({"last_name": "This is a test"})
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
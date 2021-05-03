//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
const Company = require('../../models/company')
chai.use(chaiHttp);


let company = {  "nif": "B12345678",
    "name": "Cafetería Lamarula",
    "email": "user@example.com",
    "password": "string",
    "street":"Calle Francisco de Vitoria",
    "streetnumber":30,
    "zipcode":50008,
    "category": "Ocio",
};

let updated_company = {
    "description":"Es un servicio maravilloso nadie deberia quejarse porque es una maravilla",
    "name": "This is a test",
    "service_duration":45,
    "schedule": {
        "monday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2":  "00:00",
            "close_2":  "00:00"
        },
        "tuesday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2":  "00:00",
            "close_2":  "00:00"
        },
        "wednesday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2":  "00:00",
            "close_2":  "00:00"
        },
        "thursday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2":  "00:00",
            "close_2":  "00:00"
        },
        "friday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2":  "00:00",
            "close_2":  "00:00"
        },
        "saturday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2":  "00:00",
            "close_2":  "00:00"
        },
        "sunday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2":  "00:00",
            "close_2":  "00:00"
        }
    },

}

const url = '/api/companies/'

describe('Testing Company API', () => {

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

    it('It should update a new company using PATCH',(done => {
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
                    .send(updated_company)
                    .set({ "Authorization": `${bearer}`})
                    .end((err,res)=>{
                        if(err) throw err;
                        res.should.have.status(200);
                        done();
                    })
            });

    }));

    /**
     *
     */
    it('It should get a company by its NIF',(done => {
        chai.request(server)
            .get(url + '/'+company.nif)
            .end((err,res)=>{
                if(err) throw err;
                res.should.have.status(200);
                console.log(res.body);
                res.body.schedule.should.be.eql(updated_company.schedule);
                res.body.description.should.be.eql(updated_company.description);
                done();

            })

    }));

    it('It should delete a new company using DELETE',(done => {
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
                    .timeout(5000)
                    .set({ "Authorization": `${bearer}` })
                    .end((err,res)=>{
                        if(err) throw err;
                        res.should.have.status(204);
                        done();
                    })
            })

    }))

});
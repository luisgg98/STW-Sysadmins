//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
chai.use(chaiHttp);

let company = {
    "nif": "B12345678",
    "name": "Cafetería Lamarula",
    "email": "user@example.com",
    "password": "string",
    "street": "Calle Francisco de Vitoria",
    "streetnumber": 30,
    "zipcode": 50008,
    "category": "Ocio",
};

let company_wrong_email = {
    "nif": "B12345677",
    "name": "Cafetería Lamarula",
    "email": "userERRORexampleERTcom",
    "password": "string",
    "street": "Calle Francisco de Vitoria",
    "streetnumber": 30,
    "zipcode": 50008,
    "category": "Ocio",
};

let company_category = {
    "nif": "B12345675",
    "name": "Cafetería Lamarula",
    "email": "user@example.com",
    "password": "string",
    "street": "Calle Francisco de Vitoria",
    "streetnumber": 30,
    "zipcode": 50008,
    "category": "WRONG CATEGORY",
};

let updated_company = {
    "description": "Es un servicio maravilloso nadie deberia quejarse porque es una maravilla",
    "name": "This is a test",
    "service_duration": 45,
    "schedule": {
        "monday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2": "00:00",
            "close_2": "00:00"
        },
        "tuesday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2": "00:00",
            "close_2": "00:00"
        },
        "wednesday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2": "00:00",
            "close_2": "00:00"
        },
        "thursday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2": "00:00",
            "close_2": "00:00"
        },
        "friday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2": "00:00",
            "close_2": "00:00"
        },
        "saturday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2": "00:00",
            "close_2": "00:00"
        },
        "sunday": {
            "open_1": "06:00",
            "close_1": "20:00",
            "open_2": "00:00",
            "close_2": "00:00"
        }
    },

}

const url = '/api/companies/'

describe('Testing Company API', () => {

    /*
      * Test the /GET route
      */
    it('It should GET all the companies', (done) => {
        chai.request(server)
            .get(url)
            .end((err, res) => {
                console.log(res.body)
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('It should create a new company using POST', (done => {
        chai.request(server)
            .post(url)
            .send(company)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(200);
                done();
            })
    }));

    it('It should  not create a new company using POST, wrong email', (done => {
        chai.request(server)
            .post(url)
            .send(company_wrong_email)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(422);
                done();
            })
    }));


    it('It should  not create a new company using POST, wrong Category', (done => {
        chai.request(server)
            .post(url)
            .send(company_category)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(422);
                done();
            })
    }));


    it('It should not create  the same company using POST', (done => {
        chai.request(server)
            .post(url)
            .send(company)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(409);
                done();
            })
    }));


    let token_company = '';
    let id_company = '';

    it('It should not log a wrong company', (done => {
        chai.request(server)
            .post(url + 'login/')
            .send({"email": company.email + "wrong", "password": company.password})
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(404);
                done();
            });

    }));


    it('It should update a new company using PATCH', (done => {
        chai.request(server)
            .post(url + 'login/')
            .send({"email": company.email, "password": company.password})
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(200);
                let bearer = res.body.token;
                token_company = bearer;
                id_company = res.body.company._id;
                console.log(res.body)
                chai.request(server)
                    .patch(url + id_company)
                    .send(updated_company)
                    .set({"Authorization": `${bearer}`})
                    .end((err, res) => {
                        if (err) throw err;
                        console.log(res.body)
                        res.should.have.status(200);
                        done();
                    })
            });

    }));

    //Should get 404
    it('It should not update , wrong access', (done => {
        chai.request(server)
            .patch(url + id_company + 'wrong')
            .send(updated_company)
            .set({"Authorization": `${token_company}`})
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(401);
                done();
            });
    }));


    //router.get("/:nif", ControllerCompany.fetchCompany)
    it('It should not get a company by its NIF', (done => {
        chai.request(server)
            .get(url + '/' + company.nif + 'NOFOUND')
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(404);
                done();
            });
    }));

    const url_service = '/services';

    let service_new =
        {
            "company": company.nif,
            "description": "Este es un servicio maravilloso la verdad",
            "capacity": 10,
            "price": 10
        }

    let update_service = {
        "company": company.nif,
        "description": "On a cold winter of morning\n" +
            "In the time before the light\n" +
            "In flames of death's eternal reign\n" +
            "We ride towards the fight\n" +
            "When the darkness is falling down\n" +
            "And the times are tough all right\n" +
            "The sound of evil laughter\n" +
            "Falls around the world tonight\n" +
            "Fightin' hard, fightin' on for the steel\n",
        "capacity": 10,
        "price": 10
    }

    let id_service = '';
    //POST /companies/{nif}/services
    it('Add a new service to the company', done => {
        chai.request(server)
            .post(url + company.nif + url_service)
            .send(service_new)
            .set({"Authorization": `${token_company}`})
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(200);
                let id_service = res.body._id;
                //PATCH //companies/{nif}/services/{id}
                console.log("Updating company service")
                chai.request(server)
                    .patch(url + company.nif + url_service + '/' + id_service)
                    .send(update_service)
                    .set({"Authorization": `${token_company}`})
                    .end((err, res) => {
                        if (err) throw err;
                        res.should.have.status(200);
                        done();
                    });
            });
    });

    //CREATE SERVICE ADD AN ERROR
    it('It should no add a new service a wrong company', done => {
        chai.request(server)
            .post(url + company.nif + "wrong" + url_service)
            .send(service_new)
            .set({"Authorization": `${token_company}`})
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(404);
                done();
            });
    });

    /**
     *
     */
    //router.get("/:nif", ControllerCompany.fetchCompany)
    it('It should get a company by its NIF', (done => {
        chai.request(server)
            .get(url + company.nif)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(200);
                done();
            })
    }));

    //WRONG FORMAT
    it('It should no add a new  WRONG FORMAT service a company', done => {
        chai.request(server)
            .post(url + company.nif + url_service)
            .send({})
            .set({"Authorization": `${token_company}`})
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(405);
                done();
            });
    });


    // GET /companies/{nif}/services
    it('It should get services from a company', (done => {
        chai.request(server)
            .get(url + company.nif + url_service)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(200);
                let services = res.body.services;
                services.length.should.be.greaterThan(0);
                let first_service = services[0];
                first_service.description.should.be.eql(update_service.description);
                let id = first_service._id;
                console.log("Deleting a service from a company");
                chai.request(server)
                    .delete(url + company.nif + url_service + '/' + id)
                    .timeout(5000)
                    .set({"Authorization": `${token_company}`})
                    .end((err, res) => {
                        if (err) throw err;
                        res.should.have.status(204);
                        done();
                    })
            });
    }));

    /**
     *
     */
    it('It should not update a service, wrong service', function (done) {
        //id_service
        chai.request(server)
            .patch(url + company.nif + url_service + '/' + id_service + "wrong")
            .send(update_service)
            .set({"Authorization": `${token_company}`})
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(404);
                done();
            });
    });


    /**
     *
     */
    it('It should not delete a service, wrong service', function (done) {
        //id_service
        chai.request(server)
            .delete(url + company.nif + url_service + '/' + id_service + "wrong")
            .send(update_service)
            .set({"Authorization": `${token_company}`})
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(404);
                done();
            });
    });


    // GET /companies/{nif}/services
    it('It should not get services from a wrong company', (done => {
        chai.request(server)
            .get(url + "wrong" + url_service)
            .end((err, res) => {
                if (err) throw err;
                console.log(res.body)
                res.should.have.status(404);
                done();

            });
    }));


    it('It should not any get services from a wrong company', (done => {
        chai.request(server)
            .get(url + "wrong")
            .end((err, res) => {
                if (err) throw err;
                console.log(res.body)
                res.should.have.status(404);
                done();

            });
    }));


    it('It should have no permission to delete', (done => {
        chai.request(server)
            .delete(url + id_company)
            .timeout(5000)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(401);
                done();
            });

    }));

    it('It should have no permission to update', (done => {
        chai.request(server)
            .patch(url + id_company)
            .timeout(5000)
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(401);
                done();
            });

    }));

    it('It should delete a new company using DELETE', (done => {
        chai.request(server)
            .delete(url + id_company)
            .timeout(5000)
            .set({"Authorization": `${token_company}`})
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(204);
                done();
            });
    }))


    it('It should not delete , wrong access', (done => {
        chai.request(server)
            .delete(url + id_company + 'wrong')
            .send(updated_company)
            .set({"Authorization": `${token_company}`})
            .end((err, res) => {
                if (err) throw err;
                res.should.have.status(401);
                done();
            });
    }));

});
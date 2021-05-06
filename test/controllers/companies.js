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

    it('It should GET all the companies', (done) => {
        chai.request(server)
            .get(url)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
                });
        });

    it('It should create a new company using POST',(done => {
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
            .send({"email": company.email,"password": company.password})
            .end((err,res)=>{
                if(err) throw err;
                res.should.have.status(200);
                let bearer = res.body.token;
                let id = res.body.company._id;
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
                res.body.schedule.should.be.eql(updated_company.schedule);
                res.body.description.should.be.eql(updated_company.description);
                done();

            })

    }));
    const url_service = '/services';

    let service_new =
    {
        "company": company.nif,
        "description": "Este es un servicio maravilloso la verdad",
        "capacity": 10,
        "price": 10
    }

    let update_service =     {
        "company": company.nif,
        "description": "On a cold winter of morning\n" +
            "In the time before the light\n" +
            "In flames of death's eternal reign\n" +
            "We ride towards the fight\n" +
            "When the darkness is falling down\n" +
            "And the times are tough all right\n" +
            "The sound of evil laughter\n" +
            "Falls around the world tonight\n" +
            "Fightin' hard, fightin' on for the steel\n" +
            "Through the wastelands evermore\n" +
            "The skeletors souls will feel the hell\n" +
            "Bodies wasted on the shores\n" +
            "On the blackest wings in hell's domain\n" +
            "We watch the lands become\n" +
            "In fire and flame, and once again we know\n" +
            "So now we're flying we're free\n" +
            "We're free before the thunderstorm\n" +
            "On towards the wilderness\n" +
            "Our quest carries on\n" +
            "Far beyond the sun down, far beyond the moonlight\n" +
            "Deep inside our hearts and all our souls\n" +
            "So far away we wait for the day\n" +
            "For the light source so wasted and gone\n" +
            "We feel the pain of a lifetime lost in a thousand days\n" +
            "Through the fire and flames we carry on\n" +
            "As the red day is dawning\n" +
            "And the lightning cracks the sky\n" +
            "They'll raise their hands\n" +
            "To the heavens above\n" +
            "Who descend unto their lies\n" +
            "Running back through the mid morning light\n" +
            "There's a burning in my heart\n" +
            "We're banished from the time in the foreign land\n" +
            "To a light beyond the stars\n" +
            "In your blackest dreams see to the need, that destiny is tied\n" +
            "And endlessly we're roaming free tonight\n" +
            "And on the wings of a dream so far beyond reality\n" +
            "All alone in desperation, now the time has gone\n" +
            "Lost inside you'll never find, lost within my own mind\n" +
            "Day after day this misery must go on\n" +
            "So far away we wait for the day\n" +
            "For the light source so wasted and gone\n" +
            "We feel the pain of a lifetime lost in a thousand days\n" +
            "Through the fire and flames we carry on\n" +
            "Now here we stand with their blood on our hands\n" +
            "We fought so hard, now can we understand\n" +
            "I'll break the seal of this curse if I possibly can\n" +
            "For freedom of every man\n" +
            "So far away we wait for the day\n" +
            "For the light source so wasted and gone\n" +
            "We feel the pain of a lifetime lost in a thousand days\n" +
            "Through the fire and flames we carry on",
        "capacity": 10,
        "price": 10
    }


    //POST /companies/{nif}/services
    it('Add a new service to the company',done => {
        chai.request(server)
            .post(url + 'login/')
            .send({"email": company.email,"password": company.password})
            .end((err,res)=>{
                if(err) throw err;
                res.should.have.status(200);
                let bearer = res.body.token;
                chai.request(server)
                    .post(url + company.nif + url_service  )
                    .send(service_new)
                    .set({ "Authorization": `${bearer}`})
                    .end((err,res)=>{
                        if(err) throw err;
                        res.should.have.status(200);
                        let id = res.body._id;
                        //PATCH //companies/{nif}/services/{id}
                        console.log("Updating company service")
                        chai.request(server)
                            .patch(url + company.nif + url_service +'/' + id  )
                            .send(update_service)
                            .set({ "Authorization": `${bearer}`})
                            .end((err,res)=>{

                                if(err) throw err;
                                res.should.have.status(200);
                                done();
                            });
                    })
            });

    });

    // GET /companies/{nif}/services
    it('It should get services from a company',(done => {
        chai.request(server)
            .get(url + company.nif + url_service )
            .end((err,res)=>{
                if(err) throw err;
                res.should.have.status(200);
                let services = res.body.services;
                services.length.should.be.greaterThan(0);
                let first_service = services[0];

                first_service.description.should.be.eql(update_service.description);
                let id = first_service._id;
                console.log("Deleting a service from a company");
                chai.request(server)
                    // DELETE /companies/{nif}/services/{id}
                    .post(url + 'login/')
                    .send({"email": company.email,"password": company.password})
                    .end((err,res)=>{
                        if(err) throw err;
                        res.should.have.status(200);
                        let bearer = res.body.token;
                        chai.request(server)
                            .delete(url + company.nif+ url_service+ '/' + id)
                            .timeout(5000)
                            .set({ "Authorization": `${bearer}` })
                            .end((err,res)=>{
                                if(err) throw err;
                                res.should.have.status(204);
                                done();
                            })
                    })

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

                let id = res.body.company._id;
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
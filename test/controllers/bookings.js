//Require the dev-dependencies
let chai = require('chai');
require('../../config/database')
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();
chai.use(chaiHttp);


const company = {
    "nif": "012345678",
    "name": "Cafetería Lamarula",
    "email": "user@example.com",
    "password": "string",
    "street": "Calle Francisco de Vitoria",
    "streetnumber": 30,
    "zipcode": 50008,
    "category": "Ocio",
    "description": "Es un servicio maravilloso nadie deberia quejarse porque es una maravilla",
    "service_duration": 30,
    "capacity": 4,
    "schedule": {
        "monday": {
            "open_1": "06:00",
            "close_1": "12:00",
            "open_2": "14:00",
            "close_2": "20:00"
        },
        "tuesday": {
            "open_1": "06:00",
            "close_1": "12:00",
            "open_2": "14:00",
            "close_2": "20:00"
        },
        "wednesday": {
            "open_1": "06:00",
            "close_1": "12:00",
            "open_2": "14:00",
            "close_2": "20:00"
        },
        "thursday": {
            "open_1": "06:00",
            "close_1": "12:00",
            "open_2": "14:00",
            "close_2": "20:00"
        },
        "friday": {
            "open_1": "06:00",
            "close_1": "12:00",
            "open_2": "14:00",
            "close_2": "20:00"
        },
        "saturday": {
            "open_1": "06:00",
            "close_1": "12:00",
            "open_2": "14:00",
            "close_2": "20:00"
        },
        "sunday": {
            "open_1": "06:00",
            "close_1": "12:00",
            "open_2": "14:00",
            "close_2": "20:00"
        }
    },
};
let user = {
    "first_name": "string",
    "last_name": "string",
    "email": "user@example.com",
    "password": "string",
    "phone": 523456789
};
let service_new =
    {
        "company": company.nif,
        "description": "Este es un servicio maravilloso la verdad",
        "price": 10
    };

const url_company = '/api/companies/'
const url_user = '/api/users/'
const url_service = '/services';

describe('Testing Booking API', () => {
    let id_service = null;
    let id_company = null;
    let bookings_id = null;
    let user_id = null;
    let token = null;

    before(function (done) {
        chai.request(server)
            .post(url_company)
            .send(company)
            .end((err, res) => {
                if (err) throw err;
                chai.request(server)
                    .post(url_user)
                    .send(user)
                    .end((err, res) => {
                        if (err) throw err;
                        console.log(res.body);
                        user_id = res.body._id;
                        chai.request(server)
                            .post(url_company + 'login/')
                            .send({"email": company.email, "password": company.password})
                            .end((err, res) => {
                                if (err) throw err;
                                res.should.have.status(200);
                                token = res.body.token;
                                id_company = res.body.company.nif;
                                chai.request(server)
                                    .post(url_company + company.nif + url_service)
                                    .send(service_new)
                                    .set({"Authorization": `${token}`})
                                    .end((err, res) => {
                                        if (err) throw err;
                                        res.should.have.status(201);
                                        console.log(res.body)
                                        id_service = res.body._id;
                                        done();
                                    });
                            });
                    })
            });
    });

    //router.post("/:id/bookings", ControllerBooking.create_booking)
    it('It should not create a new booking, USER NOT FOUND', function (done) {
        let booking = {
            service: id_service,
            date: '2020-05-12',
            time: '9:00'
        }
        chai.request(server).post('/api/users/' + user_id + 'WRONGNOTFOUND' + '/bookings')
            .send(booking)
            .timeout(5000)
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(405)
                bookings_id = res.body._id;
                done();
            })
    });

    //router.post("/:id/bookings", ControllerBooking.create_booking)
    it('It should not create a new booking, SERVICE NOT FOUND', function (done) {
        let no_service = {
            date: '2020-05-12',
            time: '9:00'
        }
        chai.request(server).post('/api/users/' + user_id + '/bookings')
            .send(no_service)
            .timeout(5000)
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(405)
                done();
            })
    });

    //router.post("/:id/bookings", ControllerBooking.create_booking)
    it('It should create a new booking', function (done) {
        let booking = {
            service: id_service,
            date: '2020-05-12',
            time: '9:00'
        }
        chai.request(server).post('/api/users/' + user_id + '/bookings')
            .send(booking).timeout(5000)
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(201)
                bookings_id = res.body._id;
                done();
            })
    });

    //router.get("/:id/bookings", ControllerBooking.get_bookings)
    it('It should get aLL bookings', function (done) {
        chai.request(server).get("/api/users/" + user_id + "/bookings")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    });


    //router.patch("/:id/bookings/:booking_id", ControllerBooking.update_bookings)
    it('It should update a booking', function (done) {
        let updated = {
            date: '2020-05-12',
            time: '10:30'
        }
        chai.request(server)
            .patch('/api/users/' + user_id + '/bookings/' + bookings_id)
            .set({"Authorization": `${token}`})
            .send(updated)
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                done();
            });
    });

    //router.get("/:nif/services/:id/bookings", ControllerBooking.services_bookings)
    it('It should get all booking from a service', function (done) {
        ///companies/{nif}/services/{id}/bookings
        chai.request(server)
            .get('/api/companies/' + id_company + '/services/' + id_service + '/bookings/')
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                res.body.should.be.a('array')
                done();
            });
    });

    it('It should get all booking from a service BY TIME', function (done) {
        ///companies/{nif}/services/{id}/bookings
        chai.request(server)
            .get('/api/companies/' + id_company + '/services/' + id_service + '/bookings?time=10:30')
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                res.body.should.be.a('array')
                done();
            });
    });

    it('It should get all booking from a service BY DATE', function (done) {
        ///companies/{nif}/services/{id}/bookings
        chai.request(server)
            .get('/api/companies/' + id_company + '/services/' + id_service + '/bookings?date=2020-05-12')
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                res.body.should.be.a('array')
                done();
            });
    });

    it('It should get all booking from a service BY TIME AND DATE', function (done) {
        ///companies/{nif}/services/{id}/bookings
        chai.request(server)
            .get('/api/companies/' + id_company + '/services/' + id_service + '/bookings?date=2021-05-12&time=10:30')
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                done();
            });
    });

    //router.get("/:nif/bookings", ControllerBooking.company_bookings)
    it('It should get all booking from a company', function (done) {
        chai.request(server)
            .get('/api/companies/' + id_company + '/bookings/')
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                res.body.should.be.a('array')
                done();
            });
    });

    it('It should get all booking from a company BY DATE AND TIME', function (done) {
        chai.request(server)
            .get('/api/companies/' + id_company + '/bookings?date=2021-05-12&time=10:30')
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                done();
            });
    });

    it('It should get all booking from a company BY DATE', function (done) {
        chai.request(server)
            .get('/api/companies/' + id_company + '/bookings?date=2021-05-12')
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                done();
            });
    });

    it('It should get all booking from a company BY TIME', function (done) {
        chai.request(server)
            .get('/api/companies/' + id_company + '/bookings?time=10:30')
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                res.body.should.be.a('array')
                done();
            });
    });

    //router.get("/:nif/bookings/capacity", ControllerBooking.remaining_space_by_date)
    it('It should get capacity of booking from a company MONDAY', function (done) {
        let date = {
            date: '2021-05-10'
        }
        chai.request(server)
            .get('/api/companies/' + id_company + '/bookings/capacity?date=' + date.date)
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                done();
            });
    });

    it('It should get capacity of booking from a company TUESDAY', function (done) {
        let date = {
            date: '2021-05-11'
        }
        chai.request(server)
            .get('/api/companies/' + id_company + '/bookings/capacity?date=' + date.date)
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                done();
            });
    });

    it('It should get capacity of booking from a company WEDNESDAY', function (done) {
        let date = {
            date: '2021-05-12'
        }
        chai.request(server)
            .get('/api/companies/' + id_company + '/bookings/capacity?date=' + date.date)
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                done();
            });
    });

    it('It should get capacity of booking from a company THURSDAY', function (done) {
        let date = {
            date: '2021-05-13'
        }
        chai.request(server)
            .get('/api/companies/' + id_company + '/bookings/capacity?date=' + date.date)
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                done();
            });
    });

    it('It should get capacity of booking from a company FRIDAY', function (done) {
        let date = {
            date: '2021-05-14'
        }
        chai.request(server)
            .get('/api/companies/' + id_company + '/bookings/capacity?date=' + date.date)
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                done();
            });
    });

    it('It should get capacity of booking from a company SATURDAY', function (done) {
        let date = {
            date: '2021-05-15'
        }
        chai.request(server)
            .get('/api/companies/' + id_company + '/bookings/capacity?date=' + date.date)
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                done();
            });
    });

    it('It should get capacity of booking from a company SUNDAY', function (done) {
        let date = {
            date: '2021-05-16'
        }
        chai.request(server)
            .get('/api/companies/' + id_company + '/bookings/capacity?date=' + date.date)
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(200)
                done();
            });
    });

    it('It should get capacity of booking from a company WITHOUT DATE', function (done) {
        chai.request(server)
            .get('/api/companies/' + id_company + '/bookings/capacity')
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(405)
                done();
            });
    });

    it('It should get capacity of booking from a company WITHOUT COMPANY NIF', function (done) {
        chai.request(server)
            .get('/api/companies/' + 'bookings/capacity')
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(404)
                done();
            });
    });

    //router.delete("/:id/bookings/:booking_id", ControllerBooking.delete_booking)
    it('It should delete a new booking', function (done) {
        chai.request(server)
            .delete('/api/users/' + user_id + '/bookings/' + bookings_id)
            .set({"Authorization": `${token}`})
            .end((err, res) => {
                if (err) throw err
                console.log(res.body)
                res.should.have.status(204)
                done();
            });
    });
});
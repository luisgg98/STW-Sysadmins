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
    "service_duration": 45,
    "capacity": 4,
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
let user_id
describe('Testing Booking API', () => {
    let id_service = '';
    let id_company = '';

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
                        user_id = res.body._id;
                        chai.request(server)
                            .post(url_company + 'login/')
                            .send({"email": company.email, "password": company.password})
                            .end((err, res) => {
                                if (err) throw err;
                                res.should.have.status(200);
                                let bearer = res.body.token;
                                id_company = res.body.company.nif;

                                chai.request(server)
                                    .post(url_company + company.nif + url_service)
                                    .send(service_new)
                                    .set({"Authorization": `${bearer}`})
                                    .end((err, res) => {
                                        if (err) throw err;
                                        res.should.have.status(200);
                                        console.log(res.body)
                                        id_service = res.body._id;
                                        done();
                                    });
                            });
                    })
            });
    });

//'/users/:id/bookings
    //router.post("/:id/bookings", ControllerBooking.create_booking)
    it('It should create a new booking', function (done) {
        let booking = {
            user_id: user_id,
            service_id: id_service,
            company_nif: id_company,
            date: '2020-05-12',
            time: '9:00'
        }
        chai.request(server).post('/api/users/'+user_id+'/bookings').send(booking).end((err, res) => {
            if(err)throw err
            res.should.have.status(200)
            done();
        })
    });

    //router.get("/:id/bookings", ControllerBooking.get_bookings)
    it('It should get aLL bookings', function (done) {
        chai.request(server).get("/api/users/"+user_id+"/bookings").end((err, res)=>{
            res.should.have.status(200)
            res.body.should.be.a('array')
            done()
        })
    });

    //router.patch("/:id/bookings/:booking_id", ControllerBooking.update_bookings)
    it('It should update a booking', function (done) {
        done();
    });
    //router.delete("/:id/bookings/:booking_id", ControllerBooking.delete_booking)
    it('It should delete a new booking', function (done) {
        done();
    });

});
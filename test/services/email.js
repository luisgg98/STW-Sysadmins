const {sendCancellation} = require("../../services/email");
const {sendReminder} = require("../../services/email");


describe('Testing email service', function () {

    let user = {
        "first_name": "string",
        "last_name": "string",
        "email": "739202@unizar.es",
        "password": "string",
        "phone": 103006089
    };

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

    let booking = {
        "date": "lunes, 10 de mayo de 2021 ",
        "time": "9:30 - 10:00"
    }


    it('Sending reminder emails', function (done) {
        sendReminder(user, booking, company);
        done();
    })

    it('Sending cancellation emails',function (done) {
        sendCancellation(user, booking, company);
        done();
    })


});
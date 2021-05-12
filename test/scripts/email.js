const {sendReminder} = require("../../scripts/email");


describe('Testing email service', function () {

    let user = {
        "first_name": "string",
        "last_name": "string",
        "email": "739202@unizar.es",
        "password": "string",
        "phone": 123456789
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
    it('Sending emails', function (done) {
        sendReminder(user, booking, company);
        done();
    })


});
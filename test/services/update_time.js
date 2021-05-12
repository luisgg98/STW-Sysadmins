const {update_time_slots_services: update_time} = require("../../services/update_time_slots");

let company = {
    "nif": "B12345678",
    "name": "Cafetería Lamarula",
    "email": "user@example.com",
    "password": "string",
    "street": "Calle Francisco de Vitoria",
    "streetnumber": 30,
    "zipcode": 50008,
    "category": "Ocio",
    "description": "Es un servicio maravilloso nadie deberia quejarse porque es una maravilla",
    "service_duration": 45,
    "schedule": {
        "monday": {
            "open_1": "06:00",
            "close_1": "10:00",
            "open_2": "14:00",
            "close_2": "20:00"
        },
        "tuesday": {
            "open_1": "06:00",
            "close_1": "10:00",
            "open_2": "14:00",
            "close_2": "20:00"
        },
        "wednesday": {
            "open_1": "06:00",
            "close_1": "10:00",
            "open_2": "14:00",
            "close_2": "20:00"
        },
        "thursday": {
            "open_1": "06:00",
            "close_1": "10:00",
            "open_2": "14:00",
            "close_2": "20:00"
        },
        "friday": {
            "open_1": "06:00",
            "close_1": "10:00",
            "open_2": "14:00",
            "close_2": "20:00"
        },
        "saturday": {
            "open_1": "06:00",
            "close_1": "10:00",
            "open_2": "14:00",
            "close_2": "20:00"
        },
        "sunday": {
            "open_1": "06:00",
            "close_1": "10:00",
            "open_2": "14:00",
            "close_2": "20:00"
        }
    },
    "time_slots": {
        "monday_1": [],
        "monday_2": [],
        "tuesday_1": [],
        "tuesday_2": [],
        "wednesday_1": [],
        "wednesday_2": [],
        "thursday_1": [],
        "thursday_2": [],
        "friday_1": [],
        "friday_2": [],
        "saturday_1": [],
        "saturday_2": [],
        "sunday_1": [],
        "sunday_2": []
    },

}

const capacity = 10;


describe('', function (done) {
    it('', function (done) {
        update_time(company, capacity)
        done();
    })

})
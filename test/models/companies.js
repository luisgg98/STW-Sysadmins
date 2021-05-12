const assert = require('chai').assert;
const Company = require('../../models/company');
require('../../config/database')
let companiesArray = [
    {
        name: 'El Limonero Bar',
        nif: '1',
        email: 'ho@hol.com',
        password: 'aaa',
        streetnumber: 25,
        street: 'Calle Zaragoza la Vieja',
        zipcode: 50007,
        salt: 'salty',
        category: 'Testing',
        description: 'desc',
        service_duration: 0,
        capacity: 3,
        schedule: {
            monday: {open_1: "9", close_1: "10"},
            tuesday: {open_1: "9", close_1: "10"},
            wednesday: {open_1: "9", close_1: "10"},
            thursday: {open_1: "9", close_1: "10"},
            friday: {open_1: "9", close_1: "10"},
            saturday: {open_1: "9", close_1: "10"},
            sunday: {open_1: "9", close_1: "10"}
        },
        location: {type: "Point", coordinates: [41.649693, -0.887712]}
    },

    {
        name: 'Multiverso Bar',
        nif: '2',
        email: 'ho@hol.com',
        password: 'aaa',
        streetnumber: 29,
        street: 'Calle La Paz',
        zipcode: 50008,
        salt: 'salty',
        category: 'Testing',
        description: 'desc',
        service_duration: 0,
        capacity: 3,
        schedule: {
            monday: {open_1: "9", close_1: "10"},
            tuesday: {open_1: "9", close_1: "10"},
            wednesday: {open_1: "9", close_1: "10"},
            thursday: {open_1: "9", close_1: "10"},
            friday: {open_1: "9", close_1: "10"},
            saturday: {open_1: "9", close_1: "10"},
            sunday: {open_1: "9", close_1: "10"}
        },
        location: {type: "Point", coordinates: [41.649693, -0.887712]}
    },

    {
        name: 'Carniceria Maza',
        nif: '3',
        email: 'ho@hol.com',
        password: 'aaa',
        streetnumber: 86,
        street: 'Av. Cesáreo Alierta',
        zipcode: 50013,
        salt: 'salty',
        category: 'Testing',
        description: 'desc',
        capacity: 3,
        service_duration: 0,
        schedule: {
            monday: {open_1: "9", close_1: "10"},
            tuesday: {open_1: "9", close_1: "10"},
            wednesday: {open_1: "9", close_1: "10"},
            thursday: {open_1: "9", close_1: "10"},
            friday: {open_1: "9", close_1: "10"},
            saturday: {open_1: "9", close_1: "10"},
            sunday: {open_1: "9", close_1: "10"}
        },
        location: {type: "Point", coordinates: [41.649693, -0.887712]}
    }];
const newname = 'Desatranques Jaen';

// Calle La Paz
describe('Company model tests', function () {
    let companiesID = []
    before(function (done) {
        let numCompanyCreated = 0
        companiesArray.forEach(function (companyData) {
            let company = new Company(companyData);
            company.save(function (error, company) {
                if (error) throw  error;
                companiesID.push(company._id);
                numCompanyCreated++;
                if (numCompanyCreated == companiesArray.length) {
                    done();
                }
            })
        })

    })
    after(function (done) {
        let numCompanyRemoved = 0
        companiesArray.forEach(function (companyData) {
            Company.findOneAndRemove({name: companyData.name}, {}, function (err, doc) {
                if (err) throw err;
                numCompanyRemoved++;
                if (numCompanyRemoved == (companiesArray.length - 1)) {
                    done();
                }
            })
        })
    })

    it('Should find all companies without error', function (done) {
        Company.find(function (error, companies) {
            assert.isAtLeast(companies.length, 3)
            done();
        })
    })

    it('Should find a company by name', function (done) {
        Company.findOne({name: companiesArray[1].name}, function (err, doc) {
            if (err) throw  err;
            assert.isNotNull(doc)
            done();
        })
    })

    it('Should change the name of a company', function (done) {
        Company.findOneAndUpdate({name: companiesArray[0].name}, {name: newname},
            {returnOriginal: false, upsert: true, new: true},
            function (err, doc) {
                if (err) {
                    throw err;
                }
                assert.isNotNull(doc);
                assert.equal(doc.name, newname);
                companiesArray[0].name = newname;
                done();
            })
    })

    it('Should delete a company by name', function (done) {
        Company.findOneAndRemove({name: companiesArray[0].name}, {}, function (err, doc) {
            if (err) throw err;
            assert.isNotNull(doc)
            done();
        })
    })
})

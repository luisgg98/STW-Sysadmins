const assert = require('chai').assert;
const HealthZone = require('../../models/healthzone');
require('../../config/database')

let healthzonesArray = [
    {name: 'Test 1'},
    {name: 'Test 2'},
    {name: 'Test 3'}];
const newname = 'Testing New Name';

/**
 *
 */
describe('HealthZone model tests', function () {
    let healthzonesID = []
    before(function (done) {
        let numHealthZoneCreated = 0
        healthzonesArray.forEach(function (HealthZoneData) {
            let healthZone = new HealthZone(HealthZoneData);
            healthZone.save(function (error, healthZone) {
                if (error) throw  error;
                healthzonesID.push(healthZone._id);
                numHealthZoneCreated++;
                if (numHealthZoneCreated == healthzonesArray.length) {
                    done();
                }

            })

        })


    })
    after(function (done) {
        let numHealthZoneRemoved = 0
        healthzonesArray.forEach(function (HealthZoneData) {
            HealthZone.findOneAndRemove({name: HealthZoneData.name}, {}, function (err, doc) {
                if (err) throw err;
                numHealthZoneRemoved++;
                if (numHealthZoneRemoved == (healthzonesArray.length - 1)) {
                    done();
                }

            })

        })


    })

    it('Should find all healthZone without error', function (done) {
        HealthZone.find(function (error, healthzones) {
            assert.isAtLeast(healthzones.length, 3)
            done();

        })


    })

    it('Should find a healthZone by name', function (done) {
        HealthZone.findOne({name: healthzonesArray[1].name}, function (err, doc) {
            if (err) throw  err;
            assert.isNotNull(doc)
            done();

        })
    })

    it('Should change the name of a healthZone', function (done) {
        HealthZone.findOneAndUpdate({name: healthzonesArray[0].name}, {name: newname},
            {returnOriginal: false, upsert: true, new: true},
            function (err, doc) {
                if (err) {
                    throw err;
                }
                assert.isNotNull(doc);
                assert.equal(doc.name, newname);
                healthzonesArray[0].name = newname;
                done();
            })
    })

    it('Should delete a healthZone by name', function (done) {
        HealthZone.findOneAndRemove({name: healthzonesArray[0].name}, {}, function (err, doc) {
            if (err) throw err;
            assert.isNotNull(doc)
            done();
        })
    })
})

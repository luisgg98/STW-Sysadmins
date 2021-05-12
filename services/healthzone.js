const Healthzone = require('../models/healthzone');

/**
 * Update the data related to a health zone
 * @param ZonaSalud
 * @param newcases
 * @param radius
 * @returns {Promise<void>}
 */

async function updateCovidHealthzone(ZonaSalud, newcases, radius, date) {
    try {
        Healthzone.updateOne(
            {name: ZonaSalud},
            {$set: {newcases: newcases, radius: radius, date: date}},
            {},
            function (err) {
                /* istanbul ignore next */
                if (err) {
                    throw err;
                }
            });
    } catch (e) {
        console.log(ZonaSalud)
        console.log("Error updating Health Zone: " + e);
    }
}

/**
 * Save a new health zone
 * @param title
 * @param coordinates
 * @returns {Promise<void>}
 */
async function saveHealthzone(title, coordinates) {
    try {
        Healthzone.findOne({name: title}, {}, {}, async function (error, hz) {
            if (error) {
                throw error;
            }
            if (hz == null) {
                // Change order of coordinates
                let healthzone = new Healthzone({
                    name: title,
                    newcases: 0,
                    radius: 0,
                    location: {
                        type: "Point",
                        coordinates: coordinates
                    }
                });
                await healthzone.save();
            }
        });

    }
        /* istanbul ignore next */ catch (e) {
        console.log("Error while starting the Health zone database");
        console.log("Problems with:");
        console.log(e);
    }
}

module.exports.updateCovidHealthzone = updateCovidHealthzone;
module.exports.saveHealthzone = saveHealthzone;




const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'openstreetmap',
    language: 'es'
};

const geocoder = NodeGeocoder(options);

/**
 *
 * @param place
 * @param streetnumber
 * @param street
 * @param zipcode
 * @returns {Promise<*>}
 */
async function geoCoding(place, streetnumber, street, zipcode) {
    let query = `${place}, ${streetnumber}, ${street}, Zaragoza, Aragon, ${zipcode}, España`;
    const res = await geocoder.geocode(query);
    return res;
}

/**
 *
 * @param street
 * @param zipcode
 * @returns {Promise<*>}
 */
async function geoCodingStreet(street, zipcode) {
    let query = `${street}, Zaragoza, Aragon, ${zipcode}, España`;
    const res = await geocoder.geocode(query);
    return res;
}

/**
 *
 * @param place
 * @param streetnumber
 * @param street
 * @param zipcode
 * @returns {Promise<*>}
 */
async function findCoordenates(place, streetnumber, street, zipcode) {
    return new Promise((resolve, reject) => {
        let coordinates = {
            latitude: 41.649693,
            longitude: -0.887712
        }
        let query = geoCoding(place, streetnumber, street, zipcode).then(
            (results) => {
                if (results.length == 0) {
                    // In case it can not find the place it return the coordinates
                    // of the city of Zaragoza
                    query = geoCodingStreet(street, zipcode)
                        .then(
                            (results) => {
                                if (results.length > 0) {
                                    let result = results[0]
                                    coordinates = {
                                        latitude: result.latitude,
                                        longitude: result.longitude
                                    }
                                }
                                resolve(coordinates)
                            }
                        );
                } else {
                    let result = results[0]
                    coordinates = {
                        latitude: result.latitude,
                        longitude: result.longitude
                    }
                    resolve(coordinates)
                }
            }
        ).catch(error => {
            /* istanbul ignore next */
            console.log("ERROR: WHILE UPDATING COORDINATES" + error);
            resolve(coordinates);
        })
    });
}

module.exports.findCoordenates = findCoordenates;


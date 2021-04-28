const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'openstreetmap',
    language:'es'
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
async function geoCoding(place,streetnumber,street,zipcode){
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
async function geoCodingStreet(street,zipcode){
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
async function findCoordenates(place,streetnumber,street,zipcode) {
    return new Promise((resolve, reject) => {
        let query = geoCoding(place,streetnumber,street,zipcode).then(
            (results) =>{
                let coordinates;
                if (results.length == 0) {
                    console.log('1-------');
                    // In case it can not find the place it return the coordinates
                    // of the city of Zaragoza
                    query = geoCodingStreet(street,zipcode)
                        .then(
                        (results) =>{
                            console.log('2-------');
                            if (results.length == 0){
                                console.log('4-------');
                                coordinates = {
                                    latitude: 41.649693,
                                    longitude: -0.887712
                                }
                            }
                            else{
                                console.log('5-------');
                                let result = results[0]
                                coordinates={
                                    latitude: result.latitude,
                                    longitude: result.longitude
                                }
                            }
                            resolve(coordinates)
                        }
                        ).catch(error =>{
                            console.log('6-------');
                            reject(error)
                        })

                } else {
                    console.log('3-------');
                    let result = results[0]
                    coordinates={
                        latitude: result.latitude,
                        longitude: result.longitude
                    }
                    resolve(coordinates)
                }
            }
        ).catch(error =>{
            console.log('7-------');
            reject(error)
        })
    });
}

module.exports.findCoordenates = findCoordenates;


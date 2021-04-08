
const https = require('https');
const hz = require('../services/healthzone');
const url ='https://www.zaragoza.es/sede/servicio/distrito.json?fl=id,title,geometry&srsname=wgs84';

/**
 *
 * @type {Promise<unknown>}
 */
let loadCouncilData = new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err.message);
        });

    });

/**
 *
 * @param name
 * @returns {*}
 */
function deleteBoard(name){
    if(name.includes('Junta Vecinal ')){
        return name.replace('Junta Vecinal ','')
    }
    else{
        return name.replace('Junta Municipal ','')
    }
}

/**
 *
 */
function loadCouncilInfo() {
    loadCouncilData.then(function(value) {
        let cityCouncilData = value;
        for (const i of cityCouncilData.result) {
            let title = i.title;
            title = deleteBoard(title);
            let coordinates = i.geometry.coordinates[0];
            coordinates = coordinates[0];
            hz.saveHealthzone(title, coordinates).then(() => {
            }).catch((e) => {
                console.log("Error saving:" + title);
                console.log(e);
            });
        }
        // Success!
    }, function(reason) {
        console.log(reason); // Error!
    });


}
module.exports.loadCouncilInfo = loadCouncilInfo;





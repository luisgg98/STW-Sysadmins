
const Healthzone = require('../models/healthzone');
/**
 *
 * @param ZonaSalud
 * @param newcases
 * @param percentage_result
 * @param ZBSwithCases
 * @param radius
 * @returns {Promise<void>}
 */
async function updateCovidHealthzone(ZonaSalud, newcases,percentage_result, ZBSwithCases,radius) {
    try{
        Healthzone.updateOne(
            {name:ZonaSalud },
            { $set:{newcases: newcases,percentage: percentage_result, ZBSwithCases:ZBSwithCases,radius:radius}},
            {},
            function (err,res) {

            });
    }
    catch (e) {
        console.log(ZonaSalud)
        console.log("Error updating Health Zone: " + e);
    }
}

/**
 *
 * @param title
 * @param coordinates
 * @returns {Promise<void>}
 */
async function saveHealthzone(title ,coordinates){
    let healthzone = new Healthzone({
        name: title,
        newcases : 0,
        percentage : 0,
        ZBSwithCases : 0,
        radius : 0,
        location: {
            type: "Point",
            coordinates: coordinates
        }
    });
    await healthzone.save();
}

/**
 * @param name
 */

async function mapDistrictWithHealthzone(name){
    return new Promise((resolve, reject) => {
        if (name.includes('San Jose')){
            resolve('San José');
        }
        else if(name.includes('Santa Isabel')){
            resolve('Santa Isabel');
        }
        else if(name.includes('Oliver') || name.includes('Valdefierro')){
            resolve('Oliver-Valdefierro');
        }
        else if(name.includes('Miralbueno')){
            resolve('Miralbueno');
        }
        else if(name.includes('Actur')){
            resolve('Actur-Rey Fernando');
        }
        else if(name.includes('Delicias')){
            resolve('Delicias');
        }
        else if(name.includes('Las Fuentes') || name.includes('Torre Ramona')){
            resolve('Las Fuentes');
        }
        else if(name.includes('Juslibol') ||name.includes('El Zorongo') ){
            resolve('Juslibol-El Zorongo');
        }
        else if(name.includes('Torrero')){
            resolve('Torrero');
        }
        else if(name.includes('Casetas')){
            resolve('Casetas');
        }
        else if(name.includes('Casablanca')){
            resolve('Casablanca');
        }
        else if(name.includes('Universitas')){
            resolve('Universidad');
        }
        else if(name.includes('Sagasta') || name.includes('Hernan Cortes')){
            resolve('Centro');
        }
        else if(name.includes('Almozara')){
            resolve('La Almozara')
        }
        else if(name.includes('Arrabal')){
            resolve('El Rabal');
        }
        else if(name.includes('Independencia')){
            resolve('Casco Histórico');
        }
        else{
            reject("Not found:" + name);
        }

    });

}

module.exports.mapDistrictWithHealthzone = mapDistrictWithHealthzone;
module.exports.updateCovidHealthzone = updateCovidHealthzone;
module.exports.saveHealthzone =saveHealthzone;




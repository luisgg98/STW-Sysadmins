
const Healthzone = require('../../models/healthzone');

/**
 * Return of the information available about health zones
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let allHealthzone = async (req, res) => {
    try {
        let healthzones = await Healthzone.find();
        if(healthzones != [] && healthzones!== undefined && healthzones!=null ) {
            res.status(200).send(healthzones)
        }
        else{
            res.status(404).send({error : "No elements found"});
        }

    } catch(e) {
        res.status(500).send({error : "Internal server error, something went wrong while searching for Health Zones"});
        console.log("ERROR: " +e);
    }

}

module.exports.allHealthzone = allHealthzone

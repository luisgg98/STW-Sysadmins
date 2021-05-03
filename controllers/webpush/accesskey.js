const publickey = require('../../config/webpush').publicKey;

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let getWebpush = async (req, res)=>{
    try {
        console.log(publickey);
        res.status(200).send({"key":publickey});

    } catch (e) {
        res.status(404)
        res.send({ error: e })
    }
}

module.exports.getWebpush = getWebpush
const publickey = require('../../config/webpush').publicKey;
const webpush = require('../../config/webpush').webpush;

let pushSubscription;
/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let create_subscription = async (req, res)=>{
    try {
        pushSubscription= req.body;
        const notification = JSON.stringify({
            title:'Sistema de reservas',
            message:'Reserva realizada con éxito'
        });
        res.status(200).send({"message":"Subscription receive"});
        await webpush.sendNotification(pushSubscription,notification)

    } catch (e) {
        res.status(500)
        console.error("Error while subscribing notification: " + e )
        res.send({ error: "Internal error while subscribing" })
    }
}

module.exports.create_subscription = create_subscription
const utils = require('../../services/utils')
const Admin = require('../../models/admin')

let login = async (req, res) => {
    try {
        const admin = await Admin.findOne({ username: req.body.username })
        if (utils.validPassword(req.body.password, admin.password, admin.salt)) {
            res.status(200)
            const tokenObject = utils.issueJWT(admin);
            res.send({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires })
        } else {
            res.status(401)
            res.send({ error: "Wrong credentials"})
        }
    } catch {
        res.status(401)
        res.send({ error: "Wrong credentials" })
    }
}

exports.login = login
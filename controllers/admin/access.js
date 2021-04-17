const utils = require('../../services/utils')
const Admin = require('../../models/admin')

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let register = async (req, res) => {
    try {
        // Hash password with a salt
        let password = utils.genPassword(req.body.password)
        const admin = new Admin({
            username: req.body.username,
            password: password.hash,
            salt: password.salt
        })
        await admin.save()
        res.send(admin)

    } catch {
        res.status(422)
        res.send({ error: "Wrong json format, check docs for further info /api-docs" })
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
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
exports.register = register
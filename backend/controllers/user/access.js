const utils = require('../../lib/utils')
const User = require('../../models/user')

// TODO can't be two users with same phone number
let register = async (req, res) => {
    try {
        // Hash password with a salt
        let password = utils.genPassword(req.body.password)
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
            password: password.hash,
            salt: password.salt
        })

        await user.save()
        res.send(user)
    } catch {
        res.status(422)
        res.send({ error: "Bad parameters!" })
    }
}

let login = async (req, res) => {
    try {
        const user = await User.findOne({ phone: req.body.phone })
        if (utils.validPassword(req.body.password, user.password, user.salt)) {
            res.status(200)
            const tokenObject = utils.issueJWT(user);
            res.send({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires })
        } else {
            res.status(401)
            res.send({ error: "Incorrect login"})
        }
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
}

let update = async (req, res) => {
    try {
        const user = await User.findOne({ phone: req.params.phone })

        if (req.body.first_name) {
            user.first_name = req.body.first_name
        }
        if (req.body.last_name) {
            user.last_name = req.body.last_name
        }
        if (req.body.email) {
            user.email = req.body.email
        }
        if (req.body.password) {
            user.password = req.body.password
        }

        await user.save()
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
}

let delete_user = async (req, res) => {
    try {
        await User.deleteOne({ phone: req.params.phone })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
}

exports.register = register
exports.login = login
exports.update = update
exports.delete = delete_user
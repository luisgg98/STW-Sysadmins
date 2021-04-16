const utils = require('../../services/utils')
const validate_email = require('../../services/validate_email')
const User = require('../../models/user')

// TODO can't be two users with same phone number
let register = async (req, res) => {
    try {
        // Hash password with a salt
        let password = utils.genPassword(req.body.password)
        if (validate_email.validateEmail(req.body.email)) {
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
        } else {
            res.status(405)
            res.send({ error: "Wrong email format!" })
        }

    } catch {
        res.status(422)
        res.send({ error: "Wrong json format, check docs for further info /api-docs" })
    }
}

let login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (utils.validPassword(req.body.password, user.password, user.salt)) {
            res.status(200)
            const tokenObject = utils.issueJWT(user);
            res.send({ user: {"first_name":user.first_name, "last_name":user.last_name,"phone":user.phone,"email":user.email}, success: true, token: tokenObject.token, expiresIn: tokenObject.expires })
        } else {
            res.status(401)
            res.send({ error: "Incorrect login"})
        }
    } catch {
        res.status(404)
        res.send({ error: "User not found" })
    }
}

let update = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.query.email })

        if (req.body.first_name) {
            user.first_name = req.body.first_name
        }
        if (req.body.last_name) {
            user.last_name = req.body.last_name
        }
        if (req.body.password) {
            let password = utils.genPassword(req.body.password)
            user.password = password.hash
            user.salt = password.salt
        }

        await user.save()
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: "User not found" })
    }
}

let delete_user = async (req, res) => {
    try {
        await User.deleteOne({ email: req.query.email })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "User not found" })
    }
}

exports.register = register
exports.login = login
exports.update = update
exports.delete = delete_user
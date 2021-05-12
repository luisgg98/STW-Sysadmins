const utils = require('../../services/utils')
const validate_email = require('../../services/validate_email')
const User = require('../../models/user')
const jwt_login_strategy = require('../../config/passport');

// TODO can't be two users with same phone number
/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let register = async (req, res) => {
    try {
        // Test if exists another user with the same phone
        User.count({phone: req.body.phone}, async function (err, count) {
            if (count > 0) {
                res.status(409)
                res.send({error: "User already exists"})
            } else {
                // Hash password with a salt
                let password = utils.genPassword(req.body.password)
                if (validate_email.validateEmail(req.body.email)) {
                    const user = new User({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        phone: req.body.phone,
                        email: req.body.email,
                        password: password.hash,
                        salt: password.salt,
                        security_level: 1
                    })
                    await user.save()
                    res.send(user)
                } else {
                    res.status(405)
                    res.send({error: "Wrong email format!"})
                }
            }
        })

    }
        /* istanbul ignore file */ catch {
        res.status(422)
        res.send({error: "Wrong json format, check docs for further info /api-docs"})
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let fetchUser = async (req, res) => {
    try {
        const user = await User.findOne({phone: req.params.phone})
        res.status(200)
        // TODO return user's email??
        res.send({first_name: user.first_name, last_name: user.last_name})
    } catch {
        res.status(404)
        res.send({error: "User not found"})
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
        const user = await User.findOne({email: req.body.email})
        if (utils.validPassword(req.body.password, user.password, user.salt)) {
            res.status(200)
            const tokenObject = utils.issueJWT(user);
            res.send({
                user: {
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "phone": user.phone,
                    "email": user.email,
                    "id": user._id
                }, token: tokenObject.token, expiresIn: tokenObject.expires
            })
        } else {
            res.status(401)
            res.send({error: "Incorrect login"})
        }
    } catch {
        res.status(404)
        res.send({error: "User not found"})
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let update = async (req, res) => {
    try {
        if (!jwt_login_strategy.security(req.params.id, req.result)) {
            res.status(401)
            res.send({error: "Wrong User Access denied"})
        } else {
            let user;
            if (req.result.security_level !== undefined && req.result.security_level > 1) {
                user = await User.findOne({_id: req.params.id})
            } else {
                user = req.result;
            }
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
        }

    } catch {
        res.status(404)
        res.send({error: "User not found"})
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let delete_user = async (req, res) => {
    try {
        if (!jwt_login_strategy.security(req.params.id, req.result)) {
            res.status(401)
            res.send({error: "Wrong User Access denied"})
        } else {
            await User.deleteOne({_id: req.params.id})
            res.status(204).send()
        }

    } catch {
        res.status(404)
        res.send({error: "User not found"})
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, {first_name: true, last_name: true})
        res.send(users)
    }
        /* istanbul ignore file */ catch {
        res.status(500)
        res.send({error: "Internal server error"})
    }
}

exports.register = register
exports.login = login
exports.update = update
exports.delete = delete_user
exports.fetchUser = fetchUser
exports.getAllUsers = getAllUsers
const utils = require('../../services/utils')
const validate_email = require('../../services/validate_email')
const User = require('../../models/user')
const jwt_login_strategy = require('../../config/passport');
const {sendWelcome} = require("../../services/email");
const {deletingOpinions} = require("../../services/deletingService");

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let register = async (req, res) => {
    // Test if exists another user with the same phone
    User.count({email: req.body.email}).then((count) => {
        if (count > 0) {
            res.status(409).send({error: "User already exists"})
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
                });
                user.save()
                    .then(() => {
                        if (req.body.testing == undefined || req.body.testing != true) {
                            sendWelcome(user)
                        }
                        res.status(201).send(user)
                    })
                    .catch((e) => {
                        res.status(405).send({error: "Wrong json format, check docs for further info /api-doc"})
                    });
            } else {
                res.status(405).send({error: "Wrong email format!"})
            }
        }
    }).catch((e) => {
        res.status(422).send({error: "Wrong json format, check docs for further info /api-docs"})
    })
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let fetchUser = async (req, res) => {
    User.findOne({email: req.params.email}).then((user) => {
        res.status(200).send(user)
    }).catch(() => {
        res.status(500).send({error: "Internal error server"})
    })
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let login = async (req, res) => {
    User.findOne({email: req.body.email}).then((user) => {
        if (utils.validPassword(req.body.password, user.password, user.salt)) {
            const tokenObject = utils.issueJWT(user);
            res.status(200).send({
                user: user, token: tokenObject.token, expiresIn: tokenObject.expires
            })
        } else {
            res.status(401).send({error: "Incorrect login"})
        }
    }).catch((e) => {
        res.status(404).send({error: "Wrong user"})
    })
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
            res.status(401).send({error: "Wrong User Access denied"})
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
            await user.save().then(() => {
                res.send(user)
            }).catch(() => {
                res.status(500).send({error: "Internal error"})
            })
        }
    } catch {
        res.status(404).send({error: "User not found"})
    }
}
/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let delete_user = async (req, res) => {
    if (!jwt_login_strategy.security(req.params.id, req.result)) {
        res.status(401).send({error: "Wrong User Access denied"})
    } else {
        deletingOpinions(req.params.id).then(() => {
            User.deleteOne({_id: req.params.id}).then(() => {
                res.status(204).send()
            }).catch(() => {
                res.status(404).send({error: "User not found"})
            })
        }).catch((e) => {
            res.status(404).send({error: "Error while deleting user"})
        })
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let getAllUsers = async (req, res) => {
    if (req.query.id) {
        User.find({_id: req.query.id}).then((user) => {
            res.send(user)
        }).catch(() => {
            res.status(500).send({error: "Internal server error"})
        })
    } else if (req.query.name || req.query.last_name) {
        User.find({
            $or: [{first_name: new RegExp(req.query.name, "i")},
                {last_name: new RegExp(req.query.last_name, "i")}]
        }).then((users) => {
            res.send(users)
        }).catch(() => {
            res.status(500).send({error: "Internal server error"})
        })
    } else {
        User.find({}).then((users) => {
            res.send(users)
        }).catch(() => {
            res.status(500).send({error: "Internal server error"})
        })
    }
}

exports.register = register
exports.login = login
exports.update = update
exports.delete = delete_user
exports.fetchUser = fetchUser
exports.getAllUsers = getAllUsers
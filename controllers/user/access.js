const utils = require('../../services/utils')
const validate_email = require('../../services/validate_email')
const User = require('../../models/user')
const jwt_login_strategy = require('../../config/passport');
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
                        res.status(201).send(user)
                    })
                    .catch((e) => {
                        res.status(405).send({error: "Wrong json format, check docs for further info /api-doc"})
                        console.log(e)
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
    User.find({email: req.params.email}).then((user) => {
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(404).send({error: "User not found"})
        }
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
        if (user) {
            if (utils.validPassword(req.body.password, user.password, user.salt)) {
                const tokenObject = utils.issueJWT(user);
                res.status(200).send({
                    user: user, token: tokenObject.token, expiresIn: tokenObject.expires
                })
            } else {
                res.status(401).send({error: "Incorrect login"})
            }
        } else {
            res.status(404).send({error: "User not found"})
        }
    }).catch((e) => {
        console.log(e)
        res.status(500).send({error: "Internal error server"})
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
        deletingOpinions(req.params.id).then(()=>{
            User.deleteOne({_id: req.params.id}).then(() => {
                res.status(204).send()
            }).catch((e) => {
                res.status(404).send({error: "User not found"})
            })
        }).catch((e) => {
            res.status(404).send({error: "Error while deleting user"})
            console.log(e)
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
    User.find({}).then((users) => {
        if (users) {
            res.send(users)
        } else {
            res.status(404).send({error: "Users not found"})
        }
    }).catch(() => {
        res.status(500).send({error: "Internal server error"})
    })
}

exports.register = register
exports.login = login
exports.update = update
exports.delete = delete_user
exports.fetchUser = fetchUser
exports.getAllUsers = getAllUsers
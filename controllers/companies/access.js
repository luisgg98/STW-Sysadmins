const utils = require('../../services/utils')
const validate_email = require('../../services/validate_email')
const Company = require('../../models/company')

let register = async (req, res) => {
    try {
        let password = utils.genPassword(req.body.password)
        if (validate_email.validateEmail(req.body.email)) {
            const company = new Company({
                name: req.body.name,
                nif: req.body.nif,
                email : req.body.email,
                password: password.hash,
                salt: password.salt,
                location: {
                    type: "Point",
                    coordinates: [req.body.alt,  req.body.long]
                }
            })
            await company.save()
            res.send(company)
        } else {
            res.status(422)
            res.send({ error: "Wrong email format" })
        }
    } catch {
        res.status(422)
        res.send({ error: "Bad parameters!" })
    }
}

let login = async (req, res) => {
    try {
        const company = await Company.findOne({ nif: req.body.nif })
        if (utils.validPassword(req.body.password, company.password, company.salt)) {
            const tokenObject = utils.issueJWT(company);
            res.send({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires })
        } else {
            res.status(401)
            res.send({ error: "Incorrect login"})
        }
    } catch {
        res.status(404)
        res.send({ error: "Company doesn't exist!" })
    }
}

let update = async (req, res) => {
    try {
        const company = await Company.findOne({ nif: req.params.nif });

        if (req.body.name) {
            company.name = req.body.name
        }
        if (req.body.password) {
            company.password = req.body.password
        }
        if (req.body.email) {
            company.email = req.body.email
        }
        if (req.body.alt) {
            company.alt = req.body.alt
        }
        if (req.body.long) {
            company.long = req.body.long
        }

        await company.save()
        res.send(company)
    } catch {
        res.status(404)
        res.send({ error: "Company doesn't exist!" })
    }
}

let delete_company = async (req, res) => {
    try {
        await Company.deleteOne({ nif: req.params.nif })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Company doesn't exist!" })
    }
}

exports.register = register
exports.login = login
exports.update = update
exports.delete = delete_company
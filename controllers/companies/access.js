const utils = require('../../services/utils')
const validate = require('../../services/validate_email')
const Company = require('../../models/company')

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let get = async (req, res) => {
    try {
        // If the url contains a query, search just for the company of the query
        if (req.query.name){
            // Fetch just one company
            let namee = req.query.name
            const company = await Company.find({name: {"$regex": namee, "$options": "i"}}, function(err,docs){}).select('name nif email category description service_duration address location')
            res.send(company)
        } else {
            // Fetch all companies
            const companies = await Company.find({}, {name: true, nif: true, email: true, category: true, description: true, service_duration: true, address: true, location: true})
            res.send(companies)
        }
    } catch {
        res.status(500)
        res.send({error: "Internal server error"})
    }
}

let fetchCompany = async (req, res) => {
    try {
        const company = await Company.findOne({ nif: req.params.nif })
        res.status(200)
        res.send({name: company.name, email: company.email, category: company.category, description: company.description, service_duration: company.service_duration, address: company.address, location: company.location})
    } catch {
        res.status(404)
        res.send({error: "Company not found"})
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let register = async (req, res) => {
    try {
        let password = utils.genPassword(req.body.password)
        if (!validate.validateCategory(req.body.category)){
            res.status(422)
            res.send({error: "Wrong category, check docs for further info /api-doc"})
        }
        if (validate.validateEmail(req.body.email)) {
            const company = new Company({
                name: req.body.name,
                nif: req.body.nif,
                email : req.body.email,
                password: password.hash,
                salt: password.salt,
                category: req.body.category,
                address: req.body.address,
                // TODO calculate coords
                location: {
                    type: "Point",
                    coordinates: [req.body.lat,  req.body.long]
                },
                // Default description and service duration
                description: "null",
                service_duration: 0,
                schedule: {
                    monday: {schedule_1:"null"},
                    tuesday: {schedule_1:"null"},
                    wednesday: {schedule_1:"null"},
                    thursday: {schedule_1:"null"},
                    friday: {schedule_1:"null"},
                    saturday: {schedule_1:"null"},
                    sunday: {schedule_1:"null"}
                }
            })
            await company.save()
            res.send(company)
        } else {
            res.status(422)
            res.send({ error: "Not an email address" })
        }
    } catch {
        res.status(405)
        res.send({ error: "Wrong json format, check docs for further info /api-doc" })
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
        const company = await Company.findOne({ email: req.body.email })
        if (utils.validPassword(req.body.password, company.password, company.salt)) {
            const tokenObject = utils.issueJWT(company);
            res.send({
                    company: {
                        name:company.name,
                        email:company.email,
                        nif:company.nif,
                        id:company._id,
                        category:company.category,
                        description: company.description,
                        service_duration: company.service_duration,
                        address: company.address,
                        schedule: company.schedule,
                        location: company.location
                    },
                    token: tokenObject.token, expiresIn: tokenObject.expires })
        } else {
            res.status(401)
            res.send({ error: "Incorrect login"})
        }
    } catch {
        res.status(404)
        res.send({ error: "Company not found" })
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
        const company = await Company.findOne({ _id: req.params.id });

        if (req.body.name) {
            company.name = req.body.name
        }
        if (req.body.password) {
            company.password = req.body.password
        }
        if (req.body.email) {
            company.email = req.body.email
        }
        if (req.body.lat) {
            company.lat = req.body.lat
        }
        if (req.body.long) {
            company.long = req.body.long
        }
        if (req.body.address) {
            company.address = req.body.address
        }
        if (req.body.description) {
            company.description = req.body.description
        }
        if (req.body.duration) {
            company.service_duration = req.body.duration
        }
        if (req.body.schedule) {
            company.schedule = req.body.schedule
        }

        await company.save()
        res.send(company)
    } catch {
        res.status(404)
        res.send({ error: "Company not found" })
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let delete_company = async (req, res) => {
    try {
        await Company.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Company not found" })
    }
}

exports.get = get
exports.register = register
exports.login = login
exports.update = update
exports.delete = delete_company
exports.fetchCompany = fetchCompany
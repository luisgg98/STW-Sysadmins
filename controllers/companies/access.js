const utils = require('../../services/utils')
const validate = require('../../services/validate_email')
const Company = require('../../models/company')
const Service = require('../../models/service')
const geolo = require('../../services/geocoding')
const jwt_login_strategy = require('../../config/passport');
const update_time_slots = require('../../services/update_time_slots')

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let get = async (req, res, next) => {
    try {
        // If the url contains a query, search just for the company of the query
        if (req.query.name) {
            // Fetch just one company
            let name = req.query.name
            Company.find({name: name}).then((company) => {
                if (company) {
                    res.send(company)
                } else {
                    res.status(404).send({error: "Not found company"})
                }
            }).catch((err) => {
                console.log(err)
                res.status(500).send({error: "Internal error server"})
            })
        } else if (req.query.category) {
            let category = req.query.category
            Company.find({category: category}).then((company) => {
                if (company) {
                    res.send(company)
                } else {
                    res.status(404).send({error: "Not found company"})
                }
            }).catch((err) => {
                console.log(err)
                res.status(500).send({error: "Internal error server"})
            })

        } else {
            // Fetch all companies
            const companies = await Company.find({}, {
                name: true,
                nif: true,
                email: true,
                category: true,
                description: true,
                service_duration: true,
                location: true
            })
            res.send(companies)
        }
        /* istanbul ignore next */
    } catch {
        res.status(500).send({error: "Internal error server"})
    }
}
//  TODO FILTRAR POR CATEGORIA
/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let fetchCompany = async (req, res) => {
    Company.findOne({nif: req.params.nif}).catch((err) => {
        res.status(500).send({error: "Internal error server"})
        console.log(err)
    }).then((company) => {
        if (company) {
            res.status(200).send(company);
        } else {
            res.status(404).send({error: "Company not found"})
        }
    })
}


/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let register = async (req, res) => {
    // Test if exists another company with the same nif
    Company.count({nif: req.body.nif}).then((count) => {
        if (count > 0) {
            res.status(409).send({error: "Company already exists"})
        } else {
            let password = utils.genPassword(req.body.password)
            if (!validate.validateCategory(req.body.category)) {
                res.status(422).send({error: "Wrong category, check docs for further info /api-doc"})
            } else {
                if (validate.validateEmail(req.body.email)) {
                    geolo.findCoordenates(req.body.name, req.body.streetnumber, req.body.street, req.body.zipcode)
                        .then(async (coordinates) => {
                                const company = new Company({
                                    name: req.body.name,
                                    nif: req.body.nif,
                                    email: req.body.email,
                                    password: password.hash,
                                    salt: password.salt,
                                    category: req.body.category,
                                    streetnumber: req.body.streetnumber,
                                    street: req.body.street,
                                    zipcode: req.body.zipcode,
                                    schedule: req.body.schedule,
                                    capacity: req.body.capacity,
                                    bookings: 0,
                                    service_duration: req.body.service_duration,
                                    location: {
                                        type: "Point",
                                        coordinates: [coordinates.latitude, coordinates.longitude]
                                    },
                                    // Default description and service duration
                                    description: "null",
                                    security_level: 1,
                                })
                                company.time_slots = update_time_slots.update_time_slots(company);
                                await company.save()
                                    .then(() => {
                                        res.status(201).send(company)
                                    }).catch((e) => {
                                        res.status(405).send({error: "Wrong json format, check docs for further info /api-doc"})
                                        console.log(e)
                                    })
                            }
                        );
                } else {
                    /* istanbul ignore next */
                    res.status(422).send({error: "Not an email address"})
                }
            }
        }
    }).catch((err) => {
        res.status(500).send({error: "Internal error"})
        console.log(err)
    })
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let login = async (req, res) => {
    Company.findOne({email: req.body.email}).then((company) => {
        if (company) {
            if (utils.validPassword(req.body.password, company.password, company.salt)) {
                const tokenObject = utils.issueJWT(company);
                res.send({
                    company: company,
                    token: tokenObject.token, expiresIn: tokenObject.expires
                })
            } else {
                res.status(401)
                res.send({error: "Incorrect login"})
            }

        } else {
            res.status(404).send({error: "Company not found"})
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
            res.status(401)
            res.send({error: "Wrong User Access denied"})
        } else {
            let company;
            //result.security_level !== undefined &&
            if (req.result.security_level !== undefined && req.result.security_level > 1) {
                company = await Company.findOne({_id: req.params.id});
            } else {
                company = req.result;
            }
            if (req.body.name) {
                company.name = req.body.name
            }

            if (req.body.password) {
                company.password = req.body.password
            }
            if (req.body.email) {
                company.email = req.body.email
            }
            if (req.body.streetnumber) {
                company.streetnumber = req.body.streetnumber
            }
            if (req.body.street) {
                company.street = req.body.street
            }
            if (req.body.zipcode) {
                company.zipcode = req.body.zipcode
            }
            if (req.body.description) {
                company.description = req.body.description
            }
            if (req.body.capacity) {
                company.capacity = req.body.capacity
            }
            if (req.body.schedule || req.body.service_duration) {
                if (req.body.schedule && req.body.service_duration) {
                    company.schedule = req.body.schedule
                    company.service_duration = req.body.service_duration
                    company.time_slots = update_time_slots.update_time_slots(company)
                } else if (req.body.schedule) {
                    company.schedule = req.body.schedule
                    company.time_slots = update_time_slots.update_time_slots(company)
                } else {
                    company.service_duration = req.body.service_duration
                    company.time_slots = update_time_slots.update_time_slots(company)
                }
            }
            if (req.body.category) {
                company.category = req.body.category;
            }
            geolo.findCoordenates(company.name, company.streetnumber, company.street, company.zipcode)
                .then(
                    async (coordinates) => {
                        company.lat = coordinates.latitude
                        company.long = coordinates.long
                        await company.save()
                            .then(() => {
                                    res.status(200).send(company)
                                }
                            ).catch((e) => {
                                res.status(405)
                                res.send({error: "Wrong json format, check docs for further info /api-doc"})
                                console.log(e)
                            })
                    }
                );
        }
    } catch (e) {
        console.log("Error while patching company" + e)
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
let delete_company = async (req, res) => {
    try {
        if (!jwt_login_strategy.security(req.params.id, req.result)) {
            res.status(401).send({error: "Wrong User Access denied"})
        } else {
            Company.deleteOne({_id: req.params.id}).then(() => {
                res.status(204).send()
            }).catch((e) => {
                console.log(e)
                res.status(404).send({error: "Company not found"})
            })
        }
    } catch {
        res.status(404).send({error: "Company not found"})
    }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let create_service = async (req, res, next) => {
    // Check if company exists
    Company.findOne({nif: req.params.nif}).then((company) => {
        if (company) {
            const service = new Service({
                company: req.params.nif,
                description: req.body.description,
                price: req.body.price
            })
            service.save()
                .then(() => {
                        res.status(201).send(service)
                    }
                ).catch((e) => {
                res.status(405).send({error: "Wrong json format, check docs for further info /api-doc"})
                console.log(e)
            })
        } else {
            res.status(404).send({error: "Company not found"})
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
 * @param next
 * @returns {Promise<void>}
 */
let get_services = async (req, res, next) => {
    console.log("a")
    if (req.query.id) {
        console.log("b")
        // Fetch just one service
        let id = req.query.id
        Company.findOne({nif: req.params.nif}).catch((e) => {
            res.status(404).send({error: "Company not found"})
        }).then((company) => {
            if (company) {
                Service.findOne({_id: id}).then((service) => {
                    res.send({services: service, time_slots: company.time_slots})
                }).catch((e) => {
                    res.status(404).send({error: "Service not found"})
                    console.log(e)
                })
            } else {
                res.status(404).send({error: "Company not found"})
            }
        })
    } else if (req.params.nif != "," || req.params.nif != undefined) {
        // Fetch all services from a company
        // Check if company exists
        Company.findOne({nif: req.params.nif}).catch((err) => {
            res.status(404).send({error: "Company not found"})
            console.log(err)
        }).then((company) => {
            if (company) {
                Service.find({company: req.params.nif})
                    .catch((err) => {
                        res.status(500).send({error: "Internal error server"})
                        console.log(err)
                    }).then((services) => {
                    if (services) {
                        res.send({services: services, time_slots: company.time_slots})
                    } else {
                        res.status(404).send({error: "Service not found"})
                    }
                })
            } else {
                res.status(404).send({error: "Company not found"})
            }
        })
    } else {
        res.status(405)
        res.send({error: "Wrong request, check docs for further info /api-doc"})
    }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let update_service = async (req, res, next) => {
    Service.findOne({_id: req.params.id})
        .catch((err) => {
            console.log(err)
            res.status(500).send({error: "Internal error server"})
        }).then((service) => {
        if (service) {
            if (req.body.description) {
                service.description = req.body.description
            }
            if (req.body.capacity) {
                service.capacity = req.body.capacity
            }
            if (req.body.price) {
                service.price = req.body.price
            }
            service.save().then(
                () => {
                    res.send(service)
                }
            ).catch(() => {
                res.status(405).send({error: "Error updating"})
            })
        } else {
            res.status(404).send({error: "Service not found"})
        }
    })
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let delete_service = async (req, res, next) => {
    await Service.deleteOne({_id: req.params.id}).then(() => {
        res.status(204).send()
    }).catch(
        () => {
            res.status(404)
            res.send({error: "Service not found"})
        })
}

exports.get = get
exports.register = register
exports.login = login
exports.update = update
exports.delete = delete_company
exports.fetchCompany = fetchCompany
exports.create_service = create_service
exports.get_services = get_services
exports.update_service = update_service
exports.delete_service = delete_service
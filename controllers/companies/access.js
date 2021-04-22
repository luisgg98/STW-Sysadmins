const utils = require('../../services/utils')
const validate = require('../../services/validate_email')
const Company = require('../../models/company')
const Service = require('../../models/service')
const geolo = require('../../services/geocoding')

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
            let name = req.query.name
            const company = await Company.find({name: {"$regex": name, "$options": "i"}}, function(err,docs){}).select('name nif email category description service_duration address location')
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
            geolo.findCoordenates(req.body.name,req.body.streetnumber,req.body.street,req.body.zipcode)
                .then( async (coordinates) =>{

                    const company = new Company({
                        name: req.body.name,
                        nif: req.body.nif,
                        email : req.body.email,
                        password: password.hash,
                        salt: password.salt,
                        category: req.body.category,
                        streetnumber:req.body.streetnumber,
                        street:req.body.street,
                        zipcode:req.body.zipcode,
                        location: {
                            type: "Point",
                            coordinates: [coordinates.latitude,  coordinates.longitude]
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

                }

                )
                .catch(
                    (e)=>{
                        console.error(req.body.name);
                        console.error(req.body.streetnumber);
                            console.error(req.body.street);
                                console.error(req.body.zipcode);
                        res.status(412)
                        res.send({ error: "Your company was not found in Open Street Map" })
                        console.error(e)
                    }

                )


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
                        streetnumber:company.streetnumber,
                        street:company.street,
                        zipcode:company.zipcode,
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

        if (req.body.address) {
            company.address = req.body.address
        }
        if(req.body.streetnumber){
            company.streetnumber= req.body.streetnumber
        }
        if(req.body.street){
            company.street = req.body.street
        }
        if(req.body.zipcode){
            company.zipcode = req.body.zipcode
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
        geolo.findCoordenates(company.name,company.streetnumber,company.street,company.zipcode)
            .then(
                async (coordinates) =>{
                    company.lat = coordinates.latitude
                    company.long = coordinates.long
                    await company.save()
                    res.send(company)
                }

        )
            .catch(
                (e)=>{
                    console.error(e)
                    res.status(404)
                    res.send({ error: "Company not found" })
                }

            )


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

let create_service = async (req,res) => {
    try {
        const service = new Service({
            company: req.params.nif,
            description: req.body.description,
            capacity: req.body.capacity,
            price: req.body.price
        })
        await service.save()
        res.send(service)
    } catch {
        res.status(405)
        res.send({ error: "Wrong json format, check docs for further info /api-doc" })
    }
}

let get_services = async (req, res) => {
    try{
        if (req.query.id){
            // Fetch just one service
            let id = req.query.id
            const service = await Service.find({_id:id})
            res.send(service)
        } else {
            // Fetch all services from a company
            const services = await Service.find({company: req.params.nif})
            res.send(services)
        }
    }
    catch {
        res.status(500)
        res.send({error: "Internal server error"})
    }
}

let update_service = async (req, res) => {
    try {
        const service = await Service.findOne({ _id: req.params.id });

        if (req.body.description) {
            service.description = req.body.description
        }
        if (req.body.capacity){
            service.capacity = req.body.capacity
        }
        if (req.body.price){
            service.price = req.body.price
        }

        await service.save()
        res.send(service)
    } catch {
        res.status(404)
        res.send({ error: "Company not found" })
    }
}

let delete_service = async (req, res) => {
    try {
        await Service.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Service not found" })
    }
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
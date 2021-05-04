const utils = require('../../services/utils')
const validate = require('../../services/validate_email')
const Company = require('../../models/company')
const Service = require('../../models/service')
const geolo = require('../../services/geocoding')
const jwt_login_strategy= require('../../config/passport');
const update_time_slots = require('../../services/update_time_slots')

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let get = async (req, res, next)=> {
    try {
        // If the url contains a query, search just for the company of the query
        if (req.query.name){
            // Fetch just one company
            let name = req.query.name
            const company = await Company.find({name: {"$regex": name, "$options": "i"}}, function(err,docs){}).select('name nif email category description service_durationlocation')
            res.send(company)
        } else {
            // Fetch all companies
            const companies = await Company.find({}, {name: true, nif: true, email: true, category: true, description: true, service_duration: true, location: true})
            res.send(companies)
        }
    } catch {
        res.status(500)
        res.send({error: "Internal server error"})
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
    try {
        const company = await Company.findOne({ nif: req.params.nif })
        res.status(200)
        res.send({name: company.name, email: company.email, category: company.category,
            description: company.description, service_duration: company.service_duration,
            street: company.street,
            streetnumber: company.streetnumber,
            zipcode:company.zipcode,
            location: company.location,
            schedule:company.schedule})
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
let register = async (req, res)=>{
    try {
        // Test if exists another company with the same nif
        Company.count({nif: req.body.nif}, async function (err, count){
            if (count > 0) {
                res.status(409)
                res.send({ error: "Company already exists"})
            } else {
                let password = utils.genPassword(req.body.password)
                if (!validate.validateCategory(req.body.category)){
                    res.status(422)
                    res.send({error: "Wrong category, check docs for further info /api-doc"})
                }
                else{
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
                                        security_level:1,
                                        service_duration: 0,
                                        schedule: {
                                            monday: {open_1:"null", close_1: "null"},
                                            tuesday: {open_1:"null", close_1: "null"},
                                            wednesday: {open_1:"null", close_1: "null"},
                                            thursday: {open_1:"null", close_1: "null"},
                                            friday: {open_1:"null", close_1: "null"},
                                            saturday: {open_1:"null", close_1: "null"},
                                            sunday: {open_1:"null", close_1: "null"}
                                        }
                                    })
                                    await company.save()
                                        .then(()=>{
                                                res.send(company)
                                            }
                                        )
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
                }
            }
        })
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
let login = async (req, res)=>{
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
let update = async (req, res)=> {
    try {
        if(!jwt_login_strategy.security(req.params.id,req.result)){
            res.status(401)
            res.send({ error: "Wrong User Access denied"})
        }
        else{
            let company;
            //result.security_level !== undefined &&
            if(req.result.security_level !== undefined && req.result.security_level>1){
                company = await Company.findOne({ _id: req.params.id });
            }
            else{
                company = req.result;
            }
            if (req.body.name) {
                company.name = req.body.name
            }
            //TODO it must be changed
            if (req.body.password) {
                company.password = req.body.password
            }
            if (req.body.email) {
                company.email = req.body.email
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
            if (req.body.schedule || req.body.service_duration) {
                if (req.body.schedule && req.body.service_duration){
                    company.schedule = req.body.schedule
                    company.service_duration = req.body.service_duration
                    company.time_slots = update_time_slots.update_time_slots(company)
                } else if (req.body.schedule){
                    company.schedule = req.body.schedule
                    company.time_slots = update_time_slots.update_time_slots(company)
                } else {
                    company.service_duration = req.body.service_duration
                    company.time_slots = update_time_slots.update_time_slots(company)
                }
            }
            if(req.body.category){
                company.category = req.body.category;
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
                    })
        }
    }
    catch {
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
let delete_company = async (req, res)=>{
    try {
        if(!jwt_login_strategy.security(req.params.id, req.result)){
            res.status(401)
            res.send({ error: "Wrong User Access denied"})
        } else{
            await Company.deleteOne({ _id: req.params.id })
            res.status(204).send()
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
 * @param next
 * @returns {Promise<void>}
 */
let create_service = async (req, res, next)=> {
    try {
        let found = true
        // Check if company exists
        Company.count({nif: req.params.nif}, async function (err, count) {
            if (count === 0) {
                // Company does not exist
                found = false
                res.status(404)
                res.send({error: "Company not found"})
                found = false
            }
        })
        if (found) {
            let company = await Company.findOne({nif:req.params.nif})
            // Crear un array con capacidad maxima
            let capacity = parseInt(req.body.capacity,10)
            let times = []
            for (let i = 0; i < company.time_slots.length; i++){
                times[i] = capacity
            }
            // Company exists
            const service = new Service({
                company: req.params.nif,
                description: req.body.description,
                capacity: capacity,
                time_slots_service: times,
                price: req.body.price
            })
            await service.save()
            res.send(service)
        }
    } catch {
        res.status(405)
        res.send({error: "Wrong json format, check docs for further info /api-doc"})
    }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let get_services = async (req, res, next)=>{
    try{
        if (req.query.id){
            // Fetch just one service
            let id = req.query.id
            Company.findOne({nif: req.params.nif}, async function (err, company){
                if (err){
                    throw err
                } else {
                    if (company != null || company !== undefined) {
                        const service = await Service.findOne({_id:id})
                        const company = await Company.findOne({nif: req.params.nif})
                        res.send({services: service, time_slots: company.time_slots})
                    } else {
                        res.status(404)
                        res.send({ error: "Company not found"})
                    }
                }
            })
            /*Company.count({nif: req.params.nif}, async function (err, count){
                if (count === 0) {
                    company_found = false
                    res.status(404)
                    res.send({ error: "Company not found"})}})
            if (company_found) {
                const service = await Service.findOne({_id:id})
                const company = await Company.findOne({nif: req.params.nif})
                res.send({services: service, time_slots: company.time_slots})
            }*/
        } else if (req.params.nif != "," || req.params.nif != undefined) {
            // Fetch all services from a company
            // Check if company exists
            Company.findOne({nif: req.params.nif}, async function (err, company){
                if (err){
                    throw err
                } else {
                    if (company != null || company !== undefined) {
                        const service = await Service.find({company: req.params.nif})
                        const company = await Company.findOne({nif: req.params.nif})
                        res.send({services: service, time_slots: company.time_slots})
                    } else {
                        res.status(404)
                        res.send({ error: "Company not found"})
                    }
                }
            })
            /*Company.count({nif: req.params.nif}, async function (err, count){
                if (count === 0) {
                    company_found = false
                    res.status(404)
                    res.send({ error: "Company not found"})}})
            if (company_found){
                const services = await Service.find({company: req.params.nif})
                const company = await Company.findOne({nif: req.params.nif})
                res.status(200)
                res.send({services: services, time_slots: company.time_slots})
            }*/
        } else {
            res.status(405)
            res.send({error:"Wrong request, check docs for further info /api-doc"})
        }
    }
    catch {
        res.status(500)
        res.send({error: "Internal server error"})
    }
}

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let update_service = async (req, res, next)=>{
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

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let delete_service = async (req, res, next)=>{
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
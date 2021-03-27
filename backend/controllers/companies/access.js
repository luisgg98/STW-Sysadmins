const Company = require('../../models/company')

let register = async (req, res) => {
    const company = new Company({
        name: req.body.name,
        nif: req.body.nif,
        email : req.body.email,
        password: req.body.password,
        alt: req.body.alt,
        long: req.body.long
    })
    await company.save()
    res.send(company)
}

let login = async (req, res) => {
    try {
        const company = await Company.findOne({ nif: req.body.nif })
        // todo manage password
        res.send(company)
    } catch {
        res.status(404)
        res.send({ error: "Company doesn't exist!" })
    }
}

let update = async (req, res) => {
    try {
        const company = await Company.findOne({ nif: req.params.nif })

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
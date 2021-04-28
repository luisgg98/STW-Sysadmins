const utils = require('../../services/utils')
const User = require('../../models/user')
const validate_email = require("../../services/validate_email");

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
let register = async (req, res) => {
    try {
         User.findOne({ email: req.body.email },{},{},async function (err, user) {
             if(user === null || user === undefined){
                 let password = utils.genPassword(req.body.password);
                 if (validate_email.validateEmail(req.body.email)) {
                     user = new User({
                         first_name: 'Admin',
                         last_name: 'Mighty',
                         phone: 123456789,
                         email: 'zitation-stw@unizar.es',
                         password: password.hash,
                         salt: password.salt,
                         security_level:2
                     })
                     await user.save()
                     res.send(user)
                 }
                 else {
                     res.status(403)
                     res.send({ error: "Heresy, There is only one true Admin" })
                 }

             }
             else{
                 res.status(405)
                 res.send({ error: "Wrong email format!" })
             }
         })
        // Hash password with a salt
    } catch {
        res.status(422)
        res.send({ error: "Wrong json format, check docs for further info /api-docs" })
    }
}

exports.register = register
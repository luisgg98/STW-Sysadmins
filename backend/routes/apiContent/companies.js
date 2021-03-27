const express = require('express')
const Company = require('../../models/company')
const ControllerCompany = require('../../controllers/companies/access')
const router = express.Router()

//const passport = require('passport');
//const accessController = require('../../controllers/user/access');

/*
    Creates a new company
 */
router.post("/register", ControllerCompany.register)

/*
    Returns the info about a company
 */
router.post("/login", ControllerCompany.login)

router.patch("/update/:nif", ControllerCompany.update)

/*
* Deletes the company with nif number :nif
*/
router.delete("/delete/:nif", ControllerCompany.delete)

module.exports = router
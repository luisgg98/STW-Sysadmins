const express = require('express')
const ControllerCompany = require('../controllers/companies/access')
const router = express.Router()
const passport = require('passport');

/*
    Get all companies and his location
 */
router.get("/get", ControllerCompany.get)

/*
    Creates a new company
 */
router.post("/register", ControllerCompany.register)

/*
    Returns the info about a company
 */
router.post("/login", ControllerCompany.login)

router.patch("/update/:nif",passport.authenticate('jwt',{session:false}), ControllerCompany.update)

/*
* Deletes the company with nif number :nif
*/
router.delete("/delete/:nif",passport.authenticate('jwt',{session:false}), ControllerCompany.delete)

module.exports = router
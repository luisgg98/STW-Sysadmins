const express = require('express')
const ControllerCompany = require('../controllers/companies/access')
const router = express.Router()
const passport = require('passport');

/*
    Get all companies and his location
 */
router.get("/", ControllerCompany.get)

/*
    Creates a new company
 */
router.post("/", ControllerCompany.register)

/*
    Returns **public** info about a company
 */
router.get("/:nif", ControllerCompany.fetchCompany)

/*
    Login a company and returns some info about it
 */
router.post("/login", ControllerCompany.login)

/**
 *  Update the data of a company
 */
router.patch("/:id",passport.authenticate('jwt',{session:false}), ControllerCompany.update)

/*
* Deletes the company with nif number :nif
*/
router.delete("/:id",passport.authenticate('jwt',{session:false}), ControllerCompany.delete)

module.exports = router
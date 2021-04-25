const express = require('express')
const ControllerCompany = require('../controllers/companies/access')
const router = express.Router()
const jwt_login_strategy= require('../config/passport');

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
router.patch("/:id",jwt_login_strategy.authenticate,ControllerCompany.update)

/*
* Deletes the company with nif number :nif
*/
router.delete("/:id",jwt_login_strategy.authenticate, ControllerCompany.delete)


//==============================
//      SERVICES
//==============================
router.get("/:nif/services", ControllerCompany.get_services)
router.post("/:nif/services", ControllerCompany.create_service)
router.patch("/:nif/services/:id", ControllerCompany.update_service)
router.delete("/:nif/services/:id", ControllerCompany.delete_service)

module.exports = router
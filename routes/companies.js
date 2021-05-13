const express = require('express')
const ControllerCompany = require('../controllers/companies/access')
const ControllerOpinion = require('../controllers/opinion/access')
const ControllerBooking = require('../controllers/user/booking')
const router = express.Router()
const jwt_login_strategy = require('../config/passport');

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
router.patch("/:id", jwt_login_strategy.authenticate, ControllerCompany.update)

/*
* Deletes the company with nif number :nif
*/
router.delete("/:id", jwt_login_strategy.authenticate, ControllerCompany.delete)

router.get("/:nif/bookings", ControllerBooking.company_bookings)
router.get("/:nif/bookings/capacity", ControllerBooking.remaining_space_by_date)

//==============================
//      SERVICES
//==============================
router.get("/:nif/services", ControllerCompany.get_services)
router.post("/:nif/services", ControllerCompany.create_service)
router.patch("/:nif/services/:id", jwt_login_strategy.authenticate, ControllerCompany.update_service)
router.delete("/:nif/services/:id", jwt_login_strategy.authenticate, ControllerCompany.delete_service)

router.get("/:nif/services/:id/bookings", ControllerBooking.services_bookings)

//================================
//  OPINIONS
//================================
router.post("/:nif/opinions", jwt_login_strategy.authenticate, ControllerOpinion.write_opinion);
router.patch("/:nif/opinions/:id", jwt_login_strategy.authenticate, ControllerOpinion.vote_opinion);
router.delete("/:nif/opinions/:id", jwt_login_strategy.authenticate, ControllerOpinion.delete_opinion);
router.get("/:nif/opinions", ControllerOpinion.get_opinion);
module.exports = router
const express = require('express')
const ControllerCompany = require('../controllers/companies/access')
const router = express.Router()
const passport = require('passport');

/*
    Creates a new company
 */
/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *     description: Register a company
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "nif"
 *       in: query
 *       description: "Fiscal identification number"
 *       required: true
 *       type: "string"
 *     - name: "name"
 *       in: query
 *       description: "Name of the company"
 *       required: true
 *       type: "string"
 *     - name: "email"
 *       in: query
 *       description: "Email to contact the company"
 *       type: "string"
 *     - name: "password"
 *       in: query
 *       description: "Password to access securely"
 *       required: true
 *       type: "string"
 *     - name: "long"
 *       in: query
 *       description: "Longitude"
 *       required: true
 *       type: "number"
 *     - name: "alt"
 *       in: query
 *       description: "Altitude"
 *       required: true
 *       type: "number"
 *     responses:
 *       200:
 *         description: An array of locations
 *         schema:
 *           $ref: '#/models/company'
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
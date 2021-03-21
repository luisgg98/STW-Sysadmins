var express = require('express');
var router = express.Router();
const maincontroller = require('../controllers/main');


/* GET home page. */
router.get('/',maincontroller.index);

module.exports = router;

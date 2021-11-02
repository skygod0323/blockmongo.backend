var express = require('express');
var router = express.Router();

var userContrller = require('../controller/usersController');

router.get('/getCountries', userContrller.getCountries);

router.post('/submitPersonalInfo', userContrller.submitPersonalInfo);
router.post('/submitContactInfo', userContrller.submitContactInfo);
router.post('/createAccount', userContrller.createAccount);

router.get('/verifyEmail/:token', userContrller.verifyEmail);

module.exports = router;

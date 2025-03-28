const express = require('express')
const router = new express.Router();
const authController = require('../controllers/authController')

router.post('/signup',authController.signup);
router.post('/signin',authController.signin);
router.post('/signout',authController.signout);

module.exports = router
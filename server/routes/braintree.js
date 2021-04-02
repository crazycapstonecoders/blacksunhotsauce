const router = require('express').Router()
const { userById } = require('../controllers/user')
const { requireSignIn, isAuth } = require('../controllers/auth')
const { generateToken, processPayment } = require('../controllers/braintree')

router.get('/getToken/:userId', requireSignIn, isAuth, generateToken)

router.post('/payment/:userId', requireSignIn, isAuth, processPayment)

router.param('userId', userById)

module.exports = router
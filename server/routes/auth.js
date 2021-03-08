const router = require('express').Router()
const { userSignUpValidator } = require('../validator')
const { signUp, signIn, signOut, validateRecaptcha } = require('../controllers/auth')

router.post('/signup', userSignUpValidator, signUp)

router.post('/signin', signIn)

router.get('/signout', signOut)

router.post('/validateRecaptcha', validateRecaptcha)

module.exports = router
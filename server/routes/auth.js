const router = require('express').Router()
const { userSignUpValidator, passwordResetValidator } = require('../validator')
const { signUp, signIn, signOut, forgotPassword, resetPassword, validateRecaptcha } = require('../controllers/auth')

router.post('/signup', userSignUpValidator, signUp)

router.post('/signin', signIn)

router.get('/signout', signOut)

router.put('/forgot-password', forgotPassword)

router.put('/reset-password', passwordResetValidator, resetPassword)

router.post('/validateRecaptcha', validateRecaptcha)

module.exports = router
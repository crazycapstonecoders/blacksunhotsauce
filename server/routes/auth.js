const router = require('express').Router()
const { userSignUpValidator, passwordResetValidator } = require('../validator')
const { signUp, signIn, signOut, forgotPassword, resetPassword, validateRecaptcha, socialLogin } = require('../controllers/auth')

router.post('/signup', userSignUpValidator, signUp)

router.post('/signin', signIn)

router.get('/signout', signOut)

router.put('/forgot-password', forgotPassword)

router.put('/reset-password', passwordResetValidator, resetPassword)

router.post('/validateRecaptcha', validateRecaptcha)

router.post('/social-login', socialLogin)

module.exports = router
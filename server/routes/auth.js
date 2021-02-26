const router = require('express').Router()
const { userSignUpValidator } = require('../validator')
const { signUp, signIn, signOut } = require('../controllers/auth')

router.post('/signup', userSignUpValidator, signUp)

router.post('/signin', signIn)

router.get('/signout, signOut')

module.exports = router
const router = require('express').Router()
const { create, update, remove } = require('../controllers/order')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.post('/create/:userId', requireSignIn, isAuth, create)

router.param('userId', userById)

module.exports = router
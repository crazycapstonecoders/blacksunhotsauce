const router = require('express').Router()
const { create, update, remove } = require('../controllers/order')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { userById, addOrderToHistory } = require('../controllers/user')
const { decreaseQuantity } = require('../controllers/product')

router.post('/create/:userId', requireSignIn, isAuth, addOrderToHistory, decreaseQuantity, create)

router.param('userId', userById)

module.exports = router
const router = require('express').Router()
const { orderById, read, readAll, create, update, remove } = require('../controllers/order')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { userById, addOrderToHistory } = require('../controllers/user')
const { decreaseQuantity } = require('../controllers/product')

router.get('/:userId/list', requireSignIn, isAuth, isAdmin, readAll)

router.get('/:userId/:orderId', requireSignIn, isAuth, read)

router.post('/create/:userId', requireSignIn, isAuth, addOrderToHistory, decreaseQuantity, create)

router.param('userId', userById)
router.param('orderId', orderById)

module.exports = router
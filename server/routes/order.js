const router = require('express').Router()
const { orderById, read, readAll, getStatusValues, create, updateOrderStatus } = require('../controllers/order')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { userById, addOrderToHistory } = require('../controllers/user')
const { decreaseQuantity } = require('../controllers/product')

router.get('/:userId/list', requireSignIn, isAuth, isAdmin, readAll)

router.get('/:userId/status-values', requireSignIn, isAuth, isAdmin, getStatusValues)

router.put('/:userId/:orderId/status', requireSignIn, isAuth, isAdmin, updateOrderStatus)

router.get('/:userId/:orderId', requireSignIn, isAuth, read)

router.post('/create/:userId', requireSignIn, isAuth, addOrderToHistory, decreaseQuantity, create)

router.param('userId', userById)
router.param('orderId', orderById)

module.exports = router
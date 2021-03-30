const router = require('express').Router()
const { productAll, productById, create, update, remove } = require('../controllers/product')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.post('/create/:userId', requireSignIn, isAuth, isAdmin, create)

router.put('/update/:productId/:userId', requireSignIn, isAuth, isAdmin, update)

router.delete('/remove/:productId/:userId', requireSignIn, isAuth, isAdmin, remove)

router.param('userId', userById)
router.param('productId', productById)

router.get("/products",productAll)

module.exports = router
const router = require('express').Router()
const { read, productAll, productById, create, update, remove, productByName } = require('../controllers/product')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')
const { userById } = require('../controllers/user')

router.get("/products",productAll)

router.get('/by/productname', productByName)

router.get('/:productId', read)

router.post('/create/:userId', requireSignIn, isAuth, isAdmin, create)

router.put('/update/:productId/:userId', requireSignIn, isAuth, isAdmin, update)

router.delete('/remove/:productId/:userId', requireSignIn, isAuth, isAdmin, remove)

router.param('userId', userById)
router.param('productId', productById)

module.exports = router
const router = require('express').Router()
const { userById, read, update, orderHistory, mailToAdmin } = require('../controllers/user')
const { requireSignIn, isAuth } = require('../controllers/auth')

router.get('/:userId', requireSignIn, isAuth, read)

router.get('/orders/by/:userId', requireSignIn, isAuth, orderHistory)

router.put('/update/:userId', requireSignIn, isAuth, update)

router.post('/mail-to-admin', mailToAdmin)

router.param('userId', userById)

module.exports = router
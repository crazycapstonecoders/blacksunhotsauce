const router = require('express').Router()
const { userById, read, update, orderHistory } = require('../controllers/user')
const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth')

router.get('/secret/:userId', requireSignIn, isAuth, (req, res) => {
    res.json({ user: req.profile })
})

router.get('/:userId', requireSignIn, isAuth, read)

router.get('/orders/by/:userId', requireSignIn, isAuth, orderHistory)

router.put('/update/:userId', requireSignIn, isAuth, update)

router.param('userId', userById)

module.exports = router
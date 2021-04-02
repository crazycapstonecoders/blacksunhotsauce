const { Order, CartItem } = require('../models/order')

exports.create = (req, res) => {
    // get user who is making the order
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save().then(order => {
        res.json(order)
    }).catch(error => {
        console.log(error)
        return res.status(400).json({ error: "Error creating order" })
    })
}   
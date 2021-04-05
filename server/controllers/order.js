const { Order, CartItem } = require('../models/order')

exports.orderById = (req, res, next, id) => {
    Order.findById(id).exec((error, order) => {
        if(error || !order) {
            return res.status(400).json({ error: 'Order not found' })
        }
        req.order = order
        next()
    })
}

// get order by id
exports.read = (req, res) => {
    return res.json(req.order)
}

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
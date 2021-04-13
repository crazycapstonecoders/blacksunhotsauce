const { Order } = require('../models/order')

exports.orderById = (req, res, next, id) => {
    Order.findById(id).exec((error, order) => {
        if(error || !order) {
            return res.status(400).json({ error: 'Order not found' })
        }
        req.order = order
        next()
    })
}

exports.readAll = (req, res) => {
    // get all the order 
    Order.find()
    // populate user to know who place what orders
        .populate('user', '_id name address')
    // sort by when they were created
        .sort('-created')
        .exec((error, orders) => {
            if(error) {
                return res.status(400).json({ error: 'Error fetching orders from database' })
            }
            res.json(orders)
        })
}

exports.getStatusValues = (req, res) => {
    // get order status 
    res.json(Order.schema.path('status').enumValues)
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

exports.updateOrderStatus = (req, res) => {
    Order.updateOne({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (error, order) => {
        if(error) {
            return res.status(400).json({ error: 'Unable to update order status' })
        }
        res.json(order)
    })
}
const { Order } = require('../models/order')
const { sendEmail } = require('../helper/helpers')

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
        // send an email to the user telling them that their order has been received
        const emailData = {
            from: {
                name: 'Black Sun Sauces',
                address: 'no-reply@blacksunsauces.com'
            },
            to: order.user.email,
            subject: 'Order Received',
            html: `
            <h2>Hello ${req.profile.name}, your order has been received. Please allow a few days for it to be processed.</h2>
            <h3>Total products: ${order.products.length}</h3>
            <h3>Transaction ID: ${order.transaction_id}</h3>
            <h3>Order status: ${order.status}</h3>
            <h3>Product details:</h3>
            <hr />
            ${order.products
                .map(p => {
                    return `<div>
                        <h4>Product Name: ${p.name}</h4>
                        <h4>Product Price: ${p.price}</h4>
                        <h4>Product Quantity: ${p.count}</h4>
                </div>`
                })
                .join('--------------------')}
            <h3>Total order cost: ${order.amount}<h3>
            <h3>Thank you for shopping with us.</h3>`        
        }
        sendEmail(emailData)
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
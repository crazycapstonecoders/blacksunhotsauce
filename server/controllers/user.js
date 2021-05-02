const { Order } = require('../models/order')
const User = require('../models/user')
const { sendEmail } = require('../helper/helpers')

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if(error || !user) {
            return res.status(400).json({ error: 'User not found' })
        }
        req.profile = user
        next()
    })
}

// get user by id
exports.read = (req, res) => {
    req.profile.password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

exports.update = (req, res) => {
    // get info from client
    const { name, password } = req.body
    User.findOne({ _id: req.profile._id }, (error, user) => {
        // validate and check cases
        if(error || !user) {
            return res.status(400).json({ error: 'User not found' })
        }
        if(!name) {
            return res.status(400).json({ error: 'Name is required' })
        } else {
            user.name = name
        }
        if(password) {
            if(password.length < 6) {
                return res.status(400).json({ error: 'Password should be at least 6 charcters long' })
            } else if(password.match(/\d/) === null) {
                return res.status(400).json({ error: 'Password must contain a number' })
            } else {
                user.password = password
            }
        }
        // update user info 
        user.save((error, updatedUser) => {
            if(error) {
                return res.status(400).json({ error: 'User update failed' })
            } 
            // make sure not to return salt and password
            updatedUser.salt = undefined
            updatedUser.password = undefined
            res.json(updatedUser)
        })
    })
} 

exports.addOrderToHistory = (req, res, next) => {
    let history = []
    // push necessary order info to user purchase history
    req.body.order.products.forEach((product) => {
        history.push({ 
            _id: product._id, 
            name: product.name, 
            description: product.description,
            quantity: product.count, 
            price: product.price,
            transaction_id: req.body.order.transaction_id, 
            amount: req.body.order.amount
        })
    })

    // locate user who made that order and push the above history array 
    // to the history property as defined in the user model
    // retrieve the updated info with new: true 
    User.findOneAndUpdate(
        { _id: req.profile._id }, 
        { $push: { history: history } }, 
        { new: true }, 
        (error, data) => {
            if(error) {
                return res.status(400).json({ error: 'Could not update user purchase history' })
            }
            // execute next middleware function 
            next()
    })
}

exports.orderHistory = (req, res) => {
    // find order based on user id
    Order.find({ user: req.profile._id })
    // only grab user id and name
        .populate('user', '_id name')
    // sort order by when they were created
        .sort('-created')
        .exec((error, orders) => {
            if(error) {
                return res.status(400).json({ error: 'Error getting order history' })
            }
            res.json(orders)
    })
}

// Send message to admin by landing page visitors if they have any
exports.mailToAdmin = async (req, res) => {
    const { name, email, message } = req.body.values
    if(name === '' || email === '' || message === '') {
        return res.status(400).json({ error: 'All fields are required' })
    }
    // send an email to the admin
    const emailData = {
        from: {
            name: `${name}`
        },
        to: `crazycapstonecoders@gmail.com`,
        subject: 'Questions from potential client',
        html: `
        <h3>A potential client with the following email <em>${email}</em> and name <em>${name}</em>, has reached out with the following message:</h3>
        <h3>${message}</h3>
        <h3>End of message.</h3>`        
    }
    sendEmail(emailData)
    return res.status(200).json({
        message: 'Your message has been received, please give us a few days to process it. Thank you'
    })
}
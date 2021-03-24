const User = require('../models/user')

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
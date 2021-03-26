const User = require('../models/user')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
require('../auth/passport')(passport, localStrategy, jwtStrategy, extractJwt)
const _ = require("lodash")
const nodeMailer = require('nodemailer')
const axios = require('axios')

exports.signUp = async (req, res) => {
    // get email from client side via user sign up
    const { email } = req.body
    // check if the email already exists in db
    const checkEmail = await User.checkExistingField('email', email)
    if (checkEmail) {
        return res.status(400).json({ error: 'User already exists, please log in instead.' })
    }
    // create new user document using mongoose to store in db
    const user = new User(req.body)
    user.save()
        .then(user => {
            // make sure that we don't return password or salt to client 
            user.salt = undefined
            user.password = undefined
            res.json(user)
        })
        .catch(error => {
            return res.status(400).json({ error: "Something went wrong. Please try again later" })
        })
}

exports.signIn = async (req, res, next) => {
    // get necessary params from sign in page
    const { email, password } = req.body
    passport.authenticate('local', async (err, user) => {
        user = await User.findOne({ email })
        try {
            // log in the user
            req.logIn(user, { session: false }, async (error) => {
                if (error) {
                    return res.status(400).json(error)
                }
                // check if password match user
                const compare = await user.authenticate(password)
                if (!compare) {
                    return res.status(400).json({ error: 'Email and password does not match' })
                }
                // create a signed jwt token to authenticate user
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
                // persists the token as t with expiration date
                res.cookie('t', token, { expire: new Date() + 9999 })
                // define user object and return both user object and token to front end
                const { _id, name, email, role } = user
                return res.json({ token, user: { _id, name, email, role } })
            })
        } catch (error) {
            return next(error);
        }
    }
    )(req, res, next);
}

exports.signOut = (req, res) => {
    res.clearCookie('t')
    res.json({ message: 'Signout success!' })
}

exports.requireSignIn = passport.authenticate('jwt', { session: false })

exports.isAuth = (req, res, next) => {
    // check if user id === authenticated user
    // prevents user from accessing other user's data
    let user = req.profile.id == req.user
    if (!user) {
        return res.status(400).json({ error: 'Access denied' })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    // check if user is admin, 0 means regular user, 1 means admin
    if (req.profile.role === 0) {
        return res.status(400).json({ error: "Admin resource! Access denied" })
    }
    next()
}

exports.forgotPassword = (req, res) => {
    if (!req.body) return res.status(400).json({ error: "No request body" })
    if (!req.body.email) return res.status(400).json({ error: "Please include email in request body" })
    const { email } = req.body
    // search db for user with email sent from front end
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({ error: "User with that email does not exist!" })
        }
        // get a resetToken signed by jwt
        const resetToken = jwt.sign(
            { _id: user._id, iss: "NODEAPI" },
            process.env.JWT_SECRET
        )
        const emailData = {
            from: {
                name: 'Black Sun Sauces',
                address: 'no-reply@blacksunsauces.com'
            },
            to: email,
            subject: 'Password Reset Instructions',
            text: `Please click on the link to reset your password: ${process.env.CLIENT_URL}/reset-password/${resetToken}`,
            html: `<p>Please click on the link to reset your password:</p> 
                <p><a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>${process.env.CLIENT_URL}/reset-password/${resetToken}</a></p>`
        }
        // save resetToken to user object
        return user.updateOne({ resetPasswordLink: resetToken }, (error, success) => {
            if (error) {
                return res.json({ error: error })
            } else {
                // send reset password email
                sendEmail(emailData)
                return res.status(200).json({
                    message: 'A password reset email has been sent to you! Please check your email'
                })
            }
        })
    })
}

exports.resetPassword = (req, res) => {
    // get new password and reset password link from frontend
    const { resetPasswordLink, newPassword } = req.body
    // search db for user associated with the above reset password link 
    User.findOne({ resetPasswordLink }, (error, user) => {
        if (error || !user) return res.status(401).json({ error: 'Invalid link' })
        // update password and set reset password link to empty string 
        const updatedFields = {
            password: newPassword,
            resetPasswordLink: ''
        }
        // use lodash to simplify code and update user
        user = _.extend(user, updatedFields)
        user.updated = Date.now()
        // save user after updating user to ensure db has updated user info
        user.save((error, result) => {
            if (error) return res.status(400).json({ error: error })
            res.json({ message: 'Success! Please sign in with your new password' })
        })
    })
}

exports.validateRecaptcha = async (req, res, next) => {
    const { token } = req.body
    const secret = process.env.CAPTCHA_SECRET
    if (token === null) {
        return res.status(400).json({ error: 'Please try again' })
    }
    try {
        // make api call to google to verify recaptcha
        const isHuman = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`)
        // return success message
        return res.json({ success: isHuman.data.success })
    } catch (error) {
        throw new Error(`Error with Google veirfy API. ${error}`)
    }
}

exports.socialLogin = (req, res) => {
    const { email } = req.body
    /**
     * Check if user associated with the email exists
     * If they exists, just log the user in
     * Else, we create a new user using the social login info
     */
    User.findOne({ email }, (error, user) => {
        if(error || !user) {
            user = new User(req.body)
            req.profile = user
            user.save()
            // create a signed jwt token to authenticate user
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            // persists the token as t with expiration date
            res.cookie('t', token, { expire: new Date() + 9999 })
            // define user object and return both user object and token to front end
            const { _id, name, email, role } = user
            return res.json({ token, user: { _id, name, email, role } })
        } else {
            // create a signed jwt token to authenticate user
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            // persists the token as t with expiration date
            res.cookie('t', token, { expire: new Date() + 9999 })
            // define user object and return both user object and token to front end
            const { _id, name, email, role } = user
            return res.json({ token, user: { _id, name, email, role } })
        }
    })
}

// helper functions
const sendEmail = emailData => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    return transporter.sendMail(emailData)
        .then(info => console.log(`Message send: ${info.response}`))
        .catch(error => console.log(`Problem sending email: ${error}`))
}


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
    const { email } = req.body
    const checkEmail = await User.checkExistingField('email', email)
    if (checkEmail) {
        return res.status(400).json({ error: 'User already exists, please log in instead.' })
    }
    const user = new User(req.body)
    user.save()
        .then(user => {
            user.salt = undefined
            user.password = undefined
            res.json(user)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.signIn = async (req, res, next) => {
    const { username, password } = req.body
    passport.authenticate('local', async (err, user) => {
        user = await User.findOne({ username })
        try {
            req.logIn(user, { session: false }, async (error) => {
                if (error) {
                    return res.status(400).json(error)
                }
                const compare = await user.authenticate(password)
                if (!compare) {
                    return res.status(400).json({ error: 'Username and password does not match' })
                }
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
                res.cookie('t', token, { expire: new Date() + 9999 })
                const { _id, username, email, role } = user
                return res.json({ token, user: { _id, username, email, role } })
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
    let user = req.profile.id == req.user
    if (!user) {
        return res.status(400).json({ error: 'Access denied' })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(400).json({ error: "Admin resource! Access denied" })
    }
    next()
}

exports.forgotPassword = (req, res) => {
    if (!req.body) return res.status(400).json({ error: "No request body" })
    if (!req.body.email) return res.status(400).json({ error: "Please include email in request body" })
    const { email } = req.body
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({ error: "User with that email does not exist!" })
        }
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

        return user.updateOne({ resetPasswordLink: resetToken }, (error, success) => {
            if(error) {
                return res.json({ error: error })
            } else {
                sendEmail(emailData)
                return res.status(200).json({
                    message: 'A password reset email has been sent to you! Please check your email'
                })
            }
        })
    })
}

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body
    User.findOne({ resetPasswordLink }, (error, user) => {
        if (error || !user) return res.status(401).json({ error: 'Invalid link' })
        const updatedFields = {
            password: newPassword,
            resetPasswordLink: ''
        }
        user = _.extend(user, updatedFields)
        user.updated = Date.now()
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
        const isHuman = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`)
        return res.json({ success: isHuman.data.success })
    } catch (error) {
        throw new Error(`Error with Google veirfy API. ${error}`)
    }
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
 

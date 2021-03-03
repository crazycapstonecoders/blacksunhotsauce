const User = require('../models/user')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
require('../auth/passport')(passport, localStrategy, jwtStrategy, extractJwt)
const axios = require('axios')

exports.signUp = async (req, res) => {
    const { email } = req.body
    const checkEmail = await User.checkExistingField('email', email)
    if(checkEmail) {
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
                if(error) {
                    return res.status(400).json(error)
                }
                const compare = await user.authenticate(password)
                if(!compare) {
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

exports.requireSinIn = passport.authenticate('jwt', { session: false })

exports.isAuth = (req, res, next) => {
    let user = req.profile.id == req.user
    if(!user) {
        return res.status(400).json({ error: 'Access denied' })
    }
    next()
}

exports.validateRecaptcha = async(req, res, next) => {
    const { token } = req.body
    const secret = process.env.CAPTCHA_SECRET
    if(token === null) {
        return res.status(400).json({ error: 'Please try again' })
    }
    try {
        const isHuman = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`)
        return res.json({ success: isHuman.data.success })
    } catch(error) {
        throw new Error(`Error with Google veirfy API. ${error}`)
    }
}

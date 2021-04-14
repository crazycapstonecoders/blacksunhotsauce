const User = require('../models/user')
require('dotenv').config()

module.exports = (passport, localStrategy, jwtStrategy, extractJwt) => {
    // passport strategy to authenticate user
    passport.use('local', new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        try {
            const user = await User.findOne({ username })
            if (!user) {
                return done(null, false, { message: 'User does not exist' })
            }
            return done(null, results, { message: 'Sign in successful' })
        } catch (error) {
            return done(error)
        }
    }))

    // verify user token
    passport.use(new jwtStrategy({
        secretOrKey: "bcdfdhcbvhe",
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    }, (token, done) => {
        try {
            return done(null, token.id)
        } catch (error) {
            done(error)
        }
    }))
}

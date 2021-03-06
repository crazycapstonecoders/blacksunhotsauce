const Joi = require('@hapi/joi')

exports.userSignUpValidator = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'next', 'edu'] } }).required(),
        password: Joi.string().min(6).pattern(new RegExp(/\d/)).message('Password must contain a number').required()
    })
    const { error } = schema.validate(req.body)
    if (error) {
        const { details } = error
        const message = details.map(i => i.message).join(',').replace(/"/g, "")
        return res.status(400).json({ error: message })
    } else {
        next()
    }
}

exports.passwordResetValidator = (req, res, next) => {
    const schema = Joi.object({
        resetPasswordLink: Joi.string().required(),
        newPassword: Joi.string().min(6).pattern(new RegExp(/\d/)).message('Password must contain a number').required()
    })
    const { error } = schema.validate(req.body)
    if (error) {
        const { details } = error
        const message = details.map(i => i.message).join(',').replace(/"/g, "")
        return res.status(400).json({ error: message })
    } else {
        next()
    }
}

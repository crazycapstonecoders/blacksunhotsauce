const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    },
    resetPasswordLink: {
        data: String,
        default: ""
    }
}, { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSaltSync(10)
        this.salt = salt
        const hashed = await this.encryptPassword(this.password, salt)
        this.password = hashed
        next()
    }
})

userSchema.methods = {
    encryptPassword: async function (password, salt) {
        return await bcrypt.hashSync(password, salt)
    },
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.password);
    }
}

userSchema.statics.checkExistingField = (field, value) => {
    const checkField = User.findOne({ [`${field}`]: value });

    return checkField;
}

const User = mongoose.model('User', userSchema)

module.exports = User
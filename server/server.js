const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

require('dotenv').config()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

const uri = process.env.MONGO_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Database Opened')
})

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

const port = 5000 || process.env.PORT

app.listen(port, () => {
    console.log('Server running on ' + port)
})
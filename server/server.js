const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

// allows us to read values from .env file
require('dotenv').config()

// express middlewares to handle cors, parse cookies and parse json as well as log http request
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

// connect to database
const uri = process.env.MONGO_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Database Opened')
})

// import routes to be used in app
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const orderRouter = require('./routes/order')

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)

// localhost port
const port = 5000 || process.env.PORT

app.listen(port, () => {
    console.log('Server running on ' + port)
})
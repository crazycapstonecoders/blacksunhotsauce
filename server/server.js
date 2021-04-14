const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

// allows us to read values from .env file
require('dotenv').config()

// express middlewares to handle cors, parse cookies and parse json as well as log http request
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
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
const braintreeRouter = require('./routes/braintree')

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/order', orderRouter)
app.use('/api/braintree', braintreeRouter)

// localhost port
const port = 5000 || process.env.PORT

// prepare to deploy
if(process.env.NODE_ENV === 'production') {
    // serve static assets if in production
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        // go to client's build folder and load index.html
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log('Server running on ' + port)
})
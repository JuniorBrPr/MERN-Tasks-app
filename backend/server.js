const express = require('express')
const colors = require("colors")
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require("cors");
const whitelist = ["http://localhost:3000"]
const corsOptions ={
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

connectDB()

const app = express()

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)



app.listen(port, () => console.log( `Server listening on port ${port}`))




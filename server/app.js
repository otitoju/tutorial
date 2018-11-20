const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./routes/router')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/', router)

const port = 3001

mongoose.connect('mongodb://localhost/tutorial')

app.listen(port, () => {
    console.log(`app is listening on ${port}`)
})
const mongoose = require('mongoose')
const userTable = new mongoose.Schema({
    name:String,
    password:String,
    email:String,
})

module.exports = mongoose.model('tutorial', userTable)
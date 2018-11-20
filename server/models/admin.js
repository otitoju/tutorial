const mongoose = require('mongoose')

const AdminTable = new mongoose.Schema({
    username:String,
    password: String
})
module.exports = mongoose.model('admin', AdminTable)

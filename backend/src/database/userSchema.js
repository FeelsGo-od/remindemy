const mongoose = require("mongoose");

let nameSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

let User = mongoose.model('User', nameSchema)

module.exports = User
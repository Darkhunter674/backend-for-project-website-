const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const UserData = mongoose.model('userdata', userSchema); // Specify collection name as 'userdata'

module.exports = UserData;
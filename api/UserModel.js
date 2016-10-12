/**
 * Created by yketd on 4-10-2016.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    achternaam: {type: String, required: true},
    tussenvoegsels: {type: String, required: false},
    voornaam: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
});
module.exports = mongoose.model('UserModel.js', userSchema);
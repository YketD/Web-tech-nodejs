/**
 * Created by yketd on 4-10-2016.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    achternaam: {type: String, required: true},
    tussenvoegsels: {type: String, required: false},
    voornaam: {type: Date, required: true},
    username: {type: Number, required: true},
    wachtwoord: {type: String, required: true},
});
module.exports = mongoose.model('UserModel.js', userSchema);
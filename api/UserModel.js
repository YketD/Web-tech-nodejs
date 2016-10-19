/**
 * Created by yketd on 4-10-2016.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');



var userSchema = new schema({
    achternaam: {type: String, required: true},
    tussenvoegsel: {type: String, required: false},
    voornaam: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserModel.js', userSchema);
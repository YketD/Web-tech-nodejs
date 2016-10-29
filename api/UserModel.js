/**
 * Created by yketd on 4-10-2016.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');



var userSchema = new schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    middlename: {type: String, required: false},
    lastname: {type: String, required: true}
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserModel.js', userSchema);
/**
 * Created by yketd on 4-10-2016.
 */
var User = require('./UserModel.js');

new User({
    username: 'admin',
    password: 'admin',
    firstname: 'Yke',
    middlename: 'ten',
    lastname: 'Donkelaar'
}).save();

new User({
    username: 'user',
    password: 'user',
    firstname: 'Marcel',
    middlename: '',
    lastname: 'Germes'
}).save();

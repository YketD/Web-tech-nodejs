/**
 * Created by yketd on 4-10-2016.
 */
var User = require('UserModel.js');

var testUser = new User({
    achternaam : 'Donkelaar',
    tussenVoegsels: 'ten',
    voornaam: 'yke',
    username: 'admin',
    password: 'admin'
});
post.save(function (err, result) {
    if (err)
        return console.error(err);
    else
        console.log('usersave', "user has been saved succesfully, login with username= " + testUser.username + "& password= " + testUser.password);
});



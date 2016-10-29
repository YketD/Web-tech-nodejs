/**
 * Created by yketd on 4-10-2016.
 */
var User = require('./UserModel.js');
var post = new User({
    username: 'admin',
    password: 'admin',
    firstname: 'yke',
    middlename: 'ten',
    lastname: 'Donkelaar'
});
post.save(function (err, result) {
    if (err)
        return console.error(err);
    else if (User.find(function (err, result) {
            if (err) {
                console.log(err);
            } else if (result != undefined) {
                return false;
            } else
                return true;
            return false

        })) {

    }
    else
        console.log('usersave', "user has been saved succesfully, login with username= " + post.username + "& password= " + post.wachtwoord);
});


